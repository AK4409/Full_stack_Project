


import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import SocialLinks from "../common/SocialLinks";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Navlinks
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Courses", path: "/courses" },
    { name: "Contact", path: "/contact" },
    { name: "Career", path: "/career" },
    { name: "Login", path: "/login" },
  ];


  return (
    <nav className="bg-indigo-600 text-white shadow-lg">

      <div className="max-w-7xl mx-auto px-5 py-4">

        {/* ================= TOP NAVBAR ================= */}
        <div className="flex items-center justify-between">

          {/* Logo & Brand */}
          <div className="flex items-center gap-3">

            <NavLink to="/">
              <img
                src="/logo3.png"
                alt="Cloud Code Logo"
                className="w-14 h-14 sm:w-20 sm:h-20 object-contain hover:scale-105 transition-transform duration-200"
              />
            </NavLink>

            <div className="leading-tight">
              <NavLink to="/">
                <h1 className="font-bold text-xl sm:text-3xl tracking-wide hover:text-green-300 transition-colors duration-200">
                  Cloud Code
                </h1>
              </NavLink>

              <p className="text-xs sm:text-base font-medium text-indigo-100 mt-1">
                Build for learning Code
              </p>

              <p className="text-[10px] sm:text-sm text-indigo-200">
                Estd. 2082
              </p>
            </div>

          </div>


          {/* ================= DESKTOP RIGHT SECTION ================= */}
          <div className="hidden sm:flex flex-col items-end">

            {/* Social Media */}
            <SocialLinks className="mb-4 text-xl" />
            {/* <div className="flex items-center gap-4 mb-4">

              <a
                href="https://www.instagram.com/cloudsnepal_web"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-xl hover:text-pink-300 hover:scale-110 transition-all duration-200"
              >
                <BsInstagram />
              </a>

              <a
                href="https://www.facebook.com/Clouds-Nepal-Web"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-2xl hover:text-blue-300 hover:scale-110 transition-all duration-200"
              >
                <TbBrandFacebook />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-xl hover:text-blue-300 hover:scale-110 transition-all duration-200"
              >
                <LuLinkedin />
              </a>

            </div> */}
            {/* Desktop Navigation */}
  <ul className="flex items-center gap-5 lg:gap-7 text-base lg:text-lg font-semibold">
    {navLinks.map((link) => (
      <li key={link.name}>
        <NavLink
          to={link.path}
          className={({ isActive }) =>
            `transition-colors duration-200 ${
              isActive
                ? "text-green-300"
                : "text-white hover:text-green-300"
            }`
          }
        >
          {link.name}
        </NavLink>
      </li>
    ))}
  </ul>

            {/* Desktop Navigation
            <ul className="flex items-center gap-5 lg:gap-7 text-base lg:text-lg font-semibold">

              {navLinks.map((link) => (
                <li key={link.name}>

                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `transition-colors duration-200 ${
                        isActive
                          ? "text-green-300"
                          : "text-white hover:text-green-300"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>

                </li>
              ))}

            </ul> */}

          </div>


          {/* ================= MOBILE RIGHT SECTION ================= */}
          <div className="flex sm:hidden items-center gap-4">

            {/* Mobile Social Media Icons */}
            <SocialLinks className="gap-3 text-lg" />
            


            {/* Hamburger / Close Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-3xl hover:text-green-300 transition-colors duration-200"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <HiX /> : <HiMenu />}
            </button>

          </div>

        </div>


        {/* ================= MOBILE MENU ================= */}
        {menuOpen && (
          <div className="sm:hidden mt-5 border-t border-indigo-400 pt-4">

            <ul className="flex flex-col items-start gap-4 text-lg font-semibold">

              {navLinks.map((link) => (
                <li key={link.name}>

                  <NavLink
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block py-1 transition-colors duration-200 ${
                        isActive
                          ? "text-green-300"
                          : "text-white hover:text-green-300"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>

                </li>
              ))}

            </ul>

          </div>
        )}

      </div>

    </nav>
  );
}

export default Navbar;

