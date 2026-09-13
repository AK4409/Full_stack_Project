// import React from 'react'
// import { NavLink } from 'react-router-dom'
// import { BsInstagram } from "react-icons/bs";
// import { TbBrandFacebook } from "react-icons/tb";
// import { LuLinkedin } from "react-icons/lu";




// function Navbar() {
//   return (
//     <div className='flex flex-row bg-indigo-600 px-5 py-5'>
//         <div className='flex flex-row'>
//             <img src="/logo3.png" alt="logo" className=' size-20 ' />
//             <div className='grid grid-cols-1 leading-tight'>
//                 <h1 className='font-bold text-white text-3xl'><a href="/">Cloud Code</a></h1>
//                 <div className='font-semibold text-white'>
//                 <p>Build for learning Code</p>
//                 <p>Estd 2082</p>
//                 </div> 
//             </div>

//         </div>
//         <div className='font-semibold text-white text-2xl ml-auto '>
//           {/* Social Media */}
//           <div className='flex gap-4 mb-3'>
//             {/* Instagram */}
//             <a href="https://www.instagram.com/cloudsnepal_web" target='_blank' rel='noopener noreferrer'>
//               <BsInstagram />
//             </a>

//             {/* Facebook */}
//             <a href="https://www.facebook.com/Clouds-Nepal-Web" target='_blank' rel='noopener noreferrer'>
//               <TbBrandFacebook />
//             </a>

//             {/* LinkedIn */}
//             <a href="https://www.linkedin.com/" target='_blank' rel='noopener noreferrer'>
//               <LuLinkedin />
//             </a>

//           </div>
//           <div className='hidden sm:block'>
//           <ul className='flex gap-5 items-center'>
//             <li><a href="/" className='hover:text-green-500'>Home</a></li>
//             <li><a href="/about" className='hover:text-green-500'>About</a></li>
//             <li><a href="/courses" className='hover:text-green-500'>Courses</a></li>
//             <li><a href="/contact" className='hover:text-green-500'>Contact</a></li>
//             <li><a href="/contact" className='hover:text-green-500'>Career</a></li>
//             <li><a href="/login" className='hover:text-green-500'>Login</a></li>
//           </ul> 
//           </div>
//         </div>

//     </div>
//   )
// }

// export default Navbar






// import React from "react";
// import { NavLink } from "react-router-dom";
// import { BsInstagram } from "react-icons/bs";
// import { TbBrandFacebook } from "react-icons/tb";
// import { LuLinkedin } from "react-icons/lu";
// import { HiMenu } from "react-icons/hi";

// function Navbar() {
//   // Navigation links
//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "About", path: "/about" },
//     { name: "Courses", path: "/courses" },
//     { name: "Contact", path: "/contact" },
//     { name: "Career", path: "/career" },
//     { name: "Login", path: "/login" },
//   ];

//   return (
//     <nav className="bg-indigo-600 text-white shadow-lg">

//       {/* Main Navbar Container */}
//       <div className="max-w-7xl mx-auto px-5 py-4">

//         <div className="flex items-center justify-between">

//           {/* Logo & Brand */}
//           <div className="flex items-center gap-3">

//             <NavLink to="/">
//               <img
//                 src="/logo3.png"
//                 alt="Cloud Code Logo"
//                 className="w-16 h-16 sm:w-20 sm:h-20 object-contain hover:scale-105 transition-transform duration-200"
//               />
//             </NavLink>

//             <div className="leading-tight">
//               <NavLink to="/">
//                 <h1 className="font-bold text-2xl sm:text-3xl tracking-wide hover:text-green-300 transition-colors duration-200">
//                   Cloud Code
//                 </h1>
//               </NavLink>

//               <p className="text-sm sm:text-base font-medium text-indigo-100 mt-1">
//                 Build for learning Code
//               </p>

//               <p className="text-xs sm:text-sm text-indigo-200">
//                 Estd. 2082
//               </p>
//             </div>

//           </div>

//           {/* Right Section */}
//           <div className="flex flex-col items-end">

