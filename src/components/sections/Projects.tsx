import { motion } from 'framer-motion';
import { PortfolioData } from '../../types';
import { FiArrowUpRight, FiGithub } from 'react-icons/fi';

export const Projects: React.FC<{ data: PortfolioData }> = ({ data }) => {
  return (
    <section className="py-24 px-8 max-w-6xl mx-auto" id="projects">
      <div className="text-xs tracking-[0.2em] uppercase text-muted mb-2">What I've Built</div>
      <h2 className="font-display text-[clamp(1.7rem,4vw,2.6rem)] font-bold tracking-tight mb-12 text-text relative inline-block">
        Projects
        <span className="absolute -bottom-2 left-0 w-8 h-[1px] bg-gradient-to-r from-accent to-[#b87fff]" />
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.projects.map((proj, i) => (
          <motion.div 
            key={proj.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface border border-border rounded-xl p-7 flex flex-col gap-4 relative overflow-hidden group hover:border-[#b87fff]/30 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(126,170,255,0.08)] transition-all duration-300"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(126,170,255,0.06),transparent_55%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#b87fff]/45 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <h3 className="font-display text-lg font-semibold z-10">{proj.title}</h3>
            <p className="text-sm text-muted leading-relaxed flex-1 z-10">{proj.description}</p>
            
            <div className="flex gap-2 flex-wrap z-10">
              {proj.tags.map(t => (
                <span key={t} className="text-[0.68rem] px-2.5 py-1 rounded-full bg-accent-dim text-[#8db8ff] border border-accent/10">
                  {t}
                </span>
              ))}
            </div>
            
            <div className="pt-4 mt-2 border-t border-border/50 flex gap-4 z-10">
              <a href={proj.url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm font-medium grad-text hover:opacity-80 transition-opacity">
                Live Demo <FiArrowUpRight />
              </a>
              <a href="#" className="flex items-center gap-1.5 text-sm font-medium text-muted hover:text-text transition-colors">
                <FiGithub /> Code
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
