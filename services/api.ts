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

    // Save token + user to localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { token, user };
  } catch (error) {
    throw handleApiError(error, "Login failed");
  }
};

/**
 * 🔹 Register new user
 */
export const registerUser = async (
  name: string,
  email: string,
  pass: string,
  role: string = "jobseeker"
): Promise<{ token: string; user: User }> => {
  try {
    const response = await axios.post(`${API_BASE}/auth/register`, {
      name,
      email,
      password: pass,
      role,
    });

    const { token, _id, ...userData } = response.data;
    const user: User = { id: _id, ...userData, skills: [] };

    // Save token + user to localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { token, user };
  } catch (error) {
    throw handleApiError(error, "Registration failed");
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

    // Save token + user to localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { token, user };
  } catch (error) {
    throw handleApiError(error, "Google authentication failed");
  }
};

/**
 * 🔹 Get logged-in user profile (from localStorage, since no /auth/me endpoint)
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
    // Ensure always returning an array
    if (Array.isArray(response.data)) {
      return response.data;
    }
    if (response.data.jobs && Array.isArray(response.data.jobs)) {
      return response.data.jobs;
    }
    throw new Error("Jobs API did not return a valid array");
  } catch (error) {
    throw handleApiError(error, "Failed to fetch jobs");
  }
};
