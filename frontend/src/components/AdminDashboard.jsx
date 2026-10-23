import { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { UserPlus, Users, Loader2, Trash2, Shield } from 'lucide-react';

const DEPARTMENTS = ['CSE', 'AIML', 'Civil', 'EEE', 'ECE'];

export default function AdminDashboard() {
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addLoading, setAddLoading] = useState(false);
  const [filterDept, setFilterDept] = useState('All');
  const [successMsg, setSuccessMsg] = useState('');
  useScrollAnimation();

  const [newFaculty, setNewFaculty] = useState({
    name: '', email: '', password: '', department: 'CSE', designation: 'Asst Prof.',
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'faculty'), (snapshot) => {
      setFaculties(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleAddFaculty = async (e) => {
    e.preventDefault();
    setAddLoading(true); setSuccessMsg('');
    try {
      await addDoc(collection(db, 'faculty'), { ...newFaculty, createdAt: serverTimestamp() });
      setNewFaculty({ name: '', email: '', password: '', department: 'CSE', designation: 'Asst Prof.' });
      setSuccessMsg(`${newFaculty.name} registered successfully!`);
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) { console.error("Error adding faculty", err); alert("Failed to add faculty"); }
    setAddLoading(false);
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Remove ${name}? This cannot be undone.`)) return;
    try { await deleteDoc(doc(db, 'faculty', id)); }
    catch (err) { alert("Failed to delete"); }
  };

  const filtered = filterDept === 'All' ? faculties : faculties.filter(f => f.department === filterDept);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div data-animate="fade-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm" style={{ background: 'linear-gradient(135deg, #7c3aed, #5b21b6)' }}>
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-surface-900 dark:text-surface-100 tracking-tight">Admin Panel</h2>
            <p className="text-surface-500 dark:text-surface-400 text-sm">Manage faculty accounts across all departments.</p>
          </div>
        </div>
      </div>

      {/* Department Stats */}
      <div data-animate="fade-up" data-delay="1" className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {DEPARTMENTS.map((dept, i) => {
          const count = faculties.filter(f => f.department === dept).length;
          return (
            <button key={dept} onClick={() => setFilterDept(filterDept === dept ? 'All' : dept)}
              className={`card-solid p-4 text-center transition-all duration-300 cursor-pointer dark:bg-surface-900 dark:border-surface-800 ${filterDept === dept ? 'ring-2 ring-brand-500 border-brand-300 bg-brand-50 dark:bg-brand-900/20' : 'hover:shadow-md hover:border-brand-200 dark:hover:border-brand-700'}`}>
              <p className="text-2xl font-extrabold text-surface-900 dark:text-surface-100">{count}</p>
              <p className="text-xs font-bold text-surface-400 dark:text-surface-500 uppercase tracking-wider">{dept}</p>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Faculty Form */}
        <div data-animate="fade-right" data-delay="2" className="lg:col-span-1">
          <div className="card p-6 sticky top-24 dark:bg-surface-900 dark:border-surface-800">
            <h3 className="text-lg font-bold text-surface-900 dark:text-surface-100 mb-6 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              Register Faculty
            </h3>
            <form onSubmit={handleAddFaculty} className="space-y-4">
              <div>
                <label className="form-label">Full Name</label>
                <input type="text" required value={newFaculty.name} onChange={e => setNewFaculty({...newFaculty, name: e.target.value})} className="form-input" placeholder="Dr. Jane Doe" />
              </div>
              <div>
                <label className="form-label">Email</label>
                <input type="email" required value={newFaculty.email} onChange={e => setNewFaculty({...newFaculty, email: e.target.value})} className="form-input" placeholder="faculty@sit.edu" />
              </div>
              <div>
                <label className="form-label">Password</label>
                <input type="text" required value={newFaculty.password} onChange={e => setNewFaculty({...newFaculty, password: e.target.value})} className="form-input" placeholder="Login password" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Department</label>
                  <select value={newFaculty.department} onChange={e => setNewFaculty({...newFaculty, department: e.target.value})} className="form-input">
                    {DEPARTMENTS.map(dep => <option key={dep} value={dep}>{dep}</option>)}
                  </select>
                </div>
                <div>
                  <label className="form-label">Designation</label>
                  <select value={newFaculty.designation} onChange={e => setNewFaculty({...newFaculty, designation: e.target.value})} className="form-input">
                    <option value="Asst Prof.">Asst Prof.</option>
                    <option value="Associate Prof.">Associate Prof.</option>
                    <option value="Professor">Professor</option>
                    <option value="HOD">HOD</option>
                  </select>
                </div>
              </div>

              {successMsg && (
                <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-medium border border-emerald-200 animate-slide-down">
                  ✓ {successMsg}
                </div>
              )}

              <button type="submit" disabled={addLoading} className="btn-primary w-full mt-2">
                {addLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Register Faculty'}
              </button>
            </form>
          </div>
        </div>

        {/* Faculty List */}
        <div data-animate="fade-left" data-delay="3" className="lg:col-span-2">
          <div className="card overflow-hidden dark:bg-surface-900 dark:border-surface-800">
            <div className="px-6 py-4 border-b border-surface-100 dark:border-surface-800 flex justify-between items-center">
              <h3 className="font-bold text-surface-900 dark:text-surface-100 flex items-center gap-2">
                <Users className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                {filterDept === 'All' ? 'All Faculties' : `${filterDept} Department`}
              </h3>
              <span className="badge bg-brand-50 text-brand-700 border border-brand-200 dark:bg-brand-900/30 dark:text-brand-300 dark:border-brand-800">{filtered.length} total</span>
            </div>

            {loading ? (
              <div className="p-12 text-center">
                <div className="w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-surface-400">Loading...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-12 text-center">
                <Users className="w-12 h-12 text-surface-200 mx-auto mb-4" />
                <p className="text-surface-400 font-medium">No faculties found{filterDept !== 'All' ? ` in ${filterDept}` : ''}.</p>
              </div>
            ) : (
              <div className="divide-y divide-surface-50 dark:divide-surface-800">
                {filtered.map((faculty, i) => (
                  <div key={faculty.id} data-animate="fade-up" data-delay={Math.min(i + 1, 6)}
                    className="p-4 sm:px-6 hover:bg-surface-50/50 dark:hover:bg-surface-800/30 transition-all duration-300 flex justify-between items-center group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 font-bold text-sm flex-shrink-0">
                        {faculty.name?.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-surface-900 dark:text-surface-100 text-sm">{faculty.name}</h4>
                        <p className="text-xs text-surface-400">{faculty.designation} · {faculty.department}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-surface-600 dark:text-surface-300">{faculty.email}</p>
                        <p className="text-xs text-surface-300 dark:text-surface-500 font-mono">PWD: {faculty.password}</p>
                      </div>
                      <button onClick={() => handleDelete(faculty.id, faculty.name)}
                        className="opacity-0 group-hover:opacity-100 p-2 rounded-lg text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 transition-all duration-300">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
