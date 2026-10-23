// ============================================================
// Database Seed Script for Make4SIT
// Run: node scripts/seed.mjs
// This creates the initial Firestore collections with sample data.
// ============================================================

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCPTvBeUWx3oVXPgpxwzbqYZ-VfAzYR72w",
  authDomain: "docuchecker-b5de7.firebaseapp.com",
  projectId: "docuchecker-b5de7",
  storageBucket: "docuchecker-b5de7.firebasestorage.app",
  messagingSenderId: "386600394445",
  appId: "1:386600394445:web:459a4b17fdd7913a7d9384",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ---- Sample Faculty Data ----
const facultyData = [
  // CSE
  { name: "Dr. Rajesh Kumar", email: "rajesh.cse@sit.edu", password: "Faculty@123", department: "CSE", designation: "Professor" },
  { name: "Prof. Sneha Patil", email: "sneha.cse@sit.edu", password: "Faculty@123", department: "CSE", designation: "Asst Prof." },
  // AIML
  { name: "Dr. Anitha Sharma", email: "anitha.aiml@sit.edu", password: "Faculty@123", department: "AIML", designation: "Associate Prof." },
  { name: "Prof. Kiran Desai", email: "kiran.aiml@sit.edu", password: "Faculty@123", department: "AIML", designation: "Asst Prof." },
  // Civil
  { name: "Dr. Mahesh Naik", email: "mahesh.civil@sit.edu", password: "Faculty@123", department: "Civil", designation: "Professor" },
  // EEE
  { name: "Prof. Savita Kulkarni", email: "savita.eee@sit.edu", password: "Faculty@123", department: "EEE", designation: "Asst Prof." },
  // ECE
  { name: "Dr. Deepak Joshi", email: "deepak.ece@sit.edu", password: "Faculty@123", department: "ECE", designation: "HOD" },
  { name: "Prof. Meera Hegde", email: "meera.ece@sit.edu", password: "Faculty@123", department: "ECE", designation: "Associate Prof." },
];

async function seed() {
  console.log("🌱 Starting database seed...\n");

  // Check if faculty already exists
  const existingFaculty = await getDocs(collection(db, 'faculty'));
  if (!existingFaculty.empty) {
    console.log(`⚠️  Faculty collection already has ${existingFaculty.size} documents.`);
    console.log("   Skipping faculty seed to avoid duplicates.");
    console.log("   Delete existing documents in Firebase Console first if you want to re-seed.\n");
  } else {
    console.log("📝 Seeding faculty collection...");
    for (const faculty of facultyData) {
      const docRef = await addDoc(collection(db, 'faculty'), {
        ...faculty,
        createdAt: serverTimestamp(),
      });
      console.log(`   ✅ ${faculty.name} (${faculty.department}) → ${docRef.id}`);
    }
    console.log(`\n🎉 Added ${facultyData.length} faculty members.\n`);
  }

  // Summary
  console.log("=".repeat(50));
  console.log("DATABASE READY — Summary:");
  console.log("=".repeat(50));
  
  const fSnap = await getDocs(collection(db, 'faculty'));
  const sSnap = await getDocs(collection(db, 'students'));
  const rSnap = await getDocs(collection(db, 'reports'));
  
  console.log(`  Faculty:  ${fSnap.size} documents`);
  console.log(`  Students: ${sSnap.size} documents`);
  console.log(`  Reports:  ${rSnap.size} documents`);
  console.log("");
  console.log("Faculty Login Credentials (all passwords: Faculty@123):");
  fSnap.docs.forEach(doc => {
    const d = doc.data();
    console.log(`  ${d.department.padEnd(6)} | ${d.name.padEnd(22)} | ${d.email}`);
  });
  console.log("");
  console.log("Admin Login:  admin@sit / AdminSIT@123");
  console.log("=".repeat(50));

  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
