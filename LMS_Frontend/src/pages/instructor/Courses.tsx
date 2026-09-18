import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../componets/layout/DashboardLayout";
import Badge from "../../componets/common/Badge";
import Modal from "../../componets/common/Modal";
import StarRating from "../../componets/common/StarRating";
import { courses } from "../../data/courses";
import { FiPlus, FiEdit, FiTrash2, FiUsers, FiClock } from "react-icons/fi";

function InstructorCourses() {
  const navigate = useNavigate();
  const [courseList, setCourseList] = useState(courses.filter((c) => c.instructorId === 1));
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteConfirm = () => {
    if (deleteTarget !== null) {
      setCourseList((prev) => prev.filter((c) => c.id !== deleteTarget));
    }
    setShowDeleteModal(false);
    setDeleteTarget(null);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl font-black text-gray-800">My Courses</h1>
        <button
          onClick={() => navigate("/instructor/create-course")}
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors text-sm w-full sm:w-auto"
        >
          <FiPlus /> New Course
        </button>
      </div>

      {courseList.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">📚</p>
          <p className="text-gray-500 font-semibold">You haven't created any courses yet.</p>
          <button
            onClick={() => navigate("/instructor/create-course")}
            className="mt-4 bg-indigo-600 text-white font-bold px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors text-sm"
          >
            Create Your First Course
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {courseList.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 flex flex-col lg:flex-row gap-4 lg:gap-5 lg:items-center hover:border-indigo-200 transition-colors">
              <div className="w-full lg:w-20 h-16 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl font-black shrink-0">
                {course.title[0]}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-1.5">
                  <h3 className="font-bold text-gray-800">{course.title}</h3>
                  <Badge text={course.status} />
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><FiUsers size={11} /> {course.studentsCount.toLocaleString()} students</span>
                  <span className="flex items-center gap-1"><FiClock size={11} /> {course.duration}</span>
                  <span className="capitalize">{course.level}</span>
                  <StarRating rating={course.rating} size="sm" showValue />
                </div>
              </div>

              <div className="text-left lg:text-right shrink-0">
                <p className="text-lg font-black text-indigo-700">${course.price}</p>
                <p className="text-xs text-gray-400 line-through">${course.originalPrice}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => navigate("/instructor/create-course")}
                  className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 text-xs font-bold text-indigo-600 border border-indigo-200 hover:bg-indigo-50 px-3 py-2 rounded-lg transition-colors"
                >
                  <FiEdit size={13} /> Edit
                </button>
                <button
                  onClick={() => { setDeleteTarget(course.id); setShowDeleteModal(true); }}
                  className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 text-xs font-bold text-red-500 border border-red-200 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
                >
                  <FiTrash2 size={13} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Course"
        size="sm"
      >
        <div className="text-center">
          <p className="text-gray-600 mb-6 text-sm">
            Are you sure you want to delete this course? This action cannot be undone.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleDeleteConfirm}
              className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2.5 rounded-xl transition-colors text-sm"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-2.5 rounded-xl transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}

export default InstructorCourses;
