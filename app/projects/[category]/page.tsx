'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/db';
import { ProjectCategory, Project } from '../../../lib/types';
import ProjectNavigation from '../../components/landing-page/ProjectNavigation';
import useScrollAnimation from '../../hooks/useScrollAnimation';

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

// 创建客户端组件来处理 hooks
function ProjectCategoryPageClient({ 
  category, 
  categoryInfo, 
  projects, 
  categoryMap 
}: { 
  category: string; 
  categoryInfo: { name: string; enum: ProjectCategory }; 
  projects: Project[]; 
  categoryMap: Record<string, { name: string; enum: ProjectCategory }>;
}) {
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 导航栏 */}
      <ProjectNavigation currentCategory={category} />

      {/* 页面标题区域 */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-16">
          <div className="text-center fade-in-up">
            <div className="mb-6">
              <Link 
                href="/" 
                className="inline-flex items-center text-white/60 hover:text-white transition-all duration-300 mb-8 group"
              >
                <svg 
                  className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-light tracking-wide">Back to Home</span>
              </Link>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-light leading-none mb-8 tracking-tight">
              {categoryInfo.name}
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed mb-8">
              探索我們在{categoryInfo.name}領域的精彩項目，每個作品都承載著獨特的設計理念和創新思維。
            </p>
            
            <div className="inline-flex items-center px-6 py-3 border border-white/20 rounded-full text-white/60 font-light tracking-wide">
              共 {projects.length} 個項目
            </div>
          </div>
        </div>
      </section>

      {/* 项目网格 */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {projects.length === 0 ? (
            <div className="text-center py-24 fade-in-up">
              <div className="w-16 h-16 mx-auto mb-6 opacity-30">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-playfair font-light text-white/80 mb-2">暫無項目</h3>
              <p className="text-white/50 font-light">該分類下還沒有發布的項目。</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project: Project, index: number) => (
                <Link 
                  key={project.id} 
                  href={`/projects/detail/${project.id}`} 
                  className="group block opacity-0 fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden mb-6">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      width={400}
                      height={300}
                      className="w-full h-64 md:h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {project.isFeatured && (
                      <div className="absolute top-4 left-4">
                        <span className="text-xs tracking-wider text-white/80 border border-white/30 px-3 py-1 rounded-full backdrop-blur-sm">
                          FEATURED
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-playfair text-xl font-light group-hover:text-white/70 transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    
                    <div className="flex items-center text-sm text-white/50 font-light gap-4">
                      <div className="flex items-center">
                        <span className="mr-2 opacity-60">📍</span>
                        {project.location}
                      </div>
                      {project.year && (
                        <div className="flex items-center">
                          <span className="mr-2 opacity-60">📅</span>
                          {project.year}
                        </div>
                      )}
                    </div>

                    {project.description && (
                      <p className="text-sm text-white/60 font-light line-clamp-3 leading-relaxed">
                        {project.description}
                      </p>
                    )}

                    <div className="flex items-center text-sm text-white/40 group-hover:text-white/60 transition-colors pt-2">
                      <span className="font-light">查看詳情</span>
                      <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 其他分类导航 */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="fade-in-up">
            <h2 className="text-2xl md:text-3xl font-playfair font-light mb-16 text-center tracking-wide">
              探索其他分類
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(categoryMap).map(([key, info]) => (
                <Link
                  key={key}
                  href={`/projects/${key}`}
                  className={`group text-center p-6 border transition-all duration-300 ${
                    key === category
                      ? 'border-white/30 bg-white/5 text-white'
                      : 'border-white/10 hover:border-white/20 text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="font-light tracking-wide">{info.name}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

async function ProjectCategoryPageServer({ params }: ProjectCategoryPageProps) {
  const { category } = await params;
  
  // 验证分类是否存在
  if (!categoryMap[category]) {
    notFound();
  }

  const categoryInfo = categoryMap[category];
  const projects = await getProjectsByCategory(categoryInfo.enum);

  return (
    <ProjectCategoryPageClient 
      category={category}
      categoryInfo={categoryInfo}
      projects={projects}
      categoryMap={categoryMap}
    />
  );
}

export default function ProjectCategoryPage({ params }: ProjectCategoryPageProps) {
  return <ProjectCategoryPageServer params={params} />;
}