import React from 'react';
import ProjectCard from './ProjectCard';

interface ArchitectureProject {
  title: string;
  location: string;
  image: string;
  className: string;
}

const architectureProjects: ArchitectureProject[] = [
  {
    title: 'Vision International Center',
    location: 'Pudong, Shanghai',
    image: 'https://ai-public.mastergo.com/ai/img_re s/1f901132cd16c0ccd2730052c4eac87d.jpg',
    className: 'col-span-12 md:col-span-5 row-span-1 md:row-span-2 opacity-0 transition-opacity duration-800 ease-in-out'
  },
  {
    title: 'Jade Bay Art Museum',
    location: 'West Lake, Hangzhou',
    image: 'https://ai-public.mastergo.com/ai/img_res/bde3964509e62b92e25e030dd396efef.jpg',
    className: 'col-span-12 md:col-span-7 opacity-0 transition-opacity duration-800 ease-in-out'
  },
  {
    title: 'Cloud Convention Center',
    location: 'Nanshan, Shenzhen',
    image: 'https://ai-public.mastergo.com/ai/img_res/81a525b7ecfaf07ec2c5fc188be7a6b6.jpg',
    className: 'col-span-12 sm:col-span-6 md:col-span-4 opacity-0 transition-opacity duration-800 ease-in-out'
  },
  {
    title: 'Future Tech Plaza',
    location: 'Tianhe, Guangzhou',
    image: 'https://ai-public.mastergo.com/ai/img_res/f2355ba9f80dd8be3b0f72a15fd0751f.jpg',
    className: 'col-span-12 sm:col-span-6 md:col-span-3 opacity-0 transition-opacity duration-800 ease-in-out'
  }
];

const ArchitectureDesign: React.FC = () => {
  return (
    <section id="architecture" className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 lg:mb-16 text-center">Architecture Design</h2>
        <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
          {architectureProjects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              subtitle={project.location}
              image={project.image}
              className={project.className}
              gradientColors={{
                top: 'bg-blue-500/10',
                bottom: 'bg-purple-500/10'
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

export default ArchitectureDesign; 