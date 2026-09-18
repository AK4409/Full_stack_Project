import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../componets/layout/DashboardLayout";
import ProgressBar from "../../componets/common/ProgressBar";
import Badge from "../../componets/common/Badge";
import { useAuth } from "../../context/AuthContext";
import { courses } from "../../data/courses";
import { assignments } from "../../data/assignments";
import { quizzes } from "../../data/quizzes";
import { FiBookOpen, FiAward, FiTrendingUp, FiClock, FiArrowRight, FiAlertCircle } from "react-icons/fi";

function StudentDashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const enrolledCourseIds = currentUser?.enrolledCourses ?? [1, 2, 3];
  const progress = currentUser?.progress ?? { 1: 68, 2: 35, 3: 20 };
  const enrolledCourses = courses.filter((c) => enrolledCourseIds.includes(c.id));
  const progressValues = Object.values(progress);
  const completedCount = progressValues.filter((p) => p === 100).length;
  const pendingAssignments = assignments.filter((a) => a.status === "pending");
  const avgProgress = progressValues.length
    ? Math.round(progressValues.reduce((a, b) => a + b, 0) / progressValues.length)
    : 0;

  const STAT_CARDS = [
    {
      label: "Enrolled Courses",
      value: enrolledCourses.length,
      icon: <FiBookOpen size={22} />,
      color: "bg-indigo-500",
    },
    {
      label: "Completed",
      value: completedCount,
      icon: <FiAward size={22} />,
      color: "bg-emerald-500",
    },
    {
      label: "Avg. Progress",
      value: `${avgProgress}%`,
      icon: <FiTrendingUp size={22} />,
      color: "bg-purple-500",
    },
    {
      label: "Hours Learned",
      value: "42h",
      icon: <FiClock size={22} />,
      color: "bg-amber-500",
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-5xl">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-5 sm:p-6 text-white mb-8 shadow-lg shadow-indigo-200">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-indigo-200 text-sm">{greeting} 👋</p>
              <h1 className="text-xl sm:text-2xl font-black mt-1">{currentUser?.name ?? "Student"}</h1>
              <p className="text-indigo-200 text-sm mt-1">Ready to continue learning today?</p>
            </div>
            <img
              src={currentUser?.avatar ?? "https://api.dicebear.com/7.x/avataaars/svg?seed=student"}
              alt="avatar"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-white/30 shadow-lg hidden sm:block"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {STAT_CARDS.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100">
              <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center text-white mb-3`}>
                {s.icon}
              </div>
              <p className="text-2xl font-black text-gray-800">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6">
          <div className="flex items-center justify-between mb-5 gap-3">
            <h2 className="text-lg font-black text-gray-800">My Courses</h2>
            <button
              onClick={() => navigate("/student/my-courses")}
              className="text-indigo-600 text-sm font-semibold flex items-center gap-1 hover:text-indigo-800 transition-colors"
            >
              View All <FiArrowRight size={14} />
            </button>
          </div>
          <div className="space-y-4">
            {enrolledCourses.map((course) => {
              const pct = (progress as Record<number, number>)[course.id] ?? 0;
              return (
                <div
                  key={course.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-xl bg-gray-50 hover:bg-indigo-50 transition-colors cursor-pointer group"
                  onClick={() => navigate(`/student/learn/${course.id}`)}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-full lg:w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 text-sm truncate group-hover:text-indigo-700 transition-colors">
                        {course.title}
                      </h3>
                      <div className="mt-2">
                        <ProgressBar value={pct} showPercent height="sm" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                    <Badge text={pct === 100 ? "Completed" : "In Progress"} variant={pct === 100 ? "success" : "primary"} />
                    <FiArrowRight className="text-gray-300 group-hover:text-indigo-500 transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <h2 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
              <FiAlertCircle className="text-amber-500" /> Pending Assignments
            </h2>
            {pendingAssignments.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-6">All caught up!</p>
            ) : (
              <div className="space-y-3">
                {pendingAssignments.map((a) => (
                  <div key={a.id} className="p-3 rounded-xl bg-amber-50 border border-amber-100">
                    <p className="font-semibold text-gray-800 text-sm">{a.title}</p>
                    <p className="text-xs text-amber-600 mt-1">Due: {a.dueDate} • {a.totalMarks} marks</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <h2 className="text-lg font-black text-gray-800 mb-4">Available Quizzes</h2>
            <div className="space-y-3">
              {quizzes.map((q) => (
                <div
                  key={q.id}
                  onClick={() => navigate(`/student/quiz/${q.id}`)}
                  className="p-3 rounded-xl bg-purple-50 border border-purple-100 cursor-pointer hover:bg-purple-100 transition-colors"
                >
                  <p className="font-semibold text-gray-800 text-sm">{q.title}</p>
                  <p className="text-xs text-purple-600 mt-1">
                    {q.questions.length} questions • Pass: {q.passingScore}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default StudentDashboard;
