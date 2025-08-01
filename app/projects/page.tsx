import React from 'react';
import Link from 'next/link';
import { prisma } from '../../lib/db';
import { ProjectCategory } from '../../lib/types';

// 项目类型映射
const categoryMap: Record<ProjectCategory, string> = {
  [ProjectCategory.ARCHITECTURE]: '建筑设计',
  [ProjectCategory.INTERIOR]: '室内设计',
  [ProjectCategory.PLANNING]: '城市规划',
  [ProjectCategory.LANDSCAPE]: '景观设计',
  [ProjectCategory.URBAN_DESIGN]: '城市设计',
  [ProjectCategory.RESEARCH]: '研究项目',
};

// 类型到URL映射
const categoryUrlMap: Record<ProjectCategory, string> = {
  [ProjectCategory.ARCHITECTURE]: 'architecture',
  [ProjectCategory.INTERIOR]: 'interior',
  [ProjectCategory.PLANNING]: 'planning',
  [ProjectCategory.LANDSCAPE]: 'landscape',
  [ProjectCategory.URBAN_DESIGN]: 'urban-design',
  [ProjectCategory.RESEARCH]: 'research',
};

// 获取所有项目，按分类分组
async function getAllProjectsGrouped() {
  const projects = await prisma.project.findMany({
    where: {
      isPublished: true,
    },
    orderBy: [
      { isFeatured: 'desc' },
      { sortOrder: 'asc' },
      { createdAt: 'desc' }
    ],
  });

  // 按分类分组
  const grouped = projects.reduce((acc, project) => {
    if (!acc[project.category]) {
      acc[project.category] = [];
    }
    acc[project.category].push(project);
    return acc;
  }, {} as Record<ProjectCategory, typeof projects>);

  return grouped;
}

// 获取项目统计信息
async function getProjectStats() {
  const total = await prisma.project.count({
    where: { isPublished: true }
  });

  const byCategory = await prisma.project.groupBy({
    by: ['category'],
    where: { isPublished: true },
    _count: true,
  });

  const featured = await prisma.project.count({
    where: { 
      isPublished: true,
      isFeatured: true 
    }
  });

  return {
    total,
    featured,
    byCategory: byCategory.reduce((acc, item) => {
      acc[item.category] = item._count;
      return acc;
    }, {} as Record<ProjectCategory, number>)
  };
}

export default async function ProjectsPage() {
  const [projectsGrouped, stats] = await Promise.all([
    getAllProjectsGrouped(),
    getProjectStats()
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部导航 */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">首页</Link>
            <span>/</span>
            <span className="text-gray-900">项目</span>
          </nav>
        </div>
      </div>

      {/* 页面标题和统计 */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              我们的项目
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              探索JustArchi Design在建筑设计、室内设计、城市规划等领域的精彩作品，
              每个项目都体现了我们对设计的专业态度和创新追求。
            </p>
            
            {/* 统计信息 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">{stats.total}</div>
                <div className="text-sm text-gray-600 mt-1">总项目数</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-600">{stats.featured}</div>
                <div className="text-sm text-gray-600 mt-1">精选项目</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600">
                  {Object.keys(projectsGrouped).length}
                </div>
                <div className="text-sm text-gray-600 mt-1">设计领域</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-orange-600">
                  {new Date().getFullYear() - 2015}+
                </div>
                <div className="text-sm text-gray-600 mt-1">年经验</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 快速分类导航 */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(categoryMap).map(([category, name]) => {
              const count = stats.byCategory[category as ProjectCategory] || 0;
              if (count === 0) return null;
              
              return (
                <Link
                  key={category}
                  href={`/projects/${categoryUrlMap[category as ProjectCategory]}`}
                  className="inline-flex items-center px-4 py-2 rounded-full border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-700 hover:text-blue-700">
                    {name}
                  </span>
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                    {count}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* 项目分类展示 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {Object.entries(projectsGrouped).map(([category, projects]) => (
          <div key={category} className="mb-16">
            {/* 分类标题 */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {categoryMap[category as ProjectCategory]}
                </h2>
                <p className="text-gray-600">
                  {projects.length} 个项目
                </p>
              </div>
              <Link
                href={`/projects/${categoryUrlMap[category as ProjectCategory]}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                查看全部
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* 项目网格 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.slice(0, 6).map((project) => (
                <Link key={project.id} href={`/projects/detail/${project.id}`} className="group">
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    {/* 项目图片 */}
                    <div className="aspect-w-16 aspect-h-10 relative">
                      <img
                        src={project.coverImage}
                        alt={project.title}
                        className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {project.isFeatured && (
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            精选
                          </span>
                        </div>
                      )}
                    </div>

                    {/* 项目信息 */}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                        {project.title}
                      </h3>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {project.location}
                        {project.year && (
                          <>
                            <span className="mx-2">•</span>
                            <span>{project.year}年</span>
                          </>
                        )}
                      </div>

                      {project.description && (
                        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                          {project.description}
                        </p>
                      )}

                      {/* 查看详情按钮 */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-600 group-hover:text-blue-700">
                          查看详情
                        </span>
                        <svg className="w-4 h-4 text-blue-600 group-hover:text-blue-700 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* 如果项目数量超过6个，显示查看更多按钮 */}
            {projects.length > 6 && (
              <div className="text-center mt-8">
                <Link
                  href={`/projects/${categoryUrlMap[category as ProjectCategory]}`}
                  className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md text-base font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-colors"
                >
                  查看{categoryMap[category as ProjectCategory]}全部项目
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-700">
                    {projects.length}
                  </span>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 底部CTA */}
      <div className="bg-blue-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              有设计需求？
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              我们专注于建筑设计、室内设计、城市规划等领域，
              为您提供专业的设计服务和创新的解决方案。
            </p>
            <Link
              href="/#contact-us"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              联系我们
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 