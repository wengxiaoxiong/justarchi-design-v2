import React from 'react';
import { prisma } from '../../lib/db';
import { ProjectCategory } from '../../lib/types';
import ProjectsPageClient from './ProjectsPageClient';

// 项目类型映射
const categoryMap: Partial<Record<ProjectCategory, string>> = {
  [ProjectCategory.ARCHITECTURE]: '建築設計',
  [ProjectCategory.INTERIOR]: '室内设计',
  [ProjectCategory.PLANNING]: '城市规划',
  [ProjectCategory.LANDSCAPE]: '景观设计',
  // 已移除：URBAN_DESIGN（城市設計）
  // 已移除：RESEARCH（研究項目）
};

// 类型到URL映射
const categoryUrlMap: Partial<Record<ProjectCategory, string>> = {
  [ProjectCategory.ARCHITECTURE]: 'architecture',
  [ProjectCategory.INTERIOR]: 'interior',
  [ProjectCategory.PLANNING]: 'planning',
  [ProjectCategory.LANDSCAPE]: 'landscape',
  // 已移除：URBAN_DESIGN（urban-design）
  // 已移除：RESEARCH（research）
};

// 获取所有项目，按分类分组
async function getAllProjectsGrouped() {
  const projects = await prisma.project.findMany({
    where: {
      isPublished: true,
    },
    orderBy: [
      { isFeatured: 'desc' },
      { sortOrder: 'asc' },
      { createdAt: 'desc' }
    ],
  });

  // 按分类分组
  const grouped = projects.reduce((acc, project) => {
    if (!acc[project.category]) {
      acc[project.category] = [];
    }
    acc[project.category].push(project);
    return acc;
  }, {} as Record<ProjectCategory, typeof projects>);

  return grouped;
}

// 获取项目统计信息
async function getProjectStats() {
  const total = await prisma.project.count({
    where: { isPublished: true }
  });

  const byCategory = await prisma.project.groupBy({
    by: ['category'],
    where: { isPublished: true },
    _count: true,
  });

  const featured = await prisma.project.count({
    where: { 
      isPublished: true,
      isFeatured: true 
    }
  });

  return {
    total,
    featured,
    byCategory: byCategory.reduce((acc, item) => {
      acc[item.category] = item._count;
      return acc;
    }, {} as Record<ProjectCategory, number>)
  };
}

export default async function ProjectsPage() {
  const [projectsGrouped, stats] = await Promise.all([
    getAllProjectsGrouped(),
    getProjectStats()
  ]);

  return (
    <ProjectsPageClient 
      projectsGrouped={projectsGrouped} 
      stats={stats}
      categoryMap={categoryMap}
      categoryUrlMap={categoryUrlMap}
    />
  );
} 