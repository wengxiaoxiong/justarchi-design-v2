import React from 'react';
import Link from 'next/link';
import { prisma } from '../../lib/db';
import { ProjectCategory, ProjectStatus } from '../../lib/types';

// 项目类型映射
const categoryMap: Record<ProjectCategory, string> = {
  [ProjectCategory.ARCHITECTURE]: '建筑设计',
  [ProjectCategory.INTERIOR]: '室内设计',
  [ProjectCategory.PLANNING]: '城市规划',
  [ProjectCategory.LANDSCAPE]: '景观设计',
  [ProjectCategory.URBAN_DESIGN]: '城市设计',
  [ProjectCategory.RESEARCH]: '研究项目',
};

// 项目状态映射
const statusMap: Record<ProjectStatus, string> = {
  [ProjectStatus.COMPLETED]: '已完成',
  [ProjectStatus.IN_PROGRESS]: '进行中',
  [ProjectStatus.CONCEPT]: '概念阶段',
  [ProjectStatus.AWARDED]: '获奖项目',
};

// 获取所有项目（包括未发布的）
async function getAllProjects() {
  const projects = await prisma.project.findMany({
    orderBy: [
      { isFeatured: 'desc' },
      { sortOrder: 'asc' },
      { updatedAt: 'desc' }
    ],
  });

  return projects;
}

// 获取统计信息
async function getStats() {
  const totalProjects = await prisma.project.count();
  const publishedProjects = await prisma.project.count({
    where: { isPublished: true }
  });
  const featuredProjects = await prisma.project.count({
    where: { isFeatured: true }
  });
  const draftProjects = await prisma.project.count({
    where: { isPublished: false }
  });

  return {
    total: totalProjects,
    published: publishedProjects,
    featured: featuredProjects,
    draft: draftProjects,
  };
}

export default async function AdminPage() {
  const [projects, stats] = await Promise.all([
    getAllProjects(),
    getStats()
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">项目管理后台</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/projects/new"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                新建项目
              </Link>
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                返回网站
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">总项目数</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.total}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">已发布</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.published}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">精选项目</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.featured}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gray-500 rounded-md flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">草稿</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.draft}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 项目列表 */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">所有项目</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">管理您的项目内容</p>
              </div>
            </div>
          </div>

          <ul className="divide-y divide-gray-200">
            {projects.map((project) => (
              <li key={project.id}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-16 w-24">
                        <img
                          className="h-16 w-24 object-cover rounded-md"
                          src={project.coverImage}
                          alt={project.title}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {project.title}
                          </p>
                          <div className="ml-2 flex-shrink-0 flex">
                            {project.isFeatured && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                精选
                              </span>
                            )}
                            <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              project.isPublished
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {project.isPublished ? '已发布' : '草稿'}
                            </span>
                          </div>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-gray-600">
                            {categoryMap[project.category]} • {project.location}
                            {project.year && ` • ${project.year}年`}
                          </p>
                        </div>
                        <div className="mt-1">
                          <p className="text-xs text-gray-500">
                            状态: {statusMap[project.status]} • 
                            更新于: {new Date(project.updatedAt).toLocaleDateString('zh-CN')}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/projects/${project.id}`}
                        target="_blank"
                        className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                      >
                        预览
                      </Link>
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                      >
                        编辑
                      </Link>
                      <button
                        type="button"
                        className="text-red-600 hover:text-red-900 text-sm font-medium"
                        onClick={() => {
                          if (confirm('确定要删除这个项目吗？此操作不可恢复。')) {
                            // TODO: 实现删除功能
                            alert('删除功能待实现');
                          }
                        }}
                      >
                        删除
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {projects.length === 0 && (
            <div className="px-4 py-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">暂无项目</h3>
              <p className="mt-1 text-sm text-gray-500">开始创建您的第一个项目。</p>
              <div className="mt-6">
                <Link
                  href="/admin/projects/new"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  新建项目
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}