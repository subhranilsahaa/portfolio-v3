import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PortfolioData } from '../../types';

export const Skills: React.FC<{ data: PortfolioData }> = ({ data }) => {
  const [activeCat, setActiveCat] = useState('All');
  
  const categories = useMemo(() => 
    ['All', ...Array.from(new Set(data.skills.map(s => s.category)))], 
  [data.skills]);

  const filtered = useMemo(() => 
    data.skills.filter(s => activeCat === 'All' || s.category === activeCat),
  [data.skills, activeCat]);

  return (
    <section className="py-24 px-8 max-w-6xl mx-auto" id="skills">
      <div className="text-xs tracking-[0.2em] uppercase text-muted mb-2">What I Know</div>
      <h2 className="font-display text-[clamp(1.7rem,4vw,2.6rem)] font-bold tracking-tight mb-12 text-text relative inline-block">
        Skills & Tools
        <span className="absolute -bottom-2 left-0 w-8 h-[1px] bg-gradient-to-r from-accent to-[#b87fff]" />
      </h2>

      <div className="flex gap-2 flex-wrap mb-10">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setActiveCat(cat)}
            className={`px-4 py-1.5 rounded-full text-sm border transition-all duration-200 ${
              activeCat === cat 
                ? 'bg-[#b87fff]/10 text-[#b87fff] border-[#b87fff]/30' 
                : 'bg-surface text-muted border-border hover:border-[#b87fff]/30 hover:text-[#b87fff]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((skill, i) => (
          <motion.div 
            key={skill.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="bg-surface border border-border rounded-xl p-5 relative overflow-hidden group hover:border-[#b87fff]/25 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(126,170,255,0.07)] transition-all duration-300"
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#b87fff]/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-sm">{skill.name}</span>
              <span className="text-xs font-bold grad-text">{skill.level}%</span>
            </div>
            <div className="h-[2px] bg-white/5 rounded-full overflow-hidden mb-2">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-full bg-[linear-gradient(90deg,#7eaaff,#b87fff,#ff7eb3)] bg-[length:200%_auto] animate-grad-move rounded-full shadow-[0_0_6px_rgba(184,127,255,0.3)]" 
              />
            </div>
            <div className="text-[0.68rem] text-muted">{skill.category}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
