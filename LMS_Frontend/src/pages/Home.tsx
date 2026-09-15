import React from "react";

import Footer from "../componets/layout/Footer";
import Navbar from "../componets/layout/Navbar";
import SearchBox from "../componets/layout/SearchBox";
import Button from "../componets/common/Button";

import { clientLogo } from "../data/client";
import { IoIosPeople } from "react-icons/io";
import { PiGraduationCapFill } from "react-icons/pi";
import { GiMountainClimbing } from "react-icons/gi";

function Home() {
  return (
    <div className="bg-amber-100">
      <Navbar />

      <div>
        <div className="grid grid-rows-3 place-content-center gap-2">
          <h1 className="text-3xl font-bold text-green-700">
            Build Your Skills
          </h1>
          <p>
            Advance your career by learning in-demand skills in Programming,
            DevOps, Website Development, AI Engineering, and Machine Learning
            for Developers.
          </p>

          <div>
            <Button text="Get Started" className="mt-5" />
          </div>
          <div>
            <p>
              More than 100,000 freeCodeCamp graduates work in companies such as
            </p>
            <div className="grid grid-cols-4">
              {clientLogo.map((client) => (
                <div key={client.Name}>
                  <img
                    src={client.logo}
                    alt={client.Name}
                    className="size-40"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1>Why learn with Cloud Code:</h1>
        <div className="grid grid-rows-2">
          <div className="grid grid-cols-2">
            <div className="mx-5 my-5">
              <IoIosPeople className="size-25" />
              <h1>Large Community</h1>
              <p>Join our vibrant learning community of students, alumni, and educators.</p>
            </div>
            <div className="mx-5 my-5">
              <PiGraduationCapFill className="size-25" />
              <h1>Extensive Certifications</h1>
              <p>Earn industry-recognized, verifiable certifications in high-demand technologies.</p>
            </div>

          </div>
          <div className="mx-5 my-5">
            <GiMountainClimbing className="size-25"/>
            <h1>Comprehensive Curriculum</h1>
            <p>Enhance your technical skills with our linear, world-class, project-based curriculum.</p>
          </div>
          
        </div>
        <Button 
        text="Start Learning Now" className="mx-3 my-3"/>
      </div>

      <Footer />
    </div>
  );
}

export default Home;
