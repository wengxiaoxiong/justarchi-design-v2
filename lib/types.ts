import { ProjectCategory, ProjectStatus } from './generated/prisma'

export interface Project {
  id: string;
  title: string;
  description?: string | null;
  category: ProjectCategory;
  
  // 基础展示信息
  coverImage: string;
  images: string[];
  year?: number | null;
  
  // 位置信息
  location: string;
  city?: string | null;
  
  // 项目信息
  client?: string | null;
  architect?: string | null;
  area?: string | null;
  status: ProjectStatus;
  
  // 详细内容
  brief?: string | null;
  concept?: string | null;
  features: string[];
  tags: string[];
  
  // 状态管理
  isPublished: boolean;
  isFeatured: boolean;
  sortOrder: number;
  
  // 时间戳
  createdAt: Date;
  updatedAt: Date;
}

// 保持向后兼容的旧类型定义
export interface ArchitectureProject {
  id: string;
  title: string;
  location: string;
  image: string;
  className: string;
  category: 'architecture' | 'interior' | 'planning';
  description?: string;
  year?: string;
  area?: string;
  client?: string;
  status?: string;
}

// 导出 Prisma 生成的枚举类型
export { ProjectCategory, ProjectStatus } from './generated/prisma' 