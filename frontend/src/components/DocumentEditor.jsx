import { useRef, useEffect, useCallback, useState } from 'react';
import {
  Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter,
  AlignRight, AlignJustify, List, ListOrdered, Indent, Outdent,
  Undo, Redo, Link, Minus, Type
} from 'lucide-react';

const FONTS = [
  'Times New Roman', 'Arial', 'Calibri', 'Georgia', 'Verdana',
  'Helvetica', 'Courier New', 'Garamond', 'Palatino'
];

const FONT_SIZES = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '28', '32', '36', '48', '72'];

function ToolbarButton({ onClick, active, title, children }) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      className={`
        w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-all duration-150
        ${active
          ? 'bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300'
          : 'text-surface-600 dark:text-surface-400 hover:bg-surface-100 dark:hover:bg-surface-700 hover:text-surface-900 dark:hover:text-surface-100'
        }
      `}
    >
      {children}
    </button>
  );
}

function ToolbarSep() {
  return <div className="w-px h-5 bg-surface-200 dark:bg-surface-700 mx-1 shrink-0" />;
}

export default function DocumentEditor({ value, onChange, placeholder = 'Start typing your document...' }) {
  const editorRef = useRef(null);
  const [activeFormats, setActiveFormats] = useState({});
  const [selectedFont, setSelectedFont] = useState('Times New Roman');
  const [selectedSize, setSelectedSize] = useState('12');
  const isInternalChange = useRef(false);

  useEffect(() => {
    if (!editorRef.current) return;
    if (isInternalChange.current) { isInternalChange.current = false; return; }
    if (editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const exec = useCallback((command, val = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, val);
    handleInput();
  }, []);

  const handleInput = useCallback(() => {
    isInternalChange.current = true;
    onChange?.(editorRef.current?.innerHTML || '');
    updateActiveFormats();
  }, [onChange]);

  const updateActiveFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strikeThrough: document.queryCommandState('strikeThrough'),
      justifyLeft: document.queryCommandState('justifyLeft'),
      justifyCenter: document.queryCommandState('justifyCenter'),
      justifyRight: document.queryCommandState('justifyRight'),
      justifyFull: document.queryCommandState('justifyFull'),
      insertUnorderedList: document.queryCommandState('insertUnorderedList'),
      insertOrderedList: document.queryCommandState('insertOrderedList'),
    });
    try {
      const font = document.queryCommandValue('fontName');
      if (font) setSelectedFont(font.replace(/["']/g, ''));
    } catch (_) {}
  };

  const handleFontChange = (font) => {
    setSelectedFont(font);
    exec('fontName', font);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    editorRef.current?.focus();
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
      document.execCommand('fontSize', false, '7');
      const fontEls = editorRef.current.querySelectorAll('font[size="7"]');
      fontEls.forEach(el => {
        el.removeAttribute('size');
        el.style.fontSize = `${size}pt`;
      });
    }
    handleInput();
  };

  const handleColorChange = (e) => {
    exec('foreColor', e.target.value);
  };

  const insertLink = () => {
    const url = prompt('Enter URL:', 'https://');
    if (url) exec('createLink', url);
  };

  const insertHRule = () => {
    exec('insertHTML', '<hr style="border:none;border-top:1px solid #ccc;margin:1em 0;" />');
  };

  return (
    <div className="flex flex-col border border-surface-200 dark:border-surface-700 rounded-2xl overflow-hidden bg-white dark:bg-surface-900">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-800/60">
        <select
          value={selectedFont}
          onChange={e => handleFontChange(e.target.value)}
          onMouseDown={e => e.stopPropagation()}
          className="h-8 px-2 text-xs rounded-lg border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-800 dark:text-surface-200 focus:outline-none focus:ring-2 focus:ring-brand-500/30 mr-1"
          style={{ maxWidth: '130px' }}
        >
          {FONTS.map(f => <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>)}
        </select>

        <select
          value={selectedSize}
          onChange={e => handleSizeChange(e.target.value)}
          onMouseDown={e => e.stopPropagation()}
          className="h-8 px-2 text-xs rounded-lg border border-surface-200 dark:border-surface-600 bg-white dark:bg-surface-700 text-surface-800 dark:text-surface-200 focus:outline-none focus:ring-2 focus:ring-brand-500/30 mr-1"
          style={{ width: '65px' }}
        >
          {FONT_SIZES.map(s => <option key={s} value={s}>{s}pt</option>)}
        </select>

        <ToolbarSep />
        <ToolbarButton onClick={() => exec('bold')} active={activeFormats.bold} title="Bold"><Bold className="w-3.5 h-3.5 stroke-[2.5]" /></ToolbarButton>
        <ToolbarButton onClick={() => exec('italic')} active={activeFormats.italic} title="Italic"><Italic className="w-3.5 h-3.5 stroke-[2.5]" /></ToolbarButton>
        <ToolbarButton onClick={() => exec('underline')} active={activeFormats.underline} title="Underline"><Underline className="w-3.5 h-3.5 stroke-[2.5]" /></ToolbarButton>
        <ToolbarButton onClick={() => exec('strikeThrough')} active={activeFormats.strikeThrough} title="Strikethrough"><Strikethrough className="w-3.5 h-3.5" /></ToolbarButton>

        <ToolbarSep />
        <div className="relative flex items-center" title="Text Color">
          <input type="color" defaultValue="#000000" onInput={handleColorChange}
            className="w-8 h-8 rounded cursor-pointer opacity-0 absolute inset-0 z-10" />
          <div className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700">
            <Type className="w-3.5 h-3.5 text-surface-500 dark:text-surface-400" />
          </div>
        </div>

        <ToolbarSep />
        <ToolbarButton onClick={() => exec('justifyLeft')} active={activeFormats.justifyLeft} title="Align Left"><AlignLeft className="w-3.5 h-3.5" /></ToolbarButton>
        <ToolbarButton onClick={() => exec('justifyCenter')} active={activeFormats.justifyCenter} title="Center"><AlignCenter className="w-3.5 h-3.5" /></ToolbarButton>
        <ToolbarButton onClick={() => exec('justifyRight')} active={activeFormats.justifyRight} title="Align Right"><AlignRight className="w-3.5 h-3.5" /></ToolbarButton>
        <ToolbarButton onClick={() => exec('justifyFull')} active={activeFormats.justifyFull} title="Justify"><AlignJustify className="w-3.5 h-3.5" /></ToolbarButton>

        <ToolbarSep />
        <ToolbarButton onClick={() => exec('insertUnorderedList')} active={activeFormats.insertUnorderedList} title="Bullet List"><List className="w-3.5 h-3.5" /></ToolbarButton>
        <ToolbarButton onClick={() => exec('insertOrderedList')} active={activeFormats.insertOrderedList} title="Numbered List"><ListOrdered className="w-3.5 h-3.5" /></ToolbarButton>
        <ToolbarButton onClick={() => exec('indent')} title="Indent"><Indent className="w-3.5 h-3.5" /></ToolbarButton>
        <ToolbarButton onClick={() => exec('outdent')} title="Outdent"><Outdent className="w-3.5 h-3.5" /></ToolbarButton>

        <ToolbarSep />
        <ToolbarButton onClick={insertLink} title="Insert Link"><Link className="w-3.5 h-3.5" /></ToolbarButton>
        <ToolbarButton onClick={insertHRule} title="Horizontal Rule"><Minus className="w-3.5 h-3.5" /></ToolbarButton>

        <ToolbarSep />
        <ToolbarButton onClick={() => exec('undo')} title="Undo"><Undo className="w-3.5 h-3.5" /></ToolbarButton>
        <ToolbarButton onClick={() => exec('redo')} title="Redo"><Redo className="w-3.5 h-3.5" /></ToolbarButton>
      </div>

      {/* A4 Canvas */}
      <div className="flex-1 overflow-y-auto bg-surface-100 dark:bg-surface-950 p-4">
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onKeyUp={updateActiveFormats}
          onMouseUp={updateActiveFormats}
          onSelect={updateActiveFormats}
          className="doc-editor-area outline-none mx-auto bg-white dark:bg-[#1a1a1a] shadow-lg"
          style={{
            width: '210mm',
            maxWidth: '100%',
            minHeight: '297mm',
            padding: '25.4mm 25.4mm 25.4mm 31.75mm',
            fontSize: '12pt',
            fontFamily: 'Times New Roman, Times, serif',
            lineHeight: '1.6',
            color: '#000',
          }}
        />
      </div>
    </div>
  );
}
