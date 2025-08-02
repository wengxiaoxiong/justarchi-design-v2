import React from 'react';
import CategorySection from './CategorySection';
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
        <CategorySection
          title="建築設計"
          description="Architecture Design"
          projects={architectureProjects}
          categoryHref="/projects/architecture"
          buttonText="查看更多建筑设计项目"
        />

        <div id="interior">
          <CategorySection
            title="室內設計"
            description="Interior Design"
            projects={interiorProjects}
            categoryHref="/projects/interior"
            buttonText="查看更多室内设计项目"
          />
        </div>

        <div id="planning">
          <CategorySection
            title="城市規劃"
            description="Urban Planning"
            projects={planningProjects}
            categoryHref="/projects/planning"
            buttonText="查看更多城市规划项目"
          />
        </div>

        <div className="col-span-12 mt-12 md:mt-16">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureDesign; 