import { useState } from "react";
import DashboardLayout from "../../componets/layout/DashboardLayout";
import Badge from "../../componets/common/Badge";
import Modal from "../../componets/common/Modal";
import StarRating from "../../componets/common/StarRating";
import { courses } from "../../data/courses";
import { instructors } from "../../data/instructor";
import { FiTrash2, FiEyeOff, FiEye, FiUsers } from "react-icons/fi";

function AdminCourses() {
  const [courseList, setCourseList] = useState(courses);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const toggleStatus = (id: number) => {
    setCourseList((prev) =>
      prev.map((course) =>
        course.id === id
          ? {
              ...course,
              status: course.status === "published" ? "draft" : "published",
            }
          : course,
      ),
    );
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      setCourseList((prev) => prev.filter((c) => c.id !== deleteId));
    }
    setDeleteId(null);
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl">
        <h1 className="text-2xl font-black text-gray-800 mb-2">All Courses</h1>
        <p className="text-sm text-gray-500 mb-6">
          Review instructor courses, unpublish them, or remove them from the
          catalog.
        </p>

        {courseList.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 text-gray-400">
            No courses in the catalog.
          </div>
        ) : (
          <div className="space-y-4">
            {courseList.map((course) => {
              const instructor = instructors.find(
                (i) => i.id === course.instructorId,
              );
              return (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center gap-4"
                >
                  
                  <div className="w-full lg:w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-800">
                        {course.title}
                      </h3>
                      <Badge text={course.status} />
                      <Badge text={course.level} />
                    </div>
                    <p className="text-xs text-gray-500">
                      Instructor: {instructor?.name ?? "Unknown"}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 mt-2">
                      <span className="flex items-center gap-1">
                        <FiUsers size={11} />{" "}
                        {course.studentsCount.toLocaleString()} students
                      </span>
                      <StarRating rating={course.rating} size="sm" showValue />
                      <span>${course.price}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => toggleStatus(course.id)}
                      className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 border border-indigo-200 hover:bg-indigo-50 px-3 py-2 rounded-lg"
                    >
                      {course.status === "published" ? (
                        <FiEyeOff size={13} />
                      ) : (
                        <FiEye size={13} />
                      )}
                      {course.status === "published" ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      onClick={() => setDeleteId(course.id)}
                      className="flex items-center gap-1.5 text-xs font-bold text-red-500 border border-red-200 hover:bg-red-50 px-3 py-2 rounded-lg"
                    >
                      <FiTrash2 size={13} /> Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Modal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        title="Delete course"
        size="sm"
      >
        <div className="text-center">
          <p className="text-gray-600 mb-6 text-sm">
            Delete this course from the admin catalog view?
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm"
            >
              Yes, delete
            </button>
            <button
              onClick={() => setDeleteId(null)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-2.5 rounded-xl text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}

export default AdminCourses;
