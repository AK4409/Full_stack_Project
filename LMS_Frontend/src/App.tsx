import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./context/ScrollToTop";
import "./index.css";

// Public Pages
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Student Pages
import StudentDashboard from "./pages/student/Dashboard";
import MyCourses from "./pages/student/MyCourses";
import StudentProfile from "./pages/student/Profile";
import CourseLearn from "./pages/student/CourseLearn";
import Quiz from "./pages/student/Quiz";

// Instructor Pages
import InstructorDashboard from "./pages/instructor/Dashboard";
import InstructorCourses from "./pages/instructor/Courses";
import CreateCourse from "./pages/instructor/CreateCourse";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminCourses from "./pages/admin/Courses";


function App() {
  return (
    <>
    <ScrollToTop/>
   
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:id" element={<CourseDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Student Routes */}
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/my-courses" element={<MyCourses />} />
      <Route path="/student/profile" element={<StudentProfile />} />
      <Route path="/student/learn/:id" element={<CourseLearn />} />
      <Route path="/student/quiz/:id" element={<Quiz />} />

      {/* Instructor Routes */}
      <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
      <Route path="/instructor/courses" element={<InstructorCourses />} />
      <Route path="/instructor/create-course" element={<CreateCourse />} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/courses" element={<AdminCourses />} />
    </Routes>
    
    </>
  );
}

export default App;
