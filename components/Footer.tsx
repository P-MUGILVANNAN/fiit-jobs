import React from 'react';
import { Link } from 'react-router-dom';

function Footer(): React.JSX.Element {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-primary-700 mb-4">FIIT Jobs Portal</h3>
            <p className="text-gray-500">Your one-stop destination for finding the perfect job and advancing your career.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/jobs" className="text-gray-500 hover:text-primary-600">Find Jobs</Link></li>
              <li><Link to="/about" className="text-gray-500 hover:text-primary-600">About Us</Link></li>
              <li><Link to="/register" className="text-gray-500 hover:text-primary-600">Create Account</Link></li>
              <li><Link to="/profile" className="text-gray-500 hover:text-primary-600">My Profile</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Us</h3>
            <p className="text-gray-500">123 Tech Avenue, Silicon Valley, CA</p>
            <p className="text-gray-500">Email: support@fiitjobs.com</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-4 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} FIIT Jobs Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;