import { motion } from 'framer-motion';
import { PortfolioData } from '../../types';
import { Aurora } from '../ui/Aurora';
import { GlitchText } from '../ui/GlitchText';
import { useTypewriter } from '../ui/Typewriter';
import { FiGithub, FiLinkedin, FiDownload } from 'react-icons/fi';

interface HeroProps {
  data: PortfolioData;
  resumeUrl: string;
}

export const Hero: React.FC<HeroProps> = ({ data, resumeUrl }) => {
  const roleCursor = useTypewriter(data.roles);

  const keywords = ['clean code', 'sharp design', 'digital experiences', 'architecture'];
  const bioParts = data.bio.split(new RegExp(`(${keywords.join('|')})`, 'gi'));

  return (
    <section className="min-h-screen flex items-center justify-center text-center p-8 relative overflow-hidden bg-bg" id="about">
      <Aurora />

      <div className="absolute inset-0 z-[1] bg-[linear-gradient(rgba(126,170,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(126,170,255,0.025)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,black_20%,transparent_100%)] pointer-events-none" />

      <div className="absolute left-0 right-0 top-1/2 z-[1] h-[1px] bg-[linear-gradient(90deg,transparent_0%,rgba(126,170,255,0.12)_20%,rgba(184,127,255,0.15)_50%,rgba(126,170,255,0.12)_80%,transparent_100%)] -translate-y-1/2 pointer-events-none" />

      <div className="max-w-[720px] relative z-[3]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2.5 text-xs tracking-[0.2em] uppercase text-muted mb-7 border border-border bg-surface2/50 backdrop-blur-sm px-4 py-1.5 rounded-full"
        >
          <span className="w-2 h-2 rounded-full bg-gradient-to-br from-accent to-[#b87fff] shadow-[0_0_8px_rgba(126,170,255,0.7)] animate-pulse" />
          Available for work
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-display text-[clamp(3rem,8.5vw,6.2rem)] font-bold leading-none tracking-tight mb-2"
        >
          <GlitchText
            text={data.name}
            className="inline-block relative bg-[linear-gradient(105deg,#e4e8f4_0%,#e4e8f4_30%,#fff_44%,rgba(255,255,255,0.98)_50%,#fff_56%,#e4e8f4_70%,#e4e8f4_100%)] bg-[length:250%_100%] bg-clip-text text-transparent animate-shimmer"
          />
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-display text-[clamp(1.1rem,3vw,1.85rem)] font-light tracking-tight min-h-[2.8rem] mb-9"
        >
          <span className="grad-text font-medium">{roleCursor}</span>
          <span className="inline-block w-[2px] h-[0.88em] bg-gradient-to-b from-[#b87fff] to-accent ml-[3px] animate-blink align-middle shadow-[0_0_8px_rgba(184,127,255,0.7)]" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-base md:text-lg text-muted leading-relaxed max-w-[520px] mx-auto mb-11"
        >
          {bioParts.map((part, i) =>
            keywords.some((k) => k.toLowerCase() === part.toLowerCase()) ? (
              <strong
                key={i}
                className="font-medium bg-[linear-gradient(90deg,#c8d8ff,#b87fff)] bg-[length:200%_auto] bg-clip-text text-transparent animate-grad-move"
              >
                {part}
              </strong>
            ) : (
              part
            )
          )}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a
            href="#projects"
            className="relative overflow-hidden px-8 py-3.5 rounded-full font-semibold text-sm bg-[linear-gradient(90deg,#7eaaff,#b87fff,#ff7eb3,#7eaaff)] bg-[length:200%_auto] text-white animate-grad-move shadow-[0_0_28px_rgba(126,170,255,0.22),0_0_60px_rgba(184,127,255,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(184,127,255,0.4),0_4px_24px_rgba(0,0,0,0.4)] group"
          >
            <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_30%,rgba(255,255,255,0.18)_50%,transparent_70%)] bg-[length:200%_100%] animate-btn-gloss" />
            <span className="relative z-10">View My Work</span>
          </a>

          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full font-medium text-sm bg-transparent text-text border border-border backdrop-blur-md transition-all duration-300 hover:border-[#b87fff]/45 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(184,127,255,0.08)]"
          >
            Get in Touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex justify-center gap-6 mt-10"
        >
          <a href={data.github} target="_blank" rel="noreferrer" className="text-muted hover:text-text transition-colors">
            <FiGithub size={20} />
          </a>
          <a href={data.linkedin} target="_blank" rel="noreferrer" className="text-muted hover:text-text transition-colors">
            <FiLinkedin size={20} />
          </a>
          {/* ← resumeUrl now comes from Supabase, editable from admin */}
          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="text-muted hover:text-text transition-colors flex items-center gap-1 text-sm"
          >
            <FiDownload size={18} /> Resume
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[0.65rem] text-muted tracking-[0.16em] uppercase z-[3]"
      >
        <div className="w-[1px] h-9 bg-gradient-to-b from-accent/60 to-transparent animate-scroll-anim" />
        Scroll
      </motion.div>
    </section>
  );
};
