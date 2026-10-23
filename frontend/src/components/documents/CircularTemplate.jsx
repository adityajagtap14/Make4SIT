import React from 'react';
import { SITCircularHeader } from '../DocumentLogos';

export default function CircularTemplate({ data, onChange, isEditing = true }) {
  const updateField = (field, val) => {
    onChange({ ...data, [field]: val });
  };

  const updateDetailsLabel = (val) => {
    onChange({ ...data, detailsLabel: val });
  };

  const updateDetail = (idx, field, val) => {
    const nextDetails = [...(data.details || [])];
    nextDetails[idx] = { ...nextDetails[idx], [field]: val };
    onChange({ ...data, details: nextDetails });
  };

  const addDetail = () => {
    const nextDetails = [...(data.details || []), { label: 'New Field', value: 'Details here' }];
    onChange({ ...data, details: nextDetails });
  };

  const removeDetail = (idx) => {
    const nextDetails = (data.details || []).filter((_, i) => i !== idx);
    onChange({ ...data, details: nextDetails });
  };

  const updateTo = (idx, val) => {
    const nextList = [...(data.toList || [])];
    nextList[idx] = val;
    onChange({ ...data, toList: nextList });
  };

  const addTo = () => {
    onChange({ ...data, toList: [...(data.toList || []), ''] });
  };

  const removeTo = (idx) => {
    onChange({ ...data, toList: (data.toList || []).filter((_, i) => i !== idx) });
  };

  const updateCopyTo = (idx, val) => {
    const nextList = [...(data.copyTo || [])];
    nextList[idx] = val;
    onChange({ ...data, copyTo: nextList });
  };

  const addCopyTo = () => {
    const nextList = [...(data.copyTo || []), ''];
    onChange({ ...data, copyTo: nextList });
  };

  const removeCopyTo = (idx) => {
    const nextList = (data.copyTo || []).filter((_, i) => i !== idx);
    onChange({ ...data, copyTo: nextList });
  };

  return (
    <div className="sit-document font-serif text-black leading-relaxed text-[12pt] bg-white shadow-lg print:shadow-none" style={{width:'794px', minHeight:'1123px', padding:'72px 72px 64px'}}>
      {/* Official Header */}
      <SITCircularHeader />

      {/* Title */}
      <div className="text-center my-5">
        <h2 className="text-[16pt] font-black tracking-wider uppercase underline underline-offset-4">
          CIRCULAR
        </h2>
      </div>

      {/* Academic Year and Date Bar */}
      <div className="flex justify-between items-center font-bold text-[11pt] mb-5">
        <div className="flex items-center gap-2">
          <span>Academic Year –</span>
          {isEditing ? (
            <input
              type="text"
              value={data.academicYear || ''}
              onChange={(e) => updateField('academicYear', e.target.value)}
              className="border-b border-surface-400 focus:border-brand-500 outline-none px-1 py-0.5 bg-yellow-50/50 print:bg-transparent print:border-none w-24"
              placeholder="2025-26"
            />
          ) : (
            <span>{data.academicYear}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span>Date:</span>
          {isEditing ? (
            <input
              type="text"
              value={data.date || ''}
              onChange={(e) => updateField('date', e.target.value)}
              className="border-b border-surface-400 focus:border-brand-500 outline-none px-1 py-0.5 bg-yellow-50/50 print:bg-transparent print:border-none text-right w-28"
              placeholder="17-12-2025"
            />
          ) : (
            <span>{data.date}</span>
          )}
        </div>
      </div>

      {/* To: Recipient line */}
      {((data.toList && data.toList.length > 0) || isEditing) && (
        <div className="mb-4 text-[12pt]">
          <p className="font-bold mb-1">To:</p>
          <ul className="list-none pl-4 space-y-1">
            {(data.toList || []).map((recipient, idx) => (
              <li key={idx} className="group flex items-center gap-2">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={recipient}
                      onChange={(e) => updateTo(idx, e.target.value)}
                      className="flex-1 border-b border-surface-300 focus:border-brand-500 outline-none px-1 bg-yellow-50/40 print:bg-transparent print:border-none font-serif text-[12pt]"
                      placeholder="Head of the Department, all faculty members..."
                    />
                    <button type="button" onClick={() => removeTo(idx)} className="text-red-500 text-xs opacity-0 group-hover:opacity-100 print:hidden">×</button>
                  </>
                ) : (
                  <span>{recipient}</span>
                )}
              </li>
            ))}
          </ul>
          {isEditing && (
            <button type="button" onClick={addTo} className="mt-1 text-xs font-sans text-brand-600 hover:text-brand-800 font-semibold print:hidden">+ Add Recipient Line</button>
          )}
        </div>
      )}

      {/* Main Paragraph / Notice text */}
      <div className="text-justify text-[12pt] space-y-3 mb-6" style={{lineHeight:'1.6'}}>
        {isEditing ? (
          <textarea
            value={data.introText || ''}
            onChange={(e) => updateField('introText', e.target.value)}
            rows={5}
            className="w-full p-2 border border-surface-300 rounded focus:border-brand-500 outline-none font-serif text-[12pt] bg-yellow-50/40 print:bg-transparent print:border-none print:p-0 resize-y leading-relaxed"
            placeholder="This is to inform the Head of the Department, all faculty members, and students..."
          />
        ) : (
          (data.introText || '').split('\n').filter(l => l.trim()).map((line, i) => (
            <p key={i} className="text-justify">{line}</p>
          ))
        )}
      </div>

      {/* Workshop / Event Details Section */}
      <div className="mb-6">
        {isEditing ? (
          <input
            type="text"
            value={data.detailsLabel || 'Workshop Details'}
            onChange={(e) => updateDetailsLabel(e.target.value)}
            className="font-bold text-[12pt] mb-2 border-b border-dashed border-surface-400 focus:border-brand-500 outline-none bg-transparent w-auto print:border-none"
            title="Click to rename this section label"
          />
        ) : (
          <p className="font-bold text-[12pt] mb-2">{data.detailsLabel || 'Workshop Details'}:</p>
        )}
        <ul className="list-disc pl-6 space-y-1.5 text-[12pt]">
          {(data.details || []).map((detail, idx) => (
            <li key={idx} className="group">
              {isEditing ? (
                <span className="inline-flex items-center gap-2">
                  <input
                    type="text"
                    value={detail.label}
                    onChange={(e) => updateDetail(idx, 'label', e.target.value)}
                    className="font-bold border-b border-dashed border-surface-300 focus:border-brand-500 outline-none px-1 bg-transparent print:border-none text-[12pt] w-36"
                    placeholder="Label"
                  />
                  <span className="font-bold">:</span>
                  <input
                    type="text"
                    value={detail.value}
                    onChange={(e) => updateDetail(idx, 'value', e.target.value)}
                    className="border-b border-surface-400 focus:border-brand-500 outline-none px-1 bg-yellow-50/40 print:bg-transparent print:border-none text-[12pt] font-serif flex-1"
                    placeholder="Value"
                  />
                  <button
                    type="button"
                    onClick={() => removeDetail(idx)}
                    className="text-red-500 text-xs px-1 opacity-0 group-hover:opacity-100 transition-opacity print:hidden"
                  >
                    ×
                  </button>
                </span>
              ) : (
                <><span className="font-bold">{detail.label}: </span><span>{detail.value}</span></>
              )}
            </li>
          ))}
        </ul>
        {isEditing && (
          <button type="button" onClick={addDetail} className="mt-2 text-xs font-sans text-brand-600 hover:text-brand-800 font-semibold print:hidden">
            + Add Detail Row
          </button>
        )}
      </div>

      {/* Closing Note */}
      <div className="mb-14">
        {isEditing ? (
          <input
            type="text"
            value={data.closingNote || ''}
            onChange={(e) => updateField('closingNote', e.target.value)}
            className="w-full border-b border-surface-300 focus:border-brand-500 outline-none px-1 py-1 font-serif text-[12pt] bg-yellow-50/40 print:bg-transparent print:border-none"
            placeholder="All faculty members are requested to ensure smooth coordination and student participation."
          />
        ) : (
          <p className="text-[12pt]">{data.closingNote}</p>
        )}
      </div>

      {/* Signatory (Principal) */}
      <div className="text-right mb-10">
        <p className="font-bold text-[13pt] tracking-wider uppercase">
          {data.signatory || 'PRINCIPAL'}
        </p>
      </div>

      {/* Copy To List */}
      <div className="border-t border-surface-300 pt-4 print:border-none">
        <p className="font-bold text-[11pt] mb-2">Copy to:</p>
        <ol className="list-decimal pl-6 space-y-1 text-[11pt]">
          {(data.copyTo || []).map((recipient, idx) => (
            <li key={idx} className="group">
              {isEditing ? (
                <span className="inline-flex items-center gap-2">
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => updateCopyTo(idx, e.target.value)}
                    className="border-b border-surface-300 focus:border-brand-500 outline-none px-1 bg-yellow-50/40 print:bg-transparent print:border-none text-[11pt] font-serif w-60"
                  />
                  <button
                    type="button"
                    onClick={() => removeCopyTo(idx)}
                    className="text-red-500 text-xs px-1 opacity-0 group-hover:opacity-100 transition-opacity print:hidden"
                  >
                    ×
                  </button>
                </span>
              ) : (
                <span>{recipient}</span>
              )}
            </li>
          ))}
        </ol>
        {isEditing && (
          <button type="button" onClick={addCopyTo} className="mt-2 text-xs font-sans text-brand-600 hover:text-brand-800 font-semibold print:hidden">
            + Add Recipient
          </button>
        )}
      </div>
    </div>
  );
}
