'use server'

import { prisma } from '../db';
import { ProjectCategory, ProjectStatus } from '../types';
import { Prisma } from '../generated/prisma';
import { revalidatePath } from 'next/cache';

// 项目表单数据类型
interface ProjectFormData {
  title: string;
  description?: string;
  category: ProjectCategory;
  coverImage: string;
  images: string[];
  year?: number;
  location: string;
  city?: string;
  client?: string;
  architect?: string;
  area?: string;
  status: ProjectStatus;
  brief?: string;
  concept?: string;
  features: string[];
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  sortOrder: number;
}

// 获取单个项目详情（管理员）
export async function getProjectById(id: string) {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new Error('项目不存在');
    }

    return { success: true, project };
  } catch (error) {
    console.error('获取项目详情失败:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : '获取项目详情失败' 
    };
  }
}

// 获取所有项目（管理员视图）
export async function getAllProjects(filters?: {
  category?: ProjectCategory;
  status?: ProjectStatus;
  published?: boolean;
}) {
  try {
    const where: Prisma.ProjectWhereInput = {};
    
    if (filters?.category) {
      where.category = filters.category;
    }
    
    if (filters?.status) {
      where.status = filters.status;
    }
    
    if (filters?.published !== undefined) {
      where.isPublished = filters.published;
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: [
        { isFeatured: 'desc' },
        { sortOrder: 'asc' },
        { updatedAt: 'desc' }
      ],
    });

    return { success: true, projects };
  } catch (error) {
    console.error('获取项目列表失败:', error);
    return { 
      success: false, 
      error: '获取项目列表失败' 
    };
  }
}

// 创建新项目
export async function createProject(formData: ProjectFormData) {
  try {
    // 验证必填字段
    if (!formData.title || !formData.location || !formData.coverImage) {
      throw new Error('缺少必填字段：标题、位置或封面图片');
    }

    // 过滤空值
    const cleanImages = formData.images.filter(img => img.trim() !== '');
    const cleanFeatures = formData.features.filter(feature => feature.trim() !== '');
    const cleanTags = formData.tags.filter(tag => tag.trim() !== '');

    const project = await prisma.project.create({
      data: {
        title: formData.title,
        description: formData.description || null,
        category: formData.category,
        coverImage: formData.coverImage,
        images: cleanImages,
        year: formData.year || null,
        location: formData.location,
        city: formData.city || null,
        client: formData.client || null,
        architect: formData.architect || null,
        area: formData.area || null,
        status: formData.status,
        brief: formData.brief || null,
        concept: formData.concept || null,
        features: cleanFeatures,
        tags: cleanTags,
        isPublished: formData.isPublished,
        isFeatured: formData.isFeatured,
        sortOrder: formData.sortOrder,
      },
    });

    // 重新验证相关页面
    revalidatePath('/admin');
    revalidatePath('/projects');
    revalidatePath(`/projects/${formData.category}`);

    return { success: true, project };
  } catch (error) {
    console.error('创建项目失败:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : '创建项目失败，请稍后重试' 
    };
  }
}

// 更新项目
export async function updateProject(id: string, formData: ProjectFormData) {
  try {
    // 验证项目是否存在
    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      throw new Error('项目不存在');
    }

    // 过滤空值
    const cleanImages = formData.images.filter(img => img.trim() !== '');
    const cleanFeatures = formData.features.filter(feature => feature.trim() !== '');
    const cleanTags = formData.tags.filter(tag => tag.trim() !== '');

    const project = await prisma.project.update({
      where: { id },
      data: {
        title: formData.title,
        description: formData.description || null,
        category: formData.category,
        coverImage: formData.coverImage,
        images: cleanImages,
        year: formData.year || null,
        location: formData.location,
        city: formData.city || null,
        client: formData.client || null,
        architect: formData.architect || null,
        area: formData.area || null,
        status: formData.status,
        brief: formData.brief || null,
        concept: formData.concept || null,
        features: cleanFeatures,
        tags: cleanTags,
        isPublished: formData.isPublished,
        isFeatured: formData.isFeatured,
        sortOrder: formData.sortOrder,
      },
    });

    // 重新验证相关页面
    revalidatePath('/admin');
    revalidatePath('/projects');
    revalidatePath(`/projects/${formData.category}`);
    revalidatePath(`/projects/detail/${id}`);

    return { success: true, project };
  } catch (error) {
    console.error('更新项目失败:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : '更新项目失败，请稍后重试' 
    };
  }
}

// 删除项目
export async function deleteProject(id: string) {
  try {
    // 验证项目是否存在
    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      throw new Error('项目不存在');
    }

    await prisma.project.delete({
      where: { id },
    });

    // 重新验证相关页面
    revalidatePath('/admin');
    revalidatePath('/projects');
    revalidatePath(`/projects/${existingProject.category}`);

    return { success: true, message: '项目删除成功' };
  } catch (error) {
    console.error('删除项目失败:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : '删除项目失败，请稍后重试' 
    };
  }
}

// 导出类型
export type { ProjectFormData };