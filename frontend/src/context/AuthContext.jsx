import { createContext, useContext, useState } from 'react';
import { collection, getDocs, addDoc, query, where, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const AuthContext = createContext();

// Helper: wrap a Firestore call with a timeout
function withTimeout(promise, ms = 8000) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error('Connection timed out. Make sure Firestore is enabled in your Firebase Console.')), ms))
  ]);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('make4sit_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (email, password) => {
    // Hardcoded Admin Login
    if (email === 'admin@sit' && password === 'AdminSIT@123') {
      const adminUser = { role: 'admin', email };
      setUser(adminUser);
      localStorage.setItem('make4sit_user', JSON.stringify(adminUser));
      return { success: true, role: 'admin' };
    }

    // Faculty Login
    try {
      const fq = query(collection(db, 'faculty'), where('email', '==', email), where('password', '==', password));
      const fSnapshot = await withTimeout(getDocs(fq));
      if (!fSnapshot.empty) {
        const doc = fSnapshot.docs[0];
        const facultyUser = { role: 'faculty', id: doc.id, ...doc.data() };
        setUser(facultyUser);
        localStorage.setItem('make4sit_user', JSON.stringify(facultyUser));
        return { success: true, role: 'faculty' };
      }
    } catch (error) {
      console.error("Faculty Login error", error);
      if (error.message.includes('timed out') || error.message.includes('PERMISSION_DENIED')) {
        return { success: false, error: 'Cannot connect to database. Enable Firestore in Firebase Console first.' };
      }
    }

    // Student Login
    try {
      const sq = query(collection(db, 'students'), where('email', '==', email), where('password', '==', password));
      const sSnapshot = await withTimeout(getDocs(sq));
      if (!sSnapshot.empty) {
        const doc = sSnapshot.docs[0];
        const studentUser = { role: 'student', id: doc.id, ...doc.data() };
        setUser(studentUser);
        localStorage.setItem('make4sit_user', JSON.stringify(studentUser));
        return { success: true, role: 'student' };
      }
    } catch (error) {
      console.error("Student Login error", error);
      if (error.message.includes('timed out') || error.message.includes('PERMISSION_DENIED')) {
        return { success: false, error: 'Cannot connect to database. Enable Firestore in Firebase Console first.' };
      }
      return { success: false, error: 'Database error occurred' };
    }

    return { success: false, error: 'Invalid email or password' };
  };

  const signupStudent = async (studentData) => {
    try {
      // Check if email already exists
      const sq = query(collection(db, 'students'), where('email', '==', studentData.email));
      const sSnapshot = await withTimeout(getDocs(sq));
      if (!sSnapshot.empty) {
        return { success: false, error: 'Email is already registered' };
      }

      // Add student
      const docRef = await withTimeout(addDoc(collection(db, 'students'), {
        ...studentData,
        createdAt: serverTimestamp()
      }));

      const newStudent = { role: 'student', id: docRef.id, ...studentData };
      setUser(newStudent);
      localStorage.setItem('make4sit_user', JSON.stringify(newStudent));
      return { success: true, role: 'student' };
    } catch (error) {
      console.error("Student Signup error", error);
      if (error.message.includes('timed out') || error.message.includes('PERMISSION_DENIED')) {
        return { success: false, error: 'Cannot connect to database. Enable Firestore in your Firebase Console first, then try again.' };
      }
      return { success: false, error: 'Database error occurred' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('make4sit_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signupStudent }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
