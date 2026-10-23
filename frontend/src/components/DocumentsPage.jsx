import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDocs,
  deleteDoc,
  query,
  where,
  serverTimestamp
} from 'firebase/firestore';
import axios from 'axios';
import {
  FileText,
  Save,
  Download,
  Printer,
  Plus,
  FolderOpen,
  CheckCircle,
  Clock,
  Sparkles,
  Layout,
  Edit3,
  Eye,
  Trash2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  FileSpreadsheet,
  Megaphone,
  Calendar,
  Share2,
  HelpCircle,
  X
} from 'lucide-react';

import CircularTemplate from './documents/CircularTemplate';
import MomTemplate from './documents/MomTemplate';
import ActionPlanTemplate from './documents/ActionPlanTemplate';
import EventReportTemplate from './documents/EventReportTemplate';
import NewsletterTemplate from './documents/NewsletterTemplate';
import DocumentEditor from './DocumentEditor';
import { TEMPLATE_TYPES, DEFAULT_TEMPLATES } from './DocumentTemplates';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function DocumentsPage() {
  const { user } = useAuth();
  const { isDark } = useTheme();

  // Active document state
  const [currentDocId, setCurrentDocId] = useState(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState('circular');
  const [docTitle, setDocTitle] = useState(DEFAULT_TEMPLATES.circular.title);
  const [docData, setDocData] = useState(() => JSON.parse(JSON.stringify(DEFAULT_TEMPLATES.circular)));
  const [blankContent, setBlankContent] = useState('<p>Start typing your document...</p>');

  // UI state
  const [editorMode, setEditorMode] = useState('template'); // 'template' | 'freeform'
  const [isInlineEditing, setIsInlineEditing] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showSavedModal, setShowSavedModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [savedDocs, setSavedDocs] = useState([]);
  const [loadingSaved, setLoadingSaved] = useState(false);
  const [saveStatus, setSaveStatus] = useState('idle'); // 'idle' | 'saving' | 'saved' | 'error'
  const [exportingPdf, setExportingPdf] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasUnsaved, setHasUnsaved] = useState(false);

  const docContainerRef = useRef(null);
  const saveStatusRef = useRef('idle');

  // Load saved documents for user
  const fetchSavedDocs = async () => {
    setLoadingSaved(true);
    try {
      let qDocs;
      if (user?.id) {
        qDocs = query(collection(db, 'documents'), where('authorId', '==', user.id));
      } else {
        qDocs = collection(db, 'documents');
      }
      const snap = await getDocs(qDocs);
      const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      docs.sort((a, b) => (b.updatedAt?.toMillis?.() || 0) - (a.updatedAt?.toMillis?.() || 0));
      setSavedDocs(docs);
    } catch (err) {
      console.error('Failed to fetch saved documents:', err);
    } finally {
      setLoadingSaved(false);
    }
  };

  useEffect(() => {
    fetchSavedDocs();
  }, [user]);

  // Mark unsaved whenever doc data changes
  useEffect(() => {
    setHasUnsaved(true);
  }, [docData, blankContent, docTitle]);

  // Ctrl+S keyboard shortcut
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [docTitle, docData, blankContent, selectedTemplateId, editorMode, currentDocId]);

  // Handle template selection
  const handleSelectTemplate = (templateId) => {
    setSelectedTemplateId(templateId);
    setCurrentDocId(null);
    if (templateId === 'blank') {
      setDocTitle('Untitled Blank Document');
      setBlankContent('<h2>Document Title</h2><p>Start writing your custom document here...</p>');
      setEditorMode('freeform');
    } else {
      const templateDefaults = JSON.parse(JSON.stringify(DEFAULT_TEMPLATES[templateId] || {}));
      setDocData(templateDefaults);
      setDocTitle(templateDefaults.title || `${templateId.toUpperCase()} Document`);
      setEditorMode('template');
    }
    setShowTemplateModal(false);
  };

  // Save document to Firestore
  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      const payload = {
        title: docTitle,
        templateType: selectedTemplateId,
        editorMode,
        data: selectedTemplateId === 'blank' ? null : docData,
        blankContent: selectedTemplateId === 'blank' ? blankContent : null,
        authorId: user?.id || 'guest',
        authorName: user?.name || 'Anonymous User',
        role: user?.role || 'guest',
        updatedAt: serverTimestamp(),
      };

      if (currentDocId) {
        await updateDoc(doc(db, 'documents', currentDocId), payload);
      } else {
        payload.createdAt = serverTimestamp();
        const docRef = await addDoc(collection(db, 'documents'), payload);
        setCurrentDocId(docRef.id);
      }
      setSaveStatus('saved');
      setHasUnsaved(false);
      setTimeout(() => setSaveStatus('idle'), 3000);
      fetchSavedDocs();
    } catch (err) {
      console.error('Failed to save document:', err);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 4000);
    }
  };

  // Load a saved document
  const handleLoadDoc = (savedDoc) => {
    setCurrentDocId(savedDoc.id);
    setSelectedTemplateId(savedDoc.templateType || 'circular');
    setDocTitle(savedDoc.title || 'Untitled Document');
    setEditorMode(savedDoc.editorMode || 'template');
    if (savedDoc.templateType === 'blank') {
      setBlankContent(savedDoc.blankContent || '');
    } else {
      setDocData(savedDoc.data || DEFAULT_TEMPLATES[savedDoc.templateType] || {});
    }
    setShowSavedModal(false);
  };

  // Delete a saved document
  const handleDeleteDoc = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this saved document?')) return;
    try {
      await deleteDoc(doc(db, 'documents', id));
      setSavedDocs(savedDocs.filter(d => d.id !== id));
      if (currentDocId === id) {
        setCurrentDocId(null);
      }
    } catch (err) {
      console.error('Failed to delete doc:', err);
      alert('Failed to delete document.');
    }
  };

  // Instant print (Browser print engine formatted for A4)
  const handlePrint = () => {
    window.print();
  };

  // Export to high-quality PDF via backend Puppeteer
  const handleExportPDF = async () => {
    setExportingPdf(true);
    try {
      const docElement = docContainerRef.current?.querySelector('.sit-document') || docContainerRef.current;
      const htmlContent = docElement?.outerHTML || '';

      const response = await axios.post(
        `${BACKEND_URL}/api/generate-doc-pdf`,
        { html: htmlContent, title: docTitle },
        { responseType: 'blob' }
      );

      const blobUrl = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = blobUrl;
      const filename = `${docTitle.replace(/[^a-zA-Z0-9_-]/g, '_')}.pdf`;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Export PDF error:', err);
      alert('Backend PDF generation failed. Using standard browser print instead.');
      window.print();
    } finally {
      setExportingPdf(false);
    }
  };

  // Filter templates strictly for faculty
  const visibleTemplates = TEMPLATE_TYPES.filter(t => {
    return user?.role === 'faculty' && t.roles.includes('faculty');
  });

  if (!user || user.role !== 'faculty') {
    return (
      <div className="min-h-[55vh] flex flex-col items-center justify-center text-center p-8">
        <div className="w-16 h-16 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-4">
          <FileSpreadsheet className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-surface-900 dark:text-surface-100 mb-2">Faculty Access Only</h2>
        <p className="text-surface-500 dark:text-surface-400 max-w-md mb-6 text-sm">
          The Word Processor Studio is reserved exclusively for faculty members. Please sign in with an authorized faculty account to access institutional document templates.
        </p>
        <Link to="/login" className="btn-primary py-2.5 px-6 rounded-xl text-sm font-bold">
          Faculty Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full pb-16">
      {/* ── Studio Top Action Bar ── */}
      <div className="bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-2xl p-4 shadow-sm mb-6 print:hidden">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Document Title & Template Badge */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="text-base sm:text-lg font-extrabold text-surface-900 dark:text-surface-100 bg-transparent border-b border-transparent hover:border-surface-300 dark:hover:border-surface-700 focus:border-brand-500 outline-none w-full truncate"
                  placeholder="Document Title"
                />
              </div>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-surface-400">
                <span className="capitalize font-semibold text-brand-600 dark:text-brand-400">
                  {TEMPLATE_TYPES.find(t => t.id === selectedTemplateId)?.name || 'Custom'}
                </span>
                <span>•</span>
                {saveStatus === 'saving' && <span className="text-amber-500 flex items-center gap-1"><Clock className="w-3 h-3 animate-spin" /> Saving...</span>}
                {saveStatus === 'saved' && <span className="text-emerald-500 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Saved to cloud</span>}
                {saveStatus === 'error' && <span className="text-red-500">Failed to save</span>}
                {saveStatus === 'idle' && (
                  <span>{currentDocId ? 'Cloud Document' : 'Draft (Unsaved)'}</span>
                )}
              </div>
            </div>
          </div>

          {/* Center: Mode & Inline Toggle */}
          <div className="flex items-center gap-2 bg-surface-100 dark:bg-surface-800 p-1 rounded-xl self-start lg:self-center">
            {selectedTemplateId !== 'blank' && (
              <button
                type="button"
                onClick={() => setEditorMode('template')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  editorMode === 'template'
                    ? 'bg-white dark:bg-surface-900 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-surface-500 hover:text-surface-900 dark:hover:text-surface-100'
                }`}
              >
                <Layout className="w-3.5 h-3.5" /> Template Layout
              </button>
            )}

            <button
              type="button"
              onClick={() => setEditorMode('freeform')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                editorMode === 'freeform'
                  ? 'bg-white dark:bg-surface-900 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-surface-500 hover:text-surface-900 dark:hover:text-surface-100'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" /> Word Processor
            </button>

            {editorMode === 'template' && (
              <button
                type="button"
                onClick={() => setIsInlineEditing(!isInlineEditing)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isInlineEditing
                    ? 'text-amber-700 bg-amber-50 dark:bg-amber-900/30 dark:text-amber-300'
                    : 'text-surface-500 hover:text-surface-900'
                }`}
                title="Toggle inline field highlights"
              >
                {isInlineEditing ? <Edit3 className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {isInlineEditing ? 'Edit Mode' : 'Clean Preview'}
              </button>
            )}
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Template Selector Button */}
            <button
              type="button"
              onClick={() => setShowTemplateModal(true)}
              className="btn-secondary py-2 px-3 text-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-500" /> Templates
            </button>

            {/* My Docs */}
            <button
              type="button"
              onClick={() => { setShowSavedModal(true); fetchSavedDocs(); }}
              className="btn-secondary py-2 px-3 text-xs"
            >
              <FolderOpen className="w-3.5 h-3.5" /> My Docs
              {savedDocs.length > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-surface-200 dark:bg-surface-700 rounded-full text-[10px] font-bold">
                  {savedDocs.length}
                </span>
              )}
            </button>

            {/* Save Button */}
            <button
              type="button"
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              className="btn-secondary py-2 px-3.5 text-xs text-brand-600 dark:text-brand-400 hover:border-brand-300"
            >
              <Save className="w-3.5 h-3.5" /> Save
            </button>

            {/* Quick Print */}
            <button
              type="button"
              onClick={handlePrint}
              className="btn-secondary py-2 px-3 text-xs"
              title="Print directly or save as PDF via browser print"
            >
              <Printer className="w-3.5 h-3.5" /> Print
            </button>

            {/* Export PDF (Puppeteer) */}
            <button
              type="button"
              onClick={handleExportPDF}
              disabled={exportingPdf}
              className="btn-primary py-2 px-4 text-xs"
              title="Download high-resolution official PDF rendered by backend"
            >
              <Download className="w-3.5 h-3.5" />
              {exportingPdf ? 'Exporting...' : 'Export PDF'}
            </button>
          </div>
        </div>
      </div>

      {/* ── Unsaved indicator banner ── */}
      {hasUnsaved && saveStatus === 'idle' && (
        <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 rounded-xl px-3 py-1.5 mb-2 print:hidden">
          <Clock className="w-3.5 h-3.5" />
          <span>Unsaved changes — press <kbd className="font-mono bg-white dark:bg-surface-800 border border-amber-200 dark:border-amber-700 rounded px-1">Ctrl+S</kbd> to save</span>
        </div>
      )}

      {/* ── Zoom & Canvas Bar ── */}
      <div className="flex justify-between items-center px-2 mb-3 text-xs text-surface-400 print:hidden">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-surface-600 dark:text-surface-300">A4 Standard Format</span>
          <span>(210mm × 297mm • 1-inch margins • Times New Roman 12pt)</span>
        </div>
        <div className="flex items-center gap-1 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-lg p-1 shadow-xs">
          <button
            type="button"
            onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}
            className="p-1 hover:bg-surface-100 dark:hover:bg-surface-800 rounded text-surface-600 dark:text-surface-300"
            title="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="px-2 font-mono font-bold text-surface-700 dark:text-surface-200">
            {zoomLevel}%
          </span>
          <button
            type="button"
            onClick={() => setZoomLevel(Math.min(150, zoomLevel + 10))}
            className="p-1 hover:bg-surface-100 dark:hover:bg-surface-800 rounded text-surface-600 dark:text-surface-300"
            title="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel(100)}
            className="px-2 py-0.5 text-[10px] font-bold text-brand-600 hover:bg-brand-50 rounded dark:text-brand-400"
          >
            Reset
          </button>
        </div>
      </div>

      {/* ── Main Canvas Viewport ── */}
      {/* Outer overflow container — scrollbar appears at the right time */}
      <div className="overflow-auto pb-12 bg-surface-100/60 dark:bg-surface-950 p-2 sm:p-6 rounded-3xl border border-surface-200 dark:border-surface-800/80 min-h-[700px] print:bg-transparent print:p-0 print:border-none">
        {/* Sizing shell — its dimensions match the SCALED document so layout doesn't collapse */}
        <div
          style={{
            width: `${794 * (zoomLevel / 100)}px`,
            minHeight: `${1123 * (zoomLevel / 100)}px`,
            margin: '0 auto',
            position: 'relative',
          }}
        >
          {/* The actual A4 document div, transform-scaled from top-left */}
          <div
            ref={docContainerRef}
            style={{
              transformOrigin: 'top left',
              transform: `scale(${zoomLevel / 100})`,
              width: '794px',
              minHeight: '1123px',
              position: 'absolute',
              top: 0,
              left: 0,
              transition: 'transform 0.15s ease',
            }}
          >
            {editorMode === 'freeform' || selectedTemplateId === 'blank' ? (
              <div className="w-full">
                <DocumentEditor
                  value={blankContent}
                  onChange={setBlankContent}
                  placeholder="Type your document content here..."
                />
              </div>
            ) : (
              <div>
                {selectedTemplateId === 'circular' && (
                  <CircularTemplate
                    data={docData}
                    onChange={setDocData}
                    isEditing={isInlineEditing}
                  />
                )}

                {selectedTemplateId === 'mom' && (
                  <MomTemplate
                    data={docData}
                    onChange={setDocData}
                    isEditing={isInlineEditing}
                  />
                )}

                {selectedTemplateId === 'action_plan' && (
                  <ActionPlanTemplate
                    data={docData}
                    onChange={setDocData}
                    isEditing={isInlineEditing}
                  />
                )}

                {selectedTemplateId === 'event_report' && (
                  <EventReportTemplate
                    data={docData}
                    onChange={setDocData}
                    isEditing={isInlineEditing}
                  />
                )}

                {selectedTemplateId === 'newsletter' && (
                  <NewsletterTemplate
                    data={docData}
                    onChange={setDocData}
                    isEditing={isInlineEditing}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>


      {/* ── Templates Modal ── */}
      {showTemplateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in print:hidden">
          <div className="bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-3xl max-w-4xl w-full p-6 shadow-2xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center pb-4 border-b border-surface-100 dark:border-surface-800">
              <div>
                <h3 className="text-xl font-black text-surface-900 dark:text-surface-100">
                  Select Document Template
                </h3>
                <p className="text-xs text-surface-400 mt-0.5">
                  Pre-configured with official letterhead, authentic typography, and strict academic formatting.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowTemplateModal(false)}
                className="p-2 text-surface-400 hover:text-surface-900 dark:hover:text-surface-100 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2 overflow-y-auto my-4 flex-1">
              {visibleTemplates.map((template) => {
                const isCurrent = template.id === selectedTemplateId;
                return (
                  <div
                    key={template.id}
                    onClick={() => handleSelectTemplate(template.id)}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between hover:scale-[1.02] ${
                      isCurrent
                        ? 'border-brand-500 bg-brand-50/30 dark:bg-brand-900/10 shadow-md'
                        : 'border-surface-200 dark:border-surface-800 bg-surface-50/50 dark:bg-surface-800/40 hover:border-surface-300 dark:hover:border-surface-700'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <span className="badge bg-surface-200/60 dark:bg-surface-700/60 text-surface-700 dark:text-surface-300 text-[10px]">
                          {template.category}
                        </span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider text-${template.color}-600 dark:text-${template.color}-400`}>
                          {template.badge}
                        </span>
                      </div>
                      <h4 className="font-bold text-base text-surface-900 dark:text-surface-100 mb-1">
                        {template.name}
                      </h4>
                      <p className="text-xs text-surface-500 dark:text-surface-400 leading-relaxed mb-4">
                        {template.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-surface-200 dark:border-surface-700/60 flex justify-between items-center text-xs">
                      <span className="text-surface-400">
                        {template.roles.join(', ')}
                      </span>
                      <button
                        type="button"
                        className={`font-bold px-3 py-1 rounded-lg ${
                          isCurrent
                            ? 'bg-brand-500 text-white'
                            : 'text-brand-600 dark:text-brand-400 hover:bg-brand-50'
                        }`}
                      >
                        {isCurrent ? 'Active' : 'Load Template'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Saved Documents Modal / Drawer ── */}
      {showSavedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in print:hidden">
          <div className="bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 rounded-3xl max-w-3xl w-full p-6 shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex justify-between items-center pb-4 border-b border-surface-100 dark:border-surface-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 flex items-center justify-center">
                  <FolderOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-surface-900 dark:text-surface-100">
                    Saved Documents
                  </h3>
                  <p className="text-xs text-surface-400">
                    Retrieve or continue editing previously created reports and circulars.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowSavedModal(false)}
                className="p-2 text-surface-400 hover:text-surface-900 dark:hover:text-surface-100 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-3">
              <input
                type="text"
                placeholder="Search documents by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800 text-xs text-surface-900 dark:text-surface-100 outline-none"
              />
            </div>

            <div className="overflow-y-auto flex-1 divide-y divide-surface-100 dark:divide-surface-800">
              {loadingSaved ? (
                <div className="py-12 text-center text-surface-400 text-xs">
                  Loading saved documents...
                </div>
              ) : savedDocs.filter(d => d.title?.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 ? (
                <div className="py-16 text-center">
                  <FileText className="w-12 h-12 text-surface-300 dark:text-surface-600 mx-auto mb-3" />
                  <p className="text-surface-500 font-medium text-sm">No saved documents found</p>
                  <p className="text-xs text-surface-400 mt-1">
                    Click the "Save" button in the top bar to save your current document.
                  </p>
                </div>
              ) : (
                savedDocs
                  .filter(d => d.title?.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((docItem) => (
                    <div
                      key={docItem.id}
                      onClick={() => handleLoadDoc(docItem)}
                      className="py-3 px-4 flex items-center justify-between hover:bg-surface-50 dark:hover:bg-surface-800/40 rounded-xl cursor-pointer group transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <FileText className="w-4 h-4 text-brand-500 shrink-0" />
                        <div className="min-w-0">
                          <p className="font-bold text-sm text-surface-900 dark:text-surface-100 truncate">
                            {docItem.title || 'Untitled Document'}
                          </p>
                          <p className="text-[11px] text-surface-400 capitalize">
                            {docItem.templateType} • by {docItem.authorName} ({docItem.role})
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => handleDeleteDoc(docItem.id, e)}
                          className="p-1.5 text-surface-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Delete Document"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <span className="text-xs text-brand-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                          Open →
                        </span>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
