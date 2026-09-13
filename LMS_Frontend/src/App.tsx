import { Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Sidebar from './componets/layout/Sidebar'
import Navbar from "./componets/layout/Navbar";
import Dashboard from "./pages/student/Dashboard";
import Footer from "./componets/layout/Footer";

function App() {
  return (
    <>
      
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/std/dashboard" element={<Dashboard />} />

        
      </Routes>
      
    </>
  );
}

export default App;
