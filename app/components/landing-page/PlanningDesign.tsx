import React from 'react';
import ProjectCard from './ProjectCard';

interface PlanningProject {
  title: string;
  location: string;
  image: string;
  className: string;
}

const planningProjects: PlanningProject[] = [
  {
    title: 'Riverside District Redevelopment',
    location: 'Jiangsu, Suzhou',
    image: 'https://ai-public.mastergo.com/ai/img_res/86efb7aeeb58a2ad6ac6b4c4a97f022a.jpg',
    className: 'col-span-12 md:col-span-8 opacity-0 transition-opacity duration-800 ease-in-out'
  },
  {
    title: 'Eco Technology Park',
    location: 'Zhejiang, Ningbo',
    image: 'https://ai-public.mastergo.com/ai/img_res/2e3f2b5f3b0e8d07c9d5b6df4dc80abb.jpg',
    className: 'col-span-12 md:col-span-4 opacity-0 transition-opacity duration-800 ease-in-out'
  },
  {
    title: 'City Center Revitalization',
    location: 'Sichuan, Chengdu',
    image: 'https://ai-public.mastergo.com/ai/img_res/3c86bcb1da3fef37b0e8f8c74d2c78ee.jpg',
    className: 'col-span-12 sm:col-span-6 md:col-span-4 opacity-0 transition-opacity duration-800 ease-in-out'
  },
  {
    title: 'Smart Community Planning',
    location: 'Hebei, Shijiazhuang',
    image: 'https://ai-public.mastergo.com/ai/img_res/3ebef7ee2e6764b21aca37a4f73d6bce.jpg',
    className: 'col-span-12 sm:col-span-6 md:col-span-8 opacity-0 transition-opacity duration-800 ease-in-out'
  }
];

const PlanningDesign: React.FC = () => {
  return (
    <section id="planning" className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 lg:mb-16 text-center">Planning Design</h2>
        <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
          {planningProjects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              subtitle={project.location}
              image={project.image}
              className={project.className}
              gradientColors={{
                top: 'bg-green-500/10',
                bottom: 'bg-blue-500/10'
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

export default PlanningDesign; 