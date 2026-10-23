# Make4SIT: Zero-Error Report Generator 🚀

A production-ready Full-Stack application designed to completely eliminate formatting errors in student **NSS BNSK459** reports for Shetty Institute of Technology.

---

## 🔐 Admin Credentials (Hackathon Reference Only)

| Field | Value |
|-------|-------|
| **Login ID** | `admin@sit` |
| **Password** | `AdminSIT@123` |

> *There is no public sign-up or trace of this admin access in the UI. This is an internal hardcoded credential for the hackathon demo.*

---

## 🧑‍🎓 How It Works

### 1. Student Flow
1. Student registers at `/signup` → fills in Name, USN, Department, Semester, Academic Year, Email, Password.
2. Student logs in → sees the **Report Creator** with their VTU identity auto-filled.
3. Student selects their **Faculty Guide** (filtered by department) and uploads up to 2 photos per activity.
4. Student submits → report goes to **"Pending"** status and appears on the selected Faculty's dashboard in real-time.
5. Student can **edit** their report anytime (re-uploading photos or changing faculty). Editing resets status to Pending.
6. Student can **download the PDF** at any time (approved reports get an official stamp).

### 2. Faculty Flow
1. Admin creates a Faculty account with email + password + department + designation.
2. Faculty logs in → sees only reports assigned to them (real-time via Firestore `onSnapshot`).
3. Faculty clicks **Approve** → report status updates to "Approved" instantly on both dashboards.
4. Faculty can **download the PDF** for any report.

### 3. Admin Flow
1. Admin logs in with `admin@sit` / `AdminSIT@123`.
2. Admin can **register new faculty** members, assigning them to departments (CSE, AIML, Civil, EEE, ECE).
3. Admin can see all registered faculties and their credentials.

---

## 📄 PDF Output

The generated PDF is a **20+ page BNSK459 academic report** that includes:

- **VTU Cover Page** — Dynamic student name, USN, faculty name, department, semester, academic year
- **Certificate Page** — NSS Co-Ordinator, HOD, and Principal signature blocks
- **Acknowledgement** — Auto-populated with faculty and student names
- **Table of Contents** — Linked to 3 activities + conclusion
- **Activity 1** — Water Conservation (boilerplate + student photos)
- **Activity 2** — Business Proposal (boilerplate + student photos)
- **Activity 3** — School Outreach (boilerplate + student photos)
- **Conclusion** — Summary of all 3 activities
- **Footer** — `Dept of [Department], SITK | Page | X` on every page
- **Approved Stamp** — Green "APPROVED" stamp on cover + certificate if faculty approved

---

## 🏗 Architecture

```
Frontend (React + Vite + Tailwind CSS)
├── AuthContext       → Role-based auth (admin / faculty / student)
├── Login / Signup    → Unified portal with Firestore-backed accounts
├── StudentForm       → Create/Edit reports, upload photos, see status
├── FacultyDashboard  → Real-time report feed, approve, download PDF
└── AdminDashboard    → Register faculties, manage departments

Backend (Node.js + Express + Puppeteer)
├── server.js         → CORS, health check, PDF API endpoint
├── pdfGenerator.js   → Browser singleton for fast PDF rendering
└── reportTemplate.js → Full BNSK459 HTML template engine

Database & Storage (Firebase)
├── Firestore: students, faculty, reports collections
└── Storage: Activity photo uploads
```

---

## 🛠 Local Development

### Prerequisites
- Node.js 18+ installed
- Firebase project with Firestore and Storage enabled

### Setup
```bash
# Backend
cd backend
npm install
npm run dev
# → Running on http://localhost:5000

# Frontend (new terminal)
cd frontend
npm install
npm run dev
# → Running on http://localhost:5173
```

### Environment Variables

**`frontend/.env`** — Get from Firebase Console → Project Settings → Your Apps
```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_API_URL=http://localhost:5000
```

**`backend/.env`**
```env
PORT=5000
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

---

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite 5, Tailwind CSS 3, React Router 6, Axios, Lucide Icons |
| Backend | Node.js, Express 4, Puppeteer (Headless Chrome) |
| Database | Firebase Firestore (NoSQL) |
| Storage | Firebase Storage (Image uploads) |
| Auth | Custom role-based (Context API + localStorage) |
| PDF | Puppeteer browser singleton — generates 20+ page PDFs in ~400ms |

---

