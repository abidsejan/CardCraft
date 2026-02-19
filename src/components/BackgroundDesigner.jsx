const presetGradients = [
  'linear-gradient(145deg, #4bc6b6 0%, #2d9ebf 40%, #122944 100%)',
  'linear-gradient(145deg, #4fbea4 0%, #2a8fa5 42%, #15324f 100%)',
  'linear-gradient(145deg, #58b7c2 0%, #337cb6 42%, #1c3260 100%)',
  'linear-gradient(145deg, #66be9e 0%, #328b98 42%, #1b3a57 100%)'
];

export default function BackgroundDesigner({ config, setConfig }) {
  return (
    <div className="panel">
      <p className="section-title">Background Studio</p>

      <label className="mb-2 block text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Tint Color</label>
      <input
        type="color"
        value={config.tint}
        onChange={(e) => setConfig((prev) => ({ ...prev, tint: e.target.value }))}
        className="mb-3 h-11 w-full cursor-pointer rounded-xl border border-slate-200 bg-white/82 p-1 dark:border-slate-700 dark:bg-slate-900/66"
      />

      <label className="mb-2 block text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Blur {config.blur}px</label>
      <input
        type="range"
        min={0}
        max={20}
        value={config.blur}
        onChange={(e) => setConfig((prev) => ({ ...prev, blur: Number(e.target.value) }))}
        className="mb-3 w-full accent-brand-600"
      />

      <label className="mb-2 block text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Overlay {config.opacity}%</label>
      <input
        type="range"
        min={0}
        max={100}
        value={config.opacity}
        onChange={(e) => setConfig((prev) => ({ ...prev, opacity: Number(e.target.value) }))}
        className="mb-3 w-full accent-brand-600"
      />

      <label className="mb-2 block text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Gradient Presets</label>
      <div className="grid grid-cols-2 gap-2">
        {presetGradients.map((gradient) => (
          <button
            type="button"
            key={gradient}
            onClick={() => setConfig((prev) => ({ ...prev, gradient }))}
            className="h-10 rounded-xl border border-white/50 shadow-sm transition hover:scale-[1.015]"
            style={{ background: gradient }}
          />
        ))}
      </div>
    </div>
  );
}
