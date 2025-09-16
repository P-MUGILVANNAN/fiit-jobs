import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import * as api from "../services/api";
import { Job } from "../types";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";

function JobDetails(): React.JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applyStatus, setApplyStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    const fetchJob = async (): Promise<void> => {
      if (!id) return;
      try {
        setLoading(true);
        const fetchedJob = await api.fetchJobById(id);
        if (fetchedJob) {
          setJob(fetchedJob);
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
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="flex items-start space-x-6 mb-6">
        <img
          src={job.companyImage}
          alt={`${job.company} logo`}
          className="w-24 h-24 object-contain rounded-md border"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
          <p className="text-xl text-gray-700">{job.company}</p>
          <p className="text-md text-gray-500">{job.location}</p>
          <p className="text-sm text-gray-400 mt-2">
            Posted on:{" "}
            {new Date(job.createdAt).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>
      </div>

      <div className="prose max-w-none">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          Job Description
        </h2>
        <p className="text-gray-700">{job.description}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          Required Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <span
              key={skill}
              className="bg-primary-100 text-primary-800 text-sm font-semibold px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {applyStatus && (
          <Alert
            type={applyStatus.type}
            message={applyStatus.message}
            onClose={() => setApplyStatus(null)}
          />
        )}
      </div>

      <div className="mt-8 border-t pt-6">
        {isAuthenticated ? (
          <button
            onClick={handleApply}
            disabled={isApplying || applyStatus?.type === "success"}
            className="w-full md:w-auto bg-primary-600 text-white font-bold py-2 px-6 rounded-md hover:bg-primary-700 transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isApplying
              ? "Applying..."
              : applyStatus?.type === "success"
              ? "Applied"
              : "Apply Now"}
          </button>
        ) : (
          <p className="text-center bg-yellow-100 p-4 rounded-md">
            <Link
              to="/login"
              className="text-primary-600 font-bold hover:underline"
            >
              Log in
            </Link>{" "}
            to apply for this job.
          </p>
        )}
      </div>
    </div>
  );
}

export default JobDetails;
