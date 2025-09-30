import React from "react";
import { useParams, Link } from "react-router-dom";

// Dummy blog data (can be replaced with API later)
const blogPosts: Record<
  string,
  {
    title: string;
    author: string;
    date: string;
    content: string;
    image: string;
  }
> = {
  post1: {
    title: "The Future of AI in IT Recruitment",
    author: "Expert Recruiter",
    date: "July 15, 2024",
    image: "/image1.jpeg",
    content: `
      Artificial Intelligence (AI) is reshaping IT recruitment. From AI-powered 
      resume screening to predictive analytics for candidate success, companies 
      are adopting smart tools to save time and improve hiring quality.
      
      Recruiters now rely on chatbots for initial candidate engagement, and 
      machine learning algorithms help shortlist profiles that best match the 
      role requirements. As a job seeker, it's important to tailor your resume 
      with relevant keywords and highlight your adaptability to AI-driven 
      workplace changes.
    `,
  },
  post2: {
    title: "5 Non-Technical Skills Every Developer Needs",
    author: "Career Coach",
    date: "July 10, 2024",
    image: "/image2.jpg",
    content: `
      While coding is essential, employers value developers who can collaborate 
      and communicate effectively. Here are five non-technical skills that can 
      give you an edge:
      
      1. Communication – Explain technical concepts in simple terms.
      2. Teamwork – Work across departments and support colleagues.
      3. Problem-Solving – Tackle challenges with creativity and logic.
      4. Adaptability – Keep pace with rapidly changing technologies.
      5. Time Management – Deliver quality work within deadlines.
      
      Balancing technical expertise with these soft skills makes you stand out.
    `,
  },
  post3: {
    title: "Switching Careers to Cloud: A Beginner's Guide",
    author: "Industry Analyst",
    date: "July 01, 2024",
    image: "/image3.png",
    content: `
      Cloud computing is one of the fastest-growing IT fields. If you're 
      considering a career switch, here’s how you can get started:
      
      • Learn the basics of cloud platforms (AWS, Azure, GCP).  
      • Earn entry-level certifications (AWS Cloud Practitioner, Azure Fundamentals).  
      • Build hands-on projects and showcase them in your portfolio.  
      • Explore internships or junior roles in DevOps or Cloud Support.  
      
      With demand for cloud professionals skyrocketing, transitioning into 
      this field can be highly rewarding.
    `,
  },
};

function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = id ? blogPosts[id] : undefined;

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-6">
          The article you are looking for does not exist.
        </p>
        <Link
          to="/blog-archive"
          className="inline-block bg-primary-600 text-white px-6 py-2 rounded-full hover:bg-primary-700 transition"
        >
          Back to Articles
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-74 object-cover rounded-lg shadow-md mb-6"
      />
      <h1 className="text-4xl font-bold text-primary-600 mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        By {post.author} | {post.date}
      </p>
      <div className="prose prose-lg text-gray-700 whitespace-pre-line leading-relaxed">
        {post.content}
      </div>

      <div className="mt-10">
        <Link
          to="/blog"
          className="inline-block border border-primary-600 text-primary-600 px-6 py-2 rounded-full hover:bg-primary-50 transition"
        >
          ← Back to All Articles
        </Link>
      </div>
    </div>
  );
}

export default BlogPost;
