import { useState } from "react";
import DashboardLayout from "../../componets/layout/DashboardLayout";
import Input from "../../componets/common/Input";
import { useAuth } from "../../context/AuthContext";
import { FiEdit2, FiCheck, FiAward, FiBook, FiClock } from "react-icons/fi";

function StudentProfile() {
  const { currentUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: currentUser?.name ?? "",
    email: currentUser?.email ?? "",
    bio: "Passionate learner on a journey to become a full-stack developer.",
    phone: "+977 9812345678",
    location: "Kathmandu, Nepal",
  });
  const [saved, setSaved] = useState(false);

  const updateField = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setEditing(false);
  };

  const STATS = [
    { icon: <FiBook />, label: "Courses Enrolled", value: currentUser?.enrolledCourses?.length ?? 3 },
    { icon: <FiAward />, label: "Certificates Earned", value: 0 },
    { icon: <FiClock />, label: "Hours Learned", value: "42h" },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-3xl">
        <h1 className="text-2xl font-black text-gray-800 mb-6">My Profile</h1>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={currentUser?.avatar ?? "https://api.dicebear.com/7.x/avataaars/svg?seed=student"}
                alt={form.name}
                className="w-20 h-20 rounded-2xl border-4 border-indigo-100"
              />
              <div>
                <h2 className="text-xl font-black text-gray-800">{form.name}</h2>
                <p className="text-indigo-600 text-sm font-medium capitalize">{currentUser?.role ?? "Student"}</p>
                <p className="text-xs text-gray-400 mt-1">{form.location}</p>
              </div>
            </div>
            <button
              onClick={() => setEditing(!editing)}
              className="flex items-center justify-center gap-2 text-indigo-600 hover:text-indigo-800 border border-indigo-200 hover:border-indigo-400 px-4 py-2 rounded-xl text-sm font-semibold transition-all w-full sm:w-auto"
            >
              <FiEdit2 size={14} /> Edit Profile
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4 leading-relaxed">{form.bio}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {STATS.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
              <div className="text-indigo-500 flex justify-center mb-2 text-xl">{s.icon}</div>
              <p className="text-xl font-black text-gray-800">{s.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {editing && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <h2 className="font-black text-gray-800 mb-5 text-lg">Edit Information</h2>
            <div className="space-y-4">
              <Input
                id="profile-name"
                label="Full Name"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
              />
              <Input
                id="profile-email"
                label="Email"
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
              />
              <Input
                id="profile-phone"
                label="Phone"
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />
              <Input
                id="profile-location"
                label="Location"
                value={form.location}
                onChange={(e) => updateField("location", e.target.value)}
              />
              <div className="flex flex-col gap-1.5">
                <label htmlFor="profile-bio" className="text-sm font-semibold text-gray-700">Bio</label>
                <textarea
                  id="profile-bio"
                  rows={3}
                  value={form.bio}
                  onChange={(e) => updateField("bio", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-indigo-500 outline-none text-sm text-gray-800 resize-none transition-colors"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleSave}
                  className="flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  <FiCheck /> Save Changes
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold text-sm transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {saved && (
          <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 flex items-center gap-2">
            <FiCheck className="text-emerald-600" />
            <p className="text-emerald-700 text-sm font-semibold">Profile updated successfully!</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default StudentProfile;
