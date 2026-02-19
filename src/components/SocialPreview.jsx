const platforms = {
  linkedin: { label: 'LinkedIn', ratio: 'aspect-[1.91/1]' },
  x: { label: 'X / Twitter', ratio: 'aspect-[16/9]' },
  instagram: { label: 'Instagram', ratio: 'aspect-square' },
  github: { label: 'GitHub README', ratio: 'aspect-[2/1]' },
  mobile: { label: 'Mobile', ratio: 'aspect-[9/16]' }
};

export default function SocialPreview({ platform, setPlatform, children }) {
  return (
    <div className="panel p-5">
      <p className="section-title !mb-2">Preview Surfaces</p>
      <div className="mb-4 flex flex-wrap gap-2">
        {Object.entries(platforms).map(([key, item]) => (
          <button
            type="button"
            key={key}
            onClick={() => setPlatform(key)}
            className={`action-btn border ${
              platform === key
                ? 'border-brand-500 bg-gradient-to-br from-brand-600 to-brand-700 text-white shadow-glow'
                : 'border-slate-200 bg-white/74 text-slate-700 dark:border-slate-700 dark:bg-slate-900/66 dark:text-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className={`surface-card mx-auto w-full max-w-4xl overflow-hidden ${platforms[platform].ratio}`}>
        <div className="h-full w-full bg-gradient-to-b from-white/10 to-black/10 p-4 dark:from-white/[0.04] dark:to-black/[0.22]">{children}</div>
      </div>
    </div>
  );
}
