'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProjectCategory, Project } from '../../lib/types';
import ProjectNavigation from '../components/landing-page/ProjectNavigation';

interface ProjectsPageClientProps {
  projectsGrouped: Partial<Record<ProjectCategory, Project[]>>;
  stats: {
    total: number;
    featured: number;
    byCategory: Partial<Record<ProjectCategory, number>>;
  };
  categoryMap: Partial<Record<ProjectCategory, string>>;
  categoryUrlMap: Partial<Record<ProjectCategory, string>>;
}

export default function ProjectsPageClient({ 
  projectsGrouped, 
  stats,
  categoryMap,
  categoryUrlMap
}: ProjectsPageClientProps) {
  return (
    <div className="min-h-screen bg-black">
      {/* 项目导航栏 */}
      <ProjectNavigation />
      
      {/* 内容区域 - 添加顶部间距 */}
      <div className="pt-20">
        {/* 头部导航 */}
        <div className="bg-gray-900 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-white">首頁</Link>
              <span>/</span>
              <span className="text-white">項目</span>
            </nav>
          </div>
        </div>

      {/* 页面标题和统计 */}
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              我們的項目
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
              探索JustArchi Design在建築設計、室內設計、城市規劃等領域的精彩作品，
              每個項目都體現了我們對設計的專業態度和創新追求。
            </p>
            
            {/* 统计信息 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-400">{stats.total}</div>
                <div className="text-sm text-gray-400 mt-1">總項目數</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-400">{stats.featured}</div>
                <div className="text-sm text-gray-400 mt-1">精選項目</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-400">
                  {Object.keys(projectsGrouped).length}
                </div>
                <div className="text-sm text-gray-400 mt-1">設計領域</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-orange-400">
                  {new Date().getFullYear() - 2015}+
                </div>
                <div className="text-sm text-gray-400 mt-1">年經驗</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 快速分类导航 */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(categoryMap).map(([category, name]) => {
              const count = stats.byCategory[category as ProjectCategory] || 0;
              if (count === 0) return null;
              
              return (
                <Link
                  key={category}
                  href={`/projects/${categoryUrlMap[category as ProjectCategory]}`}
                  className="inline-flex items-center px-4 py-2 rounded-full border border-gray-600 hover:border-blue-400 hover:bg-gray-700 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-300 hover:text-blue-400">
                    {name}
                  </span>
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-medium rounded-full bg-gray-700 text-gray-300">
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
        {Object.entries(projectsGrouped).map(([category, projects]: [string, Project[]]) => (
          <div key={category} className="mb-16">
            {/* 分类标题 */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {categoryMap[category as ProjectCategory]}
                </h2>
                <p className="text-gray-400">
                  {projects.length} 個項目
                </p>
              </div>
              <Link
                href={`/projects/${categoryUrlMap[category as ProjectCategory]}`}
                className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
              >
                查看全部
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* 项目网格 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.slice(0, 6).map((project: Project) => (
                <Link key={project.id} href={`/projects/detail/${project.id}`} className="group">
                  <div className="bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-xl hover:shadow-gray-900/50 transition-shadow duration-300">
                    {/* 项目图片 */}
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={project.coverImage}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {project.isFeatured && (
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            精選
                          </span>
                        </div>
                      )}
                    </div>

                    {/* 项目信息 */}
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
                        {project.title}
                      </h3>
                      
                      <div className="flex items-center text-sm text-gray-400 mb-3">
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
                        <p className="text-sm text-gray-300 line-clamp-2 mb-4">
                          {project.description}
                        </p>
                      )}

                      {/* 查看详情按钮 */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-400 group-hover:text-blue-300">
                          查看詳情
                        </span>
                        <svg className="w-4 h-4 text-blue-400 group-hover:text-blue-300 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className="inline-flex items-center px-6 py-3 border border-gray-600 rounded-md text-base font-medium text-gray-300 bg-gray-800 hover:bg-gray-700 hover:border-gray-500 transition-colors"
                >
                  查看{categoryMap[category as ProjectCategory]}全部項目
                  <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-sm font-medium rounded-full bg-blue-600 text-blue-100">
                    {projects.length}
                  </span>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 底部CTA */}
      <div className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              有設計需求？
            </h3>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              我們專注於建築設計、室內設計、城市規劃等領域，
              為您提供專業的設計服務和創新的解決方案。
            </p>
            <Link
              href="/#contact-us"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              聯繫我們
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}