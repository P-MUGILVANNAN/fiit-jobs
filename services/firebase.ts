// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your Firebase config
const firebaseConfig = {
  apiKey: 
  authDomain: 
  projectId: 
  storageBucket: 
  messagingSenderId:
  appId: 
  measurementId: "
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Analytics is optional (safe-guard with typeof window)
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
