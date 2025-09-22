import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// ✅ Import icons from lucide-react
import { Briefcase, Home, Info, Bell, FileText, User, LogIn, UserPlus, LogOut } from "lucide-react";

function Navbar(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout();
    navigate('/');
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }): string =>
    `px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center gap-2 ${
      isActive
        ? 'text-primary-700 font-semibold'
        : 'text-gray-500 hover:text-primary-600'
    }`;

  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }): string =>
    `block px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center gap-2 ${
      isActive 
        ? 'bg-primary-50 text-primary-700' 
        : 'text-gray-600 hover:bg-gray-100'
    }`;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20"> 
          
          {/* --- Logo --- */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-primary-700">
              FIIT JOBS
            </Link>
          </div>

          {/* --- Desktop Nav Links (hidden on mobile/tablet) --- */}
          <div className="hidden lg:block">
            <div className="flex items-baseline space-x-6"> 
              <NavLink to="/" className={navLinkClasses}><Home size={18}/> Home</NavLink>
              <NavLink to="/jobs" className={navLinkClasses}><Briefcase size={18}/> Jobs</NavLink>
              <NavLink to="/about" className={navLinkClasses}><Info size={18}/> About Us</NavLink>
              {isAuthenticated && (
                <>
                  <NavLink to="/applications" className={navLinkClasses}><FileText size={18}/> My Applications</NavLink>
                  <NavLink to="/profile" className={navLinkClasses}><User size={18}/> Profile</NavLink>
                </>
              )}
            </div>
          </div>

          {/* --- Desktop Auth Buttons (hidden on mobile/tablet) --- */}
          <div className="hidden lg:block">
            {isAuthenticated ? (
               <div className="flex items-center space-x-4">
                <span className="text-gray-600">Welcome, {user?.name}</span>
                <button 
                  onClick={handleLogout} 
                  className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors flex items-center gap-2"
                >
                    <LogOut size={16}/> Logout
                </button>
               </div>
            ) : (
                <div className="flex items-center space-x-2">
                    <Link to="/login" className="text-gray-500 hover:text-primary-600 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2"><LogIn size={16}/> Login</Link>
                    <Link to="/register" className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 flex items-center gap-2"><UserPlus size={16}/> Register</Link>
                </div>
            )}
          </div>

          {/* --- Mobile Menu Toggle (visible on mobile/tablet) --- */}
          <div className="-mr-2 flex lg:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              type="button" 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary-600 hover:bg-primary-50 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger */}
              <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close (X) */}
              <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile Menu Dropdown (visible on mobile/tablet) --- */}
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden lg:hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" className={mobileNavLinkClasses} onClick={()=>setIsOpen(false)}><Home size={18}/> Home</NavLink>
            <NavLink to="/jobs" className={mobileNavLinkClasses} onClick={()=>setIsOpen(false)}><Briefcase size={18}/> Jobs</NavLink>
            <NavLink to="/about" className={mobileNavLinkClasses} onClick={()=>setIsOpen(false)}><Info size={18}/> About Us</NavLink>
            {isAuthenticated && (
            <>
                <NavLink to="/applications" className={mobileNavLinkClasses} onClick={()=>setIsOpen(false)}><FileText size={18}/> My Applications</NavLink>
                <NavLink to="/profile" className={mobileNavLinkClasses} onClick={()=>setIsOpen(false)}><User size={18}/> Profile</NavLink>
            </>
            )}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
                <div className="px-3">
                    <div className="mb-2">
                        <div className="text-base font-medium leading-none text-gray-800">{user?.name}</div>
                    </div>
                    <button 
                      onClick={()=>{handleLogout(); setIsOpen(false);}} 
                      className="mt-2 w-full text-left bg-red-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600 flex items-center gap-2"
                    >
                        <LogOut size={16}/> Logout
                    </button>
                </div>
            ) : (
                <div className="px-3 space-y-2">
                    <Link to="/login" onClick={()=>setIsOpen(false)} className="block text-gray-600 hover:text-primary-700 hover:bg-primary-50 px-3 py-2 rounded-md text-base font-medium flex items-center gap-2"><LogIn size={16}/> Login</Link>
                    <Link to="/register" onClick={()=>setIsOpen(false)} className="block bg-primary-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-primary-700 flex items-center gap-2"><UserPlus size={16}/> Register</Link>
                </div>
            )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;