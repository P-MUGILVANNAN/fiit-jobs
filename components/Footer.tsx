import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaClock, FaPhone, FaEnvelope } from 'react-icons/fa';

function Footer(): React.JSX.Element {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-primary-700 mb-4">FIIT JOBS</h3>
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
            <div className="space-y-2 text-gray-500">
              <div className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-2 text-primary-600" />
                <span>
                  No.8, 1st Floor, Kamaraj Nagar Main Road, Kamaraj Nagar, Avadi, Chennai - 71.
                </span>
              </div>
              <div className="flex items-center">
                <FaClock className="mr-2 text-primary-600" />
                <span>9:00 AM - 7:00 PM</span>
              </div>
              <div className="flex items-center">
                <FaPhone className="mr-2 text-primary-600" />
                <span>Call us: +91 86955 77650</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-2 text-primary-600" />
                <span>Email: support@fiitjobs.com</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-4 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} FIIT JOBS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;