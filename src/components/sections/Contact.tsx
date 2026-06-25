import { useState } from 'react';
import { motion } from 'framer-motion';
import { PortfolioData } from '../../types';
import { FiMail, FiGithub, FiLinkedin, FiCopy, FiCheck } from 'react-icons/fi';

export const Contact: React.FC<{ data: PortfolioData }> = ({ data }) => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(data.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 px-8 max-w-6xl mx-auto" id="contact">
      <div className="text-xs tracking-[0.2em] uppercase text-muted mb-2">Say Hello</div>
      <h2 className="font-display text-[clamp(1.7rem,4vw,2.6rem)] font-bold tracking-tight mb-12 text-text relative inline-block">
        Contact
        <span className="absolute -bottom-2 left-0 w-8 h-[1px] bg-gradient-to-r from-accent to-[#b87fff]" />
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-base text-muted leading-relaxed mb-8">
            Whether you have a project in mind, a question, or just want to connect — my inbox is always open. I'll try my best to get back to you!
          </p>
          <div className="flex flex-col gap-3">
            <a href={`mailto:${data.email}`} className="flex items-center gap-3 p-3 rounded-lg border border-transparent hover:border-[#b87fff]/20 hover:bg-[#b87fff]/5 hover:translate-x-1 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-lg bg-surface2 border border-border flex items-center justify-center shrink-0 group-hover:text-accent transition-colors">
                <FiMail size={18} />
              </div>
              <span className="text-sm font-medium">{data.email}</span>
            </a>
            <a href={data.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-lg border border-transparent hover:border-[#b87fff]/20 hover:bg-[#b87fff]/5 hover:translate-x-1 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-lg bg-surface2 border border-border flex items-center justify-center shrink-0 group-hover:text-accent transition-colors">
                <FiGithub size={18} />
              </div>
              <span className="text-sm font-medium">GitHub Profile</span>
            </a>
            <a href={data.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-lg border border-transparent hover:border-[#b87fff]/20 hover:bg-[#b87fff]/5 hover:translate-x-1 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-lg bg-surface2 border border-border flex items-center justify-center shrink-0 group-hover:text-accent transition-colors">
                <FiLinkedin size={18} />
              </div>
              <span className="text-sm font-medium">LinkedIn Network</span>
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center bg-surface border border-border rounded-2xl p-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-[#b87fff]/5 pointer-events-none" />
          <div className="text-center relative z-10">
            <h3 className="font-display text-3xl font-bold mb-4 grad-text">Let's build<br/>something great.</h3>
            <p className="text-sm text-muted mb-6">Open to freelance & full-time roles.</p>
            <button 
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-border bg-surface2 text-sm hover:border-[#b87fff]/50 transition-colors"
            >
              {copied ? <FiCheck className="text-green-400"/> : <FiCopy />}
              {copied ? 'Email Copied!' : 'Copy Email Address'}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
