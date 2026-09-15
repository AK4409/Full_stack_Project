import React from "react";
import Navbar from "../../componets/layout/Navbar";
import Footer from "../../componets/layout/Footer";
import Sidebar from "../../componets/layout/Sidebar";

function Dashboard() {
  return (
    <div>
      <Navbar />
      <Sidebar/>
      <Footer/>
    </div>
  );
}

export default Dashboard;
