import axios from 'axios';
import { User, Job, Application, ApplicationStatus, JobAlert, Education, Project, JobType, ExperienceLevel } from '../types';

const API_BASE = "https://jobs-backend-z4z9.onrender.com/api";

// --- MOCK DATABASE (Jobs, Applications, etc. remain for now) ---
const MOCK_JOBS: Job[] = [
  { id: '1', title: 'Senior React Developer', company: 'Tech Solutions Inc.', logo: 'https://picsum.photos/seed/tech/100', location: 'New York, NY', description: 'Lead the development of our next-gen UI platform using React, TypeScript, and GraphQL.', skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'], postedDate: '2024-07-20', jobType: JobType.FullTime, experienceLevel: ExperienceLevel.Senior },
  { id: '2', title: 'UX/UI Designer', company: 'Creative Minds LLC', logo: 'https://picsum.photos/seed/creative/100', location: 'San Francisco, CA', description: 'Design beautiful and intuitive user interfaces for our mobile and web applications.', skills: ['Figma', 'Sketch', 'Adobe XD', 'User Research'], postedDate: '2024-07-19', jobType: JobType.FullTime, experienceLevel: ExperienceLevel.Mid },
  { id: '3', title: 'Cloud DevOps Engineer', company: 'InfraCloud Co.', logo: 'https://picsum.photos/seed/cloud/100', location: 'Austin, TX', description: 'Manage and scale our AWS infrastructure using Terraform, Kubernetes, and Jenkins.', skills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'], postedDate: '2024-07-18', jobType: JobType.FullTime, experienceLevel: ExperienceLevel.Senior },
  { id: '4', title: 'Data Scientist', company: 'DataDriven Corp', logo: 'https://picsum.photos/seed/data/100', location: 'Boston, MA', description: 'Analyze large datasets to extract meaningful insights and build predictive models.', skills: ['Python', 'R', 'SQL', 'Machine Learning'], postedDate: '2024-07-21', jobType: JobType.Contract, experienceLevel: ExperienceLevel.Mid },
  { id: '5', title: 'Product Manager', company: 'Innovate Products', logo: 'https://picsum.photos/seed/innovate/100', location: 'Remote', description: 'Define product vision, strategy, and roadmap. Work with cross-functional teams to deliver amazing products.', skills: ['Agile', 'Roadmapping', 'User Stories'], postedDate: '2024-07-22', jobType: JobType.FullTime, experienceLevel: ExperienceLevel.Senior },
  { id: '6', title: 'Junior Frontend Developer', company: 'Web Wizards', logo: 'https://picsum.photos/seed/web/100', location: 'Chicago, IL', description: 'Join our team to build responsive and performant web frontends.', skills: ['HTML', 'CSS', 'JavaScript', 'React'], postedDate: '2024-07-15', jobType: JobType.PartTime, experienceLevel: ExperienceLevel.Entry },
];

const MOCK_USERS: { [key: string]: User & { passwordHash: string } } = {
  'user@fiit.com': { 
    id: 'u1', 
    name: 'John Doe', 
    email: 'user@fiit.com', 
    skills: ['React', 'TypeScript', 'Node.js'], 
    passwordHash: 'password123',
    profileImage: 'https://i.pravatar.cc/150?u=user@fiit.com',
    about: 'A passionate frontend developer with 5 years of experience in building modern web applications.',
    phone: '123-456-7890',
    location: 'New York, NY',
    experience: '5+ years',
    resume: 'john_doe_resume.pdf',
    education: [
        { id: 'edu1', level: 'B.Sc in Computer Science', institution: 'State University', startYear: '2015', endYear: '2019', grade: 'A' }
    ],
    projects: [
        { id: 'proj1', projectName: 'E-commerce Platform', description: 'Built a full-stack e-commerce site using the MERN stack.', liveLink: '#', githubLink: '#', duration: '3 months' }
    ]
  }
};

const MOCK_APPLICATIONS: Application[] = [
    { id: 'a1', job: MOCK_JOBS[0], status: ApplicationStatus.Pending },
    { id: 'a2', job: MOCK_JOBS[2], status: ApplicationStatus.Selected },
];

const MOCK_JOB_ALERTS: JobAlert[] = [
    { id: 'ja1', keyword: 'React', location: 'Remote' },
    { id: 'ja2', keyword: 'DevOps', location: 'Austin, TX' },
];

// --- MOCK API FUNCTIONS ---
const simulateDelay = <T,>(data: T, delay = 500): Promise<T> => 
  new Promise(resolve => setTimeout(() => resolve(data), delay));

export const fetchJobs = async (filters: { keyword?: string, location?: string, jobType?: string, experienceLevel?: string } = {}): Promise<Job[]> => {
  let jobs = MOCK_JOBS;
  if (filters.keyword) {
    const keyword = filters.keyword.toLowerCase();
    jobs = jobs.filter(j => j.title.toLowerCase().includes(keyword) || j.company.toLowerCase().includes(keyword) || j.skills.some(s => s.toLowerCase().includes(keyword)));
  }
  if (filters.location) {
    const location = filters.location.toLowerCase();
    jobs = jobs.filter(j => j.location.toLowerCase().includes(location));
  }
  if (filters.jobType) {
    jobs = jobs.filter(j => j.jobType === filters.jobType);
  }
  if (filters.experienceLevel) {
    jobs = jobs.filter(j => j.experienceLevel === filters.experienceLevel);
  }
  return simulateDelay(jobs);
};

export const fetchJobById = async (id: string): Promise<Job | undefined> => {
  const job = MOCK_JOBS.find(j => j.id === id);
  return simulateDelay(job);
};

const handleApiError = (error: any, defaultMessage: string): Error => {
  const message = error.response?.data?.message || error.message || defaultMessage;
  return new Error(message);
};

export const loginUser = async (email: string, pass: string): Promise<{ token: string; user: User }> => {
  try {
    const response = await axios.post(`${API_BASE}/auth/login`, { email, password: pass });
    const { token, _id, ...userData } = response.data;
    const user: User = { id: _id, ...userData, skills: userData.skills || [] };
    return { token, user };
  } catch (error) {
    throw handleApiError(error, 'Login failed');
  }
};

export const registerUser = async (name: string, email: string, pass: string): Promise<{ token: string; user: User }> => {
  try {
    const response = await axios.post(`${API_BASE}/auth/register`, { name, email, password: pass, role: 'jobseeker' });
    const { token, _id, ...userData } = response.data;
    const user: User = { id: _id, ...userData, skills: [] };
    return { token, user };
  } catch (error) {
    throw handleApiError(error, 'Registration failed');
  }
};

export const googleAuth = async (idToken: string): Promise<{ token: string; user: User }> => {
  try {
    const response = await axios.post(`${API_BASE}/auth/google`, { idToken });
    const { token, _id, ...userData } = response.data;
    const user: User = { id: _id, ...userData, skills: userData.skills || [] };
    return { token, user };
  } catch (error) {
    throw handleApiError(error, 'Google authentication failed');
  }
};

export const getUserProfile = async (): Promise<User> => {
  // In a real app, you'd decode the JWT and fetch profile from a /me or /profile endpoint.
  // For now, we return a mock user profile, as backend endpoints for this were not specified.
  const { passwordHash, ...userWithoutPass } = Object.values(MOCK_USERS)[0];
  return simulateDelay(userWithoutPass);
};

export const updateUserProfile = async (updates: Partial<User>): Promise<User> => {
  const userEmail = Object.keys(MOCK_USERS)[0];
  MOCK_USERS[userEmail] = { ...MOCK_USERS[userEmail], ...updates };
  const { passwordHash, ...userWithoutPass } = MOCK_USERS[userEmail];
  return simulateDelay(userWithoutPass);
};

export const getUserApplications = async (): Promise<Application[]> => {
  return simulateDelay(MOCK_APPLICATIONS);
};

export const applyToJob = async (jobId: string): Promise<{ success: boolean; applicationId: string }> => {
  const job = MOCK_JOBS.find(j => j.id === jobId);
  if (!job) {
    throw new Error('Job not found');
  }
  const existingApplication = MOCK_APPLICATIONS.find(a => a.job.id === jobId);
  if (existingApplication) {
    throw new Error('You have already applied for this job');
  }
  const newApplication: Application = {
    id: `a${MOCK_APPLICATIONS.length + 1}`,
    job,
    status: ApplicationStatus.Pending,
  };
  MOCK_APPLICATIONS.push(newApplication);
  return simulateDelay({ success: true, applicationId: newApplication.id });
};

export const fetchUserJobAlerts = async (): Promise<JobAlert[]> => {
    return simulateDelay(MOCK_JOB_ALERTS);
};

export const createJobAlert = async (keyword: string, location: string): Promise<JobAlert> => {
    const existing = MOCK_JOB_ALERTS.find(a => a.keyword.toLowerCase() === keyword.toLowerCase() && a.location.toLowerCase() === location.toLowerCase());
    if (existing) {
        throw new Error('An alert with these criteria already exists.');
    }
    const newAlert: JobAlert = {
        id: `ja${MOCK_JOB_ALERTS.length + 1}`,
        keyword,
        location,
    };
    MOCK_JOB_ALERTS.push(newAlert);
    return simulateDelay(newAlert);
};

export const deleteJobAlert = async (alertId: string): Promise<{ success: boolean }> => {
    const index = MOCK_JOB_ALERTS.findIndex(a => a.id === alertId);
    if (index === -1) {
        throw new Error('Alert not found');
    }
    MOCK_JOB_ALERTS.splice(index, 1);
    return simulateDelay({ success: true });
};