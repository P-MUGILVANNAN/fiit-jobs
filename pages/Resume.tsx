import React from 'react';

interface Template {
  id: number;
  name: string;
  image: string;
  link: string; // backend file URL
}

// ✅ Backend base URL
const backendBase = "https://jobs-backend-z4z9.onrender.com/resumes/";

const templates: Template[] = [
  { id: 1, name: 'Professional', image: '/templates/professional-elite-resume.jpg', link: `${backendBase}Professional.docx` },
  { id: 2, name: 'ATS Compatible Resume', image: '/templates/ats-compatible-resume.jpg', link: `${backendBase}ATS Compatible Resume.docx` },
  { id: 3, name: 'ATS Compliant Resume', image: '/templates/ats-compliant-resume.jpg', link: `${backendBase}ATS Compliant Resume.docx` },
  { id: 4, name: 'Modern', image: '/templates/easy-resume.jpg', link: `${backendBase}Modern.docx` },
  { id: 5, name: 'Elegant', image: '/templates/career-change-resume.jpg', link: `${backendBase}Elegant.docx` },
  { id: 6, name: 'Simple', image: '/templates/simple-resume.jpg', link: `${backendBase}Simple.docx` },
  { id: 7, name: 'Corporate', image: '/templates/mit-resume.jpg', link: `${backendBase}Corporate.docx` },
  { id: 8, name: 'Creative Pro', image: '/templates/best-resume.jpg', link: `${backendBase}Creative Pro.docx` },
  { id: 9, name: 'Modern Clean', image: '/templates/recent-college-graduate-resume.jpg', link: `${backendBase}Modern Clean.docx` },
  { id: 10, name: 'Professional Plus', image: '/templates/traditional-simple-resume.jpg', link: `${backendBase}Professional Plus.docx` },
  { id: 11, name: 'Designer', image: '/templates/two-page-resume.jpg', link: `${backendBase}Designer.docx` },
  { id: 12, name: 'Executive', image: '/templates/banking-resume.jpg', link: `${backendBase}Executive.docx` },
  { id: 13, name: 'Minimalist', image: '/templates/entry-level-resume.jpg', link: `${backendBase}Minimalist.docx` },
  { id: 14, name: 'Startup', image: '/templates/business-resume.jpg', link: `${backendBase}Startup.docx` },
  { id: 15, name: 'Classic', image: '/templates/classic-resume.jpg', link: `${backendBase}Classic Resume.docx` },
];

function Resume(): React.JSX.Element {
  // ✅ Function to trigger download
  const downloadResume = (fileUrl: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-center mb-10">
          Choose Your Resume Template
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {templates.map(template => (
            <div
              key={template.id}
              onClick={() => downloadResume(template.link, `${template.name}.docx`)}
              className="cursor-pointer rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 bg-white relative block"
            >
              <img
                src={template.image}
                alt={template.name}
                className="w-full object-cover"
              />
              <div className="p-4 text-center">
                <h2 className="text-xl font-semibold text-gray-700">{template.name}</h2>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold text-lg">
                Download Template
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Resume;
