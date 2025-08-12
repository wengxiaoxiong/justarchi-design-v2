import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/db';
import { ProjectCategory } from '../../../lib/types';
import ProjectCategoryClient from './ProjectCategoryClient';

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface ProjectCategoryPageProps {
  params: Promise<{ category: string }>;
}

// 类型映射
const categoryMap: Record<string, { name: string; enum: ProjectCategory }> = {
  'architecture': { name: '建築設計', enum: ProjectCategory.ARCHITECTURE },
  'interior': { name: '室內設計', enum: ProjectCategory.INTERIOR },
  'planning': { name: '城市規劃', enum: ProjectCategory.PLANNING },
  'landscape': { name: '景觀設計', enum: ProjectCategory.LANDSCAPE },
  // 已移除：'urban-design'（城市設計）
  // 已移除：'research'（研究項目）
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

async function ProjectCategoryPage({ params }: ProjectCategoryPageProps) {
  const { category } = await params;
  
  // 验证分类是否存在
  if (!categoryMap[category]) {
    notFound();
  }

  const categoryInfo = categoryMap[category];
  const projects = await getProjectsByCategory(categoryInfo.enum);

  return (
    <ProjectCategoryClient 
      category={category}
      categoryInfo={categoryInfo}
      projects={projects}
      categoryMap={categoryMap}
    />
  );
}

export default ProjectCategoryPage;