import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout();
    navigate('/');
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }): string =>
    `px-3 py-2 rounded-md text-base font-medium transition-colors ${
      isActive
        ? 'text-primary-700 font-semibold'
        : 'text-gray-500 hover:text-primary-600'
    }`;
    
  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }): string =>
    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
      isActive 
        ? 'bg-primary-50 text-primary-700' 
        : 'text-gray-600 hover:bg-gray-100'
    }`;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Increased height for more vertical space */}
        <div className="flex items-center justify-between h-20"> 
          
          {/* --- Section 1: Logo --- */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-primary-700">
              FIIT JOBS
            </Link>
          </div>

          {/* --- Section 2: Navigation Links (Desktop, Centered) --- */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-6"> 
              <NavLink to="/" className={navLinkClasses}>Home</NavLink>
              <NavLink to="/jobs" className={navLinkClasses}>Jobs</NavLink>
              <NavLink to="/about" className={navLinkClasses}>About Us</NavLink>
              {isAuthenticated && (
                <>
                  <NavLink to="/alerts" className={navLinkClasses}>Job Alerts</NavLink>
                  <NavLink to="/applications" className={navLinkClasses}>My Applications</NavLink>
                  <NavLink to="/profile" className={navLinkClasses}>Profile</NavLink>
                </>
              )}
            </div>
          </div>

          {/* --- Section 3: Auth Buttons (Desktop, Right Aligned) --- */}
          <div className="hidden md:block">
            {isAuthenticated ? (
               <div className="flex items-center space-x-4">
                <span className="text-gray-600 text-sm">Welcome, {user?.name}</span>
                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition-colors">
                    Logout
                </button>
               </div>
            ) : (
                <div className="flex items-center space-x-2">
                    <Link to="/login" className="text-gray-500 hover:text-primary-600 px-4 py-2 rounded-md text-sm font-medium">Login</Link>
                    <Link to="/register" className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700">Register</Link>
                </div>
            )}
          </div>

          {/* --- Mobile Menu Toggle --- */}
          <div className="-mr-2 flex md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              type="button" 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-primary-600 hover:bg-primary-50 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile Menu Dropdown --- */}
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden md:hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" className={mobileNavLinkClasses} onClick={()=>setIsOpen(false)}>Home</NavLink>
            <NavLink to="/jobs" className={mobileNavLinkClasses} onClick={()=>setIsOpen(false)}>Jobs</NavLink>
            <NavLink to="/about" className={mobileNavLinkClasses} onClick={()=>setIsOpen(false)}>About Us</NavLink>
            {isAuthenticated && (
            <>
                <NavLink to="/alerts" className={mobileNavLinkClasses} onClick={()=>setIsOpen(false)}>Job Alerts</NavLink>
                <NavLink to="/applications" className={mobileNavLinkClasses} onClick={()=>setIsOpen(false)}>My Applications</NavLink>
                <NavLink to="/profile" className={mobileNavLinkClasses} onClick={()=>setIsOpen(false)}>Profile</NavLink>
            </>
            )}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
                <div className="px-2">
                    <div className="text-base font-medium leading-none text-gray-800 px-3">{user?.name}</div>
                    <div className="text-sm font-medium leading-none text-gray-500 mb-2 px-3">{user?.email}</div>
                    <button onClick={()=>{handleLogout(); setIsOpen(false);}} className="mt-2 w-full text-left bg-red-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600">Logout</button>
                </div>
            ) : (
                <div className="px-2 space-y-2">
                    <Link to="/login" onClick={()=>setIsOpen(false)} className="block text-gray-600 hover:text-primary-700 hover:bg-primary-50 px-3 py-2 rounded-md text-base font-medium">Login</Link>
                    <Link to="/register" onClick={()=>setIsOpen(false)} className="block bg-primary-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-primary-700">Register</Link>
                </div>
            )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;