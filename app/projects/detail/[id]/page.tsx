import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '../../../../lib/db';
import { ProjectCategory } from '../../../../lib/types';
import ProjectDetailClient from './ProjectDetailClient';

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



export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  const relatedProjects = await getRelatedProjects(project.id, project.category);

  return <ProjectDetailClient project={project} relatedProjects={relatedProjects} categoryMap={categoryMap} />;
}