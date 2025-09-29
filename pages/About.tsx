import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// --- SVG Icons for "How It Works" Section ---
const iconWrapperClasses = "w-16 h-16 flex items-center justify-center rounded-full bg-primary-100 border-4 border-primary-200";

const RegisterIcon = () => (
    // WRAPPER ADDED FOR CIRCULAR BACKGROUND
    <div className={iconWrapperClasses}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
    </div>
);
const SearchIcon = () => (
    // WRAPPER ADDED FOR CIRCULAR BACKGROUND
    <div className={iconWrapperClasses}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
    </div>
);
const ApplyIcon = () => (
    // WRAPPER ADDED FOR CIRCULAR BACKGROUND
    <div className={iconWrapperClasses}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
        </svg>
    </div>
);
const UploadIcon = () => (
    // WRAPPER ADDED FOR CIRCULAR BACKGROUND
    <div className={iconWrapperClasses}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
    </div>
);

// --- Counter Component for Animations ---
const Counter = ({ endValue, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = endValue / (duration / 10);
    const counter = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        start = endValue;
        clearInterval(counter);
      }
      setCount(Math.ceil(start));
    }, 10);

    return () => clearInterval(counter);
  }, [endValue]);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-5xl font-bold text-primary-600">
        {count}
        {label === '98+' ? '+' : 'K+'}
      </h2>
      <p className="mt-2 text-lg text-gray-600">
        {label === '98+' ? 'Recruitments Worldwide' : label === '3K+' ? 'Happy Candidates Placed' : 'Partnering Companies'}
      </p>
    </div>
  );
};

// --- Company Logos for Clients Section (Unchanged) ---
const companyLogos = [
  "https://upload.wikimedia.org/wikipedia/commons/0/0e/Tata_Consultancy_Services_old_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/256px-Infosys_logo.svg.png",
  "https://companieslogo.com/img/orig/WIT-1453b096.png?t",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/HCLTech-new-logo.svg/1200px-HCLTech-new-logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg",
  "https://www.cognizantrcm.com/wp-content/uploads/Cognizant_Logo.png",
  "https://companieslogo.com/img/orig/CAP.PA_BIG-cbc06f01.png?t",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/256px-IBM_logo.svg.png",
  "https://www.pngmart.com/files/23/Deloitte-Logo-PNG-Picture.png",
  "https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png",
];


