import React from 'react';
import { Link } from 'react-router';

const LandingPage = () => {
  return (
    <div className="flex-grow flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Text Content */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Secure User <br />
            <span className="text-blue-600">Management <br/> System</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-lg">
            The ultimate starter for your MERN stack applications. Pre-configured with JWT, Bcrypt, and Express-Router to get your project moving in minutes.
          </p>
          <div className="flex gap-4 pt-4">
            <Link 
              to="/dashboard"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-lg shadow-blue-200"
            >
              View Dashboard
            </Link>
            <a 
              href="/docs" 
              className="bg-blue-50 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-100 transition"
            >
              Documentation
            </a>
          </div>
        </div>

        {/* Right Side: Image/Graphics */}
        <div className="w-full flex justify-center">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/20 transform transition hover:-translate-y-2 duration-300">
            <img 
              src="image_6fbe0c.jpg" 
              alt="System Dashboard Setup" 
              className="w-full h-auto object-cover max-w-md rounded-2xl"
              onError={(e) => {
                // Fallback if image isn't in public folder yet
                e.target.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80";
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;