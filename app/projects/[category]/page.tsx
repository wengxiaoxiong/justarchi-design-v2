import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '../../../lib/db';
import { ProjectCategory } from '../../../lib/types';
import ProjectCategoryClient from './ProjectCategoryClient';


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