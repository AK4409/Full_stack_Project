import { useState, type ReactNode } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex flex-1 w-full">
        <div className="hidden lg:block sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto shrink-0">
          <Sidebar />
        </div>

        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <button
              type="button"
              className="absolute inset-0 bg-black/40"
              aria-label="Close menu overlay"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative h-full w-72 max-w-[85vw] bg-white shadow-2xl overflow-y-auto">
              <div className="flex justify-end p-3 border-b border-gray-100">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
                  aria-label="Close menu"
                >
                  <HiX size={20} />
                </button>
              </div>
              <Sidebar onNavigate={() => setSidebarOpen(false)} />
            </div>
          </div>
        )}

        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden mb-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 bg-white border border-indigo-100 px-3 py-2 rounded-xl shadow-sm"
          >
            <HiMenu size={18} />
            Dashboard menu
          </button>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default DashboardLayout;
