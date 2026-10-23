import React from 'react';
import { FourLogoHeader } from '../DocumentLogos';
import { ImagePlus, Trash2 } from 'lucide-react';

export default function EventReportTemplate({ data, onChange, isEditing = true }) {
  const updateField = (field, val) => {
    onChange({ ...data, [field]: val });
  };

  const updateResourcePerson = (field, val) => {
    onChange({
      ...data,
      resourcePerson: {
        ...(data.resourcePerson || {}),
        [field]: val
      }
    });
  };

  const updateParticipants = (field, val) => {
    const updated = {
      ...(data.participants || {}),
      [field]: val
    };
    // auto recalculate total if numbers
    if (field === 'students' || field === 'faculty') {
      const s = parseInt(field === 'students' ? val : updated.students, 10) || 0;
      const f = parseInt(field === 'faculty' ? val : updated.faculty, 10) || 0;
      updated.total = s + f;
    }
    onChange({
      ...data,
      participants: updated
    });
  };

  const updateTakeaway = (idx, val) => {
    const list = [...(data.keyTakeaways || [])];
    list[idx] = val;
    onChange({ ...data, keyTakeaways: list });
  };

  const addTakeaway = () => {
    onChange({
      ...data,
      keyTakeaways: [...(data.keyTakeaways || []), 'New key takeaway from the workshop.']
    });
  };

  const removeTakeaway = (idx) => {
    onChange({
      ...data,
      keyTakeaways: (data.keyTakeaways || []).filter((_, i) => i !== idx)
    });
  };

  const updateOutcome = (idx, val) => {
    const list = [...(data.outcomes || [])];
    list[idx] = val;
    onChange({ ...data, outcomes: list });
  };

  const addOutcome = () => {
    onChange({
      ...data,
      outcomes: [...(data.outcomes || []), 'New outcome of the event.']
    });
  };

  const removeOutcome = (idx) => {
    onChange({
      ...data,
      outcomes: (data.outcomes || []).filter((_, i) => i !== idx)
    });
  };

  const updatePhoto = (idx, field, val) => {
    const list = [...(data.photos || [])];
    list[idx] = { ...list[idx], [field]: val };
    onChange({ ...data, photos: list });
  };

  const handlePhotoUpload = (e, idx) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      updatePhoto(idx, 'url', uploadEvent.target.result);
    };
    reader.readAsDataURL(file);
  };

  const addPhoto = () => {
    const currentLen = (data.photos || []).length;
    onChange({
      ...data,
      photos: [
        ...(data.photos || []),
        {
          caption: `Image 8.${currentLen + 1}: Event Photograph`,
          url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80'
        }
      ]
    });
  };

  const removePhoto = (idx) => {
    onChange({
      ...data,
      photos: (data.photos || []).filter((_, i) => i !== idx)
    });
  };

  const rp = data.resourcePerson || {};
  const part = data.participants || {};

  return (
    <div className="sit-document font-serif text-black leading-relaxed text-[12pt] bg-white shadow-lg print:shadow-none" style={{width:'794px', minHeight:'1123px', padding:'72px 72px 64px'}}>
      {/* 4-Logo Header */}
      <FourLogoHeader />

      {/* Title */}
      <div className="text-center my-6">
        <h2 className="text-[14pt] font-black tracking-wide uppercase">
          EVENT REPORT
        </h2>
        {isEditing ? (
          <input
            type="text"
            value={data.title || ''}
            onChange={(e) => updateField('title', e.target.value)}
            className="w-full text-center font-black text-[14pt] underline underline-offset-4 border-b border-surface-300 px-1 bg-yellow-50/40 print:bg-transparent print:border-none"
            placeholder='WORKSHOP / EVENT TITLE HERE'
          />
        ) : (
          <h3 className="text-[14pt] font-black underline underline-offset-4 mt-1">
            &ldquo;{data.title}&rdquo;
          </h3>
        )}
      </div>

      {/* Summary Metadata List 1..7 */}
      <div className="space-y-1 text-[11.5pt] mb-8 avoid-break">
        <p><span className="font-bold">1. Date: </span>{isEditing ? <input value={data.date || ''} onChange={e => updateField('date', e.target.value)} className="border-b px-1 bg-yellow-50/40 print:bg-transparent w-40" /> : data.date}</p>
        <p><span className="font-bold">2. Organized by: </span>{isEditing ? <input value={data.organizedBy || ''} onChange={e => updateField('organizedBy', e.target.value)} className="border-b px-1 w-80 bg-yellow-50/40 print:bg-transparent" /> : data.organizedBy}</p>
        <p><span className="font-bold">3. Venue: </span>{isEditing ? <input value={data.venue || ''} onChange={e => updateField('venue', e.target.value)} className="border-b px-1 bg-yellow-50/40 print:bg-transparent w-48" /> : data.venue}</p>
        <p><span className="font-bold">4. Coordinator: </span>{isEditing ? <input value={data.coordinator || ''} onChange={e => updateField('coordinator', e.target.value)} className="border-b px-1 w-64 bg-yellow-50/40 print:bg-transparent" /> : data.coordinator}</p>
        <p><span className="font-bold">5. Duration: </span>{isEditing ? <input value={data.duration || ''} onChange={e => updateField('duration', e.target.value)} className="border-b px-1 bg-yellow-50/40 print:bg-transparent w-24" /> : data.duration}</p>
        <p><span className="font-bold">6. Mode of Conduct: </span>{isEditing ? <input value={data.mode || ''} onChange={e => updateField('mode', e.target.value)} className="border-b px-1 bg-yellow-50/40 print:bg-transparent w-28" /> : data.mode}</p>
        <p><span className="font-bold">7. IIC Calendar Activity Type: </span>{isEditing ? <input value={data.activityType || ''} onChange={e => updateField('activityType', e.target.value)} className="border-b px-1 w-64 bg-yellow-50/40 print:bg-transparent" /> : data.activityType}</p>
      </div>

      {/* 1. Introduction */}
      <div className="mb-6">
        <h3 className="font-bold text-[12pt] mb-2">1. Introduction</h3>
        {isEditing ? (
          <textarea
            value={data.introduction || ''}
            onChange={(e) => updateField('introduction', e.target.value)}
            rows={5}
            className="w-full p-2 border border-surface-300 rounded font-serif text-[12pt] text-justify bg-yellow-50/40 print:bg-transparent print:border-none print:p-0 resize-y"
          />
        ) : (
          <p className="text-justify text-[12pt] indent-8">{data.introduction}</p>
        )}
      </div>

      {/* 2. Objective of the Activity */}
      <div className="mb-6 avoid-break">
        <h3 className="font-bold text-[12pt] mb-2">2. Objective of the Activity</h3>
        {isEditing ? (
          <textarea
            value={data.objective || ''}
            onChange={(e) => updateField('objective', e.target.value)}
            rows={3}
            className="w-full p-2 border border-surface-300 rounded font-serif text-[12pt] text-justify bg-yellow-50/40 print:bg-transparent print:border-none print:p-0 resize-y"
          />
        ) : (
          <p className="text-justify text-[12pt] indent-8">{data.objective}</p>
        )}
      </div>

      {/* 3. Resource Person */}
      <div className="mb-6 avoid-break">
        <h3 className="font-bold text-[12pt] mb-2">3. Resource Person</h3>
        <div className="pl-4 space-y-0.5 text-[12pt]">
          <p className="font-bold">
            {isEditing ? (
              <input value={rp.name || ''} onChange={e => updateResourcePerson('name', e.target.value)} className="font-bold border-b px-1 bg-yellow-50/40 print:bg-transparent" placeholder="Name" />
            ) : rp.name}
          </p>
          <p>
            {isEditing ? (
              <input value={rp.designation || ''} onChange={e => updateResourcePerson('designation', e.target.value)} className="border-b px-1 w-80 bg-yellow-50/40 print:bg-transparent" placeholder="Designation" />
            ) : rp.designation}
          </p>
          <p>
            {isEditing ? (
              <input value={rp.organization || ''} onChange={e => updateResourcePerson('organization', e.target.value)} className="border-b px-1 w-80 bg-yellow-50/40 print:bg-transparent" placeholder="Organization" />
            ) : rp.organization}
          </p>
        </div>
      </div>

      {/* 4. About the Speaker & Participants */}
      <div className="mb-6 avoid-break">
        <h3 className="font-bold text-[12pt] mb-2">4. About the Speaker</h3>
        {isEditing ? (
          <textarea
            value={data.speakerBio || ''}
            onChange={(e) => updateField('speakerBio', e.target.value)}
            rows={3}
            className="w-full p-2 border border-surface-300 rounded font-serif text-[12pt] text-justify bg-yellow-50/40 print:bg-transparent print:border-none print:p-0 resize-y"
          />
        ) : (
          <p className="text-justify text-[12pt] indent-8 mb-4">{data.speakerBio}</p>
        )}

        <div className="mt-4">
          <p className="font-bold text-[12pt] mb-1">Number of Participants</p>
          <ul className="list-disc pl-6 space-y-1 text-[12pt]">
            <li>Students: <span className="font-semibold">{isEditing ? <input type="number" value={part.students || ''} onChange={e => updateParticipants('students', e.target.value)} className="w-16 border-b px-1 bg-yellow-50/40 print:bg-transparent" /> : part.students}</span></li>
            <li>Faculty Members: <span className="font-semibold">{isEditing ? <input type="number" value={part.faculty || ''} onChange={e => updateParticipants('faculty', e.target.value)} className="w-16 border-b px-1 bg-yellow-50/40 print:bg-transparent" /> : part.faculty}</span></li>
            <li>Total Participants: <span className="font-bold">{part.total}</span></li>
          </ul>
        </div>
      </div>

      {/* 5. Brief Report of the Activity */}
      <div className="mb-6">
        <h3 className="font-bold text-[12pt] mb-2">5. Brief Report of the Activity</h3>
        {isEditing ? (
          <textarea
            value={data.briefReport || ''}
            onChange={(e) => updateField('briefReport', e.target.value)}
            rows={6}
            className="w-full p-2 border border-surface-300 rounded font-serif text-[12pt] bg-yellow-50/40 print:bg-transparent print:border-none print:p-0 resize-y"
          />
        ) : (
          <div className="text-justify text-[12pt] leading-relaxed" dangerouslySetInnerHTML={{ __html: data.briefReport }} />
        )}
      </div>

      {/* 6. Key Takeaways */}
      <div className="mb-6 avoid-break">
        <h3 className="font-bold text-[12pt] mb-2">6. Key Takeaways</h3>
        <ol className="list-decimal pl-6 space-y-1.5 text-[11.5pt]">
          {(data.keyTakeaways || []).map((item, idx) => (
            <li key={idx} className="group">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateTakeaway(idx, e.target.value)}
                    className="flex-1 border-b border-surface-300 px-1 bg-yellow-50/40 print:bg-transparent print:border-none font-serif text-[11.5pt]"
                  />
                  <button
                    type="button"
                    onClick={() => removeTakeaway(idx)}
                    className="text-red-500 text-xs px-1 opacity-0 group-hover:opacity-100 print:hidden"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <span>{item}</span>
              )}
            </li>
          ))}
        </ol>
        {isEditing && (
          <button
            type="button"
            onClick={addTakeaway}
            className="mt-2 text-xs font-sans text-brand-600 hover:text-brand-800 font-semibold print:hidden"
          >
            + Add Key Takeaway
          </button>
        )}
      </div>

      {/* 7. Outcome of the Activity */}
      <div className="mb-6 avoid-break">
        <h3 className="font-bold text-[12pt] mb-2">7. Outcome of the Activity</h3>
        <ul className="list-disc pl-6 space-y-1 text-[11.5pt]">
          {(data.outcomes || []).map((out, idx) => (
            <li key={idx} className="group">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={out}
                    onChange={(e) => updateOutcome(idx, e.target.value)}
                    className="flex-1 border-b border-surface-300 px-1 bg-yellow-50/40 print:bg-transparent print:border-none font-serif text-[11.5pt]"
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
            + Add Outcome
          </button>
        )}
      </div>

      {/* 8. Photographs of the Event */}
      <div className="mb-8">
        <h3 className="font-bold text-[12pt] mb-4">8. Photographs of the Event:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {(data.photos || []).map((photo, idx) => (
            <div key={idx} className="border border-surface-200 p-2 rounded-lg avoid-break bg-surface-50/30 print:border-none print:p-0">
              <div className="relative aspect-[4/3] bg-surface-200 rounded overflow-hidden flex items-center justify-center">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                />
                {isEditing && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2 print:hidden">
                    <label className="cursor-pointer bg-white text-surface-900 px-3 py-1.5 rounded-lg text-xs font-sans font-bold flex items-center gap-1 shadow">
                      <ImagePlus className="w-3.5 h-3.5" /> Replace
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handlePhotoUpload(e, idx)}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => removePhoto(idx)}
                      className="bg-red-600 text-white p-1.5 rounded-lg shadow hover:bg-red-700"
                      title="Remove Photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
              <div className="mt-2 text-center">
                {isEditing ? (
                  <input
                    type="text"
                    value={photo.caption}
                    onChange={(e) => updatePhoto(idx, 'caption', e.target.value)}
                    className="w-full text-center font-bold text-[10pt] border-b border-surface-300 bg-yellow-50/40 print:bg-transparent print:border-none"
                  />
                ) : (
                  <p className="font-bold text-[10pt]">{photo.caption}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {isEditing && (
          <button
            type="button"
            onClick={addPhoto}
            className="mt-4 text-xs font-sans text-brand-600 hover:text-brand-800 font-semibold print:hidden flex items-center gap-1"
          >
            <ImagePlus className="w-3.5 h-3.5" /> + Add Event Photo
          </button>
        )}
      </div>

      {/* 9. Conclusion */}
      <div className="mb-14 avoid-break">
        <h3 className="font-bold text-[12pt] mb-2">9. Conclusion</h3>
        {isEditing ? (
          <textarea
            value={data.conclusion || ''}
            onChange={(e) => updateField('conclusion', e.target.value)}
            rows={5}
            className="w-full p-2 border border-surface-300 rounded font-serif text-[12pt] text-justify bg-yellow-50/40 print:bg-transparent print:border-none print:p-0 resize-y"
          />
        ) : (
          <p className="text-justify text-[12pt] indent-8">{data.conclusion}</p>
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
