import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, query, where, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import axios from 'axios';
import { CheckCircle, Clock, Loader2, Edit3, Download, Upload, ImagePlus, AlertTriangle, User, BookOpen, FileText } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const fileToBase64 = (file) => {
  if (typeof file === 'string') return Promise.resolve(file);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

const uploadImages = async (files) => {
  if (!files || files.length === 0) return [];
  const promises = files.map((file) => fileToBase64(file));
  return Promise.all(promises);
};

export default function StudentForm() {
  const { user } = useAuth();
  const [facultyList, setFacultyList] = useState([]);
  const [facultyLoading, setFacultyLoading] = useState(true);
  const [existingReport, setExistingReport] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [facultyId, setFacultyId] = useState('');
  const [act1Photos, setAct1Photos] = useState([]);
  const [act2Photos, setAct2Photos] = useState([]);
  const [act3Photos, setAct3Photos] = useState([]);
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  useScrollAnimation();

  useEffect(() => {
    (async () => {
      if (!user) return;
      try {
        const qFaculty = user.department
          ? query(collection(db, 'faculty'), where('department', '==', user.department))
          : collection(db, 'faculty');
        const fSnap = await getDocs(qFaculty);
        setFacultyList(fSnap.docs.map(d => ({ id: d.id, ...d.data() })));

        if (user.id) {
          const rSnap = await getDocs(query(collection(db, 'reports'), where('studentId', '==', user.id)));
          if (!rSnap.empty) {
            const report = { id: rSnap.docs[0].id, ...rSnap.docs[0].data() };
            setExistingReport(report);
            setFacultyId(report.facultyId);
          }
        }
      } catch (err) { console.error('Failed to load data:', err); }
      finally { setFacultyLoading(false); }
    })();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!facultyId) return setErrorMsg("Please select a Faculty Guide");
    setStatus('uploading'); setErrorMsg(''); setUploadProgress(0);
    try {
      const url1 = act1Photos.length > 0 ? await uploadImages(act1Photos, 'act1') : existingReport?.activity1Photos || [];
      const url2 = act2Photos.length > 0 ? await uploadImages(act2Photos, 'act2') : existingReport?.activity2Photos || [];
      const url3 = act3Photos.length > 0 ? await uploadImages(act3Photos, 'act3') : existingReport?.activity3Photos || [];
      const selectedFaculty = facultyList.find(f => f.id === facultyId);
      const payload = {
        studentId: user.id, studentName: user.name, usn: user.usn, department: user.department,
        semester: user.semester, academicYear: user.academicYear, facultyId,
        facultyName: selectedFaculty?.name || '', facultyDesignation: selectedFaculty?.designation || '',
        activity1Photos: url1, activity2Photos: url2, activity3Photos: url3,
        status: 'pending', updatedAt: serverTimestamp(),
      };
      if (existingReport) {
        await updateDoc(doc(db, 'reports', existingReport.id), payload);
        setExistingReport({ ...existingReport, ...payload });
      } else {
        payload.createdAt = serverTimestamp();
        const docRef = await addDoc(collection(db, 'reports'), payload);
        setExistingReport({ id: docRef.id, ...payload });
      }
      setStatus('success'); setIsEditing(false);
    } catch (err) {
      console.error('Submission error:', err); setStatus('error');
      setErrorMsg('Failed to save report. Please try again.');
    }
  };

  const handleDownloadPdf = async () => {
    setGeneratingPdf(true);
    try {
      const payload = { ...existingReport, isApproved: existingReport.status === 'approved' };
      const response = await axios.post(`${BACKEND_URL}/api/generate-pdf`, payload, { responseType: 'blob' });
      const blobUrl = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a'); link.href = blobUrl;
      link.download = `Report_${user.usn}.pdf`; link.click();
      URL.revokeObjectURL(blobUrl);
    } catch (err) { alert('Failed to download PDF. Make sure the backend server is running.'); }
    setGeneratingPdf(false);
  };

  // ── PROGRESS TRACKER COMPONENT ──
  const ProgressTracker = () => {
    const isSubmitted = !!existingReport;
    const isApproved = existingReport?.status === 'approved';
    const isRejected = existingReport?.status === 'rejected';

    const steps = [
      { id: 1, title: 'Draft Report', desc: 'Upload activity photos', done: true },
      { id: 2, title: 'Submission', desc: 'Send to faculty guide', done: isSubmitted, active: !isSubmitted },
      { id: 3, title: 'Faculty Review', desc: isRejected ? 'Changes requested' : 'Awaiting approval', done: isApproved || isRejected, active: isSubmitted && !isApproved && !isRejected, error: isRejected },
      { id: 4, title: 'Final PDF', desc: 'Ready to download', done: isApproved, active: isApproved }
    ];

    return (
      <div className="card p-6 mb-6 dark:bg-surface-900 dark:border-surface-800">
        <h3 className="text-sm font-bold text-surface-900 dark:text-surface-100 mb-6 uppercase tracking-wider">Report Progress</h3>
        <div className="space-y-6">
          {steps.map((step, i) => (
            <div key={step.id} className="relative flex gap-4">
              {i !== steps.length - 1 && (
                <div className={`absolute top-8 left-3.5 w-0.5 h-full -ml-px ${step.done && !step.error ? 'bg-brand-500' : 'bg-surface-200 dark:bg-surface-700'}`} />
              )}
              <div className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center shrink-0 border-2 
                ${step.done && !step.error ? 'bg-brand-500 border-brand-500 text-white' : 
                  step.error ? 'bg-red-500 border-red-500 text-white' :
                  step.active ? 'bg-white dark:bg-surface-900 border-brand-500 text-brand-500' : 
                  'bg-surface-100 dark:bg-surface-800 border-surface-200 dark:border-surface-700 text-surface-400'}`}>
                {step.done && !step.error ? <CheckCircle className="w-4 h-4" /> : step.error ? <AlertTriangle className="w-4 h-4" /> : <span className="text-xs font-bold">{step.id}</span>}
              </div>
              <div className="pt-1 pb-2">
                <p className={`text-sm font-bold ${step.active || step.done ? 'text-surface-900 dark:text-surface-100' : 'text-surface-400'}`}>{step.title}</p>
                <p className={`text-xs ${step.error ? 'text-red-500' : 'text-surface-500'}`}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── MAIN CONTENT (STATUS OR FORM) ──
  const MainContent = () => {
    if (existingReport && !isEditing) {
      const isApproved = existingReport.status === 'approved';
      const isRejected = existingReport.status === 'rejected';
      return (
        <div className="h-full flex items-center justify-center p-4">
          <div data-animate="scale" className="card p-10 sm:p-14 text-center max-w-lg w-full dark:bg-surface-900 dark:border-surface-800">
            <div className={`w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center ${isApproved ? 'bg-emerald-50 dark:bg-emerald-900/30' : isRejected ? 'bg-red-50 dark:bg-red-900/30' : 'bg-amber-50 dark:bg-amber-900/30'}`}>
              {isApproved
                ? <CheckCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                : isRejected
                  ? <AlertTriangle className="w-10 h-10 text-red-500 dark:text-red-400" />
                  : <Clock className="w-10 h-10 text-amber-500 dark:text-amber-400" />
              }
            </div>
            <h2 className="text-2xl font-extrabold text-surface-900 dark:text-surface-100 mb-3">
              {isApproved ? 'Report Approved!' : isRejected ? 'Report Rejected' : 'Awaiting Approval'}
            </h2>
            <p className="text-surface-500 dark:text-surface-400 mb-10 leading-relaxed max-w-sm mx-auto">
              {isApproved
                ? "Your faculty guide has approved your report. Download the final PDF with the official approval stamp."
                : isRejected
                  ? "Your faculty guide has requested changes. Please review your photos and resubmit."
                  : "Your report has been submitted and is waiting for your faculty guide to review it."}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button onClick={() => { setIsEditing(true); setStatus('idle'); }} className="btn-secondary group w-full sm:w-auto justify-center">
                <Edit3 className="w-4 h-4" /> {isRejected ? 'Fix & Resubmit' : 'Edit Report'}
              </button>
              {!isRejected && (
                <button onClick={handleDownloadPdf} disabled={generatingPdf}
                  className="btn-primary group w-full sm:w-auto justify-center"
                  style={isApproved ? { background: 'linear-gradient(135deg, #059669, #047857)' } : undefined}>
                  {generatingPdf ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                  Download PDF
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

  // ── FILE UPLOADER ──
  const FileUploader = ({ label, files, setFiles, existingUrls, index }) => {
    // Generate object URLs for previewing newly selected files
    const [previews, setPreviews] = useState([]);
    useEffect(() => {
      if (!files || files.length === 0) { setPreviews([]); return; }
      const objectUrls = files.map(file => URL.createObjectURL(file));
      setPreviews(objectUrls);
      return () => objectUrls.forEach(url => URL.revokeObjectURL(url));
    }, [files]);

    return (
      <div data-animate="fade-up" data-delay={index} className="group">
        <div className="card-solid p-5 hover:shadow-md transition-all duration-300 hover:border-brand-200 h-full flex flex-col">
          <label className="form-label">{label}</label>
          <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-surface-200 dark:border-surface-700 rounded-xl cursor-pointer transition-all duration-300 hover:border-brand-400 hover:bg-brand-50/30 dark:hover:bg-brand-900/10 group-hover:border-brand-300 flex-1 min-h-[140px]">
            <ImagePlus className="w-8 h-8 text-surface-300 dark:text-surface-600 mb-2 transition-colors group-hover:text-brand-400" />
            <span className="text-xs text-surface-400 font-medium text-center">Click to upload<br/>(max 2 images)</span>
            <input type="file" multiple accept="image/*" className="hidden"
              onChange={e => { if (e.target.files.length > 2) return alert("Max 2 images"); setFiles(Array.from(e.target.files)); }} />
          </label>
          
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {previews.length > 0 ? (
              previews.map((src, i) => (
                <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-surface-200 dark:border-surface-700 shadow-sm">
                  <img src={src} alt="Preview" className="w-full h-full object-cover" />
                </div>
              ))
            ) : existingUrls?.length > 0 ? (
              existingUrls.map((src, i) => (
                <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-surface-200 dark:border-surface-700 shadow-sm opacity-80">
                  <img src={src} alt="Existing" className="w-full h-full object-cover" />
                </div>
              ))
            ) : null}
          </div>
          {files.length > 0 && <p className="text-[10px] text-surface-400 mt-2 text-center">{files.length} new image(s) selected</p>}
          {files.length === 0 && existingUrls?.length > 0 && <p className="text-[10px] text-surface-400 mt-2 text-center">Using existing images</p>}
        </div>
      </div>
    );
  };

    return (
      <div className="animate-fade-in">
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-surface-900 dark:text-surface-100 tracking-tight">
            {existingReport ? 'Edit Your Report' : 'Create NSS Report'}
          </h2>
          <p className="text-surface-500 dark:text-surface-400 mt-1">Upload activity photos and select your faculty guide.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="card p-6 dark:bg-surface-900 dark:border-surface-800">
            <label className="form-label">Faculty Guide</label>
            <select required value={facultyId} onChange={e => setFacultyId(e.target.value)} className="form-input" disabled={facultyLoading}>
              <option value="">{facultyLoading ? 'Loading faculties...' : `Select ${user?.department || ''} Faculty`}</option>
              {facultyList.map(f => <option key={f.id} value={f.id}>{f.name} — {f.designation}</option>)}
            </select>
            {!facultyLoading && facultyList.length === 0 && (
              <p className="flex items-center gap-2 text-xs text-amber-600 mt-2"><AlertTriangle className="w-3 h-3" /> No faculty found for {user?.department || 'your department'}. Ask your admin to register them first.</p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-bold text-surface-900 dark:text-surface-100 mb-5">Activity Evidence</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FileUploader label="Act 1: Water Conservation" files={act1Photos} setFiles={setAct1Photos} existingUrls={existingReport?.activity1Photos} index="1" />
              <FileUploader label="Act 2: Business Proposal" files={act2Photos} setFiles={setAct2Photos} existingUrls={existingReport?.activity2Photos} index="2" />
              <FileUploader label="Act 3: School Outreach" files={act3Photos} setFiles={setAct3Photos} existingUrls={existingReport?.activity3Photos} index="3" />
            </div>
          </div>

          {/* Upload progress */}
          {status === 'uploading' && (
            <div className="animate-fade-in card p-5 dark:bg-surface-900 dark:border-surface-800">
              <div className="flex justify-between text-xs font-bold text-brand-600 dark:text-brand-400 mb-2"><span>Uploading...</span><span>{uploadProgress}%</span></div>
              <div className="w-full h-2 bg-brand-100 dark:bg-brand-900/30 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500 ease-out" style={{ width: `${uploadProgress}%`, background: 'linear-gradient(90deg, #7c3aed, #a78bfa)' }} />
              </div>
            </div>
          )}

          {errorMsg && <div className="flex items-start gap-2 p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100 animate-slide-down dark:bg-red-900/30 dark:border-red-800 dark:text-red-400">{errorMsg}</div>}

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-surface-100 dark:border-surface-800 mt-8">
            {existingReport && (
              <button type="button" onClick={() => setIsEditing(false)} className="btn-secondary sm:w-1/3 py-4 justify-center">Cancel</button>
            )}
            <button type="submit" disabled={status === 'uploading'} className="btn-primary flex-1 py-4 text-base group justify-center">
              {status === 'uploading' ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Uploading...</>
              ) : (
                <><Upload className="w-5 h-5" /> {existingReport ? 'Save Changes' : 'Submit for Approval'}</>
              )}
            </button>
          </div>
        </form>
      </div>
    );
  };

  // ── DASHBOARD LAYOUT ──
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* User Profile Card */}
          <div data-animate="fade-up" className="card p-6 dark:bg-surface-900 dark:border-surface-800 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-brand-500 to-cyan-500 opacity-20" />
            <div className="relative z-10 flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-brand-100 dark:bg-brand-900/50 border-4 border-white dark:border-surface-950 flex items-center justify-center shadow-md">
                <User className="w-6 h-6 text-brand-600 dark:text-brand-400" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-surface-900 dark:text-surface-100">{user?.name}</h3>
                <p className="text-sm text-surface-500 font-mono">{user?.usn}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between pb-3 border-b border-surface-100 dark:border-surface-800">
                <span className="text-sm text-surface-400">Department</span>
                <span className="text-sm font-bold text-surface-900 dark:text-surface-100">{user?.department}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-surface-100 dark:border-surface-800">
                <span className="text-sm text-surface-400">Semester</span>
                <span className="text-sm font-bold text-surface-900 dark:text-surface-100">{user?.semester} Sem</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-surface-400">Academic Year</span>
                <span className="text-sm font-bold text-surface-900 dark:text-surface-100">{user?.academicYear}</span>
              </div>
            </div>
          </div>

          {/* Progress Tracker */}
          <div data-animate="fade-up" data-delay="1">
            <ProgressTracker />
          </div>

          {/* Resources */}
          <div data-animate="fade-up" data-delay="2" className="card p-6 dark:bg-surface-900 dark:border-surface-800">
            <h3 className="text-sm font-bold text-surface-900 dark:text-surface-100 mb-4 uppercase tracking-wider">Resources</h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors border border-transparent hover:border-surface-200 dark:hover:border-surface-700">
                <BookOpen className="w-5 h-5 text-brand-500" />
                <div>
                  <p className="text-sm font-bold text-surface-900 dark:text-surface-100">BNSK459 Syllabus</p>
                  <p className="text-xs text-surface-400">PDF Guide & Rules</p>
                </div>
              </a>
              <a href="#" className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors border border-transparent hover:border-surface-200 dark:hover:border-surface-700">
                <FileText className="w-5 h-5 text-cyan-500" />
                <div>
                  <p className="text-sm font-bold text-surface-900 dark:text-surface-100">Activity Formats</p>
                  <p className="text-xs text-surface-400">Required photo templates</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Right Main Content */}
        <div data-animate="fade-up" data-delay="3" className="lg:col-span-8">
          <div className="bg-white dark:bg-surface-900 rounded-3xl border border-surface-200 dark:border-surface-800 p-6 sm:p-10 shadow-sm min-h-full">
            <MainContent />
          </div>
        </div>

      </div>
    </div>
  );
}
