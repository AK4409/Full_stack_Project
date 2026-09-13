// import React from "react";
// import { CiMail } from "react-icons/ci";
// import { IoCallOutline } from "react-icons/io5";

// function Footer() {
//   return (

//       // Main Footer Section.
//       <div className="bg-indigo-500 mb-auto py-10">

//         {/* Created 3 column Section in Footer */}
//         <div className="grid grid-cols-3">

//           {/* First Section */}
//           <div>
//             <h1 className="font-bold text-3xl text-white">About Us</h1>
//             <br />
//             <p className="text-white">
//               Clouds Code is a leading software and IT solutions Institute based
//               in Nepal. From websites to mobile apps, digital marketing to cloud
//               integrations — we teach what grows your business.
//             </p>
//           </div>

//           {/* Second Section */}
//           <div>

//             {/* Created two row Section */}
//             <div className="grid grid-rows-2">
//               {/* First row Section */}
//               <div>
//                 <h1 className="font-bold text-3xl text-white">UseFul Links</h1>
//                 <br />
//                 <div className="grid grid-row-3 text-white">
//                   <ul>
//                     <li><a href="">About Us</a></li>
//                     <li><a href="">Our Courses</a></li>
//                     <li><a href="">Contact Us</a></li>
//                   </ul>
//                 </div>
//               </div>

//               {/* Second row Section */}
              
//               <div className="">
//                     <h1 className="font-bold text-3xl text-white">Our Courses</h1><br/>
//                     {/* Further divided into two column section */}
                    
//                     <div className="grid grid-cols-2 ">
//                       {/* First Column Section */}
//                       <div className="text-white">
//                         <ul>
//                           <li><a href="">Frontend Development</a></li>
//                           <li><a href="">Backend Development</a></li>
//                           <li><a href="">Full Stack Web Development</a></li>
//                           <li><a href="">MEAN Stack</a></li>
//                           <li><a href="">MERN Stack</a></li>
//                         </ul>
//                       </div>
//                       {/* Second Column Section */}
//                       <div className="text-white">
//                         <ul>
//                           <li><a href="">PHP Training</a></li>
//                           <li><a href="">DevOps Training</a></li>
//                           <li><a href=""></a>Python Training</li>
//                           <li><a href="">Machine Learning</a></li>
//                           <li><a href="">SEO Training</a></li>
//                         </ul>
//                       </div>
                      
//                     </div>

                  
//               </div>
//             </div>
//           </div>
//           <div>
//             <h1 className="font-bold text-3xl text-white">24/7 Support</h1>
//             <br />
//             <div className="text-white">
//               <CiMail className="" />
//               <p>
//                 <a href="">webcloudsnepal@gmail.com</a>
//               </p>
//               <IoCallOutline />
//               <p>
//                 <a href="">9762634769</a>
//               </p>
//               <IoCallOutline />
//               <p>
//                 <a href="">01-4534181</a>{" "}
//               </p>
//               <IoCallOutline />
//               <p>
//                 <a href="">01-4534182</a>
//               </p>
//               <IoCallOutline /> <p>Hotline: 9766896866</p>
//               <button className="bg-green-700 px-2 py-2 rounded-md my-2.5 font-bold text-xl hover:bg-green-500 ">
//                 Book an Appointment
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Copy right Section */}
//         <div className="bg-indigo-600 px-5 text-center justify-center font-bold text-white mb-auto">
//         <h1>© 2026 Clouds Nepal Web. All Rights Reserved.</h1>
//       </div>
//       </div>
      
      
  
//   );
// }

// export default Footer;




import React from "react";
import { CiMail } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";

function Footer() {
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

            <ul className="space-y-3 text-indigo-100 font-bold">
              <li>
                <a
                  href="/about"
                  className="hover:text-green-300 hover:translate-x-1 inline-block transition-all duration-200"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="/courses"
                  className="hover:text-green-300 hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Our Courses
                </a>
              </li>

              <li>
                <a
                  href="/contact"
                  className="hover:text-green-300 hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Contact Us
                </a>
              </li>

              <li>
                <a
                  href="/"
                  className="hover:text-green-300 hover:translate-x-1 inline-block transition-all duration-200"
                >
                  Home
                </a>
              </li>
            </ul>
          </div>

          {/* Our Courses */}
          <div>
            <h2 className="text-2xl font-bold mb-5 border-b-2 border-indigo-300 pb-2 inline-block">
              Our Courses
            </h2>

            <ul className="space-y-3 text-indigo-100 text-sm font-bold">
              <li>
                <a
                  href="/courses/frontend"
                  className="hover:text-green-300 transition-colors duration-200"
                >
                  Frontend Development
                </a>
              </li>

              <li>
                <a
                  href="/courses/backend"
                  className="hover:text-green-300 transition-colors duration-200"
                >
                  Backend Development
                </a>
              </li>

              <li>
                <a
                  href="/courses/fullstack"
                  className="hover:text-green-300 transition-colors duration-200"
                >
                  Full Stack Web Development
                </a>
              </li>

              <li>
                <a
                  href="/courses/mean"
                  className="hover:text-green-300 transition-colors duration-200"
                >
                  MEAN Stack
                </a>
              </li>

              <li>
                <a
                  href="/courses/mern"
                  className="hover:text-green-300 transition-colors duration-200"
                >
                  MERN Stack
                </a>
              </li>

              <li>
                <a
                  href="/courses/python"
                  className="hover:text-green-300 transition-colors duration-200"
                >
                  Python Training
                </a>
              </li>

              <li>
                <a
                  href="/courses/machine-learning"
                  className="hover:text-green-300 transition-colors duration-200"
                >
                  Machine Learning
                </a>
              </li>

              <li>
                <a
                  href="/courses/devops"
                  className="hover:text-green-300 transition-colors duration-200"
                >
                  DevOps Training
                </a>
              </li>
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
              <button
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
              </button>

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
              Clouds Nepal Web
            </span>
            . All Rights Reserved.
          </p>
        </div>
      </div>

    </footer>
  );
}

export default Footer;


