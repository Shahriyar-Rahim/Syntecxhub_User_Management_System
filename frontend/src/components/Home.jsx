import React from 'react';

const Hero = () => {
  return (
    <div className="relative bg-white pt-16 pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Secure User</span>
              <span className="block text-blue-600">Management System</span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              The ultimate starter for your MERN stack applications. Pre-configured with JWT, 
              Bcrypt, and Express-Router to get your project moving in minutes.
            </p>
            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-3 text-white bg-blue-600 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 transform hover:-translate-y-1">
                  View Dashboard
                </button>
                <button className="px-8 py-3 text-blue-600 bg-blue-50 rounded-xl font-semibold hover:bg-blue-100 transition-all">
                  Documentation
                </button>
              </div>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-2xl lg:max-w-md overflow-hidden">
              <img
                className="w-full"
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
                alt="App Screenshot"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;