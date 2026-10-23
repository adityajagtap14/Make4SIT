import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot, query, where, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { CheckCircle, Clock, FileText, TrendingUp, ChevronDown, ChevronUp, Image as ImageIcon, XCircle, AlertTriangle, Search, Filter, Activity, FileSpreadsheet } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function FacultyDashboard() {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generatingPdfId, setGeneratingPdfId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  useScrollAnimation();

  useEffect(() => {
    if (!user || user.role !== 'faculty') return;
    const q = query(collection(db, 'reports'), where('facultyId', '==', user.id));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      data.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
      setReports(data); setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  const handleApprove = async (reportId) => {
    try {
      await updateDoc(doc(db, 'reports', reportId), { status: 'approved', approvedAt: new Date().toISOString() });
    } catch (err) { console.error("Failed to approve", err); alert("Failed to approve report."); }
  };

  const handleReject = async (reportId) => {
    if (!window.confirm("Are you sure you want to reject this report and request changes?")) return;
    try {
      await updateDoc(doc(db, 'reports', reportId), { status: 'rejected', rejectedAt: new Date().toISOString() });
    } catch (err) { console.error("Failed to reject", err); alert("Failed to reject report."); }
  };

  const handleDownloadPdf = async (report) => {
    setGeneratingPdfId(report.id);
    try {
      const payload = { ...report, isApproved: report.status === 'approved' };
      const response = await axios.post(`${BACKEND_URL}/api/generate-pdf`, payload, { responseType: 'blob' });
      const blobUrl = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a'); link.href = blobUrl;
      link.download = `Report_${report.usn}.pdf`; link.click();
      URL.revokeObjectURL(blobUrl);
    } catch (err) { alert('Failed to download PDF.'); }
    setGeneratingPdfId(null);
  };

  const pending = reports.filter(r => r.status === 'pending').length;
  const approved = reports.filter(r => r.status === 'approved').length;
  const rejected = reports.filter(r => r.status === 'rejected').length;

  const filteredReports = reports.filter(r => {
    const matchesSearch = r.studentName.toLowerCase().includes(search.toLowerCase()) || r.usn.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || r.status === filter;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-3 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-surface-400 font-medium">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div data-animate="fade-up" className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-surface-900 dark:text-surface-100 tracking-tight">Faculty Dashboard</h2>
          <p className="text-surface-500 mt-1">Review and approve student reports assigned to you.</p>
        </div>
        <div className="badge bg-brand-50 text-brand-700 border border-brand-200 py-2 px-4 text-sm dark:bg-brand-900/30 dark:border-brand-800 dark:text-brand-300">
          Welcome, {user.name}
        </div>
      </div>

      {/* Stats Grid */}
      <div data-animate="fade-up" data-delay="1" className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: reports.length, icon: FileText, color: 'brand' },
          { label: 'Pending', value: pending, icon: Clock, color: 'amber' },
          { label: 'Approved', value: approved, icon: TrendingUp, color: 'emerald' },
          { label: 'Rejected', value: rejected, icon: AlertTriangle, color: 'red' },
        ].map(stat => (
          <div key={stat.label} className="card p-5 group hover:shadow-card-hover transition-all duration-500 dark:bg-surface-900 dark:border-surface-800">
            <div className="flex items-center justify-between mb-3">
              <stat.icon className={`w-5 h-5 text-${stat.color}-500 dark:text-${stat.color}-400`} />
              <span className={`text-xs font-bold text-${stat.color}-600 dark:text-${stat.color}-400 tracking-wide uppercase`}>{stat.label}</span>
            </div>
            <p className="text-3xl font-extrabold text-surface-900 dark:text-surface-100">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-6">
          {/* Filters & Search */}
          <div data-animate="fade-up" data-delay="2" className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex bg-surface-100 dark:bg-surface-800 p-1 rounded-xl w-full sm:w-auto overflow-x-auto shrink-0">
              {['all', 'pending', 'approved', 'rejected'].map(tab => (
                <button key={tab} onClick={() => setFilter(tab)}
                  className={`px-4 py-2 text-sm font-bold rounded-lg capitalize transition-all whitespace-nowrap ${filter === tab ? 'bg-white dark:bg-surface-900 text-brand-600 dark:text-brand-400 shadow-sm' : 'text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'}`}>
                  {tab}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
              <input type="text" placeholder="Search by name or USN..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-brand-500 text-sm outline-none transition-all dark:text-white" />
            </div>
          </div>

          {/* Reports List */}
          <div data-animate="fade-up" data-delay="3" className="card overflow-hidden dark:bg-surface-900 dark:border-surface-800">
            <div className="px-6 py-4 border-b border-surface-100 dark:border-surface-800 flex justify-between items-center">
              <h3 className="font-bold text-surface-900 dark:text-surface-100">Student Reports</h3>
              <span className="text-xs font-bold text-surface-400">{filteredReports.length} results</span>
            </div>

            {filteredReports.length === 0 ? (
              <div className="p-16 text-center">
                <FileText className="w-12 h-12 text-surface-200 dark:text-surface-700 mx-auto mb-4" />
                <p className="text-surface-400 font-medium">No reports found matching your criteria.</p>
              </div>
            ) : (
              <div className="divide-y divide-surface-100 dark:divide-surface-800">
                {filteredReports.map((report, i) => {
              const isExpanded = expandedId === report.id;
              return (
                <div key={report.id} data-animate="fade-up" data-delay={Math.min(i + 1, 6)} 
                  className="flex flex-col border-b border-surface-100 dark:border-surface-800 last:border-0 hover:bg-surface-50/50 dark:hover:bg-surface-800/30 transition-colors">
                  <div 
                    className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : report.id)}
                  >
                    <div className="flex-1 min-w-0 flex items-start gap-4">
                      <div className="mt-1 text-surface-400 dark:text-surface-500">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                          <h4 className="font-bold text-surface-900 dark:text-surface-100">{report.studentName}</h4>
                          <span className="text-xs text-surface-400 font-mono bg-surface-100 dark:bg-surface-800 px-2 py-0.5 rounded">{report.usn}</span>
                          {report.status === 'approved' ? (
                            <span className="badge bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"><CheckCircle className="w-3 h-3" /> Approved</span>
                          ) : report.status === 'rejected' ? (
                            <span className="badge bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800"><AlertTriangle className="w-3 h-3" /> Rejected</span>
                          ) : (
                            <span className="badge bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800"><Clock className="w-3 h-3" /> Pending</span>
                          )}
                        </div>
                        <p className="text-sm text-surface-400">Sem {report.semester} · {report.academicYear} · {report.department}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 flex-shrink-0 ml-9 md:ml-0" onClick={e => e.stopPropagation()}>
                      {report.status !== 'approved' && (
                        <>
                          <button onClick={() => handleApprove(report.id)}
                            className="btn-primary py-2 px-4 text-xs shadow-sm"
                            style={{ background: 'linear-gradient(135deg, #059669, #047857)' }}>
                            <CheckCircle className="w-3.5 h-3.5 mr-1" /> Approve
                          </button>
                          {report.status !== 'rejected' && (
                            <button onClick={() => handleReject(report.id)}
                              className="btn-secondary py-2 px-4 text-xs text-red-600 hover:text-red-700 hover:border-red-200 shadow-sm dark:text-red-400 dark:hover:text-red-300 dark:hover:border-red-800">
                              <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                            </button>
                          )}
                        </>
                      )}
                      <button onClick={() => handleDownloadPdf(report)} disabled={generatingPdfId === report.id}
                        className="btn-secondary py-2 px-4 text-xs shadow-sm">
                        {generatingPdfId === report.id ? 'Generating...' : 'PDF'}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Content: Photos */}
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 ml-9 animate-fade-in">
                      <div className="bg-surface-50 dark:bg-surface-950 rounded-xl p-5 border border-surface-200 dark:border-surface-800">
                        <h5 className="text-sm font-bold text-surface-900 dark:text-surface-100 mb-4 flex items-center gap-2">
                          <ImageIcon className="w-4 h-4 text-surface-400" /> Submitted Evidence
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                          {[
                            { title: 'Activity 1', photos: report.activity1Photos },
                            { title: 'Activity 2', photos: report.activity2Photos },
                            { title: 'Activity 3', photos: report.activity3Photos }
                          ].map((act, idx) => (
                            <div key={idx}>
                              <p className="text-xs font-bold text-surface-500 uppercase tracking-wider mb-2">{act.title}</p>
                              {act.photos && act.photos.length > 0 ? (
                                <div className="flex gap-2 overflow-x-auto pb-2">
                                  {act.photos.map((url, imgIdx) => (
                                    <a key={imgIdx} href={url} target="_blank" rel="noreferrer" className="block relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-surface-200 dark:border-surface-700 hover:ring-2 hover:ring-brand-500 transition-all">
                                      <img src={url} alt={`${act.title} - ${imgIdx+1}`} className="w-full h-full object-cover" />
                                    </a>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-xs text-surface-400 italic">No photos uploaded.</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div data-animate="fade-up" data-delay="4" className="card p-6 dark:bg-surface-900 dark:border-surface-800">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                <Activity className="w-5 h-5 text-brand-600 dark:text-brand-400" />
              </div>
              <div>
                <h3 className="font-bold text-surface-900 dark:text-surface-100">System Status</h3>
                <p className="text-xs text-surface-400">All services operational</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-surface-600 dark:text-surface-300">PDF Generator</span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-md"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/> Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-surface-600 dark:text-surface-300">Database Sync</span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-md"><CheckCircle className="w-3 h-3" /> Realtime</span>
              </div>
            </div>
          </div>

          <div data-animate="fade-up" data-delay="5" className="card p-6 dark:bg-surface-900 dark:border-surface-800">
            <h3 className="font-bold text-surface-900 dark:text-surface-100 mb-4 uppercase text-xs tracking-wider">Quick Actions</h3>
            <div className="space-y-2">
              <Link to="/documents" className="w-full text-left px-4 py-3 rounded-xl bg-brand-50/70 hover:bg-brand-100/70 dark:bg-brand-950/40 dark:hover:bg-brand-900/40 text-sm font-semibold text-brand-700 dark:text-brand-300 transition-colors flex items-center justify-between group border border-brand-200 dark:border-brand-800/60 shadow-xs">
                <span className="flex items-center gap-2.5">
                  <FileSpreadsheet className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                  Word Processor Studio
                </span>
                <ChevronUp className="w-4 h-4 text-brand-400 group-hover:text-brand-600 rotate-90" />
              </Link>
              <button onClick={() => setFilter('pending')} className="w-full text-left px-4 py-3 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-800 text-sm font-medium text-surface-700 dark:text-surface-200 transition-colors flex items-center justify-between group">
                Review Pending Reports
                <ChevronUp className="w-4 h-4 text-surface-300 group-hover:text-brand-500 rotate-90" />
              </button>
              <button onClick={() => setFilter('all')} className="w-full text-left px-4 py-3 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-800 text-sm font-medium text-surface-700 dark:text-surface-200 transition-colors flex items-center justify-between group">
                View All Student Submissions
                <ChevronUp className="w-4 h-4 text-surface-300 group-hover:text-brand-500 rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
