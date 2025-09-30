import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// --- Reusable Icon Components (Following the Circular Style) ---
const iconWrapperClasses =
    "w-16 h-16 flex items-center justify-center rounded-full bg-primary-100 border-4 border-primary-200";
const primaryTextClass = "text-primary-600";

const InsightsIcon = () => (
    <div className={iconWrapperClasses}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-8 w-8 ${primaryTextClass}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0h6m-9-6h9"
            />
        </svg>
    </div>
);

const TipsIcon = () => (
    <div className={iconWrapperClasses}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-8 w-8 ${primaryTextClass}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m14.854 4.854l.707.707M5.146 5.146l-.707-.707M12 18V9M12 9a2 2 0 002-2V5a2 2 0 00-2-2 2 2 0 00-2 2v2a2 2 0 002 2z"
            />
        </svg>
    </div>
);

const CareerIcon = () => (
    <div className={iconWrapperClasses}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-8 w-8 ${primaryTextClass}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 13.255A23.567 23.567 0 0112 15c-3.15 0-6.02-.91-8.58-2.565M12 3v18"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM4 11a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM16 11a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
        </svg>
    </div>
);

// --- FAQ Data (Portal Specific) ---
const faqs = [
    {
        q: "What type of jobs does FIIT Jobs specialize in?",
        a: "We primarily focus on IT, Software Development, and Corporate domains. Roles include Full Stack Development, Data Science, Cyber Security, Cloud Computing, DevOps, Business Analyst, and AI/ML opportunities.",
    },
    {
        q: "Is there a fee for job seekers to use FIIT Jobs' placement services?",
        a: "Job applications and profile matching are free. Optional services such as training programs, certifications, or career-boost packages may have fees, clearly communicated upfront.",
    },
    {
        q: "Do you assist with international job opportunities?",
        a: "Yes, we collaborate with global recruiters and companies to connect skilled professionals with roles abroad, especially in Europe, the Middle East, and North America.",
    },
    {
        q: "Can fresh graduates apply without prior experience?",
        a: "Absolutely. We actively work with college graduates and entry-level job seekers, offering internships, fresher roles, and opportunities with mentorship programs.",
    },
    {
        q: "How does FIIT Jobs match candidates with companies?",
        a: "Our platform combines AI-driven algorithms with recruiter expertise to align candidates’ skills, location preferences, and career goals with employer requirements.",
    },
    {
        q: "Can I update my resume after uploading it?",
        a: "Yes. You can log in to your profile anytime and update your resume, portfolio, or skills to enhance your chances of getting shortlisted.",
    },
    {
        q: "Do you offer training programs for job readiness?",
        a: "Yes. We provide training in cloud, DevOps, data science, and communication skills to improve employability and interview readiness.",
    },
];

// --- FAQ Data (Interview Questions) ---
const interviewFaqs = [
  {
    q: "What is the difference between React and Angular?",
    a: "React is a JavaScript library focused on building UI components, while Angular is a full-fledged framework with built-in routing, dependency injection, and state management.",
  },
  {
    q: "Explain the concept of REST API.",
    a: "A REST API uses HTTP methods (GET, POST, PUT, DELETE) to interact with resources, following Representational State Transfer principles for scalability and simplicity.",
  },
  {
    q: "What is the use of Docker in development?",
    a: "Docker packages applications and their dependencies into containers, ensuring consistent environments across development, testing, and production.",
  },
  {
    q: "What is a primary key in databases?",
    a: "A primary key uniquely identifies each record in a table, ensuring data integrity and enabling efficient lookups.",
  },
  {
    q: "What is the difference between SQL and NoSQL databases?",
    a: "SQL databases use structured schemas with tables, while NoSQL databases are schema-less and support flexible data models like documents, graphs, or key-value pairs.",
  },
  {
    q: "What is CI/CD in DevOps?",
    a: "CI/CD stands for Continuous Integration and Continuous Deployment. It automates code integration, testing, and deployment, enabling faster and more reliable software delivery.",
  },
  {
    q: "What are microservices?",
    a: "Microservices is an architectural style where an application is composed of small, independent services that can be developed, deployed, and scaled separately.",
  },
  {
    q: "Explain the difference between HTTP and HTTPS.",
    a: "HTTP is the protocol for data transfer on the web, while HTTPS adds SSL/TLS encryption to secure the communication between client and server.",
  },
  {
    q: "What is the difference between process and thread?",
    a: "A process is an independent program with its own memory space, while a thread is a lightweight unit within a process that shares memory and resources with other threads.",
  },
  {
    q: "What is the difference between GET and POST requests?",
    a: "GET requests are used to retrieve data and append parameters to the URL, while POST requests send data in the request body, suitable for sensitive or large payloads.",
  },
  {
    q: "What is the difference between var, let, and const in JavaScript?",
    a: "var is function-scoped and can be re-declared, let is block-scoped and cannot be re-declared in the same scope, const is block-scoped and cannot be reassigned.",
  },
  {
    q: "What is hoisting in JavaScript?",
    a: "Hoisting is JavaScript's behavior of moving variable and function declarations to the top of their scope before code execution.",
  },
  {
    q: "What is the virtual DOM in React?",
    a: "The virtual DOM is a lightweight representation of the actual DOM. React uses it to efficiently update only the parts of the UI that changed, improving performance.",
  },
  {
    q: "What is state and props in React?",
    a: "State is a component's internal data that can change, while props are external inputs passed to components. Props are read-only.",
  },
  {
    q: "What are the differences between classical inheritance and prototypal inheritance in JavaScript?",
    a: "Classical inheritance uses classes and hierarchies to inherit properties and methods. Prototypal inheritance allows objects to inherit directly from other objects.",
  },
  {
    q: "Explain the difference between synchronous and asynchronous programming.",
    a: "Synchronous code executes line by line, blocking further execution until complete. Asynchronous code runs independently, allowing other operations to continue without waiting.",
  },
  {
    q: "What is a closure in JavaScript?",
    a: "A closure is a function that has access to variables from its outer scope even after the outer function has finished executing.",
  },
  {
    q: "What is the difference between null and undefined in JavaScript?",
    a: "null represents an explicitly empty value, while undefined indicates a variable has been declared but not assigned a value.",
  },
  {
    q: "What is event bubbling in JavaScript?",
    a: "Event bubbling is when an event triggered on a child element propagates up through its parent elements in the DOM hierarchy.",
  },
  {
    q: "What is the difference between authentication and authorization?",
    a: "Authentication verifies who a user is, while authorization determines what resources or actions a user is allowed to access.",
  },
];



