import React from 'react';
import ProjectCard from './ProjectCard';

interface InteriorProject {
  title: string;
  description: string;
  image: string;
  className: string;
}

const interiorProjects: InteriorProject[] = [
  {
    title: 'Urban Loft',
    description: 'Modern Industrial Style',
    image: 'https://ai-public.mastergo.com/ai/img_res/b19f66ee5dd3d1f1fd1fbf15f95a3fd3.jpg',
    className: 'col-span-12 md:col-span-6 opacity-0 transition-opacity duration-800 ease-in-out'
  },
  {
    title: 'Luxury Residence',
    description: 'Contemporary Minimalist',
    image: 'https://ai-public.mastergo.com/ai/img_res/cef9e8e96ccbf03b3a67d4b0aab44a2b.jpg',
    className: 'col-span-12 md:col-span-6 opacity-0 transition-opacity duration-800 ease-in-out'
  },
  {
    title: 'Corporate Headquarters',
    description: 'Professional Workspace',
    image: 'https://ai-public.mastergo.com/ai/img_res/626252a1fca3a61dcfc0e4d6fca3cb16.jpg',
    className: 'col-span-12 sm:col-span-6 lg:col-span-4 opacity-0 transition-opacity duration-800 ease-in-out'
  },
  {
    title: 'Seaside Villa',
    description: 'Mediterranean Inspired',
    image: 'https://ai-public.mastergo.com/ai/img_res/c8b0e5aaa1d5df3f44e8f2cdc93e1c7e.jpg',
    className: 'col-span-12 sm:col-span-6 lg:col-span-4 opacity-0 transition-opacity duration-800 ease-in-out'
  },
  {
    title: 'Boutique Hotel',
    description: 'Elegant Hospitality Design',
    image: 'https://ai-public.mastergo.com/ai/img_res/2e92c6f3cab55cadf4a6a6e889a9e51e.jpg',
    className: 'col-span-12 lg:col-span-4 opacity-0 transition-opacity duration-800 ease-in-out'
  }
];

const InteriorDesign: React.FC = () => {
  return (
    <section id="interior" className="py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 lg:mb-16 text-center">Interior Design</h2>
        <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
          {interiorProjects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              subtitle={project.description}
              image={project.image}
              className={project.className}
              gradientColors={{
                top: 'bg-yellow-500/10',
                bottom: 'bg-pink-500/10'
              }}
            />
          ))}
          <div className="col-span-12 mt-6 md:mt-8">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteriorDesign; 