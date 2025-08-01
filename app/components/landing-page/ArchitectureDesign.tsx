import React from 'react';
import ProjectCard from './ProjectCard';
import { type ArchitectureProject } from '../../../lib/actions';
import Link from 'next/link';

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
        <div className="px-6 md:px-12 lg:px-16 mb-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
              建筑设计
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              从概念到实现，我们为每个项目注入独特的设计理念和专业的技术实现
            </p>
          </div>

          {/* 建筑设计项目展示 */}
          <div className="grid grid-cols-12 gap-4 md:gap-6 mb-12">
            {architectureProjects.map((project, index) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className={`${project.className} group cursor-pointer`}
              >
                <div className="relative h-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="bg-black bg-opacity-50 rounded-lg p-3 backdrop-blur-sm">
                      <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                      <p className="text-sm opacity-90">{project.location}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* 查看更多建筑设计按钮 */}
          <div className="text-center mb-16">
            <Link
              href="/projects/architecture"
              className="inline-flex items-center px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300"
            >
              查看更多建筑设计项目
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* 室内设计标题 */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
              室内设计
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              精心设计每一个室内空间，创造舒适与美观并存的生活环境
            </p>
          </div>

          {/* 室内设计项目展示 */}
          <div className="grid grid-cols-12 gap-4 md:gap-6 mb-12">
            {interiorProjects.map((project, index) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className={`${project.className} group cursor-pointer`}
              >
                <div className="relative h-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="bg-black bg-opacity-50 rounded-lg p-3 backdrop-blur-sm">
                      <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                      <p className="text-sm opacity-90">{project.location}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* 查看更多室内设计按钮 */}
          <div className="text-center mb-16">
            <Link
              href="/projects/interior"
              className="inline-flex items-center px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300"
            >
              查看更多室内设计项目
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* 城市规划标题 */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
              城市规划
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              以前瞻性的视野规划城市发展，创造可持续的城市空间
            </p>
          </div>

          {/* 城市规划项目展示 */}
          <div className="grid grid-cols-12 gap-4 md:gap-6 mb-12">
            {planningProjects.map((project, index) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className={`${project.className} group cursor-pointer`}
              >
                <div className="relative h-full rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="bg-black bg-opacity-50 rounded-lg p-3 backdrop-blur-sm">
                      <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                      <p className="text-sm opacity-90">{project.location}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* 查看更多城市规划按钮 */}
          <div className="text-center mb-16">
            <Link
              href="/projects/planning"
              className="inline-flex items-center px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300"
            >
              查看更多城市规划项目
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
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