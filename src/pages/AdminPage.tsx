import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSave, FiPlus, FiTrash2, FiLogOut, FiLock, FiLink, FiCheck } from 'react-icons/fi';
import { PortfolioData, Skill, Project } from '../types';
import { DEFAULT_DATA } from '../data/defaultData';
import { useStorage } from '../hooks/useStorage';

/* ─── tiny helpers ──────────────────────────────────────────────────────── */
const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string }> = ({ label, ...props }) => (
  <div className="flex flex-col gap-1.5">
    {label && <label className="text-xs text-muted tracking-wide">{label}</label>}
    <input
      {...props}
      className="w-full bg-surface2 border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-accent/40 transition-colors"
    />
  </div>
);

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }> = ({ label, ...props }) => (
  <div className="flex flex-col gap-1.5">
    {label && <label className="text-xs text-muted tracking-wide">{label}</label>}
    <textarea
      {...props}
      rows={3}
      className="w-full bg-surface2 border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-accent/40 transition-colors resize-none"
    />
  </div>
);

/* ─── Section header ─────────────────────────────────────────────────────── */
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="font-display font-semibold text-sm text-text border-b border-border pb-2 mb-4">{children}</h3>
);

/* ═══════════════════════════════════════════════════════════════════════════
   ADMIN PAGE
═══════════════════════════════════════════════════════════════════════════ */
export const AdminPage: React.FC = () => {
  const { data, adminPassword, resumeUrl, loading, saveData, changePassword, saveResumeUrl } = useStorage();

  /* auth */
  const [authed, setAuthed] = useState(false);
  const [loginPw, setLoginPw] = useState('');
  const [loginErr, setLoginErr] = useState('');

  /* form state */
  const [form, setForm] = useState<PortfolioData | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  /* change-password panel */
  const [pwPanel, setPwPanel] = useState(false);
  const [curPw, setCurPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [pwErr, setPwErr] = useState('');
  const [pwOk, setPwOk] = useState(false);

  /* resume URL */
  const [resumeInput, setResumeInput] = useState('');
  const [resumeSaved, setResumeSaved] = useState(false);

  useEffect(() => {
    if (data && !form) setForm(JSON.parse(JSON.stringify(data)));
  }, [data]);

  useEffect(() => {
    if (resumeUrl) setResumeInput(resumeUrl);
  }, [resumeUrl]);

  /* ── Login ─────────────────────────────────────────────────────────────── */
  const handleLogin = () => {
    if (loginPw === adminPassword) {
      setAuthed(true);
      setLoginErr('');
    } else {
      setLoginErr('Incorrect password.');
    }
  };

  /* ── Save portfolio data ────────────────────────────────────────────────── */
  const handleSave = async () => {
    if (!form) return;
    setSaving(true);
    const ok = await saveData(form);
    setSaving(false);
    if (ok) { setSaved(true); setTimeout(() => setSaved(false), 2500); }
  };

  /* ── Change password ────────────────────────────────────────────────────── */
  const handleChangePw = async () => {
    setPwErr('');
    const err = await changePassword(curPw, newPw);
    if (err) { setPwErr(err); return; }
    setPwOk(true);
    setCurPw(''); setNewPw('');
    setTimeout(() => { setPwOk(false); setPwPanel(false); }, 2000);
  };

  /* ── Save resume URL ────────────────────────────────────────────────────── */
  const handleSaveResume = async () => {
    const ok = await saveResumeUrl(resumeInput.trim() || '/resume.pdf');
    if (ok) { setResumeSaved(true); setTimeout(() => setResumeSaved(false), 2000); }
  };

  /* ── Skill helpers ──────────────────────────────────────────────────────── */
  const updateSkill = (id: number, key: keyof Skill, value: string | number) =>
    setForm(prev => prev ? { ...prev, skills: prev.skills.map(s => s.id === id ? { ...s, [key]: value } : s) } : prev);

  const addSkill = () =>
    setForm(prev => prev ? {
      ...prev,
      skills: [...prev.skills, { id: Date.now(), name: 'New Skill', category: 'Frontend', level: 70 }]
    } : prev);

  const removeSkill = (id: number) =>
    setForm(prev => prev ? { ...prev, skills: prev.skills.filter(s => s.id !== id) } : prev);

  /* ── Project helpers ────────────────────────────────────────────────────── */
  const updateProject = (id: number, key: keyof Project, value: string | string[]) =>
    setForm(prev => prev ? { ...prev, projects: prev.projects.map(p => p.id === id ? { ...p, [key]: value } : p) } : prev);

  const addProject = () =>
    setForm(prev => prev ? {
      ...prev,
      projects: [...prev.projects, { id: Date.now(), title: 'New Project', description: '', tags: [], url: '#' }]
    } : prev);

  const removeProject = (id: number) =>
    setForm(prev => prev ? { ...prev, projects: prev.projects.filter(p => p.id !== id) } : prev);

  /* ── Loading ────────────────────────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center text-muted text-sm">
        Loading from Supabase…
      </div>
    );
  }

  /* ── Login wall ─────────────────────────────────────────────────────────── */
  if (!authed) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm bg-surface border border-border rounded-2xl p-8 flex flex-col gap-5"
        >
          <div className="flex flex-col gap-1">
            <h1 className="font-display font-bold text-xl text-text">Admin Login</h1>
            <p className="text-xs text-muted">Enter your admin password to continue.</p>
          </div>
          <Input
            type="password"
            placeholder="Password"
            value={loginPw}
            onChange={e => setLoginPw(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            label="Password"
          />
          {loginErr && <p className="text-xs text-red-400">{loginErr}</p>}
          <button
            onClick={handleLogin}
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-accent to-[#b87fff] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Login
          </button>
        </motion.div>
      </div>
    );
  }

  if (!form) return null;

  /* ── Admin Panel ─────────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-bg text-text">
      {/* topbar */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-6 h-14 bg-surface border-b border-border backdrop-blur-xl">
        <span className="font-display font-bold text-sm grad-text">Admin Panel</span>
        <div className="flex gap-2">
          <button
            onClick={() => setPwPanel(v => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-muted hover:text-text border border-border hover:border-[#b87fff]/30 transition-all"
          >
            <FiLock size={13} /> Password
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-accent to-[#b87fff] text-white hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saved ? <><FiCheck size={13} /> Saved!</> : saving ? 'Saving…' : <><FiSave size={13} /> Save All</>}
          </button>
          <button
            onClick={() => setAuthed(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-muted hover:text-text border border-border hover:border-red-400/30 transition-all"
          >
            <FiLogOut size={13} />
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col gap-8">

        {/* ── Change Password Panel ── */}
        <AnimatePresence>
          {pwPanel && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-surface border border-[#b87fff]/20 rounded-xl p-5 flex flex-col gap-4">
                <SectionTitle>🔒 Change Admin Password</SectionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input label="Current Password" type="password" value={curPw} onChange={e => setCurPw(e.target.value)} placeholder="Current password" />
                  <Input label="New Password (min 6 chars)" type="password" value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="New password" />
                </div>
                {pwErr && <p className="text-xs text-red-400">{pwErr}</p>}
                {pwOk && <p className="text-xs text-green-400">Password changed successfully!</p>}
                <button
                  onClick={handleChangePw}
                  className="self-start px-4 py-2 rounded-lg text-xs font-semibold bg-[#b87fff]/15 text-[#b87fff] border border-[#b87fff]/30 hover:bg-[#b87fff]/25 transition-all"
                >
                  Update Password
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Resume URL ── */}
        <div className="bg-surface border border-border rounded-xl p-5 flex flex-col gap-4">
          <SectionTitle>📄 Resume Link</SectionTitle>
          <div className="flex gap-2">
            <Input
              label="Resume URL (path or full URL)"
              value={resumeInput}
              onChange={e => setResumeInput(e.target.value)}
              placeholder="https://... or /resume.pdf"
            />
          </div>
          <button
            onClick={handleSaveResume}
            className="self-start flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-all"
          >
            {resumeSaved ? <><FiCheck size={13} /> Saved!</> : <><FiLink size={13} /> Save Resume URL</>}
          </button>
        </div>

        {/* ── Identity ── */}
        <div className="bg-surface border border-border rounded-xl p-5 flex flex-col gap-4">
          <SectionTitle>👤 Identity</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <Input label="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            <Input label="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <Input label="GitHub URL" value={form.github} onChange={e => setForm({ ...form, github: e.target.value })} />
            <Input label="LinkedIn URL" value={form.linkedin} onChange={e => setForm({ ...form, linkedin: e.target.value })} />
          </div>
          <Textarea label="Bio" value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} />
          <Input
            label='Roles (comma-separated, e.g. "Developer, Designer")'
            value={form.roles.join(', ')}
            onChange={e => setForm({ ...form, roles: e.target.value.split(',').map(r => r.trim()).filter(Boolean) })}
          />
        </div>

        {/* ── Skills ── */}
        <div className="bg-surface border border-border rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <SectionTitle>⚡ Skills</SectionTitle>
            <button onClick={addSkill} className="flex items-center gap-1 text-xs text-accent hover:opacity-80">
              <FiPlus size={13} /> Add
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {form.skills.map((skill) => (
              <div key={skill.id} className="grid grid-cols-[1fr_1fr_80px_32px] gap-2 items-end">
                <Input label="Name" value={skill.name} onChange={e => updateSkill(skill.id, 'name', e.target.value)} />
                <Input label="Category" value={skill.category} onChange={e => updateSkill(skill.id, 'category', e.target.value)} />
                <Input label="Level %" type="number" min={0} max={100} value={skill.level} onChange={e => updateSkill(skill.id, 'level', Number(e.target.value))} />
                <button onClick={() => removeSkill(skill.id)} className="h-9 self-end flex items-center justify-center text-muted hover:text-red-400 transition-colors">
                  <FiTrash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── Projects ── */}
        <div className="bg-surface border border-border rounded-xl p-5 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <SectionTitle>🚀 Projects</SectionTitle>
            <button onClick={addProject} className="flex items-center gap-1 text-xs text-accent hover:opacity-80">
              <FiPlus size={13} /> Add
            </button>
          </div>
          {form.projects.map((proj) => (
            <div key={proj.id} className="border border-border rounded-lg p-4 flex flex-col gap-3 relative">
              <button
                onClick={() => removeProject(proj.id)}
                className="absolute top-3 right-3 text-muted hover:text-red-400 transition-colors"
              >
                <FiTrash2 size={14} />
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input label="Title" value={proj.title} onChange={e => updateProject(proj.id, 'title', e.target.value)} />
                <Input label="URL" value={proj.url} onChange={e => updateProject(proj.id, 'url', e.target.value)} />
              </div>
              <Textarea label="Description" value={proj.description} onChange={e => updateProject(proj.id, 'description', e.target.value)} />
              <Input
                label='Tags (comma-separated)'
                value={proj.tags.join(', ')}
                onChange={e => updateProject(proj.id, 'tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
              />
            </div>
          ))}
        </div>

        {/* bottom save */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-accent to-[#b87fff] text-white hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {saved ? '✓ All Changes Saved!' : saving ? 'Saving to Supabase…' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
};
