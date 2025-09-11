
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as api from '../services/api';
import { Job, JobType, ExperienceLevel } from '../types';
import JobCard from '../components/JobCard';
import Spinner from '../components/Spinner';
import SearchBar from '../components/SearchBar';
import Alert from '../components/Alert';
import { useAuth } from '../context/AuthContext';

const JOBS_PER_PAGE = 6;

function Jobs(): React.JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [alertCreationStatus, setAlertCreationStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [isCreatingAlert, setIsCreatingAlert] = useState(false);

  const keyword = searchParams.get('keyword') || '';
  const location = searchParams.get('location') || '';
  const jobType = searchParams.get('jobType') || '';
  const experienceLevel = searchParams.get('experienceLevel') || '';

  const fetchAndSetJobs = useCallback(async (kw: string, loc: string, type: string, level: string) => {
    setLoading(true);
    setAlertCreationStatus(null);
    try {
      const allJobs = await api.fetchJobs({ keyword: kw, location: loc, jobType: type, experienceLevel: level });
      setJobs(allJobs);
      setCurrentPage(1); // Reset to first page on new search
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAndSetJobs(keyword, location, jobType, experienceLevel);
  }, [keyword, location, jobType, experienceLevel, fetchAndSetJobs]);

  const handleSearch = (newKeyword: string, newLocation: string): void => {
    setSearchParams(prev => {
        prev.set('keyword', newKeyword);
        prev.set('location', newLocation);
        return prev;
    });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setSearchParams(prev => {
        if (value) {
            prev.set(name, value);
        } else {
            prev.delete(name);
        }
        return prev;
    });
  };

  const handleCreateAlert = async (): Promise<void> => {
    if (!keyword && !location) return;
    setIsCreatingAlert(true);
    setAlertCreationStatus(null);
    try {
      await api.createJobAlert(keyword, location);
      setAlertCreationStatus({ type: 'success', message: 'Job alert created successfully!' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create alert.';
      setAlertCreationStatus({ type: 'error', message });
    } finally {
      setIsCreatingAlert(false);
    }
  };

  const paginatedJobs = jobs.slice((currentPage - 1) * JOBS_PER_PAGE, currentPage * JOBS_PER_PAGE);
  const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">Find Your Dream Job</h1>
        <SearchBar onSearch={handleSearch} initialKeyword={keyword} initialLocation={location} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            <div>
                <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">Job Type</label>
                <select 
                    id="jobType" 
                    name="jobType" 
                    value={jobType}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                >
                    <option value="">All Types</option>
                    {Object.values(JobType).map(type => <option key={type} value={type}>{type}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700">Experience Level</label>
                <select 
                    id="experienceLevel"
                    name="experienceLevel"
                    value={experienceLevel}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                >
                    <option value="">All Levels</option>
                    {Object.values(ExperienceLevel).map(level => <option key={level} value={level}>{level}</option>)}
                </select>
            </div>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12"><Spinner /></div>
      ) : (
        <>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <p className="text-gray-600">{jobs.length} jobs found.</p>
              {isAuthenticated && (keyword || location) && (
                <button
                  onClick={handleCreateAlert}
                  disabled={isCreatingAlert || alertCreationStatus?.type === 'success'}
                  className="bg-primary-600 text-white font-bold py-2 px-4 rounded-md hover:bg-primary-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
                >
                  {isCreatingAlert ? 'Creating...' : alertCreationStatus?.type === 'success' ? 'Alert Created' : 'Create Job Alert for this Search'}
                </button>
              )}
            </div>
            {alertCreationStatus && (
              <Alert 
                type={alertCreationStatus.type} 
                message={alertCreationStatus.message} 
                onClose={() => setAlertCreationStatus(null)}
              />
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-primary-50 hover:border-primary-300 transition-colors disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-primary-50 hover:border-primary-300 transition-colors disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Jobs;