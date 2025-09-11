import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import * as api from '../services/api';
import { User, Education, Project } from '../types';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
);

const UserCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
);

function Profile(): React.JSX.Element {
  const { user: authUser, loading: authLoading, fetchUser } = useAuth();
  const [formData, setFormData] = useState<Partial<User>>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (authUser) {
      setFormData({
        ...authUser,
        skills: authUser.skills || [],
        education: authUser.education || [],
        projects: authUser.projects || [],
      });
    }
  }, [authUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const skillsArray = e.target.value.split(',').map(skill => skill.trim());
    setFormData({ ...formData, skills: skillsArray });
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setFormData({...formData, resume: e.target.files[0].name });
    }
  }

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({ ...formData, profileImage: reader.result as string });
        };
        reader.readAsDataURL(file);
    }
  };


  // --- Education Handlers ---
  const handleAddEducation = () => {
    const newEducation: Education = { id: `new_${Date.now()}`, level: '', institution: '', startYear: '', endYear: '', grade: '' };
    setFormData(prev => ({ ...prev, education: [...(prev.education || []), newEducation] }));
  };

  const handleDeleteEducation = (id: string) => {
    setFormData(prev => ({ ...prev, education: prev.education?.filter(edu => edu.id !== id) }));
  };

  const handleEducationChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      education: prev.education?.map(edu => edu.id === id ? { ...edu, [name]: value } : edu)
    }));
  };

  // --- Project Handlers ---
  const handleAddProject = () => {
    const newProject: Project = { id: `new_${Date.now()}`, projectName: '', description: '', liveLink: '', githubLink: '', duration: '' };
    setFormData(prev => ({ ...prev, projects: [...(prev.projects || []), newProject] }));
  };

  const handleDeleteProject = (id: string) => {
    setFormData(prev => ({ ...prev, projects: prev.projects?.filter(proj => proj.id !== id) }));
  };

  const handleProjectChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      projects: prev.projects?.map(proj => proj.id === id ? { ...proj, [name]: value } : proj)
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await api.updateUserProfile(formData);
      await fetchUser(); // Refetch user data to update context
      setStatus({ type: 'success', message: 'Profile updated successfully!' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to update profile.' });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !authUser) return <div className="flex justify-center py-12"><Spinner /></div>;

  const inputClass = "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500";
  const labelClass = "block text-sm font-medium text-gray-700";

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <button
            type="submit"
            form="profileForm"
            disabled={loading}
            className="flex justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-300"
          >
            {loading ? <Spinner /> : 'Save Changes'}
        </button>
      </div>

      {status && <Alert type={status.type} message={status.message} onClose={() => setStatus(null)} />}

      <form id="profileForm" onSubmit={handleSubmit} className="space-y-8">
        
        {/* --- Basic Information --- */}
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">Basic Information</h2>
            
            <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                <div className="flex-shrink-0">
                    <div className="h-24 w-24 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                        {formData.profileImage ? (
                            <img src={formData.profileImage} alt="Profile" className="h-full w-full object-cover" />
                        ) : (
                            <UserCircleIcon />
                        )}
                    </div>
                </div>
                <div className="text-center md:text-left">
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        Change Photo
                    </button>
                    <input type="file" ref={fileInputRef} onChange={handleProfileImageChange} accept="image/*" className="hidden" />
                    <p className="mt-1 text-xs text-gray-500">JPG, GIF or PNG. 1MB max.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="name" className={labelClass}>Full Name</label>
                    <input type="text" name="name" id="name" value={formData.name || ''} onChange={handleChange} className={inputClass}/>
                </div>
                <div>
                    <label htmlFor="email" className={labelClass}>Email Address</label>
                    <input type="email" name="email" id="email" value={formData.email || ''} disabled className={`${inputClass} bg-gray-100 cursor-not-allowed text-gray-500`}/>
                </div>
                 <div>
                    <label htmlFor="phone" className={labelClass}>Phone</label>
                    <input type="text" name="phone" id="phone" value={formData.phone || ''} onChange={handleChange} className={inputClass}/>
                </div>
                <div>
                    <label htmlFor="location" className={labelClass}>Location</label>
                    <input type="text" name="location" id="location" value={formData.location || ''} onChange={handleChange} className={inputClass}/>
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="about" className={labelClass}>About Me</label>
                    <textarea name="about" id="about" rows={4} value={formData.about || ''} onChange={handleChange} className={inputClass}></textarea>
                </div>
                <div>
                    <label htmlFor="skills" className={labelClass}>Skills (comma-separated)</label>
                    <input type="text" name="skills" id="skills" value={formData.skills?.join(', ') || ''} onChange={handleSkillsChange} className={inputClass} />
                </div>
                 <div>
                    <label htmlFor="experience" className={labelClass}>Experience</label>
                    <select name="experience" id="experience" value={formData.experience || ''} onChange={handleChange} className={inputClass}>
                        <option value="">Select Experience</option>
                        <option value="0-1 years">0-1 years</option>
                        <option value="2-4 years">2-4 years</option>
                        <option value="5+ years">5+ years</option>
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="resume" className={labelClass}>Resume</label>
                    <div className="mt-1 flex items-center">
                        <input type="file" name="resume" id="resume" onChange={handleResumeChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"/>
                        {formData.resume && <span className="ml-4 text-sm text-gray-600">{formData.resume}</span>}
                    </div>
                </div>
            </div>
        </div>

        {/* --- Education Section --- */}
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">Education</h2>
            <div className="space-y-8">
                {formData.education?.map((edu) => (
                    <div key={edu.id} className="p-4 border rounded-md relative bg-gray-50 mt-4">
                        <button 
                            type="button" 
                            onClick={() => handleDeleteEducation(edu.id)}
                            className="absolute -top-3 -right-3 p-1.5 rounded-full bg-white shadow-md text-gray-500 hover:text-red-600 hover:bg-red-100 transition-all z-10"
                            aria-label="Delete education entry"
                        >
                            <TrashIcon />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <input name="level" placeholder="Degree/Level" value={edu.level} onChange={(e) => handleEducationChange(edu.id, e)} className={inputClass} />
                           <input name="institution" placeholder="Institution" value={edu.institution} onChange={(e) => handleEducationChange(edu.id, e)} className={inputClass} />
                           <input name="startYear" placeholder="Start Year" value={edu.startYear} onChange={(e) => handleEducationChange(edu.id, e)} className={inputClass} />
                           <input name="endYear" placeholder="End Year" value={edu.endYear} onChange={(e) => handleEducationChange(edu.id, e)} className={inputClass} />
                           <input name="grade" placeholder="Grade (Optional)" value={edu.grade || ''} onChange={(e) => handleEducationChange(edu.id, e)} className={inputClass} />
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <button type="button" onClick={handleAddEducation} className="w-full text-center py-2 px-4 border-2 border-dashed border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:border-gray-400 transition-colors">
                    + Add Education
                </button>
            </div>
        </div>

        {/* --- Projects Section --- */}
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">Projects</h2>
            <div className="space-y-8">
                {formData.projects?.map((proj) => (
                    <div key={proj.id} className="p-4 border rounded-md relative bg-gray-50 mt-4">
                        <button 
                            type="button" 
                            onClick={() => handleDeleteProject(proj.id)}
                            className="absolute -top-3 -right-3 p-1.5 rounded-full bg-white shadow-md text-gray-500 hover:text-red-600 hover:bg-red-100 transition-all z-10"
                            aria-label="Delete project entry"
                        >
                            <TrashIcon />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <input name="projectName" placeholder="Project Name" value={proj.projectName} onChange={(e) => handleProjectChange(proj.id, e)} className={`${inputClass} md:col-span-2`} />
                           <textarea name="description" placeholder="Description" value={proj.description || ''} onChange={(e) => handleProjectChange(proj.id, e)} className={`${inputClass} md:col-span-2`} rows={3}></textarea>
                           <input name="liveLink" placeholder="Live Link" value={proj.liveLink || ''} onChange={(e) => handleProjectChange(proj.id, e)} className={inputClass} />
                           <input name="githubLink" placeholder="GitHub Link" value={proj.githubLink || ''} onChange={(e) => handleProjectChange(proj.id, e)} className={inputClass} />
                           <input name="duration" placeholder="Duration (e.g., 3 months)" value={proj.duration || ''} onChange={(e) => handleProjectChange(proj.id, e)} className={`${inputClass} md:col-span-2`} />
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <button type="button" onClick={handleAddProject} className="w-full text-center py-2 px-4 border-2 border-dashed border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:border-gray-400 transition-colors">
                    + Add Project
                </button>
            </div>
        </div>
      </form>
    </div>
  );
}

export default Profile;