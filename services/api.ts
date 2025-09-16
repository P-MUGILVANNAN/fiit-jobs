// src/services/api.ts
import axios from "axios";
import { User, Job } from "../types";

const API_BASE = "https://jobs-backend-z4z9.onrender.com/api";

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
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      throw new Error("No user found in local storage");
    }
    return JSON.parse(storedUser) as User;
  } catch (error) {
    throw handleApiError(error, "Failed to fetch user profile");
  }
};

/**
 * 🔹 Fetch all jobs
 */
export const fetchJobs = async (): Promise<Job[]> => {
  try {
    const response = await axios.get(`${API_BASE}/jobs`);
    if (Array.isArray(response.data)) return response.data;
    if (response.data.jobs && Array.isArray(response.data.jobs)) return response.data.jobs;
    throw new Error("Jobs API did not return a valid array");
  } catch (error) {
    throw handleApiError(error, "Failed to fetch jobs");
  }
};


/**
* 🔹Fetch full job details of ID 
*/

export const fetchJobById = async (id: string): Promise<Job> => {
  try {
    const response = await axios.get(`${API_BASE}/jobs/${id}`);
    return response.data as Job;
  } catch (error) {
    throw handleApiError(error, "Failed to fetch job details");
  }
};

