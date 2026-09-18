import { NavLink } from "react-router-dom";
import { MdDashboard, MdSchool, MdPerson, MdCreate, MdVideoLibrary, MdQuiz, MdPeople, MdLibraryBooks } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { RiShieldUserFill } from "react-icons/ri";
import { useAuth } from "../../context/AuthContext";

interface SidebarProps {
  className?: string;
  onNavigate?: () => void;
}

function Sidebar({ className = "", onNavigate }: SidebarProps) {
  const { currentUser } = useAuth();

  const studentLinks = [
    { name: "Dashboard", path: "/student/dashboard", icon: <MdDashboard size={20} /> },
    { name: "My Courses", path: "/student/my-courses", icon: <MdSchool size={20} /> },
    { name: "Profile", path: "/student/profile", icon: <MdPerson size={20} /> },
  ];

  const instructorLinks = [
    { name: "Dashboard", path: "/instructor/dashboard", icon: <MdDashboard size={20} /> },
    { name: "My Courses", path: "/instructor/courses", icon: <MdVideoLibrary size={20} /> },
    { name: "Create Course", path: "/instructor/create-course", icon: <MdCreate size={20} /> },
  ];

  const adminLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <MdDashboard size={20} /> },
    { name: "Users", path: "/admin/users", icon: <MdPeople size={20} /> },
    { name: "All Courses", path: "/admin/courses", icon: <MdLibraryBooks size={20} /> },
  ];

  const links =
    currentUser?.role === "admin"
      ? adminLinks
      : currentUser?.role === "instructor"
      ? instructorLinks
      : studentLinks;

  const roleLabel =
    currentUser?.role === "admin"
      ? "Admin"
      : currentUser?.role === "instructor"
      ? "Instructor"
      : "Student";

  return (
    <aside className={`w-64 min-h-full bg-white border-r border-gray-200 flex flex-col ${className}`}>
      {currentUser && (
        <div className="p-5 border-b border-gray-100 bg-gradient-to-br from-indigo-50 to-purple-50">
          <div className="flex items-center gap-3">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-12 h-12 rounded-full border-2 border-indigo-300 shadow"
            />
            <div className="min-w-0">
              <p className="font-bold text-gray-800 text-sm leading-tight truncate">{currentUser.name}</p>
              <span className="flex items-center gap-1 text-xs text-indigo-600 font-medium mt-0.5">
                {currentUser.role === "admin" ? (
                  <RiShieldUserFill />
                ) : currentUser.role === "instructor" ? (
                  <FaChalkboardTeacher />
                ) : (
                  <MdSchool />
                )}
                {roleLabel}
              </span>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 p-4">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Menu</p>
        <ul className="space-y-1">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                      : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
                  }`
                }
              >
                {link.icon}
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {currentUser?.role === "student" && (
          <>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2 mt-6">Learning</p>
            <ul className="space-y-1">
              <li>
                <NavLink
                  to="/student/learn/1"
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                      isActive ? "bg-indigo-600 text-white shadow-md" : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
                    }`
                  }
                >
                  <MdVideoLibrary size={20} />
                  Continue Learning
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/student/quiz/1"
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                      isActive ? "bg-indigo-600 text-white shadow-md" : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
                    }`
                  }
                >
                  <MdQuiz size={20} />
                  Take Quiz
                </NavLink>
              </li>
            </ul>
          </>
        )}

        {currentUser?.role === "admin" && (
          <>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2 mt-6">Oversight</p>
            <ul className="space-y-1">
              <li>
                <NavLink
                  to="/student/dashboard"
                  onClick={onNavigate}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  <MdSchool size={20} />
                  Student view
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/instructor/dashboard"
                  onClick={onNavigate}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  <FaChalkboardTeacher size={18} />
                  Instructor view
                </NavLink>
              </li>
            </ul>
          </>
        )}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <NavLink
          to="/courses"
          onClick={onNavigate}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          Browse Courses
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;
