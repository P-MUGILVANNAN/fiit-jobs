import axios from "axios";
import { User, Job, JobResponse } from "../types";

const API_BASE = "https://jobs-backend-z4z9.onrender.com/api";

/**
 * 🔹 Centralized error handler
 */
const handleApiError = (error: any, defaultMessage: string): Error => {
  const message =
    error.response?.data?.message || error.message || defaultMessage;
  return new Error(message);
};

/**
 * 🔹 Login user
 */
export const loginUser = async (
  email: string,
  pass: string
): Promise<{ token: string; user: User }> => {
  try {
    const response = await axios.post(`${API_BASE}/auth/login`, {
      email,
      password: pass,
    });

    const { token, _id, ...userData } = response.data;
    const user: User = { id: _id, ...userData, skills: userData.skills || [] };

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { token, user };
  } catch (error) {
    throw handleApiError(error, "Login failed");
  }
};

/**
 * 🔹 Send OTP (Step 1)
 */
export const sendOtpApi = async (data: {
  name: string;
  email: string;
  password: string;
}): Promise<void> => {
  try {
    await axios.post(`${API_BASE}/auth/send-otp`, data);
  } catch (error) {
    throw handleApiError(error, "Failed to send OTP");
  }
};

/**
 * 🔹 Verify OTP & Register (Step 2)
 */
export const verifyOtpApi = async (data: {
  email: string;
  otp: string;
}): Promise<{ token: string; user: User }> => {
  try {
    const response = await axios.post(`${API_BASE}/auth/verify-otp`, data);

    const { token, _id, ...userData } = response.data;
    const user: User = { id: _id, ...userData, skills: userData.skills || [] };

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { token, user };
  } catch (error) {
    throw handleApiError(error, "OTP verification failed");
  }
};

/**
 * 🔹 Google login
 */
export const googleAuth = async (
  idToken: string
): Promise<{ token: string; user: User }> => {
  try {
    const response = await axios.post(`${API_BASE}/auth/google`, { idToken });

    const { token, _id, ...userData } = response.data;
    const user: User = { id: _id, ...userData, skills: userData.skills || [] };

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { token, user };
  } catch (error) {
    throw handleApiError(error, "Google authentication failed");
  }
};

/**
 * 🔹 Get logged-in user profile
 */
export const getUserProfile = async (): Promise<User> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    const response = await axios.get(`${API_BASE}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = response.data.user || response.data;

    const { _id, ...userData } = data;
    const user: User = { id: _id, ...userData, skills: userData.skills || [] };

    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } catch (error) {
    throw handleApiError(error, "Failed to fetch user profile");
  }
};

/**
 * 🔹 Update user profile
 * Supports text fields + files (profileImage, coverImage, resume)
 */
export const updateUserProfile = async (
  data: Partial<User> & {
    profileImage?: File;
    coverImage?: File;
    resume?: File;
  }
): Promise<User> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No authentication token found");

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          // Serialize arrays (education, projects, skills) to JSON string
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value as any);
        }
      }
    });

    const response = await axios.put(`${API_BASE}/user/update`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    const updated = response.data.user || response.data;
    const { _id, ...userData } = updated;
    const updatedUser: User = {
      id: _id,
      ...userData,
      skills: userData.skills || [],
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    return updatedUser;
  } catch (error) {
    throw handleApiError(error, "Failed to update profile");
  }
};

/**
 * 🔹 Fetch jobs with filters & pagination
 */
export const fetchJobs = async (params: {
  keyword?: string;
  location?: string;
  jobType?: string;
  experience?: string;
  qualification?: string;
  category?: string;
  page?: number;
  limit?: number;
} = {}): Promise<JobResponse> => {
  try {
    const response = await axios.get(`${API_BASE}/jobs`, { params });

    // ✅ Ensure response matches JobResponse
    if (response.data && Array.isArray(response.data.jobs)) {
      return {
        success: response.data.success ?? true,
        totalJobs: response.data.totalJobs ?? response.data.jobs.length,
        page: response.data.page ?? 1,
        totalPages: response.data.totalPages ?? 1,
        jobs: response.data.jobs,
      };
    }

    throw new Error("Jobs API did not return a valid response");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch jobs");
  }
};

/**
 * 🔹 Fetch full job details by ID
 */
export const fetchJobById = async (id: string): Promise<Job> => {
  try {
    const response = await axios.get(`${API_BASE}/jobs/${id}`);
    return response.data as Job;
  } catch (error) {
    throw handleApiError(error, "Failed to fetch job details");
  }
};