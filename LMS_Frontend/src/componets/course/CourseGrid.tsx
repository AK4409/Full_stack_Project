import CourseCard from "./CourseCard";
import { instructors } from "../../data/instructor";

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

interface CourseGridProps {
  courses: Course[];
  emptyMessage?: string;
}

function CourseGrid({ courses, emptyMessage = "No courses found." }: CourseGridProps) {
  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <span className="text-6xl mb-4">📭</span>
        <p className="text-lg font-semibold">{emptyMessage}</p>
        <p className="text-sm mt-1">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {courses.map((course) => {
        const instructor = instructors.find((i) => i.id === course.instructorId);
        return (
          <CourseCard
            key={course.id}
            course={course}
            instructorName={instructor?.name}
          />
        );
      })}
    </div>
  );
}

export default CourseGrid;
