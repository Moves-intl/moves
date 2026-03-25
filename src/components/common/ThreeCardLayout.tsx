import React from 'react';

export default function ThreeCardLayout() {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Year 12 Card */}
      <div className="bg-gray-50 rounded-lg p-6 flex-1 text-center">
        <div className="w-32 h-32 bg-purple-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
          <div className="text-purple-600 text-sm">Person with chat bubbles</div>
        </div>
        
        <h3 className="text-sm font-semibold text-gray-600 mb-3 tracking-wide">YEAR 12</h3>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-6">
          Start here if you're a current or recent Year 12 student looking to apply to a college or university with your recent ATAR.
        </p>
        
        <button className="text-purple-600 text-sm font-medium hover:text-purple-800 transition-colors">
          Apply Now →
        </button>
      </div>

      {/* Adult Study Card */}
      <div className="bg-gray-50 rounded-lg p-6 flex-1 text-center">
        <div className="w-32 h-32 bg-green-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
          <div className="text-green-600 text-sm">Person with plants</div>
        </div>
        
        <h3 className="text-sm font-semibold text-gray-600 mb-3 tracking-wide">ADULT STUDY</h3>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-6">
          Looking to advance your career, build on your previous studies, or completely change your career path? Begin here.
        </p>
        
        <button className="text-purple-600 text-sm font-medium hover:text-purple-800 transition-colors">
          Apply Now →
        </button>
      </div>

      {/* ATAR Card */}
      <div className="bg-gray-50 rounded-lg p-6 flex-1 text-center">
        <div className="w-32 h-32 bg-red-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
          <div className="text-red-600 text-sm">Person with clock</div>
        </div>
        
        <h3 className="text-sm font-semibold text-red-600 mb-3 tracking-wide">ATAR</h3>
        
        <p className="text-gray-700 text-sm leading-relaxed mb-6">
          Learn about ATAR, including result notifications and important registration information for the ATAR portal.
        </p>
        
        <button className="text-purple-600 text-sm font-medium hover:text-purple-800 transition-colors">
          Apply Now →
        </button>
      </div>
    </div>
  );
}