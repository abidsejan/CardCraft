import { forwardRef } from 'react';
import { motion } from 'framer-motion';

function formatDob(dob) {
  if (!dob) return '';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) return dob;
  const [year, month, day] = dob.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' });
}

function renderLink(label, value) {
  if (!value) return null;
  const href = value.includes('@') ? `mailto:${value}` : value;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="rounded-full border border-white/45 bg-white/14 px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-white/24"
    >
      {label}
    </a>
  );
}

function section(id, profile) {
  switch (id) {
    case 'avatar':
      return (
        <div className="flex justify-center" key={id}>
          {profile.image ? (
            <div className="rounded-[1.55rem] border border-white/35 bg-white/18 p-1.5 shadow-soft">
              <img src={profile.image} alt="avatar" className="h-24 w-24 rounded-[1.2rem] object-cover" />
            </div>
          ) : (
            <div className="h-24 w-24 rounded-[1.2rem] border border-white/35 bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.28)]" />
          )}
        </div>
      );
    case 'nameRole':
      if (!profile.name && !profile.role) return null;
      return (
        <div className="text-center" key={id}>
          {profile.name ? <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-[2rem]">{profile.name}</h2> : null}
          {profile.role ? <p className="text-sm font-medium text-white/85">{profile.role}</p> : null}
        </div>
      );
    case 'bio':
      if (!profile.bio) return null;
      return (
        <p key={id} className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-white/88">
          {profile.bio}
        </p>
      );
    case 'meta':
      if (!profile.location && !profile.dob) return null;
      return (
        <div key={id} className="flex flex-wrap justify-center gap-2 text-xs text-white/84">
          {profile.location ? <span className="rounded-full border border-white/35 bg-white/12 px-3 py-1">{profile.location}</span> : null}
          {profile.dob ? <span className="rounded-full border border-white/35 bg-white/12 px-3 py-1">{formatDob(profile.dob)}</span> : null}
        </div>
      );
    case 'skills':
      if (!profile.skills?.length) return null;
      return (
        <div key={id} className="flex flex-wrap justify-center gap-2">
          {profile.skills.map((skill) => (
            <motion.span
              key={skill}
              whileHover={{ y: -2 }}
              className="rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-semibold text-white"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      );
    case 'links':
      if (!profile.github && !profile.linkedin && !profile.portfolio && !profile.email) return null;
      return (
        <div key={id} className="flex flex-wrap justify-center gap-2">
          {renderLink('GitHub', profile.github)}
          {renderLink('LinkedIn', profile.linkedin)}
          {renderLink('Portfolio', profile.portfolio)}
          {renderLink('Email', profile.email)}
        </div>
      );
    default:
      return null;
  }
}

const LivePreview = forwardRef(function LivePreview({ profile, order, background, theme }, ref) {
  const blend = theme === 'dark' ? 'rgba(2,6,23,0.48)' : theme === 'light' ? 'rgba(7,23,38,0.22)' : 'rgba(2,6,23,0.36)';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="surface-card relative h-full overflow-hidden rounded-[1.75rem] p-6 md:p-8"
      style={{
        backgroundImage: background.gradient,
        backdropFilter: `blur(${background.blur}px)`
      }}
    >
      <div className="absolute inset-0" style={{ background: blend }} />
      <div className="absolute inset-0" style={{ background: background.tint, opacity: background.opacity / 100 }} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.28),transparent_54%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,rgba(255,255,255,0.05)_0%,transparent_45%,rgba(0,0,0,0.19)_100%)]" />
      <div className="pointer-events-none absolute inset-x-6 inset-y-6 rounded-[1.25rem] border border-white/24" />
      <div className="relative z-10 grid h-full content-center gap-4 md:gap-5">{order.map((id) => section(id, profile))}</div>
    </motion.div>
  );
});

export default LivePreview;
