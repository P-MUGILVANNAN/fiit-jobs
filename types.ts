// ================= Enums =================

export enum JobType {
  FullTime = "Full-Time",
  PartTime = "Part-Time",
  Internship = "Internship",
  Contract = "Contract",
}

export enum ExperienceLevel {
  Fresher = "Fresher",
  ZeroToOne = "0-1 Years",
  OneToThree = "1-3 Years",
  ThreeToFive = "3-5 Years",
  FivePlus = "5+ Years",
}

// ================= User Related =================

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
  id: string;
  name: string;
  email: string;
  skills: string[];
  role?: "user" | "employer" | "admin";
  provider?: "local" | "google";
  profileImage?: string; // URL or base64 string
  about?: string;
  phone?: string;
  location?: string;
  experience?: string;
  education?: Education[];
  projects?: Project[];
  resume?: string; // filename or path
}

// ================= Job Related =================

export interface Job {
  _id: string;
  companyName: string;
  title: string;
  description: string;
  skills: string[];
  qualification: string;
  category: string;
  location: string;
  salary: number;
  jobType: JobType;
  experience: ExperienceLevel;
  companyImage?: string;
  createdBy?: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt?: string;
}

// ================= Application Related =================

export enum ApplicationStatus {
  Pending = "Pending",
  Selected = "Selected",
  Rejected = "Rejected",
}

export interface Application {
  id: string;
  job: Job;
  status: ApplicationStatus;
}

// ================= API Response Types =================

export interface JobResponse {
  success: boolean;
  totalJobs: number;
  page: number;
  totalPages: number;
  jobs: Job[];
}