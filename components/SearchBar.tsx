// src/components/SearchBar.tsx
import React, { useState, useEffect } from 'react';
import { FiSearch, FiMapPin } from 'react-icons/fi';

interface SearchBarProps {
  onSearch: (keyword: string, location: string) => void;
  initialKeyword?: string;
  initialLocation?: string;
}

function SearchBar({ onSearch, initialKeyword = '', initialLocation = '' }: SearchBarProps): React.JSX.Element {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [location, setLocation] = useState(initialLocation);

  // 🔹 Add this useEffect hook to synchronize state with props
  useEffect(() => {
    setKeyword(initialKeyword);
    setLocation(initialLocation);
  }, [initialKeyword, initialLocation]);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSearch(keyword, location);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="w-full bg-white p-4 rounded-xl shadow-lg flex flex-col md:flex-row gap-3 items-center border border-gray-100"
    >
      {/* Keyword Search Field */}
      <div className="flex-grow w-full relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Job title, keywords, or company"
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        />
      </div>
      
      {/* Location Search Field */}
      <div className="flex-grow w-full relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiMapPin className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City, state, or remote"
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        />
      </div>
      
      {/* Search Button */}
      <button
        type="submit"
        className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center"
      >
        <FiSearch className="mr-2" />
        Search Jobs
      </button>
    </form>
  );
}

export default SearchBar;