import { useNavigate } from "react-router-dom";
import { FiUsers, FiClock, FiBookOpen } from "react-icons/fi";
import StarRating from "../common/StarRating";
import Badge from "../common/Badge";

interface Course {
  id: number;
  title: string;
  shortDescription: string;
  thumbnail: string;
  instructorId: number;
  level: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  duration: string;
  lessonsCount: number;
  tags: string[];
}

interface CourseCardProps {
  course: Course;
  instructorName?: string;
}

function CourseCard({ course, instructorName = "Cloud Code" }: CourseCardProps) {
  const navigate = useNavigate();
  const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

  return (
    <div
      onClick={() => navigate(`/courses/${course.id}`)}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-indigo-200 transition-all duration-300 cursor-pointer flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden h-44 bg-gradient-to-br from-indigo-500 to-purple-600">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl opacity-30">📚</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
            -{discount}%
          </div>
        )}
        {/* Level Badge */}
        <div className="absolute top-3 right-3">
          <Badge text={course.level} />
        </div>
        {/* Tags */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
          {course.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title */}
        <h3 className="font-bold text-gray-800 text-sm leading-snug mb-1 group-hover:text-indigo-600 transition-colors line-clamp-2">
          {course.title}
        </h3>
        <p className="text-xs text-gray-500 mb-2 line-clamp-2">{course.shortDescription}</p>
        <p className="text-xs text-indigo-600 font-medium mb-3">by {instructorName}</p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <span className="text-xs font-bold text-amber-600">{course.rating.toFixed(1)}</span>
          <StarRating rating={course.rating} size="sm" />
          <span className="text-xs text-gray-400">({course.reviewsCount.toLocaleString()})</span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1"><FiUsers size={12} />{course.studentsCount.toLocaleString()}</span>
          <span className="flex items-center gap-1"><FiClock size={12} />{course.duration}</span>
          <span className="flex items-center gap-1"><FiBookOpen size={12} />{course.lessonsCount} lessons</span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <span className="text-lg font-black text-indigo-700">${course.price}</span>
            <span className="text-xs text-gray-400 line-through ml-2">${course.originalPrice}</span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); navigate(`/courses/${course.id}`); }}
            className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-lg transition-colors"
          >
            View Course
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
