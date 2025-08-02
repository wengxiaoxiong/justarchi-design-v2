# JustArchi Design V2

基于 Next.js 15 和 Prisma 的建筑设计展示网站，支持项目管理后台。

## 功能特性

✅ **响应式设计**：完美支持 PC 和移动端
✅ **项目展示**：建筑设计、室内设计、城市规划等多个领域  
✅ **项目详情页**：支持 Markdown 渲染的丰富内容展示
✅ **分类浏览**：按项目类型筛选和浏览
✅ **管理后台**：完整的项目 CRUD 管理功能
✅ **数据库持久化**：基于 Prisma ORM 的数据管理
✅ **多媒体支持**：项目图片集展示

## 技术栈

- **前端框架**：Next.js 15.3.2 (App Router)
- **UI 组件**：shadcn/ui + Tailwind CSS
- **数据库 ORM**：Prisma
- **Markdown 渲染**：react-markdown
- **语言**：TypeScript

## 快速开始

### 1. 安装依赖

```bash
npm install --legacy-peer-deps
```

### 2. 数据库设置

#### 复制环境变量文件
```bash
cp .env.example .env
```

#### 配置数据库连接
编辑 `.env` 文件，设置数据库连接：

**PostgreSQL (推荐生产环境):**
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/justarchi_design?schema=public"
```

**SQLite (适合开发环境):**
```bash
DATABASE_URL="file:./dev.db"
```

### 3. 初始化数据库

```bash
# 生成 Prisma 客户端
npm run db:generate

# 创建数据库表结构
npm run db:push

# 导入种子数据
npm run db:seed
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看网站
访问 http://localhost:3000/admin 进入管理后台

## 项目结构

```
.
├── app/                          # Next.js App Router
│   ├── admin/                    # 管理后台页面
│   │   ├── page.tsx             # 管理后台首页
│   │   └── projects/            # 项目管理
│   │       ├── new/page.tsx     # 新建项目
│   │       └── [id]/edit/       # 编辑项目
│   ├── api/                     # API 路由
│   │   └── admin/projects/      # 项目管理 API
│   ├── components/              # React 组件
│   │   ├── admin/               # 管理后台组件
│   │   └── landing-page/        # 首页组件
│   ├── projects/                # 项目展示页面
│   │   ├── page.tsx            # 项目总览
│   │   ├── [id]/page.tsx       # 项目详情
│   │   └── [category]/page.tsx # 分类页面
│   └── globals.css             # 全局样式
├── lib/                        # 工具库
│   ├── actions/                # Server Actions
│   ├── generated/              # Prisma 生成文件
│   ├── db.ts                   # 数据库客户端
│   └── types.ts               # 类型定义
├── prisma/                     # Prisma 配置
│   └── schema.prisma          # 数据库 Schema
└── scripts/                   # 脚本文件
    └── seed.ts               # 种子数据
```

## 数据库 Schema

项目使用以下数据模型：

### Project 模型
- **基本信息**：标题、描述、分类、状态
- **展示信息**：封面图片、图片集、年份
- **位置信息**：位置、城市
- **项目信息**：委托方、建筑师、面积
- **详细内容**：项目简介、设计理念、特色、标签
- **状态管理**：发布状态、精选状态、排序权重

### 项目分类
- `ARCHITECTURE`：建筑设计
- `INTERIOR`：室内设计  
- `PLANNING`：城市规划
- `LANDSCAPE`：景观设计
- `URBAN_DESIGN`：城市设计
- `RESEARCH`：研究项目

## 管理后台使用

### 访问后台
访问 `/admin` 进入项目管理后台

### 主要功能
1. **项目列表**：查看所有项目，包括发布状态和统计信息
2. **新建项目**：创建新的项目，支持完整的项目信息录入
3. **编辑项目**：修改现有项目信息
4. **删除项目**：删除不需要的项目
5. **发布管理**：控制项目的发布状态和精选状态

### 项目表单字段
- **基本信息**：标题、分类、状态、位置等
- **项目图片**：封面图片和多张项目图片
- **详细内容**：项目简介、设计理念（支持 Markdown）
- **项目特色**：多个特色要点
- **项目标签**：便于分类和搜索
- **发布设置**：发布状态和精选设置

## 可用脚本

```bash
# 开发
npm run dev          # 启动开发服务器

# 构建
npm run build        # 构建生产版本
npm run start        # 启动生产服务器

# 数据库
npm run db:generate  # 生成 Prisma 客户端  
npm run db:push      # 推送数据库 Schema
npm run db:seed      # 导入种子数据
npm run db:studio    # 打开 Prisma Studio

# 代码质量
npm run lint         # 运行 ESLint
```

## 部署说明

### 环境变量设置
确保在生产环境中设置以下环境变量：
- `DATABASE_URL`：数据库连接 URL
- `NODE_ENV=production`

### 数据库迁移
```bash
# 生产环境数据库初始化
npx prisma generate
npx prisma db push
```

## 开发指南

### 添加新的项目类型
1. 在 `prisma/schema.prisma` 中的 `ProjectCategory` 枚举添加新类型
2. 运行 `npm run db:generate` 重新生成客户端
3. 在 `lib/types.ts` 中添加相应的映射
4. 更新相关组件中的类型映射

### 自定义样式
项目使用 Tailwind CSS，可以在 `tailwind.config.js` 中自定义配置。

### API 扩展
API 路由位于 `app/api/` 目录下，遵循 Next.js 13+ 的 App Router 规范。

## 故障排除

### 常见问题

**1. 数据库连接失败**
- 检查 `.env` 文件中的 `DATABASE_URL` 是否正确
- 确保数据库服务正在运行

**2. Prisma 客户端错误**
```bash
npm run db:generate
```

**3. 种子数据导入失败**
- 确保数据库连接正常
- 检查 `scripts/seed.ts` 中的数据格式

**4. 构建错误**
```bash
# 清理并重新安装依赖
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

## 许可证

MIT License

## 贡献

欢迎提交 Issues 和 Pull Requests！
