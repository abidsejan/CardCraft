import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const themes = [
  { id: 'light', label: 'Ivory', hint: 'Soft daylight' },
  { id: 'dark', label: 'Noir', hint: 'Deep contrast' },
  { id: 'gradient', label: 'Aurora', hint: 'Studio blend' }
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="panel">
      <p className="section-title">Theme Engine</p>
      <div className="grid grid-cols-3 gap-2">
        {themes.map((item) => (
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ y: -2 }}
            key={item.id}
            onClick={() => setTheme(item.id)}
            className={`rounded-xl border px-3 py-2 text-left transition ${
              theme === item.id
                ? 'border-brand-500 bg-gradient-to-br from-brand-600 to-brand-700 text-white shadow-glow'
                : 'border-slate-300 bg-white/92 text-slate-900 hover:border-brand-400 dark:border-slate-700 dark:bg-slate-900/72 dark:text-slate-100'
            }`}
            type="button"
          >
            <p className="text-sm font-bold leading-tight">{item.label}</p>
            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.12em] opacity-90">{item.hint}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
