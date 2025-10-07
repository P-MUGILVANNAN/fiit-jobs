import React from 'react';

interface Template {
  id: number;
  name: string;
  image: string;
  link: string; // New field for external link
}


const templates: Template[] = [
  { id: 1, name: 'Professional', image: '/templates/professional.png', link: 'https://docs.google.com/template/professional' },
  { id: 2, name: 'Creative', image: '/templates/creative.png', link: 'https://docs.google.com/template/creative' },
  { id: 3, name: 'Minimal', image: '/templates/minimal.png', link: 'https://docs.google.com/template/minimal' },
  { id: 4, name: 'Modern', image: '/templates/modern.png', link: 'https://docs.google.com/template/modern' },
  { id: 5, name: 'Elegant', image: '/templates/elegant.png', link: 'https://docs.google.com/template/elegant' },
  { id: 6, name: 'Simple', image: '/templates/simple.png', link: 'https://docs.google.com/template/simple' },
  { id: 7, name: 'Corporate', image: '/templates/corporate.png', link: 'https://docs.google.com/template/corporate' },
  { id: 8, name: 'Creative Pro', image: '/templates/creative-pro.png', link: 'https://docs.google.com/template/creative-pro' },
  { id: 9, name: 'Modern Clean', image: '/templates/modern-clean.png', link: 'https://docs.google.com/template/modern-clean' },
  { id: 10, name: 'Professional Plus', image: '/templates/professional-plus.png', link: 'https://docs.google.com/template/professional-plus' },
  { id: 11, name: 'Designer', image: '/templates/designer.png', link: 'https://docs.google.com/template/designer' },
  { id: 12, name: 'Executive', image: '/templates/executive.png', link: 'https://docs.google.com/template/executive' },
  { id: 13, name: 'Minimalist', image: '/templates/minimalist.png', link: 'https://docs.google.com/template/minimalist' },
  { id: 14, name: 'Startup', image: '/templates/startup.png', link: 'https://docs.google.com/template/startup' },
  { id: 15, name: 'Classic', image: '/templates/classic.png', link: 'https://docs.google.com/template/classic' },
];

function Resume(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-center mb-10">
          Choose Your Resume Template
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {templates.map(template => (
            <a
              key={template.id}
              href={template.link}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 bg-white relative block"
            >
              <img
                src={template.image}
                alt={template.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 text-center">
                <h2 className="text-xl font-semibold text-gray-700">{template.name}</h2>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold text-lg">
                Open Template
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Resume;
