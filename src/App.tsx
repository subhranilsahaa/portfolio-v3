import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useStorage } from './hooks/useStorage';
import { Navbar } from './components/sections/Navbar';
import { Hero } from './components/sections/Hero';
import { Skills } from './components/sections/Skills';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';
import { AdminPage } from './pages/AdminPage';

function Portfolio() {
  const { data, resumeUrl, loading } = useStorage();

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          <span className="text-sm text-muted">Loading…</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar name={data.name} />
      <main>
        <Hero data={data} resumeUrl={resumeUrl} />
        <Skills data={data} />
        <Projects data={data} />
        <Contact data={data} />
      </main>
      <footer className="py-8 text-center text-xs text-muted border-t border-border">
        © {new Date().getFullYear()} {data.name}. Built with React & Tailwind.
      </footer>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
