import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ProfileForm from './components/ProfileForm';
import LivePreview from './components/LivePreview';
import ThemeSwitcher from './components/ThemeSwitcher';
import LayoutBuilder from './components/LayoutBuilder';
import SocialPreview from './components/SocialPreview';
import BackgroundDesigner from './components/BackgroundDesigner';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { exportCardAsImage, exportCardAsPDF } from './utils/exportCard';

const initialProfile = {
  name: '',
  role: '',
  dob: '',
  location: '',
  bio: '',
  image: '',
  skills: [],
  github: '',
  linkedin: '',
  portfolio: '',
  email: ''
};

const initialOrder = ['avatar', 'nameRole', 'bio', 'meta', 'skills', 'links'];

function CardCraftApp() {
  const { theme } = useTheme();
  const previewRef = useRef(null);
  const [profile, setProfile] = useState(initialProfile);
  const [order, setOrder] = useState(initialOrder);
  const [platform, setPlatform] = useState('linkedin');
  const [background, setBackground] = useState({
    gradient: 'linear-gradient(145deg, #4abfae 0%, #2e9fc2 48%, #1a3658 100%)',
    tint: '#041a24',
    blur: 1,
    opacity: 10
  });

  const setSkills = (value) => {
    if (typeof value === 'function') {
      setProfile((prev) => ({ ...prev, skills: value(prev.skills) }));
      return;
    }
    setProfile((prev) => ({ ...prev, skills: value }));
  };

  return (
    <main className={`studio-shell relative min-h-screen overflow-hidden p-4 md:p-8 ${theme === 'light' ? 'app-bg-light' : theme === 'dark' ? 'app-bg-dark' : 'app-bg-gradient'}`}>
      <div className="atmosphere">
        <div className="orb orb-one" />
        <div className="orb orb-two" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1480px] gap-6 xl:grid-cols-[400px_minmax(0,1fr)]">
        <motion.section initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="space-y-4 xl:sticky xl:top-6 xl:h-fit">
          <div className="panel panel-soft py-4">
            <p className="section-title !mb-1">CardCraft</p>
            <h2 className="font-display text-[1.35rem] font-bold tracking-tight text-slate-900 dark:text-slate-100">Profile Card Editor</h2>
          </div>
          <ThemeSwitcher />
          <ProfileForm profile={profile} setProfile={setProfile} setSkills={setSkills} />
          <BackgroundDesigner config={background} setConfig={setBackground} />
          <LayoutBuilder order={order} setOrder={setOrder} />

          <div className="panel">
            <p className="section-title">Export Studio</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => exportCardAsImage(previewRef.current, { filename: 'cardcraft-profile.png' })}
                className="action-btn btn-primary"
              >
                High-Res PNG
              </button>
              <button
                type="button"
                onClick={() => exportCardAsPDF(previewRef.current)}
                className="action-btn btn-neutral"
              >
                Print PDF
              </button>
              <button
                type="button"
                onClick={() => exportCardAsImage(previewRef.current, { filename: 'cardcraft-social.png', scale: 4 })}
                className="action-btn btn-accent col-span-2"
              >
                Social Optimized Export
              </button>
            </div>
          </div>
        </motion.section>

        <section className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="panel py-5">
            <h1 className="mt-1 font-display text-4xl font-bold tracking-tight text-slate-950 dark:text-slate-100 lg:text-[3.35rem]">CardCraft Studio</h1>
          </motion.div>

          <SocialPreview platform={platform} setPlatform={setPlatform}>
            <LivePreview ref={previewRef} profile={profile} order={order} background={background} theme={theme} />
          </SocialPreview>
        </section>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CardCraftApp />
    </ThemeProvider>
  );
}
