// 建筑设计相关 Actions
export {
  getArchitectureIndexProjects,
  getAllArchitectureProjects,
  getArchitectureProjectById,
} from './architecture';

// 室内设计相关 Actions
export {
  getInteriorIndexProjects,
  getAllInteriorProjects,
  getInteriorProjectById,
} from './interior';

// 城市规划相关 Actions
export {
  getPlanningIndexProjects,
  getAllPlanningProjects,
  getPlanningProjectById,
} from './planning';

// 管理员相关 Actions
export {
  getProjectById,
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from './admin';

// 类型导出
export type { ArchitectureProject } from '../types';
export type { ProjectFormData } from './admin'; 