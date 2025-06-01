'use server';

import { ArchitectureProject } from '../types';
import { interiorProjects } from '../data/projects';

/**
 * 获取室内设计首页展示项目（前2个）
 */
export async function getInteriorIndexProjects(): Promise<ArchitectureProject[]> {
  try {
    // 返回前2个项目作为首页展示
    return interiorProjects.slice(0, 2);
  } catch (error) {
    console.error('获取室内设计首页项目失败:', error);
    return [];
  }
}

/**
 * 获取所有室内设计项目
 */
export async function getAllInteriorProjects(): Promise<ArchitectureProject[]> {
  try {
    return interiorProjects;
  } catch (error) {
    console.error('获取所有室内设计项目失败:', error);
    return [];
  }
}

/**
 * 根据ID获取单个室内设计项目
 */
export async function getInteriorProjectById(id: string): Promise<ArchitectureProject | null> {
  try {
    const project = interiorProjects.find(p => p.id === id);
    return project || null;
  } catch (error) {
    console.error('获取室内设计项目详情失败:', error);
    return null;
  }
} 