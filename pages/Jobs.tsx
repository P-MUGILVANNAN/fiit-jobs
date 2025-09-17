// src/pages/Jobs.tsx
import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import * as api from "../services/api";
import { Job, JobType, ExperienceLevel } from "../types";
import JobCard from "../components/JobCard";
import Spinner from "../components/Spinner";
import SearchBar from "../components/SearchBar";
import Alert from "../components/Alert";
import { useAuth } from "../context/AuthContext";
import { FiFilter, FiX, FiChevronDown, FiChevronUp, FiMapPin, FiBriefcase, FiAward } from "react-icons/fi";

const JOBS_PER_PAGE = 6;

// Category options from your backend model
const CATEGORY_OPTIONS = [
  "Networking",
  "Linux",
  "AWS",
  "Accounts",
  "Developer",
  "Designer",
  "DevOps",
  "Testing",
  "Data Analyst",
  "Data Scientist"
];

function Jobs(): React.JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated } = useAuth();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [alertCreationStatus, setAlertCreationStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    jobType: true,
    experience: true
  });

  // 🔹 Filters from URL
  const keyword = searchParams.get("keyword") || "";
  const location = searchParams.get("location") || "";
  const jobType = searchParams.get("jobType") || "";
  const experience = searchParams.get("experience") || "";
  const qualification = searchParams.get("qualification") || "";
  const category = searchParams.get("category") || "";

  // Parse comma-separated values from URL
  const selectedCategories = category ? category.split(",") : [];
  const selectedJobTypes = jobType ? jobType.split(",") : [];
  const selectedExperiences = experience ? experience.split(",") : [];

  // 🔹 Fetch jobs from backend
  const fetchAndSetJobs = useCallback(async () => {
    setLoading(true);
    setAlertCreationStatus(null);
    try {
      const response = await api.fetchJobs({
        keyword: keyword || undefined,
        location: location || undefined,
        jobType: jobType || undefined,
        experience: experience || undefined,
        qualification: qualification || undefined,
        category: category || undefined,
        page: currentPage,
        limit: JOBS_PER_PAGE,
      });

      setJobs(Array.isArray(response?.jobs) ? response.jobs : []);
      setTotalPages(response?.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
      setJobs([]);
      setAlertCreationStatus({
        type: "error",
        message: "Failed to fetch jobs.",
      });
    } finally {
      setLoading(false);
    }
  }, [
    keyword,
    location,
    jobType,
    experience,
    qualification,
    category,
    currentPage,
  ]);

  // 🔹 Refetch when filters or page change
  useEffect(() => {
    fetchAndSetJobs();
  }, [fetchAndSetJobs]);

  // 🔹 Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [keyword, location, jobType, experience, qualification, category]);

  // 🔹 Handle search bar
  const handleSearch = (newKeyword: string, newLocation: string): void => {
    const params = new URLSearchParams(searchParams);
    if (newKeyword) params.set("keyword", newKeyword);
    else params.delete("keyword");
    if (newLocation) params.set("location", newLocation);
    else params.delete("location");
    setSearchParams(params);
  };

  // 🔹 Handle checkbox filters
  const handleCheckboxFilter = (
    filterType: "category" | "jobType" | "experience",
    value: string,
    checked: boolean
  ): void => {
    const params = new URLSearchParams(searchParams);
    const currentValues = params.get(filterType)?.split(",") || [];
    
    let newValues: string[];
    if (checked) {
      newValues = [...currentValues.filter(v => v), value];
    } else {
      newValues = currentValues.filter(v => v !== value);
    }

    if (newValues.length > 0) {
      params.set(filterType, newValues.join(","));
    } else {
      params.delete(filterType);
    }
    
    setSearchParams(params);
  };

  // 🔹 Clear all filters
  const clearAllFilters = (): void => {
    const params = new URLSearchParams(searchParams);
    params.delete("category");
    params.delete("jobType");
    params.delete("experience");
    params.delete("qualification");
    setSearchParams(params);
  };

  // 🔹 Toggle filter section expansion
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Count active filters
  const activeFilterCount = [selectedCategories, selectedJobTypes, selectedExperiences]
    .reduce((count, arr) => count + arr.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-primary-50 text-dark text-center py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Dream Job</h1>
          <p className="text-gray-500 mb-6">Discover opportunities that match your skills and aspirations</p>
          <SearchBar
            onSearch={handleSearch}
            initialKeyword={keyword}
            initialLocation={location}
          />
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="container mx-auto px-4 py-4 lg:hidden">
        <button
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="flex items-center justify-center w-full py-3 bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <FiFilter className="mr-2" />
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          {mobileFiltersOpen ? (
            <FiChevronUp className="ml-2" />
          ) : (
            <FiChevronDown className="ml-2" />
          )}
        </button>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters - Desktop */}
          <div className={`hidden lg:block lg:w-1/4 bg-white rounded-xl shadow-sm border border-gray-100 p-5 h-fit sticky top-6`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <FiFilter className="mr-2" /> Filters
              </h2>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('category')}
              >
                <h3 className="text-md font-medium text-gray-700 flex items-center">
                  <FiBriefcase className="mr-2 text-blue-500" /> Category
                </h3>
                {expandedSections.category ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              {expandedSections.category && (
                <div className="mt-3 space-y-2 pl-1">
                  {CATEGORY_OPTIONS.map((cat) => (
                    <label key={cat} className="flex items-center group cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={(e) =>
                          handleCheckboxFilter("category", cat, e.target.checked)
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-3 text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Job Type Filter */}
            <div className="mb-6">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('jobType')}
              >
                <h3 className="text-md font-medium text-gray-700 flex items-center">
                  <FiBriefcase className="mr-2 text-blue-500" /> Job Type
                </h3>
                {expandedSections.jobType ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              {expandedSections.jobType && (
                <div className="mt-3 space-y-2 pl-1">
                  {Object.values(JobType).map((type) => (
                    <label key={type} className="flex items-center group cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedJobTypes.includes(type)}
                        onChange={(e) =>
                          handleCheckboxFilter("jobType", type, e.target.checked)
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-3 text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Experience Filter */}
            <div className="mb-6">
              <div 
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleSection('experience')}
              >
                <h3 className="text-md font-medium text-gray-700 flex items-center">
                  <FiAward className="mr-2 text-blue-500" /> Experience
                </h3>
                {expandedSections.experience ? <FiChevronUp /> : <FiChevronDown />}
              </div>
              {expandedSections.experience && (
                <div className="mt-3 space-y-2 pl-1">
                  {Object.values(ExperienceLevel).map((level) => (
                    <label key={level} className="flex items-center group cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedExperiences.includes(level)}
                        onChange={(e) =>
                          handleCheckboxFilter("experience", level, e.target.checked)
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-3 text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
                        {level}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Filters */}
          {mobileFiltersOpen && (
            <div className="lg:hidden bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
                <button onClick={() => setMobileFiltersOpen(false)}>
                  <FiX className="text-gray-500" />
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-md font-medium text-gray-700 mb-3">Category</h3>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORY_OPTIONS.map((cat) => (
                    <label key={cat} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={(e) =>
                          handleCheckboxFilter("category", cat, e.target.checked)
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Job Type Filter */}
              <div className="mb-6">
                <h3 className="text-md font-medium text-gray-700 mb-3">Job Type</h3>
                <div className="space-y-2">
                  {Object.values(JobType).map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedJobTypes.includes(type)}
                        onChange={(e) =>
                          handleCheckboxFilter("jobType", type, e.target.checked)
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Experience Filter */}
              <div className="mb-6">
                <h3 className="text-md font-medium text-gray-700 mb-3">Experience</h3>
                <div className="space-y-2">
                  {Object.values(ExperienceLevel).map((level) => (
                    <label key={level} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedExperiences.includes(level)}
                        onChange={(e) =>
                          handleCheckboxFilter("experience", level, e.target.checked)
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={clearAllFilters}
                className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {jobs.length} {jobs.length === 1 ? 'Job' : 'Jobs'} Found
                  </h2>
                  {(keyword || location) && (
                    <p className="text-gray-600 text-sm mt-1 flex items-center flex-wrap">
                      {keyword && <span className="mr-2">"{keyword}"</span>}
                      {keyword && location && <span className="mr-1">•</span>}
                      {location && (
                        <span className="flex items-center">
                          <FiMapPin className="mr-1" size={14} /> {location}
                        </span>
                      )}
                    </p>
                  )}
                </div>
                
                {activeFilterCount > 0 && (
                  <div className="mt-3 sm:mt-0 flex items-center">
                    <span className="text-sm text-gray-600 mr-2">
                      {activeFilterCount} active filter{activeFilterCount !== 1 ? 's' : ''}
                    </span>
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      Clear all
                    </button>
                  </div>
                )}
              </div>
            </div>

            {alertCreationStatus && (
              <div className="mb-6">
                <Alert
                  type={alertCreationStatus.type}
                  message={alertCreationStatus.message}
                  onClose={() => setAlertCreationStatus(null)}
                />
              </div>
            )}

            {loading ? (
              <div className="flex justify-center py-12">
                <Spinner />
              </div>
            ) : (
              <>
                {/* Job Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {jobs.length > 0 ? (
                    jobs.map((job) => <JobCard key={job._id} job={job} />)
                  ) : (
                    <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                      <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <FiBriefcase className="text-gray-400" size={32} />
                      </div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">No jobs found</h3>
                      <p className="text-gray-600 mb-4 max-w-md mx-auto">
                        Try adjusting your search or filter criteria to find more matches.
                      </p>
                      <button
                        onClick={clearAllFilters}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Clear all filters
                      </button>
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2 mt-10">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-colors disabled:opacity-50 flex items-center"
                    >
                      Previous
                    </button>
                    
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg text-sm font-medium ${currentPage === page 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-colors disabled:opacity-50 flex items-center"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Jobs;