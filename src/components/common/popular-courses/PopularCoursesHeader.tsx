
import React from 'react';
import { TrendingUp } from 'lucide-react';
import PopularCoursesAction from './PopularCoursesAction';
import { useNavigate } from 'react-router-dom';

const PopularCoursesHeader = () => {
    const navigate = useNavigate();
  
    const handleViewAllCourses = () => {
    navigate('/courses');
  };
  return (
    <div className="text-start mb-6">
      <div className="inline-flex items-start w-fit leading-tight bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-3">
        <TrendingUp className="w-4 h-4 mr-2" />
        Popular Courses
      </div>
      
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-3">
        Explore Our Top-Rated Programs
      </h2>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl text-start">
          Discover our most sought-after courses that are shaping the future of education
        </p>
        <PopularCoursesAction onViewAllCourses={handleViewAllCourses} />
      </div>
    </div>
  );
};

export default PopularCoursesHeader;



