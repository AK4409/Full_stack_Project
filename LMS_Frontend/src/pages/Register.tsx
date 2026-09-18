import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../componets/layout/Navbar";
import Footer from "../componets/layout/Footer";
import Input from "../componets/common/Input";
import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../context/AuthContext";
import { FiEye, FiEyeOff, FiCheck } from "react-icons/fi";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole | "";
};

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState<FormData>({
    name: "", email: "", password: "", confirmPassword: "", role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [success, setSuccess] = useState(false);

  const updateField = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!form.role) newErrors.role = "Please select a role" as any;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSuccess(true);
    login(form.role as UserRole);
    navigate(form.role === "instructor" ? "/instructor/dashboard" : "/student/dashboard");
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center py-24">
          <div className="text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <FiCheck className="text-emerald-600" size={36} />
            </div>
            <h2 className="text-2xl font-black text-gray-800 mb-2">Account Created! 🎉</h2>
            <p className="text-gray-500">Redirecting you to your dashboard...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-200">
                <span className="text-white font-black text-xl">CC</span>
              </div>
              <h1 className="text-2xl font-black text-gray-800">Create Account</h1>
              <p className="text-gray-500 text-sm mt-1">Join 50,000+ learners on Cloud Code</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="name"
                label="Full Name"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Aayush Kayast"
                error={errors.name}
                required
              />
              <Input
                id="email"
                label="Email Address"
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="you@example.com"
                error={errors.email}
                required
              />

              {/* Role Select */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700">
                  I want to <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["student", "instructor"].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => updateField("role", r)}
                      className={`py-3 rounded-xl border-2 font-bold text-sm capitalize transition-all ${
                        form.role === r
                          ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                          : "border-gray-200 text-gray-500 hover:border-indigo-300"
                      }`}
                    >
                      {r === "student" ? "📚 Learn" : "🎓 Teach"}
                      <span className="block text-xs font-normal mt-0.5 capitalize">{r}</span>
                    </button>
                  ))}
                </div>
                {errors.role && <p className="text-xs text-red-500">{errors.role}</p>}
              </div>

              <div className="relative">
                <Input
                  id="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  placeholder="Min. 6 characters"
                  error={errors.password}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 bottom-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>

              <Input
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                value={form.confirmPassword}
                onChange={(e) => updateField("confirmPassword", e.target.value)}
                placeholder="Re-enter your password"
                error={errors.confirmPassword}
                required
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-md shadow-emerald-200 mt-2"
              >
                Create My Account
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-5">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 font-semibold hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;