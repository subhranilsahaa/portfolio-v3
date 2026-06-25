import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Portfolio } from './pages/Portfolio';
import { Admin } from './pages/Admin';
import { Login } from './pages/Login';

const NotFound = () => (
  <div className="min-h-screen bg-bg flex flex-col items-center justify-center text-center">
    <h1 className="text-6xl font-display font-bold grad-text mb-4">404</h1>
    <p className="text-muted mb-8">The page you are looking for doesn't exist.</p>
    <a href="/" className="px-6 py-2 rounded-full bg-surface border border-border hover:border-accent text-sm">Go Home</a>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
