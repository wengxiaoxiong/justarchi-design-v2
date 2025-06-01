import { ArchitectureProject } from '../types';

export const architectureProjects: ArchitectureProject[] = [
  {
    id: 'arch-001',
    title: '揚州京華城商業步行街',
    location: 'Yangzhou Commercial District',
    image: 'https://ai-public.mastergo.com/ai/img_res/1f901132cd16c0ccd2730052c4eac87d.jpg',
    className: 'col-span-12 md:col-span-5 row-span-1 md:row-span-2 opacity-0 transition-opacity duration-800 ease-in-out',
    category: 'architecture'
  },
  {
    id: 'arch-002',
    title: '上海世博會阿曼館',
    location: 'Shanghai Expo Oman Pavilion',
    image: 'https://ai-public.mastergo.com/ai/img_res/bde3964509e62b92e25e030dd396efef.jpg',
    className: 'col-span-12 md:col-span-7 opacity-0 transition-opacity duration-800 ease-in-out',
    category: 'architecture'
  },
  {
    id: 'arch-003',
    title: '鄭州城市綜合體',
    location: 'Zhengzhou Urban Complex',
    image: 'https://ai-public.mastergo.com/ai/img_res/81a525b7ecfaf07ec2c5fc188be7a6b6.jpg',
    className: 'col-span-12 sm:col-span-6 md:col-span-4 opacity-0 transition-opacity duration-800 ease-in-out',
    category: 'architecture'
  },
  {
    id: 'arch-004',
    title: '蘇州河城市設計',
    location: 'Suzhou River Urban Design',
    image: 'https://ai-public.mastergo.com/ai/img_res/f2355ba9f80dd8be3b0f72a15fd0751f.jpg',
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
    image: 'https://ai-public.mastergo.com/ai/img_res/57ddd066c3326a2c37bc90c0245a2e96.jpg',
    className: 'col-span-12 md:col-span-6 opacity-0 transition-opacity duration-800 ease-in-out',
    category: 'interior'
  },
  {
    id: 'int-002',
    title: '桃園崇德佛堂',
    location: 'Taoyuan Chongde Buddha Hall',
    image: 'https://ai-public.mastergo.com/ai/img_res/bde3964509e62b92e25e030dd396efef.jpg',
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
    image: 'https://ai-public.mastergo.com/ai/img_res/81a525b7ecfaf07ec2c5fc188be7a6b6.jpg',
    className: 'col-span-12 md:col-span-4 opacity-0 transition-opacity duration-800 ease-in-out',
    category: 'planning'
  },
  {
    id: 'plan-002',
    title: '上海吳中路地鐵上蓋',
    location: 'Shanghai Wuzhong Rd Metro TOD',
    image: 'https://ai-public.mastergo.com/ai/img_res/f2355ba9f80dd8be3b0f72a15fd0751f.jpg',
    className: 'col-span-12 md:col-span-4 opacity-0 transition-opacity duration-800 ease-in-out',
    category: 'planning'
  },
  {
    id: 'plan-003',
    title: '萬華區政中心規劃',
    location: 'Wanhua Municipal Center Plan',
    image: 'https://ai-public.mastergo.com/ai/img_res/1f901132cd16c0ccd2730052c4eac87d.jpg',
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