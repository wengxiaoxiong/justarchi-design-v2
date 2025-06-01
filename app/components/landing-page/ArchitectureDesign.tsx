import React from 'react';
import ProjectCard from './ProjectCard';
import { type ArchitectureProject } from '../../../lib/actions';

interface ArchitectureDesignProps {
  architectureProjects: ArchitectureProject[];
  interiorProjects: ArchitectureProject[];
  planningProjects: ArchitectureProject[];
}

const ArchitectureDesign: React.FC<ArchitectureDesignProps> = ({
  architectureProjects,
  interiorProjects,
  planningProjects
}) => {
  return (
    <section id="architecture" className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        {/* 建築設計 */}
        <div className="mb-20">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-center text-black">建築設計</h2>
          <p className="text-center text-gray-600 mb-8 md:mb-12 lg:mb-16">Architecture Design</p>
          <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
            {architectureProjects.map((project) => (
              <ProjectCard
                key={project.id}
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
          </div>
        </div>

        {/* 室內設計 */}
        <div className="mb-20" id="interior">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-center text-black">室內設計</h2>
          <p className="text-center text-gray-600 mb-8 md:mb-12 lg:mb-16">Interior Design</p>
          <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
            {interiorProjects.map((project) => (
              <ProjectCard
                key={project.id}
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
          </div>
        </div>

        {/* 城市規劃 */}
        <div id="planning">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-center text-black">城市規劃</h2>
          <p className="text-center text-gray-600 mb-8 md:mb-12 lg:mb-16">Urban Planning</p>
          <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
            {planningProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                subtitle={project.location}
                image={project.image}
                className={project.className}
                gradientColors={{
                  top: 'bg-orange-500/10',
                  bottom: 'bg-red-500/10'
                }}
              />
            ))}
          </div>
        </div>

        <div className="col-span-12 mt-12 md:mt-16">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureDesign; 