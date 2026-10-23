import React from 'react';
import { SITLetterhead } from '../DocumentLogos';

export default function MomTemplate({ data, onChange, isEditing = true }) {
  const updateField = (field, val) => {
    onChange({ ...data, [field]: val });
  };

  const updateMeetingDetail = (field, val) => {
    onChange({
      ...data,
      meetingDetails: {
        ...(data.meetingDetails || {}),
        [field]: val
      }
    });
  };

  const updateAgendaItem = (idx, val) => {
    const list = [...(data.agendaItems || [])];
    list[idx] = val;
    onChange({ ...data, agendaItems: list });
  };

  const addAgendaItem = () => {
    onChange({
      ...data,
      agendaItems: [...(data.agendaItems || []), 'New agenda item']
    });
  };

  const removeAgendaItem = (idx) => {
    onChange({
      ...data,
      agendaItems: (data.agendaItems || []).filter((_, i) => i !== idx)
    });
  };

  const updateProceeding = (idx, field, val) => {
    const list = [...(data.proceedings || [])];
    list[idx] = { ...list[idx], [field]: val };
    onChange({ ...data, proceedings: list });
  };

  const addProceeding = () => {
    onChange({
      ...data,
      proceedings: [
        ...(data.proceedings || []),
        {
          item: `Agenda Item ${(data.proceedings || []).length + 1}: New Topic`,
          resolution: 'It was resolved to...',
          action: 'Scheduled for...'
        }
      ]
    });
  };

  const removeProceeding = (idx) => {
    onChange({
      ...data,
      proceedings: (data.proceedings || []).filter((_, i) => i !== idx)
    });
  };

  const updateDecision = (idx, val) => {
    const list = [...(data.decisions || [])];
    list[idx] = val;
    onChange({ ...data, decisions: list });
  };

  const addDecision = () => {
    onChange({
      ...data,
      decisions: [...(data.decisions || []), 'New decision point approved by committee.']
    });
  };

  const removeDecision = (idx) => {
    onChange({
      ...data,
      decisions: (data.decisions || []).filter((_, i) => i !== idx)
    });
  };

  const details = data.meetingDetails || {};

  return (
    <div className="sit-document font-serif text-black leading-relaxed text-[12pt] bg-white shadow-lg print:shadow-none" style={{width:'794px', minHeight:'1123px', padding:'72px 72px 64px'}}>
      {/* Official Header */}
      <SITLetterhead
        trustName={data.trustName}
        cetCode={data.cetCode}
        council={data.council}
      />

      {/* Document Title */}
      <div className="text-center my-6">
        <h2 className="text-[15pt] font-black tracking-wide uppercase underline underline-offset-4">
          MINUTES OF MEETING
        </h2>
        {isEditing ? (
          <input
            type="text"
            value={data.quarter || ''}
            onChange={(e) => updateField('quarter', e.target.value)}
            className="mt-2 text-center font-bold text-[12pt] border-b border-surface-300 focus:border-brand-500 outline-none w-full max-w-md bg-yellow-50/40 print:bg-transparent print:border-none"
            placeholder="Quarter 3 (01 March – 31 May, 2026)"
          />
        ) : (
          <p className="mt-2 font-bold text-[12pt]">{data.quarter}</p>
        )}
      </div>

      {/* 1. Meeting Details */}
      <div className="mb-6 avoid-break">
        <h3 className="font-bold text-[12pt] mb-2">1. Meeting Details</h3>
        <ul className="list-disc pl-6 space-y-1 text-[12pt]">
          <li>
            <span className="font-semibold">Date of Meeting: </span>
            {isEditing ? (
              <input type="text" value={details.date || ''} onChange={(e) => updateMeetingDetail('date', e.target.value)}
                className="border-b border-surface-300 px-1 bg-yellow-50/40 print:bg-transparent print:border-none font-serif text-[12pt] w-40" />
            ) : <span>{details.date}</span>}
          </li>
          <li>
            <span className="font-semibold">Time: </span>
            {isEditing ? (
              <input type="text" value={details.time || ''} onChange={(e) => updateMeetingDetail('time', e.target.value)}
                className="border-b border-surface-300 px-1 bg-yellow-50/40 print:bg-transparent print:border-none font-serif text-[12pt] w-32" />
            ) : <span>{details.time}</span>}
          </li>
          <li>
            <span className="font-semibold">Venue: </span>
            {isEditing ? (
              <input type="text" value={details.venue || ''} onChange={(e) => updateMeetingDetail('venue', e.target.value)}
                className="border-b border-surface-300 px-1 bg-yellow-50/40 print:bg-transparent print:border-none font-serif text-[12pt] w-48" />
            ) : <span>{details.venue}</span>}
          </li>
          <li>
            <span className="font-semibold">Chairperson: </span>
            {isEditing ? (
              <input type="text" value={details.chairperson || ''} onChange={(e) => updateMeetingDetail('chairperson', e.target.value)}
                className="border-b border-surface-300 px-1 bg-yellow-50/40 print:bg-transparent print:border-none font-serif text-[12pt] w-52" />
            ) : <span>{details.chairperson}</span>}
          </li>
          <li>
            <span className="font-semibold">Members Present: </span>
            {isEditing ? (
              <input type="text" value={details.membersPresent || ''} onChange={(e) => updateMeetingDetail('membersPresent', e.target.value)}
                className="border-b border-surface-300 px-1 bg-yellow-50/40 print:bg-transparent print:border-none font-serif text-[12pt] w-64 max-w-full" />
            ) : <span>{details.membersPresent}</span>}
          </li>
        </ul>
      </div>

      {/* 2. Agenda */}
      <div className="mb-6 avoid-break">
        <h3 className="font-bold text-[12pt] mb-2">2. Agenda</h3>
        <ol className="list-decimal pl-6 space-y-1 text-[12pt]">
          {(data.agendaItems || []).map((agenda, idx) => (
            <li key={idx} className="group">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={agenda}
                    onChange={(e) => updateAgendaItem(idx, e.target.value)}
                    className="flex-1 border-b border-surface-300 px-1 bg-yellow-50/40 print:bg-transparent print:border-none font-serif text-[12pt]"
                  />
                  <button
                    type="button"
                    onClick={() => removeAgendaItem(idx)}
                    className="text-red-500 text-xs px-1 opacity-0 group-hover:opacity-100 transition-opacity print:hidden"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <span>{agenda}</span>
              )}
            </li>
          ))}
        </ol>
        {isEditing && (
          <button
            type="button"
            onClick={addAgendaItem}
            className="mt-2 text-xs font-sans text-brand-600 hover:text-brand-800 font-semibold print:hidden"
          >
            + Add Agenda Item
          </button>
        )}
      </div>

      {/* 3. Proceedings & Resolutions */}
      <div className="mb-6">
        <h3 className="font-bold text-[12pt] mb-3">3. Proceedings &amp; Resolutions</h3>
        <div className="space-y-5">
          {(data.proceedings || []).map((proc, idx) => (
            <div key={idx} className="space-y-1 avoid-break group">
              {isEditing ? (
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="text"
                    value={proc.item}
                    onChange={(e) => updateProceeding(idx, 'item', e.target.value)}
                    className="font-bold text-[12pt] border-b border-surface-300 w-full bg-yellow-50/40 print:bg-transparent print:border-none"
                    placeholder="Agenda Item 1: Workshop on Product-Market Fit..."
                  />
                  <button
                    type="button"
                    onClick={() => removeProceeding(idx)}
                    className="text-red-500 text-xs ml-2 shrink-0 opacity-0 group-hover:opacity-100 print:hidden"
                  >
                    Delete
                  </button>
                </div>
              ) : (
                <p className="font-bold text-[12pt]">{proc.item}</p>
              )}

              <ul className="list-disc pl-8 space-y-0.5 text-[12pt]">
                <li>
                  <span className="font-bold">Resolution: </span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={proc.resolution}
                      onChange={(e) => updateProceeding(idx, 'resolution', e.target.value)}
                      className="border-b border-surface-300 px-1 bg-yellow-50/40 print:bg-transparent print:border-none font-serif text-[12pt] w-[80%]"
                    />
                  ) : (
                    <span>{proc.resolution}</span>
                  )}
                </li>
                <li>
                  <span className="font-bold">Action: </span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={proc.action}
                      onChange={(e) => updateProceeding(idx, 'action', e.target.value)}
                      className="border-b border-surface-300 px-1 bg-yellow-50/40 print:bg-transparent print:border-none font-serif text-[12pt] w-[80%]"
                    />
                  ) : (
                    <span>{proc.action}</span>
                  )}
                </li>
              </ul>
            </div>
          ))}
        </div>
        {isEditing && (
          <button
            type="button"
            onClick={addProceeding}
            className="mt-3 text-xs font-sans text-brand-600 hover:text-brand-800 font-semibold print:hidden"
          >
            + Add Proceeding &amp; Resolution Item
          </button>
        )}
      </div>

      {/* 4. Decisions Taken */}
      <div className="mb-6 avoid-break">
        <h3 className="font-bold text-[12pt] mb-2">4. Decisions Taken</h3>
        <ul className="list-disc pl-6 space-y-1 text-[12pt]">
          {(data.decisions || []).map((dec, idx) => (
            <li key={idx} className="group">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={dec}
                    onChange={(e) => updateDecision(idx, e.target.value)}
                    className="flex-1 border-b border-surface-300 px-1 bg-yellow-50/40 print:bg-transparent print:border-none font-serif text-[12pt]"
                  />
                  <button
                    type="button"
                    onClick={() => removeDecision(idx)}
                    className="text-red-500 text-xs px-1 opacity-0 group-hover:opacity-100 print:hidden"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <span>{dec}</span>
              )}
            </li>
          ))}
        </ul>
        {isEditing && (
          <button
            type="button"
            onClick={addDecision}
            className="mt-2 text-xs font-sans text-brand-600 hover:text-brand-800 font-semibold print:hidden"
          >
            + Add Decision
          </button>
        )}
      </div>

      {/* 5. Conclusion */}
      <div className="mb-14 avoid-break">
        <h3 className="font-bold text-[12pt] mb-2">5. Conclusion</h3>
        {isEditing ? (
          <textarea
            value={data.conclusion || ''}
            onChange={(e) => updateField('conclusion', e.target.value)}
            rows={4}
            className="w-full p-2 border border-surface-300 rounded font-serif text-[12pt] bg-yellow-50/40 print:bg-transparent print:border-none print:p-0 resize-y"
          />
        ) : (
          <p className="text-justify text-[12pt]">{data.conclusion}</p>
        )}
      </div>

      {/* Signatory */}
      <div className="text-right mb-6 avoid-break">
        <p className="font-bold text-[13pt] tracking-wider uppercase">
          {data.signatory || 'PRINCIPAL'}
        </p>
      </div>
    </div>
  );
}
