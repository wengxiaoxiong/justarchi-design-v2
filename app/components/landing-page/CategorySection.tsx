import React from 'react';  
import Link from 'next/link';
import { type ArchitectureProject } from '../../../lib/actions';

interface CategorySectionProps {
  title: string;
  description: string;
  projects: ArchitectureProject[];
  categoryHref: string;
  buttonText: string;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  description,
  projects,
  categoryHref,
  buttonText
}) => {
  return (
    <div className="mb-20">
      <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-center text-black">{title}</h2>
      <p className="text-center text-gray-600 mb-8 md:mb-12 lg:mb-16">{description}</p>
      
      <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
        {projects.map((project, index) => (
          <Link
            key={project.id}
            href={`/projects/detail/${project.id}`}
            className={`group relative overflow-hidden rounded-lg ${project.className} opacity-0 transition-opacity duration-800 ease-in-out opacity-100 cursor-pointer`}
            style={{ transition: 'opacity 0.8s ease-in-out' }}
          >
            <div className="absolute -left-20 -top-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative w-full h-full min-h-[240px] sm:min-h-[280px] md:min-h-[320px]">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-6 md:p-8 opacity-100" style={{ transition: 'opacity 0.8s ease-in-out' }}>
                <div className="relative">
                  <div className="absolute -left-2 sm:-left-4 top-1/2 w-1 sm:w-2 h-6 sm:h-8 bg-white/80 transform -translate-y-1/2"></div>
                  <h3 className="font-playfair text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">{project.title}</h3>
                  <p className="text-sm sm:text-base text-gray-300">{project.location}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* View More Button */}
      <div className="text-center mt-8 md:mt-12">
        <Link
          href={categoryHref}
          className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-base font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 group"
        >
          {buttonText}
          <svg 
            className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default CategorySection;