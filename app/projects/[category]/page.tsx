import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/db';
import { ProjectCategory } from '../../../lib/types';

interface ProjectCategoryPageProps {
  params: Promise<{ category: string }>;
}

// 类型映射
const categoryMap: Record<string, { name: string; enum: ProjectCategory }> = {
  'architecture': { name: '建筑设计', enum: ProjectCategory.ARCHITECTURE },
  'interior': { name: '室内设计', enum: ProjectCategory.INTERIOR },
  'planning': { name: '城市规划', enum: ProjectCategory.PLANNING },
  'landscape': { name: '景观设计', enum: ProjectCategory.LANDSCAPE },
  'urban-design': { name: '城市设计', enum: ProjectCategory.URBAN_DESIGN },
  'research': { name: '研究项目', enum: ProjectCategory.RESEARCH },
};

// 获取分类项目
async function getProjectsByCategory(category: ProjectCategory) {
  const projects = await prisma.project.findMany({
    where: {
      category,
      isPublished: true,
    },
    orderBy: [
      { isFeatured: 'desc' },
      { sortOrder: 'asc' },
      { createdAt: 'desc' }
    ],
  });

  return projects;
}

export default async function ProjectCategoryPage({ params }: ProjectCategoryPageProps) {
  const { category } = await params;
  
  // 验证分类是否存在
  if (!categoryMap[category]) {
    notFound();
  }

  const categoryInfo = categoryMap[category];
  const projects = await getProjectsByCategory(categoryInfo.enum);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部导航 */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">首页</Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-gray-900">项目</Link>
            <span>/</span>
            <span className="text-gray-900">{categoryInfo.name}</span>
          </nav>
        </div>
      </div>

      {/* 页面标题 */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {categoryInfo.name}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              探索我们在{categoryInfo.name}领域的精彩项目，每个作品都承载着独特的设计理念和创新思维。
            </p>
            <div className="mt-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                共 {projects.length} 个项目
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 项目网格 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">暂无项目</h3>
            <p className="mt-1 text-sm text-gray-500">该分类下还没有发布的项目。</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
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
                      <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                        {project.description}
                      </p>
                    )}

                    {/* 项目标签 */}
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
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
        )}
      </div>

      {/* 其他分类导航 */}
      <div className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">探索其他分类</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(categoryMap).map(([key, info]) => (
              <Link
                key={key}
                href={`/projects/${key}`}
                className={`text-center p-4 rounded-lg border-2 transition-colors ${
                  key === category
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900'
                }`}
              >
                <div className="text-sm font-medium">{info.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}