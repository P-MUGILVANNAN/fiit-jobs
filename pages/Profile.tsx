import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import * as api from '../services/api';
import { User, Education, Project } from '../types';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import { 
  User as UserIcon, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  BookOpen,
  Trash2, 
  Plus, 
  Upload, 
  Eye, 
  Edit3,
  Save,
  Award,
  Globe,
  Github,
  Calendar,
  X,
  Edit,
  Tag
} from 'lucide-react';

function Profile(): React.JSX.Element {
  const { user: authUser, loading: authLoading, fetchUser } = useAuth();
  const [formData, setFormData] = useState<Partial<User>>({});
  const [education, setEducation] = useState<Education[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [skillsInput, setSkillsInput] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [activeSection, setActiveSection] = useState<'basic' | 'education' | 'projects'>('basic');
  const [isEditing, setIsEditing] = useState(false);
  const [editSection, setEditSection] = useState<'basic' | 'education' | 'projects' | null>(null);

  const profileImageRef = useRef<HTMLInputElement>(null);
  const resumeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (authUser) {
      setFormData({
        name: authUser.name,
        email: authUser.email,
        skills: authUser.skills || [],
        experience: authUser.experience || '',
        category: authUser.category || 'jobseeker',
        about: authUser.about || '',
        location: authUser.location || '',
        phone: authUser.phone || '',
        resume: authUser.resume || '',
        profileImage: authUser.profileImage || '',
      });
      setEducation(authUser.education || []);
      setProjects(authUser.projects || []);
      setProfileImageFile(null);
      setResumeFile(null);
      setSkillsInput(authUser.skills?.join(', ') || '');
    }
  }, [authUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSkillsInput(e.target.value);
    const skillsArray = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill);
    setFormData({ ...formData, skills: skillsArray });
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleViewResume = () => {
    const url = resumeFile ? URL.createObjectURL(resumeFile) : formData.resume;
    if (url) {
      window.open(`https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`, '_blank');
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profileImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddEducation = () => {
    const newEducation: Education = { id: `new_${Date.now()}`, level: '', institution: '', startYear: '', endYear: '', grade: '' };
    setEducation(prev => [...prev, newEducation]);
  };

  const handleDeleteEducation = (id: string) => {
    setEducation(prev => prev.filter(edu => edu.id !== id));
  };

  const handleEducationChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEducation(prev => prev.map(edu => edu.id === id ? { ...edu, [name]: value } : edu));
  };

  const handleAddProject = () => {
    const newProject: Project = { id: `new_${Date.now()}`, projectName: '', description: '', liveLink: '', githubLink: '' };
    setProjects(prev => [...prev, newProject]);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(proj => proj.id !== id));
  };

  const handleProjectChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjects(prev => prev.map(proj => proj.id === id ? { ...proj, [name]: value } : proj));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const payload = {
        ...formData,
        education: education.map(({ id, ...rest }) => rest),
        projects: projects.map(({ id, ...rest }) => rest),
        skills: formData.skills || [],
        profileImage: profileImageFile,
        resume: resumeFile,
      };

      await api.updateUserProfile(payload);
      await fetchUser();
      setStatus({ type: 'success', message: 'Profile updated successfully!' });
      setIsEditing(false);
      setEditSection(null);
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: 'Failed to update profile.' });
    } finally {
      setLoading(false);
    }
  };

  const handleEditSection = (section: 'basic' | 'education' | 'projects') => {
    setEditSection(section);
    setIsEditing(true);
    setActiveSection(section);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditSection(null);
    // Reset form data to original authUser data
    if (authUser) {
      setFormData({
        name: authUser.name,
        email: authUser.email,
        skills: authUser.skills || [],
        experience: authUser.experience || '',
        category: authUser.category || 'jobseeker',
        about: authUser.about || '',
        location: authUser.location || '',
        phone: authUser.phone || '',
        resume: authUser.resume || '',
        profileImage: authUser.profileImage || '',
      });
      setEducation(authUser.education || []);
      setProjects(authUser.projects || []);
      setSkillsInput(authUser.skills?.join(', ') || '');
    }
  };

  if (authLoading || !authUser) return <div className="flex justify-center py-12"><Spinner /></div>;

  const inputClass = "mt-1 block w-full px-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2";

  const ViewField = ({ label, value, icon: Icon }: { label: string; value: string; icon: any }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
        <Icon className="w-4 h-4" />
        {label}
      </label>
      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 min-h-[44px]">
        {value || <span className="text-gray-400 italic">Not provided</span>}
      </div>
    </div>
  );

  const categoryOptions = [
    { value: 'jobseeker', label: 'Job Seeker' },
    { value: 'fresher', label: 'Fresher' },
    { value: 'housewife', label: 'Housewife' },
    { value: 'student', label: 'Student' },
    { value: 'experienced', label: 'Experienced Professional' },
    { value: 'freelancer', label: 'Freelancer' },
    { value: 'career break', label: 'Career Break' },
    { value: 'others', label: 'Others' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-lg text-gray-600">Manage your professional information and portfolio</p>
        </div>

        {status && (
          <div className="mb-6">
            <Alert type={status.type} message={status.message} onClose={() => setStatus(null)} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-20">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden border-4 border-white shadow-lg">
                    {formData.profileImage ? (
                      <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <UserIcon className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  {isEditing && editSection === 'basic' && (
                    <button
                      onClick={() => profileImageRef.current?.click()}
                      className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  )}
                  <input type="file" ref={profileImageRef} onChange={handleProfileImageChange} accept="image/*" className="hidden" />
                </div>
                <h2 className="text-xl font-semibold mt-4 text-gray-900">{formData.name || 'Your Name'}</h2>
                <p className="text-gray-600 text-sm">{formData.experience || 'Add your experience'}</p>
                {formData.category && (
                  <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {categoryOptions.find(opt => opt.value === formData.category)?.label}
                  </span>
                )}
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveSection('basic')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeSection === 'basic' 
                      ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <UserIcon className="w-5 h-5" />
                  <span className="font-medium">Basic Info</span>
                </button>
                
                <button
                  onClick={() => setActiveSection('education')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeSection === 'education' 
                      ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <GraduationCap className="w-5 h-5" />
                  <span className="font-medium">Education</span>
                  {education.length > 0 && (
                    <span className="ml-auto bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                      {education.length}
                    </span>
                  )}
                </button>
                
                <button
                  onClick={() => setActiveSection('projects')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeSection === 'projects' 
                      ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <BookOpen className="w-5 h-5" />
                  <span className="font-medium">Projects</span>
                  {projects.length > 0 && (
                    <span className="ml-auto bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                      {projects.length}
                    </span>
                  )}
                </button>
              </nav>

              {isEditing ? (
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                  <button
                    type="submit"
                    form="profileForm"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-green-600 transition-all duration-200 disabled:opacity-50"
                  >
                    {loading ? <Spinner /> : <Save className="w-5 h-5" />}
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="w-full flex items-center justify-center gap-2 bg-gray-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-600 transition-all duration-200"
                  >
                    <X className="w-5 h-5" />
                    Cancel
                  </button>
                </div>
              ) : null}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <form id="profileForm" onSubmit={handleSubmit} className="space-y-6">
              
              {/* Basic Information Section */}
              {activeSection === 'basic' && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <UserIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
                    </div>
                    {!isEditing && (
                      <button
                        onClick={() => handleEditSection('basic')}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                    )}
                  </div>

                  {isEditing && editSection === 'basic' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className={labelClass}>
                          <UserIcon className="w-4 h-4" />
                          Full Name
                        </label>
                        <input type="text" name="name" id="name" value={formData.name || ''} onChange={handleChange} className={inputClass} />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className={labelClass}>
                          <Mail className="w-4 h-4" />
                          Email Address
                        </label>
                        <input type="email" name="email" id="email" value={formData.email || ''} disabled className={`${inputClass} bg-gray-100 cursor-not-allowed text-gray-500`} />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className={labelClass}>
                          <Phone className="w-4 h-4" />
                          Phone Number
                        </label>
                        <input type="text" name="phone" id="phone" value={formData.phone || ''} onChange={handleChange} className={inputClass} />
                      </div>
                      
                      <div>
                        <label htmlFor="location" className={labelClass}>
                          <MapPin className="w-4 h-4" />
                          Location
                        </label>
                        <input type="text" name="location" id="location" value={formData.location || ''} onChange={handleChange} className={inputClass} />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label htmlFor="about" className={labelClass}>
                          <Edit3 className="w-4 h-4" />
                          About Me
                        </label>
                        <textarea name="about" id="about" rows={4} value={formData.about || ''} onChange={handleChange} className={inputClass}></textarea>
                      </div>
                      
                      <div className="md:col-span-2">
                        <label htmlFor="skills" className={labelClass}>
                          <Award className="w-4 h-4" />
                          Skills (comma-separated)
                        </label>
                        <input type="text" name="skills" id="skills" value={skillsInput} onChange={handleSkillsChange} className={inputClass} placeholder="React, JavaScript, TypeScript, Node.js..." />
                      </div>
                      
                      <div>
                        <label htmlFor="experience" className={labelClass}>
                          <Briefcase className="w-4 h-4" />
                          Experience
                        </label>
                        <select name="experience" id="experience" value={formData.experience || ''} onChange={handleChange} className={inputClass}>
                          <option value="">Select Experience</option>
                          <option value="0-1 years">0-1 years</option>
                          <option value="2-4 years">2-4 years</option>
                          <option value="5+ years">5+ years</option>
                        </select>
                      </div>

                      {/* Category Field - Added after Experience */}
                      <div>
                        <label htmlFor="category" className={labelClass}>
                          <Tag className="w-4 h-4" />
                          Category
                        </label>
                        <select name="category" id="category" value={formData.category || 'jobseeker'} onChange={handleChange} className={inputClass}>
                          {categoryOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className={labelClass}>
                          <BookOpen className="w-4 h-4" />
                          Resume
                        </label>
                        <div className="mt-2">
                          {(formData.resume || resumeFile) ? (
                            <div className="flex flex-wrap gap-3">
                              <button
                                type="button"
                                onClick={handleViewResume}
                                className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                                View Resume
                              </button>
                              <button
                                type="button"
                                onClick={() => resumeRef.current?.click()}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                              >
                                <Upload className="w-4 h-4" />
                                Change Resume
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => resumeRef.current?.click()}
                              className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                              <Upload className="w-4 h-4" />
                              Upload Resume
                            </button>
                          )}
                          <input type="file" name="resume" id="resume" onChange={handleResumeChange} className="hidden" ref={resumeRef} />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ViewField label="Full Name" value={formData.name || ''} icon={UserIcon} />
                        <ViewField label="Email Address" value={formData.email || ''} icon={Mail} />
                        <ViewField label="Phone Number" value={formData.phone || ''} icon={Phone} />
                        <ViewField label="Location" value={formData.location || ''} icon={MapPin} />
                      </div>
                      
                      <ViewField label="About Me" value={formData.about || ''} icon={Edit3} />
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          Skills
                        </label>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 min-h-[44px]">
                          {formData.skills && formData.skills.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {formData.skills.map((skill, index) => (
                                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-400 italic">No skills added</span>
                          )}
                        </div>
                      </div>
                      
                      <ViewField label="Experience" value={formData.experience || ''} icon={Briefcase} />
                      
                      {/* Category View Field */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          Category
                        </label>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 min-h-[44px]">
                          {formData.category ? (
                            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                              {categoryOptions.find(opt => opt.value === formData.category)?.label}
                            </span>
                          ) : (
                            <span className="text-gray-400 italic">Not specified</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          Resume
                        </label>
                        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                          {(formData.resume || resumeFile) ? (
                            <button
                              type="button"
                              onClick={handleViewResume}
                              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                            >
                              <Eye className="w-4 h-4" />
                              View Resume
                            </button>
                          ) : (
                            <span className="text-gray-400 italic">No resume uploaded</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Education Section */}
              {activeSection === 'education' && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <GraduationCap className="w-6 h-6 text-green-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">Education History</h2>
                    </div>
                    {!isEditing && education.length > 0 && (
                      <button
                        onClick={() => handleEditSection('education')}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                    )}
                  </div>

                  {isEditing && editSection === 'education' ? (
                    <div className="space-y-6">
                      {education.map((edu, index) => (
                        <div key={edu.id} className="relative p-6 border-2 border-dashed border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-white">
                          <div className="absolute -top-3 left-4 bg-white px-3 py-1 text-sm font-medium text-gray-600 rounded-full border">
                            #{index + 1}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteEducation(edu.id)}
                            className="absolute -top-3 -right-3 p-2 bg-white rounded-full shadow-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Degree/Level</label>
                              <input name="level" placeholder="e.g., Bachelor of Science" value={edu.level} onChange={(e) => handleEducationChange(edu.id, e)} className={inputClass} />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                              <input name="institution" placeholder="e.g., University of Technology" value={edu.institution} onChange={(e) => handleEducationChange(edu.id, e)} className={inputClass} />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Start Year
                              </label>
                              <input name="startYear" placeholder="e.g., 2018" value={edu.startYear} onChange={(e) => handleEducationChange(edu.id, e)} className={inputClass} />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                End Year
                              </label>
                              <input name="endYear" placeholder="e.g., 2022" value={edu.endYear} onChange={(e) => handleEducationChange(edu.id, e)} className={inputClass} />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-gray-700 mb-1">Grade (Optional)</label>
                              <input name="grade" placeholder="e.g., 3.8 GPA" value={edu.grade || ''} onChange={(e) => handleEducationChange(edu.id, e)} className={inputClass} />
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <button
                        type="button"
                        onClick={handleAddEducation}
                        className="w-full flex items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                      >
                        <Plus className="w-5 h-5" />
                        Add Education
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {education.length > 0 ? (
                        education.map((edu, index) => (
                          <div key={edu.id} className="p-6 border border-gray-200 rounded-xl bg-gray-50">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="p-2 bg-green-100 rounded-lg">
                                <GraduationCap className="w-5 h-5 text-green-600" />
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900">{edu.level || 'Education'}</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Institution</label>
                                <div className="p-2 bg-white rounded border">{edu.institution || 'Not provided'}</div>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Duration</label>
                                <div className="p-2 bg-white rounded border">
                                  {edu.startYear || 'Start'} - {edu.endYear || 'End'}
                                </div>
                              </div>
                              {edu.grade && (
                                <div className="md:col-span-2">
                                  <label className="block text-sm font-medium text-gray-600 mb-1">Grade</label>
                                  <div className="p-2 bg-white rounded border">{edu.grade}</div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                          <p>No education history added yet</p>
                          <button
                            onClick={() => handleEditSection('education')}
                            className="mt-3 flex items-center gap-2 mx-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                            Add Education
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Projects Section */}
              {activeSection === 'projects' && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <BookOpen className="w-6 h-6 text-purple-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">Projects Portfolio</h2>
                    </div>
                    {!isEditing && projects.length > 0 && (
                      <button
                        onClick={() => handleEditSection('projects')}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                    )}
                  </div>

                  {isEditing && editSection === 'projects' ? (
                    <div className="space-y-6">
                      {projects.map((proj, index) => (
                        <div key={proj.id} className="relative p-6 border-2 border-dashed border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-white">
                          <div className="absolute -top-3 left-4 bg-white px-3 py-1 text-sm font-medium text-gray-600 rounded-full border">
                            Project #{index + 1}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteProject(proj.id)}
                            className="absolute -top-3 -right-3 p-2 bg-white rounded-full shadow-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                              <input name="projectName" placeholder="e.g., E-commerce Platform" value={proj.projectName} onChange={(e) => handleProjectChange(proj.id, e)} className={inputClass} />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                              <textarea name="description" placeholder="Describe your project..." value={proj.description || ''} onChange={(e) => handleProjectChange(proj.id, e)} className={inputClass} rows={3}></textarea>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                  <Globe className="w-4 h-4" />
                                  Live Demo URL
                                </label>
                                <input name="liveLink" placeholder="https://example.com" value={proj.liveLink || ''} onChange={(e) => handleProjectChange(proj.id, e)} className={inputClass} />
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                                  <Github className="w-4 h-4" />
                                  GitHub Repository
                                </label>
                                <input name="githubLink" placeholder="https://github.com/username/repo" value={proj.githubLink || ''} onChange={(e) => handleProjectChange(proj.id, e)} className={inputClass} />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <button
                        type="button"
                        onClick={handleAddProject}
                        className="w-full flex items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                      >
                        <Plus className="w-5 h-5" />
                        Add Project
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {projects.length > 0 ? (
                        projects.map((proj, index) => (
                          <div key={proj.id} className="p-6 border border-gray-200 rounded-xl bg-gray-50">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="p-2 bg-purple-100 rounded-lg">
                                <BookOpen className="w-5 h-5 text-purple-600" />
                              </div>
                              <h3 className="text-lg font-semibold text-gray-900">{proj.projectName || 'Project'}</h3>
                            </div>
                            
                            {proj.description && (
                              <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                                <div className="p-3 bg-white rounded border">{proj.description}</div>
                              </div>
                            )}
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {proj.liveLink && (
                                <div>
                                  <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
                                    <Globe className="w-4 h-4" />
                                    Live Demo
                                  </label>
                                  <a href={proj.liveLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded border block text-blue-600 hover:text-blue-700 truncate">
                                    {proj.liveLink}
                                  </a>
                                </div>
                              )}
                              
                              {proj.githubLink && (
                                <div>
                                  <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
                                    <Github className="w-4 h-4" />
                                    GitHub
                                  </label>
                                  <a href={proj.githubLink} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded border block text-blue-600 hover:text-blue-700 truncate">
                                    {proj.githubLink}
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                          <p>No projects added yet</p>
                          <button
                            onClick={() => handleEditSection('projects')}
                            className="mt-3 flex items-center gap-2 mx-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                            Add Project
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;