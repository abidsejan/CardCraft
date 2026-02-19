import { useEffect, useMemo, useRef, useState } from 'react';
import SkillTag from './SkillTag';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function toIso(year, month, day) {
  return `${String(year)}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function parseIso(iso) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso ?? '')) return null;
  const [y, m, d] = iso.split('-').map(Number);
  return { y, m: m - 1, d };
}

function formatDisplay(iso) {
  const parsed = parseIso(iso);
  if (!parsed) return '';
  return new Date(parsed.y, parsed.m, parsed.d).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  });
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{label}</span>
      {children}
    </label>
  );
}

export default function ProfileForm({ profile, setProfile, setSkills }) {
  const update = (key) => (e) => setProfile((prev) => ({ ...prev, [key]: e.target.value }));
  const selected = parseIso(profile.dob);
  const now = new Date();
  const [isDobOpen, setIsDobOpen] = useState(false);
  const [viewMonth, setViewMonth] = useState(selected ? selected.m : now.getMonth());
  const [viewYear, setViewYear] = useState(selected ? selected.y : now.getFullYear());
  const dobRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (event) => {
      if (!dobRef.current?.contains(event.target)) {
        setIsDobOpen(false);
      }
    };
    window.addEventListener('mousedown', onClickOutside);
    return () => window.removeEventListener('mousedown', onClickOutside);
  }, []);

  useEffect(() => {
    const parsed = parseIso(profile.dob);
    if (!parsed) return;
    setViewMonth(parsed.m);
    setViewYear(parsed.y);
  }, [profile.dob]);

  const yearOptions = useMemo(() => {
    const max = now.getFullYear();
    return Array.from({ length: 100 }, (_, i) => max - i);
  }, [now]);

  const daysInViewMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay();
  const leadingBlanks = Array.from({ length: firstWeekday }, (_, i) => `blank-${i}`);
  const dayNumbers = Array.from({ length: daysInViewMonth }, (_, i) => i + 1);

  const selectDob = (day) => {
    setProfile((prev) => ({ ...prev, dob: toIso(viewYear, viewMonth, day) }));
    setIsDobOpen(false);
  };

  const isSelected = (day) => selected && selected.y === viewYear && selected.m === viewMonth && selected.d === day;

  const onImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setProfile((prev) => ({ ...prev, image: reader.result }));
    reader.readAsDataURL(file);
  };

  return (
    <div className="panel">
      <p className="section-title">Profile Details</p>
      <div className="grid grid-cols-1 gap-3">
        <Field label="Name">
          <input value={profile.name} onChange={update('name')} className="form-input" placeholder="Full name" />
        </Field>

        <Field label="Role">
          <input value={profile.role} onChange={update('role')} className="form-input" placeholder="Role" />
        </Field>

        <div className="grid grid-cols-1 gap-2">
          <Field label="Date of Birth">
            <div className="dob-wrap" ref={dobRef}>
              <button type="button" className="dob-shell" onClick={() => setIsDobOpen((prev) => !prev)}>
                <span className="dob-icon" aria-hidden="true">📅</span>
                <span className={`dob-text ${profile.dob ? '' : 'dob-placeholder'}`}>{profile.dob ? formatDisplay(profile.dob) : 'Select date of birth'}</span>
                <span className="dob-caret" aria-hidden="true">▾</span>
              </button>

              {isDobOpen ? (
                <div className="dob-popover">
                  <div className="dob-head">
                    <select value={viewMonth} onChange={(e) => setViewMonth(Number(e.target.value))} className="form-input dob-select">
                      {monthNames.map((month, idx) => (
                        <option key={month} value={idx}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select value={viewYear} onChange={(e) => setViewYear(Number(e.target.value))} className="form-input dob-select">
                      {yearOptions.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="dob-weekdays">
                    <span>Su</span>
                    <span>Mo</span>
                    <span>Tu</span>
                    <span>We</span>
                    <span>Th</span>
                    <span>Fr</span>
                    <span>Sa</span>
                  </div>

                  <div className="dob-grid">
                    {leadingBlanks.map((key) => (
                      <span key={key} className="dob-blank" />
                    ))}
                    {dayNumbers.map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => selectDob(day)}
                        className={`dob-day ${isSelected(day) ? 'dob-day-active' : ''}`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </Field>
        </div>

        <Field label="Location">
          <input value={profile.location} onChange={update('location')} className="form-input" placeholder="Location" />
        </Field>

        <Field label="Bio">
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value.slice(0, 180) }))}
            rows={3}
            className="form-input resize-none"
            placeholder="Short professional intro"
          />
          <p className="mt-1 text-right text-[0.68rem] font-semibold text-slate-400 dark:text-slate-500">{profile.bio.length}/180</p>
        </Field>

        <Field label="Profile Image">
          <input
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            className="form-input file:mr-2 file:rounded-md file:border-0 file:bg-brand-600 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-white"
          />
        </Field>

        {profile.image ? (
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/70 p-2 dark:border-slate-700 dark:bg-slate-900/55">
            <img src={profile.image} alt="profile preview" className="h-10 w-10 rounded-lg object-cover" />
            <p className="text-xs font-medium text-slate-600 dark:text-slate-300">Preview ready</p>
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-2">
          <Field label="GitHub URL">
            <input value={profile.github} onChange={update('github')} className="form-input" placeholder="https://github.com/username" />
          </Field>
          <Field label="LinkedIn URL">
            <input value={profile.linkedin} onChange={update('linkedin')} className="form-input" placeholder="https://linkedin.com/in/username" />
          </Field>
          <Field label="Portfolio URL">
            <input value={profile.portfolio} onChange={update('portfolio')} className="form-input" placeholder="https://yourportfolio.com" />
          </Field>
          <Field label="Email">
            <input value={profile.email} onChange={update('email')} className="form-input" placeholder="name@email.com" />
          </Field>
        </div>

        <SkillTag skills={profile.skills} setSkills={setSkills} />
      </div>
    </div>
  );
}
