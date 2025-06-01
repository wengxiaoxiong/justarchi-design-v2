import React from 'react';
import Link from 'next/link';
import { 
  getAllArchitectureProjects,
  getAllInteriorProjects,
  getAllPlanningProjects
} from '../../lib/actions';

const ProjectsPage: React.FC = async () => {
  // 并行获取所有项目数据
  const [architectureProjects, interiorProjects, planningProjects] = await Promise.all([
    getAllArchitectureProjects(),
    getAllInteriorProjects(),
    getAllPlanningProjects()
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">所有项目</h1>
          <p className="text-lg text-gray-600">All Projects</p>
          <Link 
            href="/" 
            className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            返回首页
          </Link>
        </div>

        {/* 建筑设计项目 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">建筑设计</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {architectureProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600">{project.location}</p>
                  {project.year && (
                    <p className="text-sm text-gray-500 mt-2">年份: {project.year}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 室内设计项目 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">室内设计</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interiorProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600">{project.location}</p>
                  {project.year && (
                    <p className="text-sm text-gray-500 mt-2">年份: {project.year}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 城市规划项目 */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">城市规划</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {planningProjects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600">{project.location}</p>
                  {project.year && (
                    <p className="text-sm text-gray-500 mt-2">年份: {project.year}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProjectsPage; 