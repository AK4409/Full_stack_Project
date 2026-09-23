import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../componets/layout/Navbar";
import Footer from "../componets/layout/Footer";
import Input from "../componets/common/Input";
import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../context/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

const DEMO_USERS = [
  {
    label: "Student",
    role: "student" as UserRole,
    email: "aayush12@gmail.com",
    color: "bg-indigo-600 hover:bg-indigo-700",
  },
  {
    label: "Instructor",
    role: "instructor" as UserRole, 
    email: "ajay56@gmail.com",
    color: "bg-purple-600 hover:bg-purple-700",
  },
  {
    label: "Admin",
    role: "admin" as UserRole,
    email: "admin@cloudcode.com.np",
    color: "bg-slate-800 hover:bg-slate-900",
  },
];

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    const matched = DEMO_USERS.find((u) => u.email === email.trim().toLowerCase());
    if (matched) {
      login(matched.role);
      navigate(
        matched.role === "admin"
          ? "/admin/dashboard"
          : matched.role === "instructor"
          ? "/instructor/dashboard"
          : "/student/dashboard"
      );
    } else {
      setError("Invalid credentials. Use the Quick Login buttons below to demo.");
    }
  };

  const handleQuickLogin = (role: UserRole) => {
    login(role);
    navigate(
      role === "admin"
        ? "/admin/dashboard"
        : role === "instructor"
        ? "/instructor/dashboard"
        : "/student/dashboard"
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
                <span className="text-white font-black text-xl hover:scale-125"><img src="/logo3.png" alt="logo" /></span>
              </div>
              <h1 className="text-2xl font-black text-gray-800">Welcome Back!</h1>
              <p className="text-gray-500 text-sm mt-1">Sign in to continue your learning journey</p>
            </div>

            {/* Quick Demo Buttons */}
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <p className="text-xs font-semibold text-amber-700 mb-3 text-center">⚡ Quick Demo Login</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {DEMO_USERS.map((u) => (
                  <button
                    key={u.role}
                    onClick={() => handleQuickLogin(u.role)}
                    className={`flex-1 text-white text-sm font-bold py-2 rounded-lg ${u.color} transition-colors`}
                  >
                    Login as {u.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 border-t border-gray-200" />
              <span className="text-xs text-gray-400 font-medium">or sign in manually</span>
              <div className="flex-1 border-t border-gray-200" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="email"
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@gmail.com"
                required
              />

              <div className="relative">
                <Input
                  id="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 bottom-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-md shadow-indigo-200"
              >
                Sign In hello
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-5">
              Don't have an account?{" "}
              <Link to="/register" className="text-indigo-600 font-semibold hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;