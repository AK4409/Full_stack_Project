




import React from "react";
import { CiMail } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import Button from "../common/Button";
import { Link, useNavigate } from "react-router-dom";


function Footer() {
  const Navigate= useNavigate();

  // Useful Link array of objects.
  const navigationLinks = [
    { name: "About Us", path: "/about" },
    { name: "Our Courses", path: "/courses" },
    { name: "Contact Us", path: "/contact" },
    { name: "Home", path: "/" },
  ];


  const CoursesLinks=[
    {name: "Frontend Development", path: "/frontend"},
    {name: "Backend Development", path: "/backend"},
    {name: "Full Stack Web Development", path: "/fullstack"},
    {name: "MEAN Stack", path: "/mean"},
    {name: "MERN Stack", path: "/mern"},
    {name: "Python Training", path: "/python"},
    {name: "Machine Learning", path: "/ml"},
    {name: "DevOps Training", path: "/devops"}
  ]

  return (
    <footer className="bg-indigo-600 text-white">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* About Us */}
          <div>
            <h2 className="text-2xl font-bold mb-5 border-b-2 border-indigo-300 pb-2 inline-block">
              About Us
            </h2>

            <p className="text-indigo-100 leading-7 text-sm text-justify leading-7 max-w-md">
            Clouds Code is an IT training institute focused on practical, industry-oriented learning. We help students develop real-world skills in web development, programming, and modern technologies to prepare for successful careers in the IT industry.
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h2 className="text-2xl font-bold mb-5 border-b-2 border-indigo-300 pb-2 inline-block">
              Useful Links
            </h2>

            <ul className="space-y-3 font-bold text-indigo-100">
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

          {/* Our Courses */}
          <div>
            <h2 className="text-2xl font-bold mb-5 border-b-2 border-indigo-300 pb-2 inline-block">
              Our Courses
            </h2>

            

<ul className="space-y-3 font-bold text-indigo-100">
      {CoursesLinks.map((link) => (
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

          {/* Contact / Support */}
          <div>
            <h2 className="text-2xl font-bold mb-5 border-b-2 border-indigo-300 pb-2 inline-block">
              24/7 Support
            </h2>

            <div className="space-y-4 text-indigo-100 font-bold">

              {/* Email */}
              <div className="flex items-center gap-3">
                <CiMail className="text-2xl text-green-300 shrink-0" />

                <a
                  href="mailto:webcloudsnepal@gmail.com"
                  className="hover:text-green-300 transition-colors"
                >
                  webcloudsnepal@gmail.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <IoCallOutline className="text-xl text-green-300 shrink-0" />

                <a
                  href="tel:9762634769"
                  className="hover:text-green-300 transition-colors"
                >
                  9762634769
                </a>
              </div>

              <div className="flex items-center gap-3">
                <IoCallOutline className="text-xl text-green-300 shrink-0" />

                <a
                  href="tel:014534181"
                  className="hover:text-green-300 transition-colors"
                >
                  01-4534181
                </a>
              </div>

              <div className="flex items-center gap-3">
                <IoCallOutline className="text-xl text-green-300 shrink-0" />

                <a
                  href="tel:014534182"
                  className="hover:text-green-300 transition-colors"
                >
                  01-4534182
                </a>
              </div>

              {/* Hotline */}
              <div className="flex items-center gap-3">
                <IoCallOutline className="text-xl text-green-300 shrink-0" />

                <p className="text-green-500 font-bold">
                  Hotline:{" "}
                  <a
                    href="tel:9766896866"
                    className="hover:text-green-300 transition-colors"
                  >
                    9766896866
                  </a>
                </p>
              </div>

              {/* Appointment Button */}
              {/* <button
                className="
                  mt-3
                  bg-green-600
                  hover:bg-green-500
                  px-5
                  py-3
                  rounded-lg
                  font-semibold
                  text-base
                  shadow-md
                  hover:shadow-lg
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  cursor-pointer
                "
              >
                Book an Appointment
              </button> */}

              <Button 
              text="Book an Appointment"
              onClick={()=> Navigate("/contact")}
              //className="cursor-pointer"
              //animated={false}
              />

            </div>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-indigo-400">
        <div className="max-w-7xl mx-auto px-6 py-5 text-center">
          <p className="text-sm text-indigo-100">
            © 2026{" "}
            <span className="font-semibold text-white">
              Cloud Code
            </span>
            . All Rights Reserved.
          </p>
        </div>
      </div>

    </footer>
  );
}

export default Footer;