function About(): React.JSX.Element {
  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      {/* --- Hero Section --- */}
      <section className="mt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-dark px-4">
          ABOUT <span className="text-primary-600">FIIT JOBS</span>
        </h1>
      </section>

      {/* --- Company Intro (Unchanged) --- */}
      <section className="bg-white p-8 rounded-lg shadow-md">
        <p className="text-lg text-gray-700 leading-relaxed">
          The FIIT Jobs, powered by **FIIT FORMACION PVT LTD**, is your gateway to a rewarding career, specializing in IT, Software, and various corporate domains. Based in Chennai with a strong regional presence including Avadi, Ambattur, Tambaram, and Kelambakkam, our mission is to seamlessly bridge the gap between talented professionals and top-tier companies.
        </p>
        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
          As a leading placement service and manpower recruitment agency, we offer focused solutions for job seekers, from freshers to experienced professionals. We leverage the deep industry expertise of FIIT Formacion, an established IT training and solutions company, to ensure every candidate is job-ready, well-matched, and equipped for long-term career success.
        </p>
      </section>

      {/* --- Why to choose us (CIRCULAR ICONS - Carried over from last change) --- */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10 text-primary-600">Why Choose FIIT Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
            <div className="flex justify-center mb-4">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary-100 border-4 border-primary-200">
                    <img src="https://fiit.co.in/wp-content/uploads/2024/07/software-developer.png" className="w-10 h-10" alt="" />
                </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-dark-800">Exclusive Job Network</h3>
            <p className="text-dark-600">Access to a curated list of job openings from our strong network of corporate partners.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
            <div className="flex justify-center mb-4">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary-100 border-4 border-primary-200">
                    <img src="https://fiit.co.in/wp-content/uploads/2024/07/planning.png" className="w-10 h-10" alt="" />
                </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-dark-800">Expert Candidate Matching</h3>
            <p className="text-dark-600">Our consultants match your unique skills with the perfect career opportunity.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
            <div className="flex justify-center mb-4">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary-100 border-4 border-primary-200">
                    <img src="https://fiit.co.in/wp-content/uploads/2024/07/invoice.png" className="w-10 h-10" alt="" />
                </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-dark-800">Transparent Placement Process</h3>
            <p className="text-dark-600">A clear, ethical, and hassle-free process ensures you land your dream job efficiently.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
            <div className="flex justify-center mb-4">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary-100 border-4 border-primary-200">
                    <img src="https://fiit.co.in/wp-content/uploads/2024/07/workshop.png" className="w-10 h-10" alt="" />
                </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-dark-800">Guaranteed Interview Prep</h3>
            <p className="text-dark-600">Access to our training wing's mock interviews, soft skills, and personality development.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
            <div className="flex justify-center mb-4">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary-100 border-4 border-primary-200">
                    <img src="https://fiit.co.in/wp-content/uploads/2024/07/meeting.png" className="w-10 h-10" alt="" />
                </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-dark-800">Dedicated Support</h3>
            <p className="text-dark-600">From application to final offer, our team provides continuous, one-on-one assistance.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
            <div className="flex justify-center mb-4">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary-100 border-4 border-primary-200">
                    <img src="https://fiit.co.in/wp-content/uploads/2024/07/career-path.png" className="w-10 h-10" alt="" />
                </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-dark-800">Career Advancement</h3>
            <p className="text-dark-600">We aim for placements that ensure growth and align with your long-term professional goals.</p>
          </div>
        </div>
      </section>

      {/* --- Statistics Section (Unchanged) --- */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <Counter endValue={100} label="98+" /> 
        <Counter endValue={12} label="3K+" /> 
        <Counter endValue={25} label="12K+" /> 
      </section>

      {/* --- How It Works (UPDATED SVG ICONS) --- */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Your Path to a New Job: How FIIT Jobs Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            {/* The RegisterIcon component now includes the circular wrapper */}
            <div className="flex justify-center mb-4"><RegisterIcon /></div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800"><span className="text-gray-400 font-light">01.</span> Create Your Profile</h3>
            <p className="text-gray-600">Quickly set up your job seeker account to start accessing exclusive job postings.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            {/* The UploadIcon component now includes the circular wrapper */}
            <div className="flex justify-center mb-4"><UploadIcon /></div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800"><span className="text-gray-400 font-light">02.</span> Upload & Optimize Resume</h3>
            <p className="text-gray-600">Post your resume to be visible to our partnered companies and recruiters.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            {/* The SearchIcon component now includes the circular wrapper */}
            <div className="flex justify-center mb-4"><SearchIcon /></div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800"><span className="text-gray-400 font-light">03.</span> Search & Apply</h3>
            <p className="text-gray-600">Browse thousands of latest job opportunities tailored to your skills and location.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            {/* The ApplyIcon component now includes the circular wrapper */}
            <div className="flex justify-center mb-4"><ApplyIcon /></div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800"><span className="text-gray-400 font-light">04.</span> Get Placed</h3>
            <p className="text-gray-600">Receive interview calls and expert placement guidance from our dedicated team.</p>
          </div>
        </div>
      </section>

     {/* --- About FIIT & Image Section (Focused on Recruitment & Training - UPDATED IMAGE) --- */}
      <section className="flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/2 p-8 rounded-lg shadow-md bg-white">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">FIIT Jobs: Recruitment & Training Excellence</h3>
          <ul className="space-y-3 text-gray-700 list-disc list-inside">
            <li>Run by industrial experts with deep roots in IT solutions and corporate services.</li>
            <li>Strong focus on Manpower Recruitment, Head Hunting, and Placement Services.</li>
            <li>Leveraging FIIT's state-of-the-art training infrastructure for job-readiness.</li>
            <li>Providing placement for certified students and qualified candidates to MNCs.</li>
            <li>Offering comprehensive career guidance and interview preparation programs.</li>
            <li>Commitment to our slogan: "We Help to Maintain Your Human Resources" (from the search results).</li>
            <li>A transparent and ethical approach ensures quality placements for both clients and candidates.</li>
          </ul>
        </div>
        <div className="md:w-1/2 flex justify-center items-center"> {/* Added flex, justify-center, items-center */}
          <img 
                src="fiitjobs.png" 
                alt="FIIT Jobs Logo" 
                className="rounded-full shadow-xl w-90 h-80 object-contain p-4 bg-white" // MODIFIED CLASSES
            />
        </div>
      </section>

      {/* --- Vision & Mission (Unchanged) --- */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Our Vision: For Job Seekers</h3>
          <p className="text-gray-700">To be the acknowledged leader in job placement services, ensuring every candidate finds a role that matches their skill set and career aspirations, delivered with professionalism and loyalty.</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Our Mission: For Clients</h3>
          <p className="text-gray-700">To dedicate ourselves to providing top-quality placements by delivering proficient, corporate-ready professional talents to our business-leading corporate clients.</p>
        </div>
      </section>

      {/* --- Our Esteemed Clients Section (Unchanged) --- */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">Our Esteemed Clients</h2>
        <p className="text-lg text-gray-700 mb-8">We proudly partner with leading global and national companies to connect talent with opportunity. Here are some of the organizations that trust FIIT Jobs for their recruitment needs.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-center">
          {companyLogos.map((logo, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow-md flex items-center justify-center h-24">
              <img src={logo} alt={`Client logo ${index + 1}`} className="max-h-full max-w-full object-contain" />
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA Section (Unchanged) --- */}
      <section className="bg-primary-600 text-white text-center py-12 px-6 rounded-lg">
        <h2 className="text-3xl font-bold">Don’t just find. Be found.</h2>
        <p className="mt-2 max-w-2xl mx-auto">Get your CV in front of the top employers in IT and beyond. We are working continuously to connect high-potential candidates with the right corporate opportunities.</p>
        <Link
          to="/profile"
          className="mt-6 inline-block bg-white text-primary-600 font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition duration-300">
          Upload Your Resume
        </Link>
      </section>

    </div>
  );
}

export default About;