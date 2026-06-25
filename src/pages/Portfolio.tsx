import { useStorage } from '../hooks/useStorage';
import { Navbar } from '../components/sections/Navbar';
import { Hero } from '../components/sections/Hero';
import { Skills } from '../components/sections/Skills';
import { Projects } from '../components/sections/Projects';
import { Contact } from '../components/sections/Contact';
import { Footer } from '../components/sections/Footer';

export const Portfolio: React.FC = () => {
    const { data, resumeUrl } = useStorage();

  if (!data) return (
    <div className="min-h-screen bg-bg flex items-center justify-center text-muted">
      Loading...
    </div>
  );

  return (
    <>
      <Navbar name={data.name} />
      <main className="relative z-[2]">
          <Hero data={data} resumeUrl={resumeUrl} />
        <Skills data={data} />
        <Projects data={data} />
        <Contact data={data} />
        <Footer name={data.name} />
      </main>
    </>
  );
};