// --- Single FAQ Item Component (Accordion Style) ---
const FAQItem = ({ faq }: { faq: { q: string; a: string } }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="border-b border-gray-200 py-4 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
        >
            <div className="flex justify-between items-start">
                <h4
                    className={`text-xl font-semibold transition-colors duration-300 ${isOpen ? primaryTextClass : "text-gray-800"
                        }`}
                >
                    {faq.q}
                </h4>
                <button className="text-gray-500 hover:text-primary-600 focus:outline-none transition duration-300 ml-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 transform transition-transform duration-500 ${isOpen ? "rotate-180 text-primary-600" : "rotate-0"
                            }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"
                    }`}
            >
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
            </div>
        </div>
    );
};

function BlogFAQ(): React.JSX.Element {
    return (
        <div className="container mx-auto px-4 py-8 space-y-16">
            {/* --- Hero Section --- */}
            <section className="mt-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-center text-dark px-4">
                    CAREER <span className="text-primary-600">INSIGHTS</span> & FAQ
                </h1>
                <p className="mt-4 text-xl text-center text-gray-600 max-w-3xl mx-auto">
                    Stay updated with the latest industry trends, get expert career advice,
                    and explore answers to the most common career and placement questions.
                </p>
            </section>

            {/* --- Blog Categories/Focus Section --- */}
            <section>
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
                    What You'll Find Here
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
                        <div className="flex justify-center mb-4">
                            <InsightsIcon />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-dark-800">
                            Industry Insights
                        </h3>
                        <p className="text-dark-600">
                            Deep dives into the latest tech stacks, trending roles, and job
                            market demands in IT.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
                        <div className="flex justify-center mb-4">
                            <TipsIcon />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-dark-800">
                            Interview & Resume Tips
                        </h3>
                        <p className="text-dark-600">
                            Proven strategies to optimize your resume, master behavioral rounds,
                            and stand out in interviews.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 text-center">
                        <div className="flex justify-center mb-4">
                            <CareerIcon />
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-dark-800">
                            Career Advancement
                        </h3>
                        <p className="text-dark-600">
                            Guidance for long-term growth, leadership development, and career
                            transitions to senior roles.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- Featured Blog Posts (with local images) --- */}
            <section className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold mb-6 text-primary-600">
                    Latest Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Card 1 */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300">
                        <img
                            src="/image1.jpeg"
                            alt="AI Recruitment"
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2 text-gray-800 hover:text-primary-600">
                                <Link to="/blog/post1">
                                    The Future of AI in IT Recruitment
                                </Link>
                            </h3>
                            <p className="text-sm text-gray-500 mb-3">
                                By Expert Recruiter | July 15, 2024
                            </p>
                            <p className="text-gray-700 text-sm">
                                How AI-powered hiring tools are changing the way companies source
                                and evaluate tech talent.
                            </p>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300">
                        <img
                            src="/image2.jpg"
                            alt="Interview Tips"
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2 text-gray-800 hover:text-primary-600">
                                <Link to="/blog/post2">
                                    5 Non-Technical Skills Every Developer Needs
                                </Link>
                            </h3>
                            <p className="text-sm text-gray-500 mb-3">
                                By Career Coach | July 10, 2024
                            </p>
                            <p className="text-gray-700 text-sm">
                                Communication, teamwork, and critical thinking are just as
                                important as coding skills.
                            </p>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300">
                        <img
                            src="/image3.png"
                            alt="Career Path"
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2 text-gray-800 hover:text-primary-600">
                                <Link to="/blog/post3">
                                    Switching Careers to Cloud: A Beginner's Guide
                                </Link>
                            </h3>
                            <p className="text-sm text-gray-500 mb-3">
                                By Industry Analyst | July 01, 2024
                            </p>
                            <p className="text-gray-700 text-sm">
                                Practical steps to land your first role in AWS, Azure, or GCP as a
                                career switcher.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Interview FAQ Section --- */}
            <section className="p-8 rounded-lg shadow-xl bg-white">
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
                    Frequently Asked Interview Questions
                </h2>
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    {interviewFaqs.map((faq, index) => (
                        <FAQItem key={index} faq={faq} />
                    ))}
                </div>
            </section>


            {/* --- Job Portal FAQ Section (moved to bottom) --- */}
            <section className="p-8 rounded-lg shadow-xl bg-white">
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
                    FAQs
                </h2>
                <div className="max-w-4xl mx-auto divide-y divide-gray-200">
                    {faqs.map((faq, index) => (
                        <FAQItem key={index} faq={faq} />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default BlogFAQ;
