import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../componets/layout/DashboardLayout";
import StarRating from "../../componets/common/StarRating";
import { useAuth } from "../../context/AuthContext";
import { courses } from "../../data/courses";
import { reviews } from "../../data/reviews";
import { FiUsers, FiBookOpen, FiTrendingUp, FiDollarSign, FiArrowRight, FiPlus } from "react-icons/fi";

function InstructorDashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const instructorCourses = courses.filter((c) => c.instructorId === 1).slice(0, 4);
  const totalStudents = instructorCourses.reduce((sum, c) => sum + c.studentsCount, 0);
  const totalRevenue = instructorCourses.reduce((sum, c) => sum + c.price * Math.floor(c.studentsCount * 0.1), 0);
  const avgRating = (instructorCourses.reduce((sum, c) => sum + c.rating, 0) / (instructorCourses.length || 1)).toFixed(1);
  const recentReviews = reviews.slice(0, 3);

  const STAT_CARDS = [
    { label: "Total Students", value: totalStudents.toLocaleString(), icon: <FiUsers size={22} />, color: "bg-indigo-500", trend: "+12% this month" },
    { label: "Active Courses", value: instructorCourses.length, icon: <FiBookOpen size={22} />, color: "bg-emerald-500", trend: "2 published this week" },
    { label: "Revenue (Est.)", value: `$${totalRevenue.toLocaleString()}`, icon: <FiDollarSign size={22} />, color: "bg-amber-500", trend: "+8% this month" },
    { label: "Avg. Rating", value: avgRating, icon: <FiTrendingUp size={22} />, color: "bg-purple-500", trend: "from 3,890 reviews" },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-800">
              Welcome back, {currentUser?.name ?? "Instructor"}!
            </h1>
            <p className="text-gray-500 text-sm mt-1">Here's what's happening with your courses today.</p>
          </div>
          <button
            onClick={() => navigate("/instructor/create-course")}
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors text-sm w-full sm:w-auto"
          >
            <FiPlus /> Create Course
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {STAT_CARDS.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100">
              <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center text-white mb-3`}>
                {s.icon}
              </div>
              <p className="text-xl sm:text-2xl font-black text-gray-800 break-words">{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
              <p className="text-xs text-emerald-600 font-medium mt-1">{s.trend}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-black text-gray-800">My Courses</h2>
            <button
              onClick={() => navigate("/instructor/courses")}
              className="text-indigo-600 text-sm font-semibold flex items-center gap-1 hover:text-indigo-800"
            >
              View All <FiArrowRight size={14} />
            </button>
          </div>
          <div className="space-y-4">
            {instructorCourses.map((course) => (
              <div key={course.id} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-xl bg-gray-50 hover:bg-indigo-50 transition-colors">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                 
                  <div className="w-full lg:w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm truncate">{course.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mt-1">
                      <span className="flex items-center gap-1"><FiUsers size={10} />{course.studentsCount.toLocaleString()} students</span>
                      <span>⭐ {course.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <p className="text-sm font-bold text-indigo-700">${course.price}</p>
                  <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium capitalize">
                    {course.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
          <h2 className="text-lg font-black text-gray-800 mb-5">Recent Reviews</h2>
          <div className="space-y-4">
            {recentReviews.map((review) => (
              <div key={review.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                <img
                  src={review.avatar}
                  alt={review.userName}
                  className="w-9 h-9 rounded-full border-2 border-gray-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-800 text-sm">{review.userName}</span>
                    <StarRating rating={review.rating} size="sm" />
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{new Date(review.date).toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default InstructorDashboard;
