import React from "react";
import { Link } from "react-router-dom";
import { Job } from "../types";

interface JobCardProps {
  job: Job;
}

function JobCard({ job }: JobCardProps): React.JSX.Element {
  const skills = Array.isArray(job.skills) ? job.skills.slice(0, 3) : [];

  return (
    <>
      <Link to={`/jobs/${job._id}`}>
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
          <div className="p-6 flex-grow">
            <div className="flex items-start space-x-4">
              {job.companyImage ? (
                <img
                  src={job.companyImage}
                  alt={`${job.companyName || "Company"} logo`}
                  className="w-16 h-16 object-contain rounded-md border"
                />
              ) : (
                <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-md border text-gray-400 text-sm">
                  No Logo
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {job.title || "Untitled Job"}
                </h3>
                <p className="text-md text-gray-600">
                  {job.companyName || "Unknown Company"}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {job.location || "N/A"}
                </p>
              </div>
            </div>

            {job.description && (
              <p className="text-gray-700 mt-4 text-sm line-clamp-2">
                {job.description}
              </p>
            )}

            {skills.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-primary-100 text-primary-800 text-xs font-semibold px-2.5 py-0.5 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="px-6 pb-4 bg-gray-50 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Posted:{" "}
              {job.createdAt
                ? new Date(job.createdAt).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })
                : "N/A"}
            </span>
            <Link
              to={`/jobs/${job._id}`}
              className="text-primary-600 hover:text-primary-800 font-semibold text-sm"
            >
              View Details &rarr;
            </Link>
          </div>
        </div>
      </Link>
    </>
  );
}

export default JobCard;