import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';
import Spinner from '../components/Spinner';
import * as api from '../services/api';
import { Job } from '../types';

// Company logos for the slider
const companyLogos = [
  // TCS
  "https://upload.wikimedia.org/wikipedia/commons/0/0e/Tata_Consultancy_Services_old_logo.svg",

  // Infosys
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/256px-Infosys_logo.svg.png",

  // Wipro
  "https://companieslogo.com/img/orig/WIT-1453b096.png?t",

  // HCL
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/HCLTech-new-logo.svg/1200px-HCLTech-new-logo.svg.png",

  // Accenture
  "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg",

  // Cognizant
  "https://www.cognizantrcm.com/wp-content/uploads/Cognizant_Logo.png",

  // Capgemini
  "https://companieslogo.com/img/orig/CAP.PA_BIG-cbc06f01.png?t",

  // IBM
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/256px-IBM_logo.svg.png",

  // Deloitte
  "https://www.pngmart.com/files/23/Deloitte-Logo-PNG-Picture.png",

  // Amazon
  "https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo.png",

  // Google
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",

  // Microsoft
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png",
];

// Reusable component for the company logo slider
const CompanyLogoSlider = () => (
    <div className="relative w-full overflow-hidden py-4">
        <div className="flex animate-scroll-logos whitespace-nowrap">
            {/* Duplicate the logos to create a seamless loop */}
            {[...companyLogos, ...companyLogos].map((logo, index) => (
                <div key={index} className="flex-shrink-0 mx-8">
                    <img src={logo} alt={`Company Logo ${index}`} className="h-10" />
                </div>
            ))}
        </div>
        {/* Tailwind CSS keyframes for the animation */}
        <style jsx>{`
            @keyframes scroll-logos {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
            .animate-scroll-logos {
                animation: scroll-logos 30s linear infinite;
            }
        `}</style>
    </div>
);

// Icons for categories and "Why Choose Us" section
const EngineeringIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>;
const SalesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const ITIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>;
const DesignIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const TargetIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a4.996 4.996 0 00.865 1.543l-4.162 2.164m-4.664-2.164a4.996 4.996 0 00-.865-1.543L5.84 14m0 0l-1.396 2.545a4.996 4.996 0 01-.865 1.543l4.162-2.164m-4.664 2.164l-.38 2.545M12 14l-6.16-3.422a4.996 4.996 0 01-.865-1.543l4.162 2.164m0 0l.38 2.545" /></svg>;
const BookIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.483 9.176 4.5 7.5 4.5 3.5 4.5 1 6.5 1 9c0 1.986 2.667 3.993 6.5 3.993 1.676 0 3.332-.983 4.5-1.731m-4.5 1.731V19.5" /></svg>;
const ChatIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;

// Reusable component for the stats counter animation
interface AnimatedCounterProps {
  from: number;
  to: number;
  duration: number;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ from, to, duration, suffix = '' }) => {
  const [count, setCount] = useState(from);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = from;
          const end = to;
          if (start === end) return;

          const increment = end / (duration / 10);
          const timer = setInterval(() => {
            start += increment;
            if (start > end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 10);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [from, to, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};


function Home(): React.JSX.Element {
  const navigate = useNavigate();
  const [recommendedJobs, setRecommendedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchRecommendedJobs = async () => {
    try {
      const response = await api.fetchJobs();
      setRecommendedJobs(response.jobs.slice(0, 4)); // ✅ use response.jobs
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

      {/* Companies Section */}
      <section className="py-8 bg-gray-50">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Companies That Trust Us</h2>
        <p className="text-center text-gray-500 mb-8">Trusted by leading companies worldwide.</p>
        <CompanyLogoSlider />
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary-50 rounded-lg shadow-md">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-4">
              <div className="text-5xl font-extrabold text-primary-600">
                <AnimatedCounter from={0} to={1500} duration={2000} suffix="+" />
              </div>
              <p className="mt-2 text-lg text-gray-600">daily active users</p>
            </div>
            <div className="p-4">
              <div className="text-5xl font-extrabold text-primary-600">
                <AnimatedCounter from={0} to={1000} duration={2000} suffix="+" />
              </div>
              <p className="mt-2 text-lg text-gray-600">Open job positions</p>
            </div>
            <div className="p-4">
              <div className="text-5xl font-extrabold text-primary-600">
                <AnimatedCounter from={0} to={2000} duration={2000} suffix="+" />
              </div>
              <p className="mt-2 text-lg text-gray-600">stories shared   </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Resume Building</h3>
            <p className="text-gray-600">Get access to professional resume templates and a step-by-step guide to help you create a stand-out resume.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Career Guidance</h3>
            <p className="text-gray-600">Receive personalized career advice from industry experts to navigate your career path and make informed decisions.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Career Enhancement Courses</h3>
            <p className="text-gray-600">Enroll in our curated list of courses to upskill yourself and stay competitive in your field.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800 mb-2">24/7 Online Support</h3>
            <p className="text-gray-600">Our support team is available around the clock to assist you with any questions or issues you may have.</p>
          </div>
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
        <div className="flex justify-center">
            <Link to="/jobs">
              <button className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-md mt-8">
                View All Jobs
              </button>
            </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;