//             {/* Social Media */}
//             <div className="flex items-center gap-4 mb-4">

//               {/* Instagram */}
//               <a
//                 href="https://www.instagram.com/cloudsnepal_web"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Instagram"
//                 className="text-xl hover:text-pink-300 hover:scale-110 transition-all duration-200"
//               >
//                 <BsInstagram />
//               </a>

//               {/* Facebook */}
//               <a
//                 href="https://www.facebook.com/Clouds-Nepal-Web"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Facebook"
//                 className="text-2xl hover:text-blue-300 hover:scale-110 transition-all duration-200"
//               >
//                 <TbBrandFacebook />
//               </a>

//               {/* LinkedIn */}
//               <a
//                 href="https://www.linkedin.com/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="LinkedIn"
//                 className="text-xl hover:text-blue-300 hover:scale-110 transition-all duration-200"
//               >
//                 <LuLinkedin />
//               </a>

//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden sm:block">

//               <ul className="flex items-center gap-5 lg:gap-7 text-base lg:text-lg font-semibold">

//                 {navLinks.map((link) => (
//                   <li key={link.name}>

//                     <NavLink
//                       to={link.path}
//                       className={({ isActive }) =>
//                         `relative py-2 transition-colors duration-200 ${
//                           isActive
//                             ? "text-green-300"
//                             : "text-white hover:text-green-300"
//                         }`
//                       }
//                     >
//                       {link.name}
//                     </NavLink>

//                   </li>
//                 ))}

//               </ul>

//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               className="sm:hidden text-3xl hover:text-green-300 transition-colors duration-200"
//               aria-label="Open navigation menu"
//             >
//               <HiMenu />
//             </button>

//           </div>

//         </div>

//       </div>

//     </nav>
//   );
// }

// export default Navbar;








// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { BsInstagram } from "react-icons/bs";
// import { TbBrandFacebook } from "react-icons/tb";
// import { LuLinkedin } from "react-icons/lu";
// import { HiMenu, HiX } from "react-icons/hi";

// function Navbar() {

//   // State for mobile menu
//   const [menuOpen, setMenuOpen] = useState(false);

//   // Navigation links
//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "About", path: "/about" },
//     { name: "Courses", path: "/courses" },
//     { name: "Contact", path: "/contact" },
//     { name: "Career", path: "/career" },
//     { name: "Login", path: "/login" },
//   ];

//   return (
//     <nav className="bg-indigo-600 text-white shadow-lg">

//       {/* Main Container */}
//       <div className="max-w-7xl mx-auto px-5 py-4">

//         {/* Top Navbar */}
//         <div className="flex items-center justify-between">

//           {/* Logo & Brand */}
//           <div className="flex items-center gap-3">

//             <NavLink to="/">
//               <img
//                 src="/logo3.png"
//                 alt="Cloud Code Logo"
//                 className="w-16 h-16 sm:w-20 sm:h-20 object-contain hover:scale-105 transition-transform duration-200"
//               />
//             </NavLink>

//             <div className="leading-tight">

//               <NavLink to="/">
//                 <h1 className="font-bold text-2xl sm:text-3xl tracking-wide hover:text-green-300 transition-colors duration-200">
//                   Cloud Code
//                 </h1>
//               </NavLink>

//               <p className="text-sm sm:text-base font-medium text-indigo-100 mt-1">
//                 Build for learning Code
//               </p>

//               <p className="text-xs sm:text-sm text-indigo-200">
//                 Estd. 2082
//               </p>

//             </div>

//           </div>

//           {/* Desktop Right Section */}
//           <div className="hidden sm:flex flex-col items-end">

//             {/* Social Media */}
//             <div className="flex items-center gap-4 mb-4">

//               <a
//                 href="https://www.instagram.com/cloudsnepal_web"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Instagram"
//                 className="text-xl hover:text-pink-300 hover:scale-110 transition-all duration-200"
//               >
//                 <BsInstagram />
//               </a>

