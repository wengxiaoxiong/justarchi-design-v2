'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '../../../../lib/db';
import { ProjectCategory, Project } from '../../../../lib/types';
import ProjectNavigation from '../../../components/landing-page/ProjectNavigation';
import MarkdownRenderer from '../../../components/MarkdownRenderer';
import useScrollAnimation from '../../../hooks/useScrollAnimation';

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


// 项目类型映射
const categoryMap: Record<ProjectCategory, string> = {
  [ProjectCategory.ARCHITECTURE]: '建筑设计',
  [ProjectCategory.INTERIOR]: '室内设计',
  [ProjectCategory.PLANNING]: '城市规划',
  [ProjectCategory.LANDSCAPE]: '景观设计',
  [ProjectCategory.URBAN_DESIGN]: '城市设计',
  [ProjectCategory.RESEARCH]: '研究项目',
};

function ProjectDetailPageClient({ 
  project, 
  relatedProjects 
}: { 
  project: Project; 
  relatedProjects: Project[]; 
}) {
  useScrollAnimation();

  // 类型到URL映射
  const categoryUrlMap: Record<ProjectCategory, string> = {
    [ProjectCategory.ARCHITECTURE]: 'architecture',
    [ProjectCategory.INTERIOR]: 'interior',
    [ProjectCategory.PLANNING]: 'planning',
    [ProjectCategory.LANDSCAPE]: 'landscape',
    [ProjectCategory.URBAN_DESIGN]: 'urban-design',
    [ProjectCategory.RESEARCH]: 'research',
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 导航栏 */}
      <ProjectNavigation currentCategory={categoryUrlMap[project.category]} />

      {/* 主要内容 */}
      <main className="pt-20">
        {/* 返回按钮 */}
        <div className="fixed top-24 left-6 z-40">
          <Link 
            href="/projects" 
            className="group flex items-center text-white/60 hover:text-white transition-all duration-300 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
          >
            <svg 
              className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-light tracking-wide text-sm">Back</span>
          </Link>
        </div>

        {/* 项目标题区域 */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80"></div>
          </div>
          
          <div className="relative z-10 text-center max-w-5xl mx-auto px-6 fade-in-up">
            <div className="mb-6">
              <span className="inline-block text-sm tracking-[0.3em] text-white/60 font-light uppercase mb-4">
                {categoryMap[project.category]}
              </span>
              {project.isFeatured && (
                <div className="inline-block ml-4">
                  <span className="text-xs tracking-wider text-white/40 border border-white/20 px-3 py-1 rounded-full">
                    FEATURED
                  </span>
                </div>
              )}
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-light leading-none mb-8 tracking-tight">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/70 font-light text-sm tracking-wide">
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

              {project.area && (
                <div className="flex items-center">
                  <span className="mr-2 opacity-60">📐</span>
                  {project.area}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 项目描述 */}
        {project.description && (
          <section className="py-20 lg:py-32">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
              <div className="fade-in-up">
                <h2 className="text-2xl md:text-3xl font-playfair font-light mb-12 text-center tracking-wide">
                  Project Overview
                </h2>
                <div className="prose prose-invert prose-lg max-w-none font-playfair">
                  <MarkdownRenderer content={project.description} />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 项目图片集 */}
        {project.images.length > 1 && (
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              {/* 移动端：垂直堆叠 */}
              <div className="block md:hidden space-y-12">
                {project.images.slice(1).map((image: string, index: number) => (
                  <div key={index} className="opacity-0 fade-in-up group" style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className="relative overflow-hidden">
                      <Image
                        src={image}
                        alt={`${project.title} - Image ${index + 2}`}
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 桌面端：网格/拼图布局 */}
              <div className="hidden md:block">
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                  {project.images.slice(1).map((image: string, index: number) => {
                    // 创建动态网格布局 - 某些图片占更大空间
                    const isLarge = index % 5 === 0; // 每5个图片中有一个大图
                    const isMedium = index % 3 === 0 && !isLarge; // 每3个图片中有一个中图
                    
                    let colSpan = 'col-span-1';
                    let rowSpan = 'row-span-1';
                    let heightClass = 'h-64 lg:h-72';
                    
                    if (isLarge) {
                      colSpan = 'col-span-2';
                      rowSpan = 'row-span-2';
                      heightClass = 'h-80 lg:h-96';
                    } else if (isMedium) {
                      colSpan = 'lg:col-span-2 xl:col-span-2';
                      heightClass = 'h-48 lg:h-56';
                    }

                    return (
                      <div 
                        key={index} 
                        className={`opacity-0 fade-in-up group ${colSpan} ${rowSpan}`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className={`relative overflow-hidden ${heightClass} w-full`}>
                          <Image
                            src={image}
                            alt={`${project.title} - Image ${index + 2}`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
                          {/* 图片序号指示器 */}
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                              {index + 2}/{project.images.length}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* 查看全部图片提示 */}
                {project.images.length > 7 && (
                  <div className="text-center mt-12 opacity-0 fade-in-up" style={{ animationDelay: '0.8s' }}>
                    <p className="text-white/60 text-sm font-light">
                      显示 {Math.min(project.images.length - 1, 12)} / {project.images.length - 1} 张图片
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 相关项目 */}
        {relatedProjects.length > 0 && (
          <section className="py-20 lg:py-32 border-t border-white/10">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="fade-in-up">
                <h2 className="text-2xl md:text-3xl font-playfair font-light mb-16 text-center tracking-wide">
                  Related Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedProjects.map((relatedProject) => (
                    <Link
                      key={relatedProject.id}
                      href={`/projects/detail/${relatedProject.id}`}
                      className="group block"
                    >
                      <div className="relative overflow-hidden mb-4">
                        <Image
                          src={relatedProject.coverImage}
                          alt={relatedProject.title}
                          width={400}
                          height={300}
                          className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <h3 className="font-playfair text-lg font-light mb-2 group-hover:text-white/70 transition-colors">
                        {relatedProject.title}
                      </h3>
                      <p className="text-white/50 text-sm font-light">
                        {categoryMap[relatedProject.category]} • {relatedProject.year}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

async function ProjectDetailPageServer({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  const relatedProjects = await getRelatedProjects(project.id, project.category);

  return <ProjectDetailPageClient project={project} relatedProjects={relatedProjects} />;
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  return <ProjectDetailPageServer params={params} />;
}