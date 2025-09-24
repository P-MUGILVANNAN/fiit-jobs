import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// --- SVG Icons for "How It Works" Section ---
const RegisterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);
const ApplyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
  </svg>
);
const UploadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
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
        {label === '98+' ? 'Job For Countries' : label === '3K+' ? 'Jobs Done' : 'Companies Jobs'}
      </p>
    </div>
  );
};


function About(): React.JSX.Element {
  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      {/* --- Hero Section --- */}
      <section className="mt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-dark px-4">
          ABOUT <span className="text-primary-600">FIIT FORMACION PVT LTD</span>
        </h1>
      </section>

      {/* --- Company Intro --- */}
      <section className="bg-white p-8 rounded-lg shadow-md">
        <p className="text-lg text-gray-700 leading-relaxed">
          FIIT Formacion pvt ltd has rapidly emerged as a leading force in the IT Software Training and Placement sector, building a strong and influential presence across Tamil Nadu. With effective management and strategic growth, FIIT Jobs operates in Chennai with branches in Avadi, Ambattur, Iyyappanthangal, Tambaram, Kelambakkam, Chengalpattu, Tiruvannamalai, and Vellore, while the head office is located in Bangalore.
        </p>
        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
          Our committed team ensures excellence through meticulous planning, coordination, and motivation. From designing industry-relevant course content to delivering expert-led training and providing hands-on problem-solving support, FIIT Jobs consistently drives students toward career success and top-tier placements.
        </p>
      </section>

      {/* --- Why to choose us --- */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10 text-primary-600">Why to Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
            <div className="flex justify-center mb-4"><img src="https://fiit.co.in/wp-content/uploads/2024/07/software-developer.png" className="w-10 h-10" alt="" /></div>
            <h3 className="text-xl font-semibold mb-2 text-dark-800">IT Experts as Trainers</h3>
            <p className="text-dark-600">Learn from seasoned professionals with extensive industry experience.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
            <div className="flex justify-center mb-4"><img src="https://fiit.co.in/wp-content/uploads/2024/07/planning.png" className="w-10 h-10" alt="" /></div>
            <h3 className="text-xl font-semibold mb-2 text-dark-800">Hand-On Training</h3>
            <p className="text-dark-600">Emphasis on practical, project-based learning ensures you gain real-world skills.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
            <div className="flex justify-center mb-4"><img src="https://fiit.co.in/wp-content/uploads/2024/07/invoice.png" className="w-10 h-10" alt="" /></div>
            <h3 className="text-xl font-semibold mb-2 text-dark-800">Affordable Fee Structure</h3>
            <p className="text-dark-600">Competitive pricing ensures value for money without compromising on quality.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
            <div className="flex justify-center mb-4"><img src="https://fiit.co.in/wp-content/uploads/2024/07/workshop.png" className="w-10 h-10" alt="" /></div>
            <h3 className="text-xl font-semibold mb-2 text-dark-800">Interview Preparation</h3>
            <p className="text-dark-600">Comprehensive training to equip you with the skills and confidence needed for job interviews.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
            <div className="flex justify-center mb-4"><img src="https://fiit.co.in/wp-content/uploads/2024/07/meeting.png" className="w-10 h-10" alt="" /></div>
            <h3 className="text-xl font-semibold mb-2 text-dark-800">Placement Support</h3>
            <p className="text-dark-600">Exclusive Partnership with leading companies for direct job placements</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
            <div className="flex justify-center mb-4"><img src="https://fiit.co.in/wp-content/uploads/2024/07/career-path.png" className="w-10 h-10" alt="" /></div>
            <h3 className="text-xl font-semibold mb-2 text-dark-800">Career Guidance</h3>
            <p className="text-dark-600">Strong Guidance with our trained experts to move forward of your career</p>
          </div>
        </div>
      </section>

      {/* --- Statistics Section --- */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <Counter endValue={70} label="98+" />
        <Counter endValue={30} label="3K+" />
        <Counter endValue={120} label="12K+" />
      </section>

      {/* --- How It Works --- */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4"><RegisterIcon /></div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800"><span className="text-gray-400 font-light">01.</span> Register Your Account</h3>
            <p className="text-gray-600">You need to create an account to find the best and preferred job.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4"><SearchIcon /></div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800"><span className="text-gray-400 font-light">02.</span> Search Your Job</h3>
            <p className="text-gray-600">Connect with 20,000+ employers. Apply to millions of job opportunities.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4"><ApplyIcon /></div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800"><span className="text-gray-400 font-light">03.</span> Apply For Dream Job</h3>
            <p className="text-gray-600">Focus your job search on careers in which you are truly interested.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4"><UploadIcon /></div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800"><span className="text-gray-400 font-light">04.</span> Upload Your Resume</h3>
            <p className="text-gray-600">Post your resume and apply for millions of latest jobs.</p>
          </div>
        </div>
      </section>

      {/* --- About FIIT & Image Section --- */}
      <section className="flex flex-col md:flex-row gap-8 items-center">
        <div className="md:w-1/2 p-8 rounded-lg shadow-md bg-white">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">About FIIT</h3>
          <ul className="space-y-3 text-gray-700 list-disc list-inside">
            <li>A leading IT solutions company run by industrial experts.</li>
            <li>Extensive experience in software development, integration, network support, and training.</li>
            <li>Spread across 3000 sq.ft with state-of-the-art infrastructure.</li>
            <li>Well-qualified faculties with industry experience.</li>
            <li>Well-equipped labs and class-rooms with internet and VPN connectivity.</li>
            <li>Training on various technologies with the latest curriculum designed by industry experts.</li>
            <li>Provides value-added services like soft skills, personality development, and interview preparation.</li>
          </ul>
        </div>
        <div className="md:w-1/2">
          <img src="/fiit_icon.webp" alt="Team collaborating" className="rounded-lg shadow-xl w-full h-auto" />
        </div>
      </section>

      {/* --- Vision & Mission --- */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Our Vision</h3>
          <p className="text-gray-700">To be an acknowledged leader in placement services, serving every client, student, and job seeker with unfailing courtesy to get jobs as per their skill ethically and with Professional Loyalty.</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Our Mission</h3>
          <p className="text-gray-700">To create the best professional talents for business-leading corporate sources by our Proficient experts.</p>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="bg-primary-600 text-white text-center py-12 px-6 rounded-lg">
        <h2 className="text-3xl font-bold">Don’t just find. Be found.</h2>
        <p className="mt-2 max-w-2xl mx-auto">Put your CV in front of great employers. We are working on a continuous basis from moulding students to become Professionals to meet client’s requirements.</p>
        <Link
          to="/profile"
          className="mt-6 inline-block bg-white text-primary-600 font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition duration-300">
          Upload Your Resume
        </Link>
      </section>

      {/* --- FIIT.co.in Section --- */}
      <section className="bg-primary-600 text-white text-center py-12 px-6 rounded-lg">
        <h2 className="text-3xl font-bold">Be skilled. Be ready. Be hired.</h2>
        <p className="mt-2 max-w-2xl mx-auto">At FIIT Formacion pvt ltd, we don’t just prepare students—we transform them into professionals.</p>
        <Link
          to="https://fiit.co.in/"
          target="_blank"
          className="mt-6 inline-block bg-white text-primary-600 font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition duration-300">
          FIIT FROMACION PVT LTD
        </Link>
      </section>

    </div>
  );
}

export default About;