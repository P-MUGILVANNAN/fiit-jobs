export enum JobType {
  FullTime = 'Full-time',
  PartTime = 'Part-time',
  Contract = 'Contract',
}

export enum ExperienceLevel {
  Entry = 'Entry Level',
  Mid = 'Mid Level',
  Senior = 'Senior Level',
}

export interface Education {
  id: string;
  level: string;
  institution: string;
  startYear: string;
  endYear: string;
  grade?: string;
}

export interface Project {
  id: string;
  projectName: string;
  description?: string;
  liveLink?: string;
  githubLink?: string;
  duration?: string;
}

export interface User {
  id:string;
  name: string;
  email: string;
  skills: string[];
  role?: 'jobseeker' | 'employer' | 'admin';
  provider?: 'local' | 'google';
  profileImage?: string; // URL or base64 string
  about?: string;
  phone?: string;
  location?: string;
  experience?: string;
  education?: Education[];
  projects?: Project[];
  resume?: string; // filename or path
}

export interface Job {
  _id: string;
  title: string;
  company: string;
  companyImage: string;
  location: string;
  description: string;
  skills: string[];
  createdAt: string;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
}

export enum ApplicationStatus {
  Pending = 'Pending',
  Selected = 'Selected',
  Rejected = 'Rejected',
}

export interface Application {
  id: string;
  job: Job;
  status: ApplicationStatus;
}

export interface JobAlert {
  id: string;
  keyword: string;
  location: string;
}