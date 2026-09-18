import { useState } from "react";
import DashboardLayout from "../../componets/layout/DashboardLayout";
import Badge from "../../componets/common/Badge";
import Modal from "../../componets/common/Modal";
import Input from "../../componets/common/Input";
import { useAuth } from "../../context/AuthContext";
import type { ManagedUser, UserRole } from "../../context/AuthContext";
import { courses } from "../../data/courses";
import { FiSearch, FiSlash, FiCheck, FiTrash2, FiEye, FiRepeat, FiUserPlus, FiMail, FiBookOpen } from "react-icons/fi";

type RoleFilter = "all" | "student" | "instructor";
type NewUserRole = Exclude<UserRole, "admin">;

function AdminUsers() {
  const { managedUsers, toggleUserStatus, removeUser, changeUserRole, addUser } = useAuth();
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<ManagedUser | null>(null);
  const [viewTarget, setViewTarget] = useState<ManagedUser | null>(null);
  const [roleChangeTarget, setRoleChangeTarget] = useState<ManagedUser | null>(null);

  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "student" as NewUserRole });
  const [addUserError, setAddUserError] = useState("");

  const filtered = managedUsers.filter((user) => {
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      user.name.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q);
    return matchesRole && matchesSearch;
  });

  const handleAddUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim()) {
      setAddUserError("Name and email are required.");
      return;
    }
    addUser({ name: newUser.name.trim(), email: newUser.email.trim(), role: newUser.role });
    setNewUser({ name: "", email: "", role: "student" });
    setAddUserError("");
    setShowAddUser(false);
  };

  const handleConfirmRoleChange = () => {
    if (roleChangeTarget) {
      const nextRole: NewUserRole = roleChangeTarget.role === "student" ? "instructor" : "student";
      changeUserRole(roleChangeTarget.id, nextRole);
    }
    setRoleChangeTarget(null);
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-800 mb-2">User Control</h1>
            <p className="text-sm text-gray-500">
              View, suspend, restore, promote, or remove students and instructors.
            </p>
          </div>
          <button
            onClick={() => setShowAddUser(true)}
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors text-sm w-full sm:w-auto shrink-0"
          >
            <FiUserPlus size={15} /> Add User
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email"
              className="w-full pl-10 pr-3 py-2.5 rounded-xl border-2 border-gray-200 focus:border-indigo-500 outline-none text-sm"
            />
          </div>
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl overflow-x-auto">
            {(["all", "student", "instructor"] as RoleFilter[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setRoleFilter(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-bold capitalize whitespace-nowrap ${
                  roleFilter === tab ? "bg-white shadow text-indigo-700" : "text-gray-500"
                }`}
              >
                {tab === "all" ? "All users" : `${tab}s`}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400 bg-white rounded-2xl border border-gray-100">
            No users match your filters.
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 flex flex-col md:flex-row md:items-center gap-4"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full border-2 border-indigo-100" />
                  <div className="min-w-0">
                    <p className="font-bold text-gray-800 truncate">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge text={user.role} variant="info" />
                      <Badge text={user.status} variant={user.status === "active" ? "success" : "warning"} />
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-500 md:text-right">
                  {user.role === "student" ? (
                    <p>{user.enrolledCourses?.length ?? 0} enrolled courses</p>
                  ) : (
                    <p>{user.coursesTaught ?? 0} courses taught</p>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setViewTarget(user)}
                    className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 border border-indigo-200 hover:bg-indigo-50 px-3 py-2 rounded-lg transition-colors"
                  >
                    <FiEye size={13} /> View
                  </button>
                  <button
                    onClick={() => setRoleChangeTarget(user)}
                    className="flex items-center gap-1.5 text-xs font-bold text-purple-600 border border-purple-200 hover:bg-purple-50 px-3 py-2 rounded-lg transition-colors"
                  >
                    <FiRepeat size={13} /> Make {user.role === "student" ? "Instructor" : "Student"}
                  </button>
                  <button
                    onClick={() => toggleUserStatus(user.id)}
                    className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg border transition-colors ${
                      user.status === "active"
                        ? "text-amber-700 border-amber-200 hover:bg-amber-50"
                        : "text-emerald-700 border-emerald-200 hover:bg-emerald-50"
                    }`}
                  >
                    {user.status === "active" ? <FiSlash size={13} /> : <FiCheck size={13} />}
                    {user.status === "active" ? "Suspend" : "Restore"}
                  </button>
                  <button
                    onClick={() => setDeleteTarget(user)}
                    className="flex items-center gap-1.5 text-xs font-bold text-red-500 border border-red-200 hover:bg-red-50 px-3 py-2 rounded-lg"
                  >
                    <FiTrash2 size={13} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        title="Remove user"
        size="sm"
      >
        <div className="text-center">
          <p className="text-gray-600 mb-6 text-sm">
            Remove {deleteTarget?.name} from the platform? This only updates the local list.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                if (deleteTarget) removeUser(deleteTarget.id);
                setDeleteTarget(null);
              }}
              className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm"
            >
              Yes, remove
            </button>
            <button
              onClick={() => setDeleteTarget(null)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-2.5 rounded-xl text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* View Details Modal */}
      <Modal
        isOpen={viewTarget !== null}
        onClose={() => setViewTarget(null)}
        title="User Details"
        size="md"
      >
        {viewTarget && (
          <div>
            <div className="flex items-center gap-4 mb-5">
              <img
                src={viewTarget.avatar}
                alt={viewTarget.name}
                className="w-16 h-16 rounded-full border-2 border-indigo-100 shrink-0"
              />
              <div className="min-w-0">
                <p className="font-black text-gray-800 truncate">{viewTarget.name}</p>
                <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5 truncate">
                  <FiMail size={12} className="shrink-0" /> {viewTarget.email}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge text={viewTarget.role} variant="info" />
                  <Badge text={viewTarget.status} variant={viewTarget.status === "active" ? "success" : "warning"} />
                </div>
              </div>
            </div>

            {viewTarget.role === "student" ? (
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FiBookOpen size={12} /> Enrolled Courses ({viewTarget.enrolledCourses?.length ?? 0})
                </p>
                {viewTarget.enrolledCourses && viewTarget.enrolledCourses.length > 0 ? (
                  <div className="space-y-2">
                    {viewTarget.enrolledCourses.map((courseId) => {
                      const course = courses.find((c) => c.id === courseId);
                      const pct = viewTarget.progress?.[courseId] ?? 0;
                      return (
                        <div key={courseId} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-gray-50 text-sm">
                          <span className="font-semibold text-gray-700 truncate">{course?.title ?? `Course #${courseId}`}</span>
                          <span className="text-xs font-bold text-indigo-600 shrink-0">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">Not enrolled in any course yet.</p>
                )}
              </div>
            ) : (
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FiBookOpen size={12} /> Teaching Summary
                </p>
                <div className="p-3 rounded-xl bg-gray-50 text-sm flex items-center justify-between">
                  <span className="text-gray-600">Courses taught</span>
                  <span className="font-bold text-gray-800">{viewTarget.coursesTaught ?? 0}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Change Role Modal */}
      <Modal
        isOpen={roleChangeTarget !== null}
        onClose={() => setRoleChangeTarget(null)}
        title="Change user role"
        size="sm"
      >
        {roleChangeTarget && (
          <div className="text-center">
            <p className="text-gray-600 mb-6 text-sm">
              Make <span className="font-bold text-gray-800">{roleChangeTarget.name}</span> a{" "}
              <span className="font-bold text-indigo-600">
                {roleChangeTarget.role === "student" ? "instructor" : "student"}
              </span>
              ? This updates their role for this session.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleConfirmRoleChange}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm"
              >
                Yes, change role
              </button>
              <button
                onClick={() => setRoleChangeTarget(null)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-2.5 rounded-xl text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Add User Modal */}
      <Modal
        isOpen={showAddUser}
        onClose={() => { setShowAddUser(false); setAddUserError(""); }}
        title="Add a new user"
        size="sm"
      >
        <div className="space-y-4">
          <Input
            id="new-user-name"
            label="Full Name"
            value={newUser.name}
            onChange={(e) => setNewUser((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="e.g. Kritika Basnet"
            required
          />
          <Input
            id="new-user-email"
            label="Email Address"
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="kritika@example.com"
            required
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Role</label>
            <div className="grid grid-cols-2 gap-3">
              {(["student", "instructor"] as NewUserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setNewUser((prev) => ({ ...prev, role: r }))}
                  className={`py-2.5 rounded-xl border-2 font-bold text-sm capitalize transition-all ${
                    newUser.role === r
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                      : "border-gray-200 text-gray-500 hover:border-indigo-300"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          {addUserError && <p className="text-xs text-red-500">{addUserError}</p>}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleAddUser}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors"
            >
              Add User
            </button>
            <button
              onClick={() => { setShowAddUser(false); setAddUserError(""); }}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-xl text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}

export default AdminUsers;
