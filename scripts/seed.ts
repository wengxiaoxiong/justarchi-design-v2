
import { ProjectCategory, ProjectStatus } from '@/lib/types';
import { PrismaClient,  } from '../lib/generated/prisma';

const prisma = new PrismaClient();

const projectsData = [
  // 建筑设计项目
  {
    id: 'arch-001',
    title: '揚州京華城商業步行街',
    description: '位于扬州市的大型商业综合体项目，融合传统文化与现代商业理念',
    category: ProjectCategory.ARCHITECTURE,
    coverImage: 'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E6%89%AC%E5%B7%9E2-vI05vKpR7HnrN5LXzcj2AiuxDzHK2w.png',
    images: [
      'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E6%89%AC%E5%B7%9E2-vI05vKpR7HnrN5LXzcj2AiuxDzHK2w.png'
    ],
    year: 2020,
    location: 'Yangzhou Commercial District',
    city: '扬州',
    client: '京华城集团',
    architect: 'JustArchi Design',
    area: '50,000㎡',
    status: ProjectStatus.COMPLETED,
    brief: '扬州京华城商业步行街是一个融合传统扬州文化与现代商业理念的大型综合体项目。项目旨在创造一个充满活力的商业空间，同时保持扬州独特的历史文化特色。',
    concept: '设计理念源于扬州古典园林的空间营造手法，通过现代建筑语言重新诠释传统文化内涵。建筑立面采用现代材料与传统元素相结合的方式，创造出具有时代特征的建筑形象。',
    features: ['传统文化元素融入', '现代商业空间设计', '绿色建筑技术应用', '智能化系统集成'],
    tags: ['商业综合体', '文化传承', '现代设计', '绿色建筑'],
    isPublished: true,
    isFeatured: true,
    sortOrder: 1,
  },
  {
    id: 'arch-002',
    title: '上海世博會阿曼館',
    description: '2010年上海世博会阿曼国家馆设计，展现阿曼文化与现代建筑的完美结合',
    category: ProjectCategory.ARCHITECTURE,
    coverImage: 'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E4%B8%96%E5%8D%9A-JYp0UcEuzZkaW50W3ldDlztwAlY3jn.png',
    images: [
      'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E4%B8%96%E5%8D%9A-JYp0UcEuzZkaW50W3ldDlztwAlY3jn.png'
    ],
    year: 2010,
    location: 'Shanghai Expo Oman Pavilion',
    city: '上海',
    client: '阿曼苏丹国',
    architect: 'JustArchi Design',
    area: '6,000㎡',
    status: ProjectStatus.COMPLETED,
    brief: '上海世博会阿曼馆是展示阿曼苏丹国文化、历史和现代发展成就的重要展馆。设计充分体现了阿曼的建筑传统和文化特色。',
    concept: '设计灵感来源于阿曼传统建筑的几何形态和装饰元素，通过现代建筑技术和材料的运用，创造出既具有阿曼文化特色又符合现代展览需求的建筑空间。',
    features: ['阿曼传统建筑元素', '现代展览空间设计', '环保材料应用', '智能展示系统'],
    tags: ['世博会', '国家馆', '文化展示', '传统建筑'],
    isPublished: true,
    isFeatured: true,
    sortOrder: 2,
  },
  {
    id: 'arch-003',
    title: '鄭州城市綜合體',
    description: '郑州市大型城市综合体项目，集商业、办公、居住于一体的现代化建筑群',
    category: ProjectCategory.ARCHITECTURE,
    coverImage: 'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E9%83%91%E5%B7%9E-FDqRYPcaLG5DWsVpjEFPjmbrY4mieT.png',
    images: [
      'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E9%83%91%E5%B7%9E-FDqRYPcaLG5DWsVpjEFPjmbrY4mieT.png'
    ],
    year: 2019,
    location: 'Zhengzhou Urban Complex',
    city: '郑州',
    client: '郑州城投集团',
    architect: 'JustArchi Design',
    area: '120,000㎡',
    status: ProjectStatus.COMPLETED,
    brief: '郑州城市综合体项目是一个集商业、办公、居住、娱乐等多种功能于一体的大型现代化建筑群，旨在打造郑州市新的城市地标。',
    concept: '设计采用"城市中的城市"概念，通过垂直空间的合理利用和功能的有机整合，创造出一个立体的城市生活空间。建筑造型现代简洁，立面设计富有韵律感。',
    features: ['多功能综合体', '立体城市空间', '绿色建筑设计', '智慧建筑系统'],
    tags: ['城市综合体', '多功能', '现代建筑', '城市地标'],
    isPublished: true,
    isFeatured: false,
    sortOrder: 3,
  },
  {
    id: 'arch-004',
    title: '蘇州河城市設計',
    description: '苏州河滨水区域城市设计项目，打造宜居宜业的滨水城市空间',
    category: ProjectCategory.ARCHITECTURE,
    coverImage: 'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E8%8B%8F%E5%B7%9E-X20w3X5FeCjxY9lypW631N5gtuSECq.png',
    images: [
      'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E8%8B%8F%E5%B7%9E-X20w3X5FeCjxY9lypW631N5gtuSECq.png'
    ],
    year: 2021,
    location: 'Suzhou River Urban Design',
    city: '上海',
    client: '上海市规划局',
    architect: 'JustArchi Design',
    area: '200,000㎡',
    status: ProjectStatus.COMPLETED,
    brief: '苏州河城市设计项目致力于打造一个集生态、文化、商业于一体的滨水城市空间，提升城市滨水区域的整体品质。',
    concept: '设计以"水城共生"为核心理念，通过建筑与水景的有机结合，创造出富有诗意的滨水建筑群。同时注重生态环境保护和可持续发展。',
    features: ['滨水建筑设计', '生态环境保护', '文化空间营造', '可持续发展'],
    tags: ['滨水设计', '城市规划', '生态建筑', '文化空间'],
    isPublished: true,
    isFeatured: false,
    sortOrder: 4,
  },

  // 室内设计项目
  {
    id: 'int-001',
    title: '法國哈金森 Fab House',
    description: '法国哈金森苏州工厂员工活动中心室内设计，营造舒适的工作环境',
    category: ProjectCategory.INTERIOR,
    coverImage: 'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E6%B3%95%E5%9B%BD-Da2pkjjvh2zFIuwERVyYpfANTsu0Xi.png',
    images: [
      'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E6%B3%95%E5%9B%BD-Da2pkjjvh2zFIuwERVyYpfANTsu0Xi.png'
    ],
    year: 2022,
    location: 'Hutchinson Fab House, Suzhou',
    city: '苏州',
    client: '法国哈金森集团',
    architect: 'JustArchi Design',
    area: '3,000㎡',
    status: ProjectStatus.COMPLETED,
    brief: '法国哈金森苏州工厂员工活动中心室内设计项目，旨在为员工创造一个舒适、现代的工作和休闲环境。',
    concept: '设计融合了法国的浪漫优雅与现代工业风格，通过合理的空间布局和精心的材料选择，创造出既实用又美观的室内环境。',
    features: ['现代工业风格', '舒适员工空间', '多功能区域设计', '智能化设施'],
    tags: ['工业设计', '员工空间', '现代室内', '多功能'],
    isPublished: true,
    isFeatured: true,
    sortOrder: 1,
  },
  {
    id: 'int-002',
    title: '桃園崇德佛堂',
    description: '台湾桃园崇德佛堂室内设计，营造庄严肃穆的宗教空间氛围',
    category: ProjectCategory.INTERIOR,
    coverImage: 'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E6%A1%83%E5%9B%AD-3zEzdhu9daQCZqhf6HxjoIjmVbfvFA.png',
    images: [
      'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E6%A1%83%E5%9B%AD-3zEzdhu9daQCZqhf6HxjoIjmVbfvFA.png'
    ],
    year: 2021,
    location: 'Taoyuan Chongde Buddha Hall',
    city: '桃园',
    client: '崇德佛堂',
    architect: 'JustArchi Design',
    area: '800㎡',
    status: ProjectStatus.COMPLETED,
    brief: '桃园崇德佛堂室内设计项目，致力于创造一个庄严肃穆、利于修行的宗教空间环境。',
    concept: '设计遵循佛教建筑的传统理念，通过空间的纵深感和光影效果的运用，营造出神圣庄严的宗教氛围，同时融入现代设计元素。',
    features: ['传统宗教元素', '现代设计手法', '光影效果运用', '庄严空间氛围'],
    tags: ['宗教空间', '传统设计', '佛堂设计', '室内设计'],
    isPublished: true,
    isFeatured: true,
    sortOrder: 2,
  },

  // 城市规划项目
  {
    id: 'plan-001',
    title: '莆田白塘湖旅遊規劃',
    description: '福建莆田白塘湖旅游区总体规划，打造生态旅游目的地',
    category: ProjectCategory.PLANNING,
    coverImage: 'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E8%8E%86%E7%94%B0%E7%99%BD%E5%A1%98%E6%B9%96%E6%97%85%E9%81%8A%E8%A6%8F%E5%8A%83-llbn0jaYYqFqH38kCjPN8Tjr4M52xI.png',
    images: [
      'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E8%8E%86%E7%94%B0%E7%99%BD%E5%A1%98%E6%B9%96%E6%97%85%E9%81%8A%E8%A6%8F%E5%8A%83-llbn0jaYYqFqH38kCjPN8Tjr4M52xI.png'
    ],
    year: 2020,
    location: 'Putian Baitang Lake Tourism Plan',
    city: '莆田',
    client: '莆田市政府',
    architect: 'JustArchi Design',
    area: '15,000亩',
    status: ProjectStatus.COMPLETED,
    brief: '莆田白塘湖旅游规划项目旨在将白塘湖打造成为集生态保护、文化展示、休闲旅游于一体的综合性旅游目的地。',
    concept: '规划以"生态优先、文化传承、可持续发展"为核心理念，通过对自然资源的保护和合理利用，创造出人与自然和谐共生的旅游空间。',
    features: ['生态旅游规划', '文化遗产保护', '可持续发展', '景观设计'],
    tags: ['旅游规划', '生态保护', '湖泊景观', '文化旅游'],
    isPublished: true,
    isFeatured: true,
    sortOrder: 1,
  },
  {
    id: 'plan-002',
    title: '上海吳中路地鐵上蓋',
    description: '上海吴中路地铁站TOD综合开发项目，实现交通与城市功能的有机结合',
    category: ProjectCategory.PLANNING,
    coverImage: 'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E5%90%B4%E4%B8%AD%E8%B7%AF-nEVBGrmzNZc5GtfSQnlO9gooWbKcDm.png',
    images: [
      'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E5%90%B4%E4%B8%AD%E8%B7%AF-nEVBGrmzNZc5GtfSQnlO9gooWbKcDm.png'
    ],
    year: 2021,
    location: 'Shanghai Wuzhong Rd Metro TOD',
    city: '上海',
    client: '上海地铁集团',
    architect: 'JustArchi Design',
    area: '80,000㎡',
    status: ProjectStatus.COMPLETED,
    brief: '上海吴中路地铁上盖综合开发项目是典型的TOD（Transit-Oriented Development）项目，旨在实现公共交通与城市功能的有机结合。',
    concept: '项目采用"立体城市"设计理念，通过垂直空间的充分利用，在有限的土地上实现交通、商业、办公、居住等多种功能的集约化发展。',
    features: ['TOD开发模式', '立体城市设计', '交通枢纽整合', '多功能复合'],
    tags: ['TOD开发', '地铁上盖', '交通规划', '城市设计'],
    isPublished: true,
    isFeatured: true,
    sortOrder: 2,
  },
  {
    id: 'plan-003',
    title: '萬華區政中心規劃',
    description: '台北万华区政中心总体规划，打造现代化的政务服务中心',
    category: ProjectCategory.PLANNING,
    coverImage: 'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E4%B8%87%E8%8A%B1-WuoGT9SHBP7Cl74np1Slvq8zgXUY7p.png',
    images: [
      'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E4%B8%87%E8%8A%B1-WuoGT9SHBP7Cl74np1Slvq8zgXUY7p.png'
    ],
    year: 2022,
    location: 'Wanhua Municipal Center Plan',
    city: '台北',
    client: '台北市万华区政府',
    architect: 'JustArchi Design',
    area: '25,000㎡',
    status: ProjectStatus.COMPLETED,
    brief: '万华区政中心规划项目旨在打造一个现代化、高效率的政务服务中心，提升政府服务效能和市民满意度。',
    concept: '规划以"开放、透明、高效、便民"为设计原则，通过合理的功能布局和人性化的空间设计，创造出既庄重又亲民的政务环境。',
    features: ['现代化政务中心', '便民服务设计', '绿色建筑理念', '智慧政务系统'],
    tags: ['政务中心', '公共建筑', '城市规划', '现代化设计'],
    isPublished: true,
    isFeatured: false,
    sortOrder: 3,
  },
];

async function main() {
  console.log('开始播种数据...');

  // 清理现有数据
  await prisma.project.deleteMany({});
  console.log('已清理现有项目数据');

  // 插入种子数据
  for (const project of projectsData) {
    await prisma.project.create({
      data: project,
    });
    console.log(`已创建项目: ${project.title}`);
  }

  console.log('种子数据播种完成！');
}

main()
  .catch((e) => {
    console.error('播种数据时出错:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });