import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../services/api';
import { JobAlert } from '../types';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';

function JobAlerts(): React.JSX.Element {
  const [alerts, setAlerts] = useState<JobAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAlerts = async (): Promise<void> => {
      try {
        setLoading(true);
        const fetchedAlerts = await api.fetchUserJobAlerts();
        setAlerts(fetchedAlerts);
      } catch (err) {
        setError('Failed to fetch job alerts.');
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  const handleDelete = async (alertId: string): Promise<void> => {
    // Optimistically remove the alert from the UI
    const originalAlerts = [...alerts];
    setAlerts(alerts.filter(a => a.id !== alertId));

    try {
      await api.deleteJobAlert(alertId);
    } catch (err) {
      // If the API call fails, revert the change and show an error
      setError('Failed to delete alert. Please try again.');
      setAlerts(originalAlerts);
    }
  };

  if (loading) return <div className="flex justify-center py-12"><Spinner /></div>;

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Job Alerts</h1>
      {error && <Alert type="error" message={error} onClose={() => setError('')} />}
      
      {alerts.length === 0 ? (
        <div className="text-center py-8">
            <p className="text-gray-600">You haven't created any job alerts yet.</p>
            <Link 
                to="/jobs" 
                className="mt-4 inline-block bg-primary-600 text-white font-bold py-2 px-4 rounded-md hover:bg-primary-700 transition duration-300"
            >
                Create Your First Alert
            </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keyword</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {alerts.map(alert => (
                <tr key={alert.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {alert.keyword || 'Any'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {alert.location || 'Any'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-4">
                    <Link to={`/jobs?keyword=${encodeURIComponent(alert.keyword)}&location=${encodeURIComponent(alert.location)}`} className="text-primary-600 hover:text-primary-900">
                      View Jobs
                    </Link>
                    <button 
                      onClick={() => handleDelete(alert.id)} 
                      className="text-red-600 hover:bg-red-100 hover:text-red-800 px-3 py-1 rounded-md transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default JobAlerts;