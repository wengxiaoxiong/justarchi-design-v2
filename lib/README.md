# Server Actions 文档

本项目使用 Next.js Server Actions 来管理项目数据，采用简化的数据结构，不依赖数据库。

## 目录结构

```
lib/
├── types.ts                 # 类型定义
├── data/
│   └── projects.ts         # 项目数据
├── actions/
│   ├── index.ts           # 统一导出
│   ├── architecture.ts    # 建筑设计相关 Actions
│   ├── interior.ts        # 室内设计相关 Actions
│   └── planning.ts        # 城市规划相关 Actions
└── README.md
```

## Server Actions

### 建筑设计 (Architecture)

- `getArchitectureIndexProjects()` - 获取首页展示的建筑设计项目（前4个）
- `getAllArchitectureProjects()` - 获取所有建筑设计项目
- `getArchitectureProjectById(id: string)` - 根据ID获取单个建筑设计项目

### 室内设计 (Interior)

- `getInteriorIndexProjects()` - 获取首页展示的室内设计项目（前2个）
- `getAllInteriorProjects()` - 获取所有室内设计项目
- `getInteriorProjectById(id: string)` - 根据ID获取单个室内设计项目

### 城市规划 (Planning)

- `getPlanningIndexProjects()` - 获取首页展示的城市规划项目（前3个）
- `getAllPlanningProjects()` - 获取所有城市规划项目
- `getPlanningProjectById(id: string)` - 根据ID获取单个城市规划项目

## 使用方法

### 在 Server Component 中使用

```tsx
import { getArchitectureIndexProjects } from '@/lib/actions';

export default async function Page() {
  const projects = await getArchitectureIndexProjects();
  
  return (
    <div>
      {projects.map(project => (
        <div key={project.id}>{project.title}</div>
      ))}
    </div>
  );
}
```

### 在 Client Component 中使用

Server Actions 返回的数据通过 props 传递给客户端组件：

```tsx
// Server Component
const projects = await getArchitectureIndexProjects();

return <ClientComponent projects={projects} />;
```

## 数据结构

### ArchitectureProject 接口

```typescript
interface ArchitectureProject {
  id: string;                    // 唯一标识符
  title: string;                 // 项目标题
  location: string;              // 项目位置
  image: string;                 // 项目图片URL
  className: string;             // CSS类名（用于布局）
  category: 'architecture' | 'interior' | 'planning';
  description?: string;          // 项目描述（可选）
  year?: string;                // 完成年份（可选）
  area?: string;                // 项目面积（可选）
  client?: string;              // 客户（可选）
  status?: string;              // 项目状态（可选）
}
```

## 注意事项

1. 所有 Server Actions 都包含错误处理，返回空数组或 null 作为降级方案
2. 数据存储在静态文件中，便于快速开发和部署
3. 支持通过修改 `lib/data/projects.ts` 文件来添加或修改项目数据
4. 项目按类别分组，每个类别有独立的 Server Action 文件 