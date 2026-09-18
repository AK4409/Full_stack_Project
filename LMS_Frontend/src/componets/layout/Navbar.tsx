import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FiLogOut, FiUser, FiChevronDown } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import SocialLinks from "../common/SocialLinks";
import SearchBox from "./SearchBox";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Courses", path: "/courses" },
    { name: "Contact", path: "/contact" },
  ];

  const coursesLinks = [
    { name: "Frontend Development", path: "/courses?q=Frontend" },
    { name: "Backend Development", path: "/courses?q=Backend" },
    { name: "Full Stack Web Development", path: "/courses?q=Full+Stack" },
    { name: "Python Training", path: "/courses?q=Python" },
    { name: "Machine Learning", path: "/courses?q=Machine+Learning" },
    { name: "DevOps Training", path: "/courses?q=DevOps" },
  ];

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/");
  };

  const getDashboardPath = () => {
    if (currentUser?.role === "admin") return "/admin/dashboard";
    if (currentUser?.role === "instructor") return "/instructor/dashboard";
    if (currentUser?.role === "student") return "/student/dashboard";
    return "/";
  };

  const getProfilePath = () => {
    if (currentUser?.role === "admin") return "/admin/dashboard";
    if (currentUser?.role === "instructor") return "/instructor/dashboard";
    return "/student/profile";
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <NavLink to="/">
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center shadow-md shrink-0 hover:scale-125">
                <span className="text-indigo-600 font-black text-lg"><img src="/logo3.png" alt="logo" /></span>
              </div>
            </NavLink>
            <div className="leading-tight min-w-0">
              <NavLink to="/">
                <h1 className="font-black text-lg sm:text-2xl tracking-wide hover:text-green-300 transition-colors duration-200 truncate">
                  Cloud Code
                </h1>
              </NavLink>
              <p className="text-xs text-indigo-200 hidden sm:block">Build for learning Code</p>
            </div>
          </div>

          <div className="hidden lg:block w-72">
            <SearchBox items={[...coursesLinks, ...navLinks]} />
          </div>

          <div className="hidden lg:flex flex-col items-end gap-2">
            <SocialLinks className="text-lg" />
            <div className="flex items-center gap-5 text-sm font-semibold">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `transition-colors duration-200 ${
                      isActive ? "text-green-300" : "text-white hover:text-green-300"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-full px-3 py-1.5 transition-all"
                  >
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-7 h-7 rounded-full border-2 border-green-300"
                    />
                    <span className="max-w-24 truncate text-sm">{currentUser.name}</span>
                    <FiChevronDown
                      className={`transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                      size={14}
                    />
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-xs text-gray-500">Signed in as</p>
                        <p className="font-semibold text-gray-800 text-sm truncate">{currentUser.name}</p>
                        <span className="text-xs text-indigo-600 capitalize font-medium">{currentUser.role}</span>
                      </div>
                      <button
                        onClick={() => { navigate(getDashboardPath()); setUserMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-indigo-50 transition-colors text-sm"
                      >
                        <MdDashboard size={16} className="text-indigo-500" />
                        Dashboard
                      </button>
                      <button
                        onClick={() => { navigate(getProfilePath()); setUserMenuOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-indigo-50 transition-colors text-sm"
                      >
                        <FiUser size={16} className="text-indigo-500" />
                        Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors text-sm border-t border-gray-100"
                      >
                        <FiLogOut size={16} />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className="rounded-full border border-green-300 px-4 py-1.5 hover:bg-green-300 hover:text-indigo-900 transition-all duration-200 text-sm"
                >
                  Sign In
                </NavLink>
              )}
            </div>
          </div>

          <div className="flex lg:hidden items-center gap-3">
            <SocialLinks className="gap-3 text-lg hidden sm:flex" />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl hover:text-green-300 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden mt-4 border-t border-indigo-400 pt-4 space-y-4">
            <SearchBox
              items={[...coursesLinks, ...navLinks]}
              onSelect={(item) => { navigate(item.path); setMenuOpen(false); }}
            />
            <ul className="flex flex-col gap-3 text-base font-semibold">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block py-1 transition-colors ${isActive ? "text-green-300" : "text-white hover:text-green-300"}`
                    }
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
              {currentUser ? (
                <>
                  <li>
                    <button
                      onClick={() => { navigate(getDashboardPath()); setMenuOpen(false); }}
                      className="text-left text-white hover:text-green-300"
                    >
                      Dashboard
                    </button>
                  </li>
                  <li>
                    <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-red-300 hover:text-red-200">
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <NavLink to="/login" onClick={() => setMenuOpen(false)} className="text-green-300 hover:text-green-200">
                    Sign In
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
