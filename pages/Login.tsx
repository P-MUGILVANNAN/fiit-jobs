import React, { useState, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../services/firebase";

// ✅ lucide-react icons
import { Mail, Lock, LogIn } from "lucide-react";

function Login(): React.JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  // 🔹 Email/Password Login
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError("");
    setLoadingEmail(true);
    try {
      await auth.login(email, password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setLoadingEmail(false);
    }
  };

  // 🔹 Google Sign-In with Firebase
  const handleGoogleSignIn = useCallback(async () => {
    setError("");
    setLoadingGoogle(true);
    try {
      const authFirebase = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(authFirebase, provider);

      // Get Firebase ID token
      const idToken = await result.user.getIdToken();

      // Call backend API with token
      await auth.googleLogin(idToken);

      navigate("/", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google Sign-In failed.");
    } finally {
      setLoadingGoogle(false);
    }
  }, [auth, navigate]);

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login to FIIT Jobs
        </h2>

        {error && (
          <Alert type="error" message={error} onClose={() => setError("")} />
        )}

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="mt-1 relative">
              <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative">
              <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>
          </div>

          {/* Login button */}
          <div>
            <button
              type="submit"
              disabled={loadingEmail}
              className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-300"
            >
              {loadingEmail ? <Spinner /> : <><LogIn size={16}/> Sign In</>}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Google button */}
        <div className="mt-6">
          <button
            onClick={handleGoogleSignIn}
            disabled={loadingGoogle}
            className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100"
          >
            {loadingGoogle ? (
              <Spinner />
            ) : (
              <>
                {/* ✅ Official Google "G" Logo */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.61l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.34 2.56 13.11l7.98 6.19C12.65 13.72 17.88 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.1 24.5c0-1.58-.14-3.09-.39-4.5H24v9.02h12.48c-.54 2.89-2.17 5.34-4.63 6.98l7.4 5.73C43.5 38.68 46.1 32.11 46.1 24.5z"/>
                  <path fill="#FBBC05" d="M10.54 28.81c-.48-1.42-.75-2.94-.75-4.51s.27-3.09.75-4.51l-7.98-6.19C.93 16.07 0 20.14 0 24.3c0 4.16.93 8.23 2.56 11.7l7.98-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.47 0 11.9-2.13 15.87-5.8l-7.4-5.73c-2.05 1.38-4.66 2.2-8.47 2.2-6.12 0-11.35-4.22-13.47-9.98l-7.98 6.19C6.51 42.66 14.62 48 24 48z"/>
                </svg>
                Sign in with Google
              </>
            )}
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
