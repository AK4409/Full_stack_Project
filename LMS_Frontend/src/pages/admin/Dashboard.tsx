// import { useNavigate } from "react-router-dom";
// import DashboardLayout from "../../componets/layout/DashboardLayout";
// import Badge from "../../componets/common/Badge";
// import { useAuth } from "../../context/AuthContext";
// import { courses } from "../../data/courses";
// import { FiUsers, FiBookOpen, FiUserCheck, FiAlertCircle, FiArrowRight } from "react-icons/fi";

// function AdminDashboard() {
//   const { currentUser, managedUsers } = useAuth();
//   const navigate = useNavigate();

//   const students = managedUsers.filter((u) => u.role === "student");
//   const instructors = managedUsers.filter((u) => u.role === "instructor");
//   const suspended = managedUsers.filter((u) => u.status === "suspended");
//   const activeStudents = students.filter((u) => u.status === "active").length;

//   const STAT_CARDS = [
//     { label: "Students", value: students.length, icon: <FiUsers size={22} />, color: "bg-indigo-500" },
//     { label: "Instructors", value: instructors.length, icon: <FiUserCheck size={22} />, color: "bg-emerald-500" },
//     { label: "Published Courses", value: courses.length, icon: <FiBookOpen size={22} />, color: "bg-purple-500" },
//     { label: "Suspended Accounts", value: suspended.length, icon: <FiAlertCircle size={22} />, color: "bg-amber-500" },
//   ];

//   return (
//     <DashboardLayout>
//       <div className="max-w-6xl">
//         <div className="bg-gradient-to-r from-slate-800 to-indigo-800 rounded-2xl p-5 sm:p-6 text-white mb-8 shadow-lg">
//           <p className="text-indigo-200 text-sm">Platform control</p>
//           <h1 className="text-xl sm:text-2xl font-black mt-1">{currentUser?.name ?? "Admin"}</h1>
//           <p className="text-indigo-200 text-sm mt-1">
//             Overview of every student, instructor, and course on Cloud Code.
//           </p>
//         </div>

//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
//           {STAT_CARDS.map((s) => (
//             <div key={s.label} className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100">
//               <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center text-white mb-3`}>
//                 {s.icon}
//               </div>
//               <p className="text-2xl font-black text-gray-800">{s.value}</p>
//               <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
//             </div>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
//             <div className="flex items-center justify-between mb-5">
//               <h2 className="text-lg font-black text-gray-800">Students</h2>
//               <button
//                 onClick={() => navigate("/admin/users")}
//                 className="text-indigo-600 text-sm font-semibold flex items-center gap-1 hover:text-indigo-800"
//               >
//                 Manage <FiArrowRight size={14} />
//               </button>
//             </div>
//             <p className="text-sm text-gray-500 mb-4">{activeStudents} active accounts</p>
//             <div className="space-y-3">
//               {students.slice(0, 4).map((user) => (
//                 <div key={user.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
//                   <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-gray-200" />
//                   <div className="flex-1 min-w-0">
//                     <p className="font-semibold text-sm text-gray-800 truncate">{user.name}</p>
//                     <p className="text-xs text-gray-400 truncate">{user.email}</p>
//                   </div>
//                   <Badge text={user.status} variant={user.status === "active" ? "success" : "warning"} />
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
//             <div className="flex items-center justify-between mb-5">
//               <h2 className="text-lg font-black text-gray-800">Instructors</h2>
//               <button
//                 onClick={() => navigate("/admin/users")}
//                 className="text-indigo-600 text-sm font-semibold flex items-center gap-1 hover:text-indigo-800"
//               >
//                 Manage <FiArrowRight size={14} />
//               </button>
//             </div>
//             <div className="space-y-3">
//               {instructors.map((user) => (
//                 <div key={user.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
//                   <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-gray-200" />
//                   <div className="flex-1 min-w-0">
//                     <p className="font-semibold text-sm text-gray-800 truncate">{user.name}</p>
//                     <p className="text-xs text-gray-400">{user.coursesTaught ?? 0} courses</p>
//                   </div>
//                   <Badge text={user.status} variant={user.status === "active" ? "success" : "warning"} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
//           <div className="flex items-center justify-between mb-5">
//             <h2 className="text-lg font-black text-gray-800">All Courses</h2>
//             <button
//               onClick={() => navigate("/admin/courses")}
//               className="text-indigo-600 text-sm font-semibold flex items-center gap-1 hover:text-indigo-800"
//             >
//               View all <FiArrowRight size={14} />
//             </button>
//           </div>
//           <div className="space-y-3">
//             {courses.slice(0, 5).map((course) => (
//               <div key={course.id} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 rounded-xl bg-gray-50">
//                 <p className="font-semibold text-sm text-gray-800 flex-1">{course.title}</p>
//                 <div className="flex items-center gap-3 text-xs text-gray-500">
//                   <span>{course.studentsCount.toLocaleString()} students</span>
//                   <span className="capitalize">{course.level}</span>
//                   <Badge text={course.status} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </DashboardLayout>
//   );
// }

// export default AdminDashboard;





import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../componets/layout/DashboardLayout";
import Badge from "../../componets/common/Badge";
import { useAuth } from "../../context/AuthContext";
import { courses } from "../../data/courses";
import {
  FiUsers,
  FiBookOpen,
  FiUserCheck,
  FiAlertCircle,
  FiArrowRight,
} from "react-icons/fi";

