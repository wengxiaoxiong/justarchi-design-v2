'use server';

import { ArchitectureProject } from '../types';
import { architectureProjects } from '../data/projects';

/**
 * 获取建筑设计首页展示项目（前4个）
 */
export async function getArchitectureIndexProjects(): Promise<ArchitectureProject[]> {
  try {
    // 返回前4个项目作为首页展示
    return architectureProjects.slice(0, 4);
  } catch (error) {
    console.error('获取建筑设计首页项目失败:', error);
    return [];
  }
}

/**
 * 获取所有建筑设计项目
 */
export async function getAllArchitectureProjects(): Promise<ArchitectureProject[]> {
  try {
    return architectureProjects;
  } catch (error) {
    console.error('获取所有建筑设计项目失败:', error);
    return [];
  }
}

/**
 * 根据ID获取单个建筑设计项目
 */
export async function getArchitectureProjectById(id: string): Promise<ArchitectureProject | null> {
  try {
    const project = architectureProjects.find(p => p.id === id);
    return project || null;
  } catch (error) {
    console.error('获取建筑设计项目详情失败:', error);
    return null;
  }
} 