import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../componets/layout/DashboardLayout";
import ProgressBar from "../../componets/common/ProgressBar";
import Badge from "../../componets/common/Badge";
import { useAuth } from "../../context/AuthContext";
import { courses } from "../../data/courses";
import { FiPlay, FiBookOpen } from "react-icons/fi";

type Tab = "progress" | "completed";

function MyCourses() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("progress");

  const enrolledCourseIds = currentUser?.enrolledCourses ?? [1, 2, 3];
  const progress = (currentUser?.progress as Record<number, number>) ?? { 1: 68, 2: 35, 3: 20 };

  const inProgress = courses.filter(
    (c) => enrolledCourseIds.includes(c.id) && (progress[c.id] ?? 0) < 100
  );
  const completed = courses.filter(
    (c) => enrolledCourseIds.includes(c.id) && (progress[c.id] ?? 0) === 100
  );

  const displayCourses = activeTab === "progress" ? inProgress : completed;

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-black text-gray-800 mb-6">My Courses</h1>

      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-full sm:w-fit mb-7 overflow-x-auto">
        {(["progress", "completed"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 sm:px-5 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === tab ? "bg-white shadow text-indigo-700" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "progress" ? `In Progress (${inProgress.length})` : `Completed (${completed.length})`}
          </button>
        ))}
      </div>

      {displayCourses.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <FiBookOpen className="mx-auto mb-3" size={40} />
          <p className="font-semibold">
            {activeTab === "progress" ? "No courses in progress." : "No completed courses yet."}
          </p>
          <button
            onClick={() => navigate("/courses")}
            className="mt-4 text-indigo-600 hover:underline text-sm font-semibold"
          >
            Browse Courses →
          </button>
        </div>
      ) : (
        <div className="space-y-4 max-w-3xl">
          {displayCourses.map((course) => {
            const pct = progress[course.id] ?? 0;
            return (
              <div key={course.id} className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 sm:gap-5">
                <div className="w-full sm:w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl font-black shrink-0">
                  {course.title[0]}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-bold text-gray-800 text-sm leading-snug line-clamp-2 flex-1">
                      {course.title}
                    </h3>
                    <Badge text={pct === 100 ? "Completed" : "In Progress"} variant={pct === 100 ? "success" : "primary"} />
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mb-3">
                    <span>{course.duration}</span>
                    <span>•</span>
                    <span>{course.lessonsCount} lessons</span>
                    <span>•</span>
                    <span className="capitalize">{course.level}</span>
                  </div>
                  <ProgressBar value={pct} height="sm" />
                </div>

                <div className="flex sm:flex-col justify-end sm:justify-center shrink-0">
                  <button
                    onClick={() => navigate(`/student/learn/${course.id}`)}
                    className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors w-full sm:w-auto"
                  >
                    <FiPlay size={12} />
                    {pct > 0 ? "Continue" : "Start"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
}

export default MyCourses;
