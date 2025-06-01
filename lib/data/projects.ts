import { ArchitectureProject } from '../types';

export const architectureProjects: ArchitectureProject[] = [
  {
    id: 'arch-001',
    title: '揚州京華城商業步行街',
    location: 'Yangzhou Commercial District',
    image: 'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E6%89%AC%E5%B7%9E2-vI05vKpR7HnrN5LXzcj2AiuxDzHK2w.png',
    className: 'col-span-12 md:col-span-5 row-span-1 md:row-span-2 opacity-0 transition-opacity duration-800 ease-in-out',
    category: 'architecture'
  },
  {
    id: 'arch-002',
    title: '上海世博會阿曼館',
    location: 'Shanghai Expo Oman Pavilion',
    image: 'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E4%B8%96%E5%8D%9A-JYp0UcEuzZkaW50W3ldDlztwAlY3jn.png',
    className: 'col-span-12 md:col-span-7 opacity-0 transition-opacity duration-800 ease-in-out',
    category: 'architecture'
  },
  {
    id: 'arch-003',
    title: '鄭州城市綜合體',
    location: 'Zhengzhou Urban Complex',
    image: 'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E9%83%91%E5%B7%9E-FDqRYPcaLG5DWsVpjEFPjmbrY4mieT.png',
    className: 'col-span-12 sm:col-span-6 md:col-span-4 opacity-0 transition-opacity duration-800 ease-in-out',
    category: 'architecture'
  },
  {
    id: 'arch-004',
    title: '蘇州河城市設計',
    location: 'Suzhou River Urban Design',
    image: 'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E8%8B%8F%E5%B7%9E-X20w3X5FeCjxY9lypW631N5gtuSECq.png',
    className: 'col-span-12 sm:col-span-6 md:col-span-3 opacity-0 transition-opacity duration-800 ease-in-out',
    category: 'architecture'
  },
  // 这里可以添加更多建筑设计项目

];

export const interiorProjects: ArchitectureProject[] = [
  {
    id: 'int-001',
    title: '法國哈金森 Fab House',
    location: 'Hutchinson Fab House, Suzhou',
    image: 'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E6%B3%95%E5%9B%BD-Da2pkjjvh2zFIuwERVyYpfANTsu0Xi.png',
    className: 'col-span-12 md:col-span-6 opacity-0 transition-opacity duration-800 ease-in-out',
    category: 'interior'
  },
  {
    id: 'int-002',
    title: '桃園崇德佛堂',
    location: 'Taoyuan Chongde Buddha Hall',
    image: 'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E6%A1%83%E5%9B%AD-3zEzdhu9daQCZqhf6HxjoIjmVbfvFA.png',
    className: 'col-span-12 md:col-span-6 opacity-0 transition-opacity duration-800 ease-in-out',
    category: 'interior'
  },
  // 这里可以添加更多室内设计项目

];

export const planningProjects: ArchitectureProject[] = [
  {
    id: 'plan-001',
    title: '莆田白塘湖旅遊規劃',
    location: 'Putian Baitang Lake Tourism Plan',
    image: 'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E8%8E%86%E7%94%B0%E7%99%BD%E5%A1%98%E6%B9%96%E6%97%85%E9%81%8A%E8%A6%8F%E5%8A%83-llbn0jaYYqFqH38kCjPN8Tjr4M52xI.png',
    className: 'col-span-12 md:col-span-4 opacity-0 transition-opacity duration-800 ease-in-out',
    category: 'planning'
  },
  {
    id: 'plan-002',
    title: '上海吳中路地鐵上蓋',
    location: 'Shanghai Wuzhong Rd Metro TOD',
    image: 'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E5%90%B4%E4%B8%AD%E8%B7%AF-nEVBGrmzNZc5GtfSQnlO9gooWbKcDm.png',
    className: 'col-span-12 md:col-span-4 opacity-0 transition-opacity duration-800 ease-in-out',
    category: 'planning'
  },
  {
    id: 'plan-003',
    title: '萬華區政中心規劃',
    location: 'Wanhua Municipal Center Plan',
    image: 'https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E4%B8%87%E8%8A%B1-WuoGT9SHBP7Cl74np1Slvq8zgXUY7p.png',
    className: 'col-span-12 md:col-span-4 opacity-0 transition-opacity duration-800 ease-in-out',
    category: 'planning'
  },
  // 这里可以添加更多城市规划项目

];

export const allProjects: ArchitectureProject[] = [
  ...architectureProjects,
  ...interiorProjects,
  ...planningProjects
]; 