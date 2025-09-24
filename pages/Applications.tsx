import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../services/api';
import { Application, ApplicationStatus } from '../types';
import Spinner from '../components/Spinner';
import { Briefcase, Building, MapPin, CheckCircle, Clock, XCircle, Star, Send } from 'lucide-react';

function Applications(): React.JSX.Element {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async (): Promise<void> => {
      try {
        const response = await api.getUserApplications();
        setApplications(response.applications || []);
      } catch (error) {
        console.error("Failed to fetch applications", error);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const getStatusInfo = (status: ApplicationStatus) => {
    switch (status) {
      case ApplicationStatus.Pending:
        return { color: 'bg-yellow-100 text-yellow-800', icon: <Clock size={16} /> };
      case ApplicationStatus.Selected:
        return { color: 'bg-green-100 text-green-800', icon: <CheckCircle size={16} /> };
      case ApplicationStatus.Rejected:
        return { color: 'bg-red-100 text-red-800', icon: <XCircle size={16} /> };
      case ApplicationStatus.ShortListed:
        return { color: 'bg-purple-100 text-purple-800', icon: <Star size={16} /> };
      case ApplicationStatus.Applied:
        return { color: 'bg-blue-100 text-blue-800', icon: <Send size={16} /> };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: <Briefcase size={16} /> };
    }
  };

  if (loading) return <div className="flex justify-center py-12"><Spinner /></div>;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">My Applications 📄</h1>
      {applications.length === 0 ? (
        <p className="text-gray-600 text-center py-10">You haven't applied for any jobs yet. Start exploring now! ✨</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map(app => (
            <div key={app._id || app.id} className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <Link to={`/jobs/${app.job._id || app.job.id}`} className="text-xl font-semibold text-blue-700 hover:text-blue-900 transition-colors">
                  {app.job.title}
                </Link>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusInfo(app.status).color}`}>
                  {getStatusInfo(app.status).icon}
                  <span>{app.status}</span>
                </div>
              </div>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center gap-2">
                  <Building size={18} className="text-gray-500" />
                  <span>{app.job.companyName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-gray-500" />
                  <span>{app.job.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Applications;