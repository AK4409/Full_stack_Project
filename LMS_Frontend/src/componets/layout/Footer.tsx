
import { CiMail } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Button from "../common/Button";
import { courses } from "../../data/courses";

function Footer() {
  const navigate = useNavigate();

  const navigationLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Our Courses", path: "/courses" },
    { name: "Contact Us", path: "/contact" },
  ];

  // Pulled directly from the prepared course dataset courses.ts

  const footerCourses = courses.slice(0, 8);

  return (
    
    <footer className="bg-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-5 border-b-2 border-indigo-300 pb-2 inline-block">
              About Us
            </h2>
            <p className="text-indigo-100 leading-7 text-sm max-w-md">
              Cloud Code is an IT training institute focused on practical, industry-oriented learning.
              We help students develop real-world skills in web development, programming, and modern
              technologies to prepare for successful careers in IT.
            </p>
          </div>




          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-5 border-b-2 border-indigo-300 pb-2 inline-block">
              Useful Links
            </h2>
            <ul className="space-y-3 font-semibold text-indigo-100">
              {navigationLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-green-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-5 border-b-2 border-indigo-300 pb-2 inline-block">
              Our Courses
            </h2>
            <ul className="grid grid-cols-1 gap-3 font-semibold text-indigo-100">
              {footerCourses.map((course) => (
                <li key={course.id}>
                  <Link
                    to={`/courses/${course.id}`}
                    className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-green-300"
                  >
                    {course.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/courses"
                  className="inline-block font-bold text-green-300 transition-all duration-200 hover:translate-x-1 hover:text-white"
                >
                  View All Courses →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-5 border-b-2 border-indigo-300 pb-2 inline-block">
              24/7 Support
            </h2>
            <div className="space-y-4 text-indigo-100 font-semibold">
              <div className="flex items-center gap-3">
                <CiMail className="text-2xl text-green-300 shrink-0" />
                
                 <a href="mailto:webcloudsnepal@gmail.com"
                  className="hover:text-green-300 transition-colors break-all"
                >
                  webcloudsnepal@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <IoCallOutline className="text-xl text-green-300 shrink-0" />
                <a href="tel:9762634769" className="hover:text-green-300 transition-colors">
                  9762634769
                </a>
              </div>
              <div className="flex items-center gap-3">
                <IoCallOutline className="text-xl text-green-300 shrink-0" />
                <a href="tel:014534181" className="hover:text-green-300 transition-colors">
                  01-4534181
                </a>
              </div>
              <div className="flex items-center gap-3">
                <IoCallOutline className="text-xl text-green-300 shrink-0" />
                <p className="text-green-300 font-bold">
                  Hotline:{" "}
                  <a href="tel:9766896866" className="hover:text-white transition-colors">
                    9766896866
                  </a>
                </p>
              </div>
              <Button
                text="Book an Appointment"
                onClick={() => navigate("/contact")}
                className="w-full sm:w-auto px-5 py-3 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-indigo-400">
        <div className="max-w-7xl mx-auto px-6 py-5 text-center">
          <p className="text-sm text-indigo-100">
            © 2026 Designed by <span className="font-semibold text-white">Anuj Karn</span>. 
          </p>
        </div>
      </div>
    </footer>
    
  );
}

export default Footer;