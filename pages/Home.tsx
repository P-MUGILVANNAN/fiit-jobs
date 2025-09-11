import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CategoryCard from '../components/CategoryCard';
import JobCard from '../components/JobCard';
import Spinner from '../components/Spinner';
import * as api from '../services/api';
import { Job } from '../types';

const EngineeringIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>;
const SalesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const ITIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>;
const DesignIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;

function Home(): React.JSX.Element {
  const navigate = useNavigate();
  const [recommendedJobs, setRecommendedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedJobs = async () => {
      try {
        const jobs = await api.fetchJobs();
        setRecommendedJobs(jobs.slice(0, 4)); // Show first 4 as "recommended"
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommendedJobs();
  }, []);

  const handleSearch = (keyword: string, location: string): void => {
    navigate(`/jobs?keyword=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}`);
  };

  const categories = [
    { title: 'Engineering', icon: <EngineeringIcon /> },
    { title: 'Sales', icon: <SalesIcon /> },
    { title: 'IT', icon: <ITIcon /> },
    { title: 'Design', icon: <DesignIcon /> },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center bg-white py-20 px-6 rounded-lg shadow-sm -mt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">Find Your Next Big Opportunity</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Discover thousands of jobs with the right fit for you.</p>
        <div className="mt-8 max-w-3xl mx-auto">
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Browse by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map(cat => <CategoryCard key={cat.title} title={cat.title} icon={cat.icon} />)}
        </div>
      </section>

      {/* Recommended Jobs Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Recommended Jobs</h2>
        {loading ? (
          <div className="flex justify-center"><Spinner /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recommendedJobs.map(job => <JobCard key={job.id} job={job} />)}
          </div>
        )}
      </section>

      {/* Job Alert Section */}
      <section className="bg-primary-600 text-white text-center py-12 px-6 rounded-lg">
        <h2 className="text-3xl font-bold">Create a Job Alert</h2>
        <p className="mt-2">Be the first to know about new jobs that match your criteria.</p>
        <button 
          onClick={() => navigate('/alerts')}
          className="mt-6 bg-white text-primary-600 font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition duration-300">
          Create Alert
        </button>
      </section>
    </div>
  );
}

export default Home;