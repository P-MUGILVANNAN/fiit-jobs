import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Briefcase, Home, Info, FileText, User, LogIn, UserPlus, LogOut, Menu, X, Rocket, BookOpen } from "lucide-react";
import { useAuth } from '../context/AuthContext';

function Navbar(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout();
    setIsOpen(false);
    navigate('/');
  };

  // Base styling for all navigation links and buttons
  const baseLinkClasses = "transition-all duration-200 rounded-lg flex items-center gap-2 font-semibold";
  
  // Styling for desktop navigation links
  const navLinkClasses = ({ isActive }: { isActive: boolean }): string =>
    `px-4 py-2 text-base ${baseLinkClasses} ${
      isActive
        ? 'text-white bg-blue-600 shadow-lg'
        : 'text-gray-700 hover:text-blue-700 hover:bg-gray-100'
    }`;

  // Styling for mobile navigation links
  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }): string =>
    `block w-full px-5 py-3 text-lg ${baseLinkClasses} ${
      isActive
        ? 'bg-blue-100 text-blue-700'
        : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* --- Logo & Brand --- */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 flex items-center gap-2">
              <Rocket size={32} />
              FIIT JOBS
            </Link>
          </div>

          {/* --- Desktop Nav Links --- */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-6">
              <NavLink to="/" className={navLinkClasses}><Home size={18} />Home</NavLink>
              <NavLink to="/jobs" className={navLinkClasses}><Briefcase size={18} />Jobs</NavLink>
              <NavLink to="/about" className={navLinkClasses}><Info size={18} />About Us</NavLink>
              <NavLink to="/blog" className={navLinkClasses}><BookOpen size={18} />Blog</NavLink>
              {isAuthenticated && (
                <>
                  <NavLink to="/applications" className={navLinkClasses}><FileText size={18} />My Applications</NavLink>
                  <NavLink to="/profile" className={navLinkClasses}><User size={18} />Profile</NavLink>
                </>
              )}
            </div>
          </div>

          {/* --- Desktop Auth Buttons --- */}
          <div className="hidden lg:block">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="text-gray-700 flex items-center gap-2">
                  <User size={20} className="text-blue-600" />
                  <span>Hello, <span className="font-bold">{user?.name || 'User'}</span></span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors shadow-lg flex items-center gap-2"
                >
                  <LogOut size={16} />Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="text-blue-600 hover:text-blue-800 px-5 py-2 text-sm font-semibold transition-colors flex items-center gap-2">
                  <LogIn size={16} />Login
                </Link>
                <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors shadow-lg flex items-center gap-2">
                  <UserPlus size={16} />Register
                </Link>
              </div>
            )}
          </div>

          {/* --- Mobile Menu Toggle --- */}
          <div className="-mr-2 flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-blue-700 hover:bg-gray-100 focus:outline-none transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-8 w-8 text-gray-800" />
              ) : (
                <Menu className="block h-8 w-8 text-gray-800" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile Menu Dropdown --- */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden lg:hidden ${isOpen ? 'opacity-100' : 'max-h-0 opacity-0'}`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink to="/" className={mobileNavLinkClasses} onClick={() => setIsOpen(false)}><Home size={20} />Home</NavLink>
          <NavLink to="/jobs" className={mobileNavLinkClasses} onClick={() => setIsOpen(false)}><Briefcase size={20} />Jobs</NavLink>
          <NavLink to="/about" className={mobileNavLinkClasses} onClick={() => setIsOpen(false)}><Info size={20} />About Us</NavLink>
          <NavLink to="/blog" className={mobileNavLinkClasses} onClick={() => setIsOpen(false)}><BookOpen size={20} />Blog</NavLink>
          {isAuthenticated && (
            <>
              <NavLink to="/applications" className={mobileNavLinkClasses} onClick={() => setIsOpen(false)}><FileText size={20} />My Applications</NavLink>
              <NavLink to="/profile" className={mobileNavLinkClasses} onClick={() => setIsOpen(false)}><User size={20} />Profile</NavLink>
            </>
          )}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200 px-4">
          {isAuthenticated ? (
            <div className="space-y-2">
              <div className="text-gray-700 text-lg mb-2 flex items-center gap-2">
                <User size={22} className="text-blue-600" />
                <span>Hello, <span className="font-bold">{user?.name || 'User'}</span></span>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-center bg-red-500 text-white px-4 py-3 rounded-full text-base font-semibold hover:bg-red-600 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <LogOut size={18} />Logout
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-center bg-blue-100 text-blue-700 px-4 py-3 rounded-full text-base font-semibold hover:bg-blue-200 transition-colors flex items-center justify-center gap-2">
                <LogIn size={18} />Login
              </Link>
              <Link to="/register" onClick={() => setIsOpen(false)} className="w-full text-center bg-blue-600 text-white px-4 py-3 rounded-full text-base font-semibold hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center gap-2">
                <UserPlus size={18} />Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
