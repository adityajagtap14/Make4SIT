import React from 'react';
import { SITLogo } from '../DocumentLogos';
import { ImagePlus, Trash2 } from 'lucide-react';

export default function NewsletterTemplate({ data, onChange, isEditing = true }) {
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
      objectives: [...(data.objectives || []), 'New objective point for the talk.']
    });
  };

  const removeObjective = (idx) => {
    onChange({
      ...data,
      objectives: (data.objectives || []).filter((_, i) => i !== idx)
    });
  };

  const updateHighlight = (idx, field, val) => {
    const list = [...(data.highlights || [])];
    list[idx] = { ...list[idx], [field]: val };
    onChange({ ...data, highlights: list });
  };

  const updateGlimpse = (idx, field, val) => {
    const list = [...(data.glimpses || [])];
    list[idx] = { ...list[idx], [field]: val };
    onChange({ ...data, glimpses: list });
  };

  const updateTestimonial = (idx, field, val) => {
    const list = [...(data.testimonials || [])];
    list[idx] = { ...list[idx], [field]: val };
    onChange({ ...data, testimonials: list });
  };

  return (
    <div className="sit-document font-sans text-surface-900 leading-normal bg-white shadow-lg print:shadow-none" style={{width:'794px', minHeight:'1123px', padding:'60px 60px 56px'}}>
      {/* ── Magazine Header ── */}
      <div className="border-b-4 border-slate-900 pb-3 mb-4 select-none">
        <div className="flex items-center gap-4">
          <SITLogo className="w-20 h-20 shrink-0" />
          <div className="flex-1">
            <h1 className="text-[24pt] font-serif font-black tracking-tight text-slate-950 uppercase leading-none">
              Shetty Institute of Technology
            </h1>
            <p className="text-[9pt] font-semibold text-slate-600 tracking-wider uppercase mt-1">
              SHETTY EDUCATION HUB, SHAHABAD ROAD, KALABURAGI 585-105
            </p>
          </div>
        </div>

        {/* Department Banner Ribbon */}
        <div className="mt-3 bg-gradient-to-r from-slate-900 to-indigo-950 text-white px-4 py-2 font-serif font-bold text-[13pt] text-center tracking-wide shadow-sm rounded-sm">
          {isEditing ? (
            <input
              type="text"
              value={data.department || ''}
              onChange={(e) => updateField('department', e.target.value)}
              className="bg-transparent text-center text-white w-full outline-none font-bold text-[13pt]"
              placeholder="Department of Computer Science and Engineering"
            />
          ) : (
            <span>{data.department}</span>
          )}
        </div>

        {/* Technical Talk Dark Sub-banner */}
        <div className="mt-1 bg-gradient-to-r from-slate-800 to-slate-900 text-yellow-300 px-4 py-1.5 text-center text-[10.5pt] font-extrabold tracking-widest uppercase">
          {isEditing ? (
            <input
              type="text"
              value={data.title || ''}
              onChange={(e) => updateField('title', e.target.value)}
              className="bg-transparent text-center text-yellow-300 w-full outline-none font-extrabold text-[10.5pt]"
              placeholder="DISTINGUISHED LECTURE - TITLE HERE"
            />
          ) : (
            <span>{data.title}</span>
          )}
        </div>

        {/* Date and Category Bar */}
        <div className="flex justify-between items-center mt-2 px-1 text-[11pt] font-black tracking-wider text-slate-800">
          <div className="bg-slate-100 px-3 py-1 rounded">
            {isEditing ? (
              <input
                type="text"
                value={data.date || ''}
                onChange={(e) => updateField('date', e.target.value)}
                className="bg-transparent outline-none font-black text-slate-800"
                placeholder="18TH OCT 2026"
              />
            ) : (
              <span>{data.date}</span>
            )}
          </div>
          <span className="bg-slate-900 text-white px-3 py-1 text-xs rounded uppercase tracking-widest">
            FACULTY RESEARCH BULLETIN
          </span>
        </div>
      </div>

      {/* ── Two-Column Magazine Section 1 ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-6">
        {/* Left Column: Mission & Objectives */}
        <div className="md:col-span-5 space-y-4">
          {/* Mission Card */}
          <div className="bg-slate-900 text-white p-4 rounded-xl shadow-sm">
            <h3 className="font-serif font-bold text-[13pt] text-yellow-400 mb-1 border-b border-slate-700 pb-1">
              Mission
            </h3>
            {isEditing ? (
              <textarea
                value={data.mission || ''}
                onChange={(e) => updateField('mission', e.target.value)}
                rows={4}
                className="w-full text-[9.5pt] leading-relaxed bg-transparent text-slate-200 outline-none resize-none"
              />
            ) : (
              <p className="text-[9.5pt] text-slate-200 leading-relaxed text-justify">{data.mission}</p>
            )}
          </div>

          {/* Objectives Card */}
          <div className="border border-slate-200 p-4 rounded-xl bg-slate-50/50">
            <h3 className="font-serif font-bold text-[13pt] text-slate-900 mb-2 border-b border-slate-200 pb-1">
              Objectives
            </h3>
            <ul className="list-disc pl-4 space-y-1.5 text-[9pt] text-slate-700">
              {(data.objectives || []).map((obj, idx) => (
                <li key={idx} className="group">
                  {isEditing ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        value={obj}
                        onChange={(e) => updateObjective(idx, e.target.value)}
                        className="w-full bg-yellow-50/60 p-0.5 border-b text-[9pt]"
                      />
                      <button
                        type="button"
                        onClick={() => removeObjective(idx)}
                        className="text-red-500 text-xs opacity-0 group-hover:opacity-100 print:hidden"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <span>{obj}</span>
                  )}
                </li>
              ))}
            </ul>
            {isEditing && (
              <button
                type="button"
                onClick={addObjective}
                className="mt-2 text-xs font-semibold text-brand-600 print:hidden"
              >
                + Add Objective
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Brief & Vision */}
        <div className="md:col-span-7 space-y-4">
          {/* Brief */}
          <div className="border-l-4 border-slate-900 pl-4 py-1">
            <h3 className="font-serif font-black text-[15pt] text-slate-950 mb-1">Brief</h3>
            {isEditing ? (
              <textarea
                value={data.brief || ''}
                onChange={(e) => updateField('brief', e.target.value)}
                rows={4}
                className="w-full text-[10pt] leading-relaxed bg-yellow-50/40 p-1 border border-slate-200 rounded outline-none"
              />
            ) : (
              <p className="text-[10pt] text-slate-800 leading-relaxed text-justify">{data.brief}</p>
            )}
          </div>

          {/* Vision */}
          <div className="bg-amber-50/60 border border-amber-200 p-4 rounded-xl">
            <h3 className="font-serif font-bold text-[13pt] text-amber-900 mb-1 border-b border-amber-200 pb-1">
              Vision
            </h3>
            {isEditing ? (
              <textarea
                value={data.vision || ''}
                onChange={(e) => updateField('vision', e.target.value)}
                rows={3}
                className="w-full text-[9.5pt] leading-relaxed bg-transparent text-amber-950 outline-none resize-none"
              />
            ) : (
              <p className="text-[9.5pt] text-amber-950 leading-relaxed text-justify">{data.vision}</p>
            )}
          </div>

          {/* Featured Image Block */}
          <div className="relative rounded-xl overflow-hidden aspect-[16/9] shadow-sm border border-slate-200">
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80"
              alt="Talk in Session"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-white text-[8pt]">
              Live Technical Session & Interactive Demonstration
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 2: Participation & Key Highlights ── */}
      <div className="border-t border-slate-200 pt-5 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Participation Overview & About */}
          <div className="space-y-4">
            <div className="bg-rose-50/40 p-4 rounded-xl border border-rose-200">
              <h3 className="font-serif font-bold text-[13pt] text-rose-900 mb-1">
                Participation Overview
              </h3>
              {isEditing ? (
                <textarea
                  value={data.participationOverview || ''}
                  onChange={(e) => updateField('participationOverview', e.target.value)}
                  rows={4}
                  className="w-full text-[9.5pt] text-slate-800 bg-transparent outline-none"
                />
              ) : (
                <p className="text-[9.5pt] text-slate-800 leading-relaxed text-justify">{data.participationOverview}</p>
              )}
            </div>

            <div>
              <h3 className="font-serif font-bold text-[13pt] text-slate-900 mb-1">About the Session</h3>
              {isEditing ? (
                <textarea
                  value={data.about || ''}
                  onChange={(e) => updateField('about', e.target.value)}
                  rows={4}
                  className="w-full text-[9.5pt] text-slate-700 p-1 border rounded bg-yellow-50/40"
                />
              ) : (
                <p className="text-[9.5pt] text-slate-700 leading-relaxed text-justify">{data.about}</p>
              )}
            </div>
          </div>

          {/* Key Highlights */}
          <div className="space-y-3">
            <h3 className="font-serif font-black text-[13pt] text-slate-900 uppercase tracking-wide">
              Key Highlights of the Talk
            </h3>
            {(data.highlights || []).map((hl, idx) => (
              <div key={idx} className="bg-slate-50 border-l-4 border-indigo-600 p-3 rounded-r-lg">
                <p className="font-bold text-[10pt] text-indigo-950">{hl.title}</p>
                {isEditing ? (
                  <textarea
                    value={hl.desc}
                    onChange={(e) => updateHighlight(idx, 'desc', e.target.value)}
                    rows={2}
                    className="w-full text-[9pt] text-slate-700 bg-transparent outline-none mt-1"
                  />
                ) : (
                  <p className="text-[9pt] text-slate-700 mt-1 leading-snug">{hl.desc}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section 3: Glimpses of the Day & Outcome ── */}
      <div className="border-t border-slate-200 pt-5 mb-6">
        <h3 className="font-serif font-black text-[14pt] text-slate-900 mb-4 text-center uppercase tracking-wide">
          Glimpses of the Day
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          {(data.glimpses || []).map((g, idx) => (
            <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
              <div className="h-32 bg-slate-100 overflow-hidden">
                <img
                  src={`https://images.unsplash.com/photo-${1515187029135 + idx * 1000}?w=600&auto=format&fit=crop&q=80`}
                  alt={g.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h4 className="font-bold text-[10pt] text-slate-900 uppercase">{g.title}</h4>
                {isEditing ? (
                  <textarea
                    value={g.desc}
                    onChange={(e) => updateGlimpse(idx, 'desc', e.target.value)}
                    rows={3}
                    className="w-full text-[8.5pt] text-slate-600 bg-transparent outline-none mt-1"
                  />
                ) : (
                  <p className="text-[8.5pt] text-slate-600 mt-1 leading-tight">{g.desc}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Outcome Box */}
        <div className="bg-emerald-50/70 border border-emerald-300 p-4 rounded-xl">
          <h3 className="font-serif font-bold text-[12pt] text-emerald-950 mb-1">Outcome</h3>
          {isEditing ? (
            <textarea
              value={data.outcome || ''}
              onChange={(e) => updateField('outcome', e.target.value)}
              rows={3}
              className="w-full text-[9.5pt] text-emerald-900 bg-transparent outline-none"
            />
          ) : (
            <p className="text-[9.5pt] text-emerald-900 leading-relaxed text-justify">{data.outcome}</p>
          )}
        </div>
      </div>

      {/* ── Section 4: Testimonials & Concluding Banner ── */}
      <div className="border-t border-slate-200 pt-5">
        <h3 className="font-serif font-bold text-[12pt] text-slate-900 mb-3">Student Testimonials</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {(data.testimonials || []).map((test, idx) => (
            <div key={idx} className="bg-slate-100/70 border-l-4 border-slate-800 p-3 rounded-r-lg">
              {isEditing ? (
                <textarea
                  value={test.quote}
                  onChange={(e) => updateTestimonial(idx, 'quote', e.target.value)}
                  rows={2}
                  className="w-full text-[9pt] italic text-slate-800 bg-transparent outline-none"
                />
              ) : (
                <p className="text-[9pt] italic text-slate-800">"{test.quote}"</p>
              )}
              <p className="text-[8.5pt] font-bold text-slate-600 mt-1.5">— {test.author}</p>
            </div>
          ))}
        </div>

        {/* Big Banner Tagline */}
        <div className="bg-slate-900 text-white py-6 px-4 rounded-2xl text-center shadow-md">
          <p className="font-serif italic font-bold text-[16pt] text-yellow-300 tracking-wide">
            "{data.tagline || 'Striving for Excellence in Computing and Innovation'}"
          </p>
          <p className="font-serif font-black text-[13pt] text-white tracking-widest uppercase mt-2">
            Thank You!
          </p>
        </div>
      </div>
    </div>
  );
}
