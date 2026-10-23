import React from 'react';
import { SITLetterhead } from '../DocumentLogos';

export default function ActionPlanTemplate({ data, onChange, isEditing = true }) {
  const updateField = (field, val) => {
    onChange({ ...data, [field]: val });
  };

  const updateObjective = (idx, val) => {
    const list = [...(data.objectives || [])];
    list[idx] = val;
    onChange({ ...data, objectives: list });
  };

  const addObjective = () => {
    onChange({
      ...data,
      objectives: [...(data.objectives || []), 'New strategic objective for the quarter.']
    });
  };

  const removeObjective = (idx) => {
    onChange({
      ...data,
      objectives: (data.objectives || []).filter((_, i) => i !== idx)
    });
  };

  const updateActivity = (idx, field, val) => {
    const list = [...(data.activities || [])];
    list[idx] = { ...list[idx], [field]: val };
    onChange({ ...data, activities: list });
  };

  const addActivity = () => {
    const currentLen = (data.activities || []).length;
    onChange({
      ...data,
      activities: [
        ...(data.activities || []),
        {
          slNo: currentLen + 1,
          event: 'New Workshop / Activity',
          date: 'TBD',
          responsible: 'Faculty Coordinator',
          participants: 'Students & Faculty',
          outcome: 'Enhanced knowledge and practical exposure'
        }
      ]
    });
  };

  const removeActivity = (idx) => {
    const list = (data.activities || [])
      .filter((_, i) => i !== idx)
      .map((item, i) => ({ ...item, slNo: i + 1 }));
    onChange({ ...data, activities: list });
  };

  const updateOutcome = (idx, val) => {
    const list = [...(data.overallOutcomes || [])];
    list[idx] = val;
    onChange({ ...data, overallOutcomes: list });
  };

  const addOutcome = () => {
    onChange({
      ...data,
      overallOutcomes: [...(data.overallOutcomes || []), 'New expected institutional outcome.']
    });
  };

  const removeOutcome = (idx) => {
    onChange({
      ...data,
      overallOutcomes: (data.overallOutcomes || []).filter((_, i) => i !== idx)
    });
  };

  return (
    <div className="sit-document font-serif text-black leading-relaxed text-[12pt] bg-white shadow-lg print:shadow-none" style={{width:'794px', minHeight:'1123px', padding:'72px 72px 64px'}}>
      {/* Official Header */}
      <SITLetterhead
        trustName="Shree Shetty Sangappa Trust's"
        cetCode="CET Code: E-216 (UG)"
        council={data.council || "Institution's Academic & Innovation Council"}
      />

      {/* Title */}
      <div className="text-center my-6">
        <h2 className="text-[17pt] font-black tracking-wide uppercase underline underline-offset-4">
          PLAN
        </h2>
        {isEditing ? (
          <input
            type="text"
            value={data.council || ''}
            onChange={(e) => updateField('council', e.target.value)}
            className="mt-2 font-bold text-[13pt] text-center border-b border-surface-300 focus:border-brand-500 outline-none w-full bg-yellow-50/40 print:bg-transparent print:border-none"
            placeholder="Institution's Academic & Innovation Council"
          />
        ) : (
          <p className="font-bold text-[13pt] mt-2 text-surface-900">
            {data.council || "Institution's Academic & Innovation Council"}
          </p>
        )}
        {isEditing ? (
          <input
            type="text"
            value={data.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            className="mt-1 font-bold text-[12pt] text-center border-b border-surface-300 focus:border-brand-500 outline-none w-full bg-yellow-50/40 print:bg-transparent print:border-none"
            placeholder="Quarterly Academic & Research Action Plan (Q3: October 01 – December 31, 2026)"
          />
        ) : (
          <p className="font-bold text-[12pt] mt-1">
            {data.title || "Quarterly Academic & Research Action Plan (Q3: October 01 – December 31, 2026)"}
          </p>
        )}
      </div>

      {/* Plan Metadata */}
      <div className="space-y-1 text-[11.5pt] mb-6">
        <p>
          <span className="font-bold">Institute Name: </span>
          {isEditing ? (
            <input type="text" value={data.instituteName || ''} onChange={e => updateField('instituteName', e.target.value)}
              className="border-b border-surface-300 px-1 bg-yellow-50/40 print:bg-transparent print:border-none font-serif text-[11.5pt] w-64" placeholder="Shetty Institute of Technology" />
          ) : (data.instituteName || 'Shetty Institute of Technology')}
        </p>
        <p>
          <span className="font-bold">Quarter: </span>
          {isEditing ? (
            <input type="text" value={data.quarter || ''} onChange={e => updateField('quarter', e.target.value)}
              className="border-b border-surface-300 px-1 bg-yellow-50/40 print:bg-transparent print:border-none font-serif text-[11.5pt] w-24" placeholder="Q3" />
          ) : (data.quarter || 'Q3')}
        </p>
        <p>
          <span className="font-bold">Duration: </span>
          {isEditing ? (
            <input type="text" value={data.duration || ''} onChange={e => updateField('duration', e.target.value)}
              className="border-b border-surface-300 px-1 bg-yellow-50/40 print:bg-transparent print:border-none font-serif text-[11.5pt] w-72" placeholder="01 October 2026 – 31 December 2026" />
          ) : (data.duration || '01 October 2026 – 31 December 2026')}
        </p>
      </div>

      {/* Objectives */}
      <div className="mb-6 avoid-break">
        <h3 className="font-bold text-[12pt] mb-2">Objectives for the Quarter</h3>
        <ol className="list-decimal pl-6 space-y-1.5 text-[11pt]">
          {(data.objectives || []).map((obj, idx) => (
            <li key={idx} className="group">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={obj}
                    onChange={(e) => updateObjective(idx, e.target.value)}
                    className="flex-1 border-b border-surface-300 px-1 bg-yellow-50/40 print:bg-transparent print:border-none font-serif text-[11pt]"
                  />
                  <button
                    type="button"
                    onClick={() => removeObjective(idx)}
                    className="text-red-500 text-xs px-1 opacity-0 group-hover:opacity-100 print:hidden"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <span>{obj}</span>
              )}
            </li>
          ))}
        </ol>
        {isEditing && (
          <button
            type="button"
            onClick={addObjective}
            className="mt-2 text-xs font-sans text-brand-600 hover:text-brand-800 font-semibold print:hidden"
          >
            + Add Objective
          </button>
        )}
      </div>

      {/* Planned Activities Table */}
      <div className="mb-8">
        <h3 className="font-bold text-[12pt] mb-3">Planned Activities:</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-black text-[10pt] leading-tight">
            <thead>
              <tr className="bg-surface-100/70 print:bg-transparent font-bold text-center">
                <th className="border border-black p-2 w-10">Sl. No.</th>
                <th className="border border-black p-2 w-48 text-left">Activity / Event</th>
                <th className="border border-black p-2 w-24">Date</th>
                <th className="border border-black p-2 w-32 text-left">Responsible Person</th>
                <th className="border border-black p-2 w-28 text-left">Participants</th>
                <th className="border border-black p-2 text-left">Expected Outcome</th>
                {isEditing && <th className="border border-black p-1 w-10 print:hidden">Del</th>}
              </tr>
            </thead>
            <tbody>
              {(data.activities || []).map((act, idx) => (
                <tr key={idx} className="border border-black align-top hover:bg-surface-50/40">
                  <td className="border border-black p-2 text-center font-bold">{act.slNo || idx + 1}</td>
                  <td className="border border-black p-2 font-medium">
                    {isEditing ? (
                      <textarea
                        value={act.event}
                        onChange={(e) => updateActivity(idx, 'event', e.target.value)}
                        rows={2}
                        className="w-full p-1 bg-yellow-50/40 print:bg-transparent outline-none resize-none"
                      />
                    ) : (
                      act.event
                    )}
                  </td>
                  <td className="border border-black p-2 text-center">
                    {isEditing ? (
                      <input
                        type="text"
                        value={act.date}
                        onChange={(e) => updateActivity(idx, 'date', e.target.value)}
                        className="w-full text-center p-1 bg-yellow-50/40 print:bg-transparent outline-none"
                      />
                    ) : (
                      act.date
                    )}
                  </td>
                  <td className="border border-black p-2">
                    {isEditing ? (
                      <textarea
                        value={act.responsible}
                        onChange={(e) => updateActivity(idx, 'responsible', e.target.value)}
                        rows={2}
                        className="w-full p-1 bg-yellow-50/40 print:bg-transparent outline-none resize-none"
                      />
                    ) : (
                      act.responsible
                    )}
                  </td>
                  <td className="border border-black p-2">
                    {isEditing ? (
                      <input
                        type="text"
                        value={act.participants}
                        onChange={(e) => updateActivity(idx, 'participants', e.target.value)}
                        className="w-full p-1 bg-yellow-50/40 print:bg-transparent outline-none"
                      />
                    ) : (
                      act.participants
                    )}
                  </td>
                  <td className="border border-black p-2">
                    {isEditing ? (
                      <textarea
                        value={act.outcome}
                        onChange={(e) => updateActivity(idx, 'outcome', e.target.value)}
                        rows={2}
                        className="w-full p-1 bg-yellow-50/40 print:bg-transparent outline-none resize-none"
                      />
                    ) : (
                      act.outcome
                    )}
                  </td>
                  {isEditing && (
                    <td className="border border-black p-1 text-center align-middle print:hidden">
                      <button
                        type="button"
                        onClick={() => removeActivity(idx)}
                        className="text-red-500 font-bold hover:text-red-700"
                        title="Delete row"
                      >
                        ×
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isEditing && (
          <button
            type="button"
            onClick={addActivity}
            className="mt-2 text-xs font-sans text-brand-600 hover:text-brand-800 font-semibold print:hidden"
          >
            + Add Activity Row to Plan
          </button>
        )}
      </div>

      {/* Expected Overall Outcomes */}
      <div className="mb-14 avoid-break">
        <h3 className="font-bold text-[12pt] mb-2">Expected Overall Outcomes</h3>
        <ul className="list-disc pl-6 space-y-1 text-[11pt]">
          {(data.overallOutcomes || []).map((out, idx) => (
            <li key={idx} className="group">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={out}
                    onChange={(e) => updateOutcome(idx, e.target.value)}
                    className="flex-1 border-b border-surface-300 px-1 bg-yellow-50/40 print:bg-transparent print:border-none font-serif text-[11pt]"
                  />
                  <button
                    type="button"
                    onClick={() => removeOutcome(idx)}
                    className="text-red-500 text-xs px-1 opacity-0 group-hover:opacity-100 print:hidden"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <span>{out}</span>
              )}
            </li>
          ))}
        </ul>
        {isEditing && (
          <button
            type="button"
            onClick={addOutcome}
            className="mt-2 text-xs font-sans text-brand-600 hover:text-brand-800 font-semibold print:hidden"
          >
            + Add Overall Outcome
          </button>
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