function AdminDashboard() {
  const { currentUser, managedUsers } = useAuth();
  const navigate = useNavigate();

  const students = managedUsers.filter((u) => u.role === "student");
  const instructors = managedUsers.filter((u) => u.role === "instructor");
  const suspended = managedUsers.filter((u) => u.status === "suspended");
  const activeStudents = students.filter(
    (u) => u.status === "active"
  ).length;

  const STAT_CARDS = [
    {
      label: "Students",
      value: students.length,
      icon: <FiUsers size={20} />,
      color: "bg-indigo-500",
    },
    {
      label: "Instructors",
      value: instructors.length,
      icon: <FiUserCheck size={20} />,
      color: "bg-emerald-500",
    },
    {
      label: "Published Courses",
      value: courses.length,
      icon: <FiBookOpen size={20} />,
      color: "bg-purple-500",
    },
    {
      label: "Suspended Accounts",
      value: suspended.length,
      icon: <FiAlertCircle size={20} />,
      color: "bg-amber-500",
    },
  ];

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto px-1 sm:px-2 lg:px-0 min-w-0">

        {/* ================= HEADER ================= */}
        <div className="bg-gradient-to-r from-slate-800 to-indigo-800 rounded-2xl p-4 sm:p-6 lg:p-7 text-white mb-6 sm:mb-8 shadow-lg">
          <p className="text-indigo-200 text-xs sm:text-sm">
            Platform control
          </p>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black mt-1 truncate">
            {currentUser?.name ?? "Admin"}
          </h1>

          <p className="text-indigo-200 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Overview of every student, instructor, and course on Cloud Code.
          </p>
        </div>

        {/* ================= STAT CARDS ================= */}
        <div className="grid grid-cols-1 min-[400px]:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {STAT_CARDS.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 min-w-0"
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 sm:w-11 sm:h-11 ${s.color} rounded-xl flex items-center justify-center text-white mb-3`}
              >
                {s.icon}
              </div>

              {/* Value */}
              <p className="text-xl sm:text-2xl font-black text-gray-800 truncate">
                {s.value}
              </p>

              {/* Label */}
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5 truncate">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* ================= STUDENTS + INSTRUCTORS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">

          {/* ================= STUDENTS ================= */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 lg:p-6 min-w-0">

            {/* Header */}
            <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">
              <h2 className="text-base sm:text-lg font-black text-gray-800">
                Students
              </h2>

              <button
                onClick={() => navigate("/admin/users")}
                className="flex items-center gap-1 text-indigo-600 text-xs sm:text-sm font-semibold hover:text-indigo-800 transition-colors shrink-0"
              >
                <span>Manage</span>
                <FiArrowRight size={14} />
              </button>
            </div>

            {/* Active Accounts */}
            <p className="text-xs sm:text-sm text-gray-500 mb-4">
              {activeStudents} active accounts
            </p>

            {/* Student List */}
            <div className="space-y-3">
              {students.slice(0, 4).map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 min-w-0"
                >
                  {/* Avatar */}
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 shrink-0 object-cover"
                  />

                  {/* User Information */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs sm:text-sm text-gray-800 truncate">
                      {user.name}
                    </p>

                    <p className="text-[11px] sm:text-xs text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="shrink-0">
                    <Badge
                      text={user.status}
                      variant={
                        user.status === "active"
                          ? "success"
                          : "warning"
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ================= INSTRUCTORS ================= */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 lg:p-6 min-w-0">

            {/* Header */}
            <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">
              <h2 className="text-base sm:text-lg font-black text-gray-800">
                Instructors
              </h2>

              <button
                onClick={() => navigate("/admin/users")}
                className="flex items-center gap-1 text-indigo-600 text-xs sm:text-sm font-semibold hover:text-indigo-800 transition-colors shrink-0"
              >
                <span>Manage</span>
                <FiArrowRight size={14} />
              </button>
            </div>

            {/* Instructor List */}
            <div className="space-y-3">
              {instructors.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 min-w-0"
                >
                  {/* Avatar */}
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 shrink-0 object-cover"
                  />

                  {/* User Information */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs sm:text-sm text-gray-800 truncate">
                      {user.name}
                    </p>

                    <p className="text-[11px] sm:text-xs text-gray-400 truncate">
                      {user.coursesTaught ?? 0} courses
                    </p>
                  </div>

                  {/* Status */}
                  <div className="shrink-0">
                    <Badge
                      text={user.status}
                      variant={
                        user.status === "active"
                          ? "success"
                          : "warning"
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= ALL COURSES ================= */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 lg:p-6 min-w-0">

          {/* Header */}
          <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">
            <h2 className="text-base sm:text-lg font-black text-gray-800">
              All Courses
            </h2>

            <button
              onClick={() => navigate("/admin/courses")}
              className="flex items-center gap-1 text-indigo-600 text-xs sm:text-sm font-semibold hover:text-indigo-800 transition-colors shrink-0"
            >
              <span>View all</span>
              <FiArrowRight size={14} />
            </button>
          </div>

          {/* Course List */}
          <div className="space-y-3">
            {courses.slice(0, 5).map((course) => (
              <div
                key={course.id}
                className="flex flex-col gap-2 p-3 sm:p-4 rounded-xl bg-gray-50 min-w-0"
              >
                {/* Course Title */}
                <p className="font-semibold text-xs sm:text-sm text-gray-800 break-words">
                  {course.title}
                </p>

                {/* Course Information */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] sm:text-xs text-gray-500">
                  <span className="whitespace-nowrap">
                    {course.studentsCount.toLocaleString()} students
                  </span>

                  <span className="capitalize whitespace-nowrap">
                    {course.level}
                  </span>

                  <div className="shrink-0">
                    <Badge text={course.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;

