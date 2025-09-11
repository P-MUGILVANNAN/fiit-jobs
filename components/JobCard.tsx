import React from 'react';
import { Link } from 'react-router-dom';
import { Job } from '../types';

interface JobCardProps {
  job: Job;
}

function JobCard({ job }: JobCardProps): React.JSX.Element {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex items-start space-x-4">
            <img src={job.logo} alt={`${job.company} logo`} className="w-16 h-16 object-contain rounded-md border" />
            <div>
                <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                <p className="text-md text-gray-600">{job.company}</p>
                <p className="text-sm text-gray-500 mt-1">{job.location}</p>
            </div>
        </div>
        <p className="text-gray-700 mt-4 text-sm line-clamp-2">{job.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {job.skills.slice(0, 3).map(skill => (
            <span key={skill} className="bg-primary-100 text-primary-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{skill}</span>
          ))}
        </div>
      </div>
      <div className="px-6 pb-4 bg-gray-50 flex items-center justify-between">
        <span className="text-sm text-gray-500">Posted: {job.postedDate}</span>
        <Link to={`/jobs/${job.id}`} className="text-primary-600 hover:text-primary-800 font-semibold text-sm">
          View Details &rarr;
        </Link>
      </div>
    </div>
  );
}

export default JobCard;