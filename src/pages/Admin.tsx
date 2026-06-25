import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PortfolioData, Skill, Project } from '../types';
import { useStorage } from '../hooks/useStorage';
import { FiLogOut, FiUser, FiCode, FiFolder, FiMail, FiSave, FiPlus, FiEdit2, FiTrash2, FiX, FiLock } from 'react-icons/fi';

export const Admin: React.FC = () => {
  const navigate = useNavigate();
  const { data: initialData, saveData } = useStorage();
  const [data, setData] = useState<PortfolioData | null>(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [savedStatus, setSavedStatus] = useState(false);

  const [editSkill, setEditSkill] = useState<Skill | null>(null);
  const [editProject, setEditProject] = useState<Project | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') !== 'true') navigate('/login');
    if (initialData && !data) setData(initialData);
  }, [navigate, initialData, data]);

  if (!data) return <div className="min-h-screen bg-bg flex items-center justify-center text-muted">Loading...</div>;

  const handleSave = () => {
    saveData(data);
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2000);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    navigate('/');
  };

  const saveSkill = () => {
    if (!editSkill) return;
    const exists = data.skills.find(s => s.id === editSkill.id);
    setData({
      ...data,
      skills: exists 
        ? data.skills.map(s => s.id === editSkill.id ? editSkill : s)
        : [...data.skills, editSkill]
    });
    setEditSkill(null);
  };

  const deleteSkill = (id: number) => {
    setData({ ...data, skills: data.skills.filter(s => s.id !== id) });
  };

  const saveProject = () => {
    if (!editProject) return;
    const exists = data.projects.find(p => p.id === editProject.id);
    setData({
      ...data,
      projects: exists 
        ? data.projects.map(p => p.id === editProject.id ? editProject : p)
        : [...data.projects, editProject]
    });
    setEditProject(null);
  };

  const deleteProject = (id: number) => {
    setData({ ...data, projects: data.projects.filter(p => p.id !== id) });
  };

  return (
    <div className="flex h-screen bg-bg text-text font-body overflow-hidden">
      <div className="w-64 bg-surface border-r border-border p-6 flex flex-col shrink-0">
        <div className="font-display font-bold text-lg mb-8 grad-text">Admin Panel</div>
        
        <nav className="flex-1 flex flex-col gap-2">
          {[
            { id: 'profile', icon: <FiUser />, label: 'Profile' },
            { id: 'skills', icon: <FiCode />, label: 'Skills' },
            { id: 'projects', icon: <FiFolder />, label: 'Projects' },
            { id: 'contact', icon: <FiMail />, label: 'Contact' },
            { id: 'security', icon: <FiLock />, label: 'Security' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                activeTab === tab.id ? 'bg-[#b87fff]/10 text-[#b87fff]' : 'text-muted hover:bg-surface2 hover:text-text'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>

        <button onClick={handleSave} className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-gradient-to-r from-accent to-[#b87fff] text-white font-medium mb-3 hover:opacity-90 transition-opacity">
          <FiSave /> {savedStatus ? 'Saved!' : 'Save Changes'}
        </button>
        <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-danger hover:bg-danger/10 transition-colors text-sm">
          <FiLogOut /> Logout
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-10 relative">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-display font-bold mb-8 capitalize">{activeTab}</h1>
          
          {activeTab === 'profile' && (
            <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-muted mb-1.5 uppercase tracking-wider">Name</label>
                  <input className="w-full bg-surface2 border border-border rounded-lg px-4 py-2 text-sm focus:border-[#b87fff] focus:ring-1 focus:ring-[#b87fff] outline-none transition-all" value={data.name} onChange={e => setData({...data, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs text-muted mb-1.5 uppercase tracking-wider">Title</label>
                  <input className="w-full bg-surface2 border border-border rounded-lg px-4 py-2 text-sm focus:border-[#b87fff] outline-none" value={data.title} onChange={e => setData({...data, title: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-xs text-muted mb-1.5 uppercase tracking-wider">Roles (comma-separated)</label>
                <input className="w-full bg-surface2 border border-border rounded-lg px-4 py-2 text-sm focus:border-[#b87fff] outline-none" value={data.roles.join(', ')} onChange={e => setData({...data, roles: e.target.value.split(',').map(r=>r.trim())})} />
              </div>
              <div>
                <label className="block text-xs text-muted mb-1.5 uppercase tracking-wider">Bio</label>
                <textarea rows={4} className="w-full bg-surface2 border border-border rounded-lg px-4 py-2 text-sm focus:border-[#b87fff] outline-none" value={data.bio} onChange={e => setData({...data, bio: e.target.value})} />
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
              <div>
                <label className="block text-xs text-muted mb-1.5 uppercase tracking-wider">Email</label>
                <input className="w-full bg-surface2 border border-border rounded-lg px-4 py-2 text-sm focus:border-[#b87fff] outline-none" value={data.email} onChange={e => setData({...data, email: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs text-muted mb-1.5 uppercase tracking-wider">GitHub URL</label>
                <input className="w-full bg-surface2 border border-border rounded-lg px-4 py-2 text-sm focus:border-[#b87fff] outline-none" value={data.github} onChange={e => setData({...data, github: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs text-muted mb-1.5 uppercase tracking-wider">LinkedIn URL</label>
                <input className="w-full bg-surface2 border border-border rounded-lg px-4 py-2 text-sm focus:border-[#b87fff] outline-none" value={data.linkedin} onChange={e => setData({...data, linkedin: e.target.value})} />
              </div>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
              <div>
                <label className="block text-xs text-muted mb-1.5 uppercase tracking-wider">Admin Password</label>
                <input type="text" className="w-full bg-surface2 border border-border rounded-lg px-4 py-2 text-sm focus:border-[#b87fff] outline-none" value={data.adminPassword || ''} onChange={e => setData({...data, adminPassword: e.target.value})} />
                <p className="text-xs text-muted mt-2">Note: This password is now synced directly to your Supabase database.</p>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div>
              <button onClick={() => setEditSkill({ id: Date.now(), name: '', category: 'Frontend', level: 80 })} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-accent to-[#b87fff] text-white text-sm font-medium mb-6 hover:opacity-90">
                <FiPlus /> Add Skill
              </button>
              <div className="bg-surface border border-border rounded-xl p-4 flex flex-col gap-2">
                {data.skills.map(skill => (
                  <div key={skill.id} className="flex items-center gap-4 p-3 border-b border-border last:border-0 hover:bg-surface2/50 rounded-lg transition-colors">
                    <span className="flex-1 text-sm font-medium">{skill.name}</span>
                    <span className="text-xs text-muted w-24">{skill.category}</span>
                    <span className="text-sm font-bold text-[#b87fff] w-12 text-right">{skill.level}%</span>
                    <div className="flex gap-1 ml-4">
                      <button onClick={() => setEditSkill(skill)} className="p-2 text-muted hover:text-text hover:bg-surface2 rounded-md transition-colors"><FiEdit2 size={14} /></button>
                      <button onClick={() => deleteSkill(skill.id)} className="p-2 text-muted hover:text-danger hover:bg-danger/10 rounded-md transition-colors"><FiTrash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div>
              <button onClick={() => setEditProject({ id: Date.now(), title: '', description: '', tags: [], url: '#' })} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-accent to-[#b87fff] text-white text-sm font-medium mb-6 hover:opacity-90">
                <FiPlus /> Add Project
              </button>
              <div className="flex flex-col gap-4">
                {data.projects.map(proj => (
                  <div key={proj.id} className="bg-surface border border-border rounded-xl p-5 flex justify-between items-start gap-4 hover:border-border/80 transition-colors">
                    <div>
                      <h4 className="font-semibold text-sm mb-1">{proj.title}</h4>
                      <p className="text-xs text-muted leading-relaxed line-clamp-2">{proj.description}</p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button onClick={() => setEditProject(proj)} className="p-2 text-muted hover:text-text hover:bg-surface2 rounded-md transition-colors"><FiEdit2 size={14} /></button>
                      <button onClick={() => deleteProject(proj.id)} className="p-2 text-muted hover:text-danger hover:bg-danger/10 rounded-md transition-colors"><FiTrash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {editSkill && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-2xl w-full max-w-md p-6 relative">
            <button onClick={() => setEditSkill(null)} className="absolute top-4 right-4 text-muted hover:text-text bg-surface2 p-1.5 rounded-md"><FiX /></button>
            <h3 className="font-display font-bold text-lg mb-6">{editSkill.name ? 'Edit Skill' : 'Add Skill'}</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-muted mb-1">Name</label>
                  <input className="w-full bg-surface2 border border-border rounded-lg px-4 py-2 text-sm focus:border-[#b87fff] outline-none" value={editSkill.name} onChange={e => setEditSkill({...editSkill, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs text-muted mb-1">Category</label>
                  <input className="w-full bg-surface2 border border-border rounded-lg px-4 py-2 text-sm focus:border-[#b87fff] outline-none" value={editSkill.category} onChange={e => setEditSkill({...editSkill, category: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-xs text-muted mb-2">Level: {editSkill.level}%</label>
                <input type="range" min="1" max="100" className="w-full accent-[#b87fff]" value={editSkill.level} onChange={e => setEditSkill({...editSkill, level: parseInt(e.target.value)})} />
              </div>
              <button onClick={saveSkill} className="w-full py-2.5 rounded-lg bg-gradient-to-r from-accent to-[#b87fff] text-white font-medium mt-2">Save Skill</button>
            </div>
          </div>
        </div>
      )}

      {editProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-2xl w-full max-w-lg p-6 relative">
            <button onClick={() => setEditProject(null)} className="absolute top-4 right-4 text-muted hover:text-text bg-surface2 p-1.5 rounded-md"><FiX /></button>
            <h3 className="font-display font-bold text-lg mb-6">{editProject.title ? 'Edit Project' : 'Add Project'}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-muted mb-1">Title</label>
                <input className="w-full bg-surface2 border border-border rounded-lg px-4 py-2 text-sm focus:border-[#b87fff] outline-none" value={editProject.title} onChange={e => setEditProject({...editProject, title: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs text-muted mb-1">Description</label>
                <textarea rows={3} className="w-full bg-surface2 border border-border rounded-lg px-4 py-2 text-sm focus:border-[#b87fff] outline-none" value={editProject.description} onChange={e => setEditProject({...editProject, description: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs text-muted mb-1">Tags (comma-separated)</label>
                <input className="w-full bg-surface2 border border-border rounded-lg px-4 py-2 text-sm focus:border-[#b87fff] outline-none" value={editProject.tags.join(', ')} onChange={e => setEditProject({...editProject, tags: e.target.value.split(',').map(t=>t.trim()).filter(Boolean)})} />
              </div>
              <div>
                <label className="block text-xs text-muted mb-1">URL / Live Demo Link</label>
                <input className="w-full bg-surface2 border border-border rounded-lg px-4 py-2 text-sm focus:border-[#b87fff] outline-none" value={editProject.url} onChange={e => setEditProject({...editProject, url: e.target.value})} />
              </div>
              <button onClick={saveProject} className="w-full py-2.5 rounded-lg bg-gradient-to-r from-accent to-[#b87fff] text-white font-medium mt-2">Save Project</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
