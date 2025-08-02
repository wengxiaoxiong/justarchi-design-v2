'use server';

import { prisma } from '../db'
import { ProjectCategory, type Project, type ArchitectureProject } from '../types'

// 获取首页展示的室内设计项目（精选项目）
export async function getInteriorIndexProjects(): Promise<ArchitectureProject[]> {
  const projects = await prisma.project.findMany({
    where: {
      category: ProjectCategory.INTERIOR,
      isPublished: true,
      isFeatured: true, // 只获取精选项目
    },
    orderBy: [
      { sortOrder: 'asc' },
      { createdAt: 'desc' }
    ],
    take: 4, // 首页只显示4个精选项目
  })

  return projects.map(transformToArchitectureProject)
}

// 获取所有室内设计项目
export async function getAllInteriorProjects(): Promise<ArchitectureProject[]> {
  const projects = await prisma.project.findMany({
    where: {
      category: ProjectCategory.INTERIOR,
      isPublished: true,
    },
    orderBy: [
      { isFeatured: 'desc' },
      { sortOrder: 'asc' },
      { createdAt: 'desc' }
    ],
  })

  return projects.map(transformToArchitectureProject)
}

// 根据ID获取室内设计项目详情
export async function getInteriorProjectById(id: string): Promise<Project | null> {
  const project = await prisma.project.findFirst({
    where: {
      id,
      category: ProjectCategory.INTERIOR,
      isPublished: true,
    },
  })

  return project
}

// 转换数据库项目为前端展示格式
function transformToArchitectureProject(project: Project): ArchitectureProject {
  return {
    id: project.id,
    title: project.title,
    location: project.location,
    image: project.coverImage,
    className: getProjectClassName(project),
    category: 'interior',
    description: project.description || undefined,
    year: project.year?.toString(),
    area: project.area || undefined,
    client: project.client || undefined,
    status: project.status.toString(),
  }
}

// 根据项目索引生成对应的CSS类名
function getProjectClassName(project: Project): string {
  const classNames = [
    'col-span-12 md:col-span-6 opacity-0 transition-opacity duration-800 ease-in-out',
    'col-span-12 md:col-span-6 opacity-0 transition-opacity duration-800 ease-in-out',
    'col-span-12 sm:col-span-6 md:col-span-4 opacity-0 transition-opacity duration-800 ease-in-out',
    'col-span-12 sm:col-span-6 md:col-span-4 opacity-0 transition-opacity duration-800 ease-in-out',
  ]
  
  const index = parseInt(project.id.slice(-1)) || 0
  return classNames[index % classNames.length]
} 