//               <a
//                 href="https://www.facebook.com/Clouds-Nepal-Web"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Facebook"
//                 className="text-2xl hover:text-blue-300 hover:scale-110 transition-all duration-200"
//               >
//                 <TbBrandFacebook />
//               </a>

//               <a
//                 href="https://www.linkedin.com/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="LinkedIn"
//                 className="text-xl hover:text-blue-300 hover:scale-110 transition-all duration-200"
//               >
//                 <LuLinkedin />
//               </a>

//             </div>

//             {/* Desktop Navigation */}
//             <ul className="flex items-center gap-5 lg:gap-7 text-base lg:text-lg font-semibold">

//               {navLinks.map((link) => (
//                 <li key={link.name}>
//                   <NavLink
//                     to={link.path}
//                     className={({ isActive }) =>
//                       `transition-colors duration-200 ${
//                         isActive
//                           ? "text-green-300"
//                           : "text-white hover:text-green-300"
//                       }`
//                     }
//                   >
//                     {link.name}
//                   </NavLink>
//                 </li>
//               ))}

//             </ul>

//           </div>

//           {/* Mobile Hamburger Button */}
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="sm:hidden text-3xl hover:text-green-300 transition-colors duration-200"
//             aria-label="Toggle navigation menu"
//             aria-expanded={menuOpen}
//           >
//             {menuOpen ? <HiX /> : <HiMenu />}
//           </button>

//         </div>

//         {/* Mobile Navigation Menu */}
//         {menuOpen && (
//           <div className="sm:hidden mt-5 border-t border-indigo-400 pt-4">

//             {/* Social Media */}
//             <div className="flex justify-center gap-6 mb-5">

//               <a
//                 href="https://www.instagram.com/cloudsnepal_web"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Instagram"
//                 className="text-xl hover:text-pink-300 transition-colors"
//               >
//                 <BsInstagram />
//               </a>

//               <a
//                 href="https://www.facebook.com/Clouds-Nepal-Web"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Facebook"
//                 className="text-2xl hover:text-blue-300 transition-colors"
//               >
//                 <TbBrandFacebook />
//               </a>

//               <a
//                 href="https://www.linkedin.com/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="LinkedIn"
//                 className="text-xl hover:text-blue-300 transition-colors"
//               >
//                 <LuLinkedin />
//               </a>

//             </div>

//             {/* Mobile Links */}
//             <ul className="flex flex-col items-center gap-4 text-lg font-semibold">

//               {navLinks.map((link) => (
//                 <li key={link.name}>

//                   <NavLink
//                     to={link.path}
//                     onClick={() => setMenuOpen(false)}
//                     className={({ isActive }) =>
//                       `block py-1 transition-colors duration-200 ${
//                         isActive
//                           ? "text-green-300"
//                           : "text-white hover:text-green-300"
//                       }`
//                     }
//                   >
//                     {link.name}
//                   </NavLink>

//                 </li>
//               ))}

//             </ul>

//           </div>
//         )}

//       </div>

//     </nav>
//   );
// }

// export default Navbar;







import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import { TbBrandFacebook } from "react-icons/tb";
import { LuLinkedin } from "react-icons/lu";
import { HiMenu, HiX } from "react-icons/hi";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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
            <div className="flex items-center gap-4 mb-4">

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

            </div>

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

          </div>


          {/* ================= MOBILE RIGHT SECTION ================= */}
          <div className="flex sm:hidden items-center gap-4">

            {/* Mobile Social Media Icons */}
            <div className="flex items-center gap-3">

              {/* Instagram */}
              <a
                href="https://www.instagram.com/cloudsnepal_web"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-lg hover:text-pink-300 hover:scale-110 transition-all duration-200"
              >
                <BsInstagram />
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/Clouds-Nepal-Web"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-xl hover:text-blue-300 hover:scale-110 transition-all duration-200"
              >
                <TbBrandFacebook />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-lg hover:text-blue-300 hover:scale-110 transition-all duration-200"
              >
                <LuLinkedin />
              </a>

            </div>


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

            <ul className="flex flex-col items-center gap-4 text-lg font-semibold">

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

