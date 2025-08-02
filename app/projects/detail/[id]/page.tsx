'use client';

import React, { useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { prisma } from '../../../../lib/db';
import { ProjectCategory } from '../../../../lib/types';
import Navigation from '../../../components/landing-page/Navigation';
import MarkdownRenderer from '../../../components/MarkdownRenderer';
import useActiveSection from '../../../hooks/useActiveSection';
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

function ProjectDetailPageClient({ project, relatedProjects }: { project: any; relatedProjects: any[] }) {
  const activeSection = useActiveSection({
    sections: ['home', 'about', 'core-values', 'architecture', 'interior', 'planning', 'contact-us']
  });
  
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 导航栏 */}
      <Navigation activeSection={activeSection} />

      {/* 主要内容 */}
      <main className="pt-20">
        {/* 返回按钮 */}
        <div className="fixed top-24 left-6 z-40">
          <Link 
            href="/" 
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
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover opacity-40"
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
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <div className="space-y-20">
                {project.images.slice(1).map((image, index) => (
                  <div key={index} className="opacity-0 fade-in-up group" style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className="relative overflow-hidden">
                      <img
                        src={image}
                        alt={`${project.title} - Image ${index + 2}`}
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                ))}
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
                        <img
                          src={relatedProject.coverImage}
                          alt={relatedProject.title}
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

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  const relatedProjects = await getRelatedProjects(project.id, project.category);

  return <ProjectDetailPageClient project={project} relatedProjects={relatedProjects} />;
}