'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProjectCategory, Project } from '../../../../lib/types';
import ProjectNavigation from '../../../components/landing-page/ProjectNavigation';
import MarkdownRenderer from '../../../components/MarkdownRenderer';
import useScrollAnimation from '../../../hooks/useScrollAnimation';
import SimpleImageViewer from '../../../components/SimpleImageViewer';

interface ProjectDetailClientProps {
  project: Project;
  relatedProjects: Project[];
  categoryMap: Partial<Record<ProjectCategory, string>>;
}

export default function ProjectDetailClient({ 
  project, 
  relatedProjects, 
  categoryMap 
}: ProjectDetailClientProps) {
  useScrollAnimation();

  // 类型到URL映射
  const categoryUrlMap: Partial<Record<ProjectCategory, string>> = {
    [ProjectCategory.ARCHITECTURE]: 'architecture',
    [ProjectCategory.INTERIOR]: 'interior',
    [ProjectCategory.PLANNING]: 'planning',
    [ProjectCategory.LANDSCAPE]: 'landscape',
    // 已移除：URBAN_DESIGN（urban-design）
    // 已移除：RESEARCH（research）
  };

  const currentCategorySlug = categoryUrlMap[project.category];

  // 画廊图片：将封面图合并进图片数组并去重
  const galleryImages = React.useMemo(() => {
    const list = [project.coverImage, ...(project.images || [])].filter(Boolean);
    // 去重
    return Array.from(new Set(list));
  }, [project.coverImage, project.images]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* 导航栏 */}
      <ProjectNavigation currentCategory={currentCategorySlug} />

      {/* 主要内容 */}
      <main className="pt-20">
        {/* 返回按钮 */}
        
        <div className="fixed top-24 left-6 z-40">
          <Link 
            href={`/projects/${currentCategorySlug || ''}`}
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
              {/* 精选标签已移除 */}
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

        <div className='w-screen bg-white'>

          {/* 项目图片集（包含封面图）*/}
          {galleryImages.length > 0 && (
            <section className="py-20">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="fade-in-up">
                  <h2 className="text-2xl md:text-3xl font-playfair font-light mb-12 text-center tracking-wide text-gray-800">
                    項目圖片
                  </h2>
                  <SimpleImageViewer 
                    images={galleryImages}
                    title={project.title}
                    projectId={project.id}
                  />
                </div>
              </div>
            </section>
          )}
        </div>

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