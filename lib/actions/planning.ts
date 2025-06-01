'use server';

import { ArchitectureProject } from '../types';
import { planningProjects } from '../data/projects';

/**
 * 获取城市规划首页展示项目（前3个）
 */
export async function getPlanningIndexProjects(): Promise<ArchitectureProject[]> {
  try {
    // 返回前3个项目作为首页展示
    return planningProjects.slice(0, 3);
  } catch (error) {
    console.error('获取城市规划首页项目失败:', error);
    return [];
  }
}

/**
 * 获取所有城市规划项目
 */
export async function getAllPlanningProjects(): Promise<ArchitectureProject[]> {
  try {
    return planningProjects;
  } catch (error) {
    console.error('获取所有城市规划项目失败:', error);
    return [];
  }
}

/**
 * 根据ID获取单个城市规划项目
 */
export async function getPlanningProjectById(id: string): Promise<ArchitectureProject | null> {
  try {
    const project = planningProjects.find(p => p.id === id);
    return project || null;
  } catch (error) {
    console.error('获取城市规划项目详情失败:', error);
    return null;
  }
} 