import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (keyword: string, location: string) => void;
  initialKeyword?: string;
  initialLocation?: string;
}

function SearchBar({ onSearch, initialKeyword = '', initialLocation = '' }: SearchBarProps): React.JSX.Element {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [location, setLocation] = useState(initialLocation);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSearch(keyword, location);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row gap-4 items-center">
      <div className="flex-grow w-full">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Job title, keywords, or company"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
        />
      </div>
      <div className="flex-grow w-full">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City, state, or remote"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
        />
      </div>
      <button
        type="submit"
        className="w-full md:w-auto bg-primary-600 text-white font-bold py-2 px-6 rounded-md hover:bg-primary-700 transition duration-300"
      >
        Search Jobs
      </button>
    </form>
  );
}

export default SearchBar;