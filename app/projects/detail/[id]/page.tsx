import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { prisma } from '../../../../lib/db';
import { ProjectCategory, ProjectStatus } from '../../../../lib/types';

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

// 获取项目详情
async function getProjectById(id: string) {
  const project = await prisma.project.findFirst({
    where: {
      id,
      isPublished: true,
    },
  });

  return project;
}

// 获取相关项目
async function getRelatedProjects(currentProjectId: string, category: ProjectCategory, limit = 3) {
  const projects = await prisma.project.findMany({
    where: {
      id: { not: currentProjectId },
      category,
      isPublished: true,
    },
    orderBy: [
      { isFeatured: 'desc' },
      { createdAt: 'desc' }
    ],
    take: limit,
  });

  return projects;
}

// 项目状态映射
const statusMap: Record<ProjectStatus, string> = {
  [ProjectStatus.COMPLETED]: '已完成',
  [ProjectStatus.IN_PROGRESS]: '进行中',
  [ProjectStatus.CONCEPT]: '概念阶段',
  [ProjectStatus.AWARDED]: '获奖项目',
};

// 项目类型映射
const categoryMap: Record<ProjectCategory, string> = {
  [ProjectCategory.ARCHITECTURE]: '建筑设计',
  [ProjectCategory.INTERIOR]: '室内设计',
  [ProjectCategory.PLANNING]: '城市规划',
  [ProjectCategory.LANDSCAPE]: '景观设计',
  [ProjectCategory.URBAN_DESIGN]: '城市设计',
  [ProjectCategory.RESEARCH]: '研究项目',
};

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  const relatedProjects = await getRelatedProjects(project.id, project.category);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 导航面包屑 */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">首页</Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-gray-900">项目</Link>
            <span>/</span>
            <span className="text-gray-900">{project.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 主要内容区域 */}
          <div className="lg:col-span-2">
            {/* 项目标题和基本信息 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                />
              </div>
              
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {categoryMap[project.category]}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {statusMap[project.status]}
                  </span>
                  {project.isFeatured && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      精选项目
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {project.title}
                </h1>

                <div className="flex flex-wrap items-center text-sm text-gray-600 mb-6 gap-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {project.location}
                  </div>
                  
                  {project.year && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {project.year}年
                    </div>
                  )}

                  {project.area && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      {project.area}
                    </div>
                  )}
                </div>

                {/* 项目描述 */}
                {project.description && (
                  <div className="prose prose-gray max-w-none mb-8">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeSanitize]}
                      // className="text-gray-700 leading-relaxed
                    >
                      {project.description}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>

            {/* 项目详细信息 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* 项目简介 */}
              {project.brief && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">项目简介</h3>
                  <div className="prose prose-gray prose-sm max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeSanitize]}
                    >
                      {project.brief}
                    </ReactMarkdown>
                  </div>
                </div>
              )}

              {/* 设计理念 */}
              {project.concept && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">设计理念</h3>
                  <div className="prose prose-gray prose-sm max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeSanitize]}
                    >
                      {project.concept}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </div>

            {/* 项目特色 */}
            {project.features.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">项目特色</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 项目图片集 */}
            {project.images.length > 1 && (
              <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">项目图片</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.images.slice(1).map((image, index) => (
                    <div key={index} className="aspect-w-4 aspect-h-3">
                      <img
                        src={image}
                        alt={`${project.title} - 图片 ${index + 2}`}
                        className="w-full h-48 object-cover rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 侧边栏 */}
          <div className="space-y-6">
            {/* 项目信息 */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">项目信息</h3>
              <dl className="space-y-3">
                {project.client && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">委托方</dt>
                    <dd className="text-sm text-gray-900">{project.client}</dd>
                  </div>
                )}
                
                {project.architect && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">建筑师</dt>
                    <dd className="text-sm text-gray-900">{project.architect}</dd>
                  </div>
                )}

                {project.city && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">城市</dt>
                    <dd className="text-sm text-gray-900">{project.city}</dd>
                  </div>
                )}

                <div>
                  <dt className="text-sm font-medium text-gray-500">项目状态</dt>
                  <dd className="text-sm text-gray-900">{statusMap[project.status]}</dd>
                </div>

                <div>
                  <dt className="text-sm font-medium text-gray-500">最后更新</dt>
                  <dd className="text-sm text-gray-900">
                    {new Date(project.updatedAt).toLocaleDateString('zh-CN')}
                  </dd>
                </div>
              </dl>
            </div>

            {/* 项目标签 */}
            {project.tags.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">项目标签</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 相关项目 */}
            {relatedProjects.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">相关项目</h3>
                <div className="space-y-4">
                  {relatedProjects.map((relatedProject) => (
                    <Link
                      key={relatedProject.id}
                      href={`/projects/detail/${relatedProject.id}`}
                      className="block group"
                    >
                      <div className="flex space-x-3">
                        <div className="flex-shrink-0">
                          <img
                            src={relatedProject.coverImage}
                            alt={relatedProject.title}
                            className="w-16 h-16 object-cover rounded-lg group-hover:opacity-90 transition-opacity"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {relatedProject.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {categoryMap[relatedProject.category]}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}