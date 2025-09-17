import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import * as api from "../services/api";
import { Job } from "../types";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import { MapPin, Calendar, DollarSign, Briefcase, Award, Tag } from "lucide-react";

function JobDetails(): React.JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuth();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applyStatus, setApplyStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  const [similarJobs, setSimilarJobs] = useState<Job[]>([]);
  const [similarJobsLoading, setSimilarJobsLoading] = useState(false);
  const [similarJobsError, setSimilarJobsError] = useState("");

  useEffect(() => {
    const fetchJob = async (): Promise<void> => {
      if (!id) return;
      try {
        setLoading(true);
        const fetchedJob = await api.fetchJobById(id);
        if (fetchedJob) {
          setJob(fetchedJob);
          fetchSimilarJobs(fetchedJob.category);
        } else {
          setError("Job not found.");
        }
      } catch (err) {
        setError("Failed to fetch job details.");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const fetchSimilarJobs = async (category: string): Promise<void> => {
    try {
      setSimilarJobsLoading(true);
      setSimilarJobsError("");
      const response = await api.fetchJobs({ category, limit: 4 });
      const filteredSimilarJobs = response.jobs.filter(job => job._id !== id);
      setSimilarJobs(filteredSimilarJobs);
    } catch (err) {
      setSimilarJobsError("Failed to fetch similar jobs.");
    } finally {
      setSimilarJobsLoading(false);
    }
  };

  const handleApply = async (): Promise<void> => {
    if (!id) return;
    setIsApplying(true);
    setApplyStatus(null);
    try {
      await api.applyToJob(id);
      setApplyStatus({
        type: "success",
        message: "Successfully applied for this job!",
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to apply.";
      setApplyStatus({ type: "error", message: errorMessage });
    } finally {
      setIsApplying(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-12">
        <Spinner />
      </div>
    );

  if (error) return <Alert type="error" message={error} />;
  if (!job) return <p>Job not found.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-500">
        <Link to="/" className="hover:text-primary-600">Home</Link> &gt; 
        <Link to="/jobs" className="hover:text-primary-600 ml-1">Jobs</Link> &gt; 
        <span className="ml-1 text-gray-700">{job.title}</span>
      </nav>

      {/* Job Info Section */}
      <div className="bg-white p-8 rounded-xl shadow-lg mb-8 border border-gray-100">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <img
            src={job.companyImage}
            alt={`${job.company} logo`}
            className="w-28 h-28 object-contain rounded-lg border p-2 shadow-sm"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
            <p className="text-xl text-gray-700 mt-1">{job.company}</p>
            
            <div className="flex flex-wrap items-center gap-4 mt-4 text-gray-600">
              <div className="flex items-center">
                <MapPin size={18} className="mr-1" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center">
                <DollarSign size={18} className="mr-1" />
                <span>₹{job.salary.toLocaleString()}</span>
              </div>
              <div className="flex items-center">
                <Briefcase size={18} className="mr-1" />
                <span>{job.jobType}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={18} className="mr-1" />
                <span>
                  {new Date(job.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                  })}
                </span>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-auto flex flex-col gap-3 mt-4 md:mt-0">
            {isAuthenticated ? (
              <>
                {applyStatus && (
                  <Alert
                    type={applyStatus.type}
                    message={applyStatus.message}
                    onClose={() => setApplyStatus(null)}
                    className="mb-2"
                  />
                )}
                <button
                  onClick={handleApply}
                  disabled={isApplying || applyStatus?.type === "success"}
                  className="w-full md:w-40 bg-primary-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isApplying
                    ? <><Spinner size="sm" className="mr-2" /> Applying...</>
                    : applyStatus?.type === "success"
                    ? "Applied ✓"
                    : "Apply Now"}
                </button>
              </>
            ) : (
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <p className="text-center text-yellow-800">
                  <Link
                    to="/login"
                    className="text-primary-600 font-bold hover:underline"
                  >
                    Log in
                  </Link>{" "}
                  to apply for this job.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Job Details Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2 flex items-center">
              <Briefcase size={20} className="mr-2" />
              Job Description
            </h2>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
            
            <h2 className="text-xl font-semibold mb-4 mt-8 text-gray-800 border-b pb-2 flex items-center">
              <Award size={20} className="mr-2" />
              Required Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {job.skills.map(skill => (
                <span
                  key={skill}
                  className="bg-primary-100 text-primary-800 text-sm font-semibold px-4 py-2 rounded-full border border-primary-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
              Job Details
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 flex items-center">
                  <Award size={16} className="mr-2" />
                  Qualification
                </h3>
                <p className="text-gray-800 mt-1">{job.qualification}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 flex items-center">
                  <DollarSign size={16} className="mr-2" />
                  Salary
                </h3>
                <p className="text-gray-800 mt-1">₹{job.salary.toLocaleString()}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 flex items-center">
                  <Briefcase size={16} className="mr-2" />
                  Experience
                </h3>
                <p className="text-gray-800 mt-1">{job.experience}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 flex items-center">
                  <Tag size={16} className="mr-2" />
                  Job Type
                </h3>
                <p className="text-gray-800 mt-1">{job.jobType}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 flex items-center">
                  <Tag size={16} className="mr-2" />
                  Category
                </h3>
                <p className="text-gray-800 mt-1">{job.category}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Jobs Section */}
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">Similar Jobs</h2>

        {similarJobsLoading ? (
          <div className="flex justify-center py-6">
            <Spinner size="md" />
          </div>
        ) : similarJobsError ? (
          <Alert type="error" message={similarJobsError} />
        ) : similarJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {similarJobs.map(similarJob => (
              <Link
                key={similarJob._id}
                to={`/jobs/${similarJob._id}`}
                className="block p-6 border rounded-xl hover:shadow-md transition-all duration-300 hover:border-primary-200"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={similarJob.companyImage}
                    alt={`${similarJob.company} logo`}
                    className="w-16 h-16 object-contain rounded-lg border p-1 shadow-sm"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {similarJob.title}
                    </h3>
                    <p className="text-md text-gray-700">{similarJob.company}</p>
                    
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <MapPin size={14} className="mr-1" />
                      <span>{similarJob.location}</span>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-1">
                      {similarJob.skills.slice(0, 3).map(skill => (
                        <span
                          key={skill}
                          className="bg-gray-100 text-gray-800 text-xs font-semibold px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                      {similarJob.skills.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{similarJob.skills.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-3 text-sm text-gray-600">
                      <DollarSign size={14} className="inline mr-1" />
                      ₹{similarJob.salary.toLocaleString()}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-6">No similar jobs found.</p>
        )}
      </div>
    </div>
  );
}

export default JobDetails;