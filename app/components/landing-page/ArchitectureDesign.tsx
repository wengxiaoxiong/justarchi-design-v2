import React from 'react';
import ProjectCard from './ProjectCard';

interface ArchitectureProject {
  title: string;
  location: string;
  image: string;
  className: string;
}

const architectureProjects: ArchitectureProject[] = [
  {
    title: '揚州京華城商業步行街',
    location: 'Yangzhou Commercial District',
    image: 'https://ai-public.mastergo.com/ai/img_res/1f901132cd16c0ccd2730052c4eac87d.jpg',
    className: 'col-span-12 md:col-span-5 row-span-1 md:row-span-2 opacity-0 transition-opacity duration-800 ease-in-out'
  },
  {
    title: '上海世博會阿曼館',
    location: 'Shanghai Expo Oman Pavilion',
    image: 'https://ai-public.mastergo.com/ai/img_res/bde3964509e62b92e25e030dd396efef.jpg',
    className: 'col-span-12 md:col-span-7 opacity-0 transition-opacity duration-800 ease-in-out'
  },
  {
    title: '鄭州城市綜合體',
    location: 'Zhengzhou Urban Complex',
    image: 'https://ai-public.mastergo.com/ai/img_res/81a525b7ecfaf07ec2c5fc188be7a6b6.jpg',
    className: 'col-span-12 sm:col-span-6 md:col-span-4 opacity-0 transition-opacity duration-800 ease-in-out'
  },
  {
    title: '蘇州河城市設計',
    location: 'Suzhou River Urban Design',
    image: 'https://ai-public.mastergo.com/ai/img_res/f2355ba9f80dd8be3b0f72a15fd0751f.jpg',
    className: 'col-span-12 sm:col-span-6 md:col-span-3 opacity-0 transition-opacity duration-800 ease-in-out'
  }
];

const interiorProjects: ArchitectureProject[] = [
  {
    title: '法國哈金森 Fab House',
    location: 'Hutchinson Fab House, Suzhou',
    image: 'https://ai-public.mastergo.com/ai/img_res/57ddd066c3326a2c37bc90c0245a2e96.jpg',
    className: 'col-span-12 md:col-span-6 opacity-0 transition-opacity duration-800 ease-in-out'
  },
  {
    title: '桃園崇德佛堂',
    location: 'Taoyuan Chongde Buddha Hall',
    image: 'https://ai-public.mastergo.com/ai/img_res/bde3964509e62b92e25e030dd396efef.jpg',
    className: 'col-span-12 md:col-span-6 opacity-0 transition-opacity duration-800 ease-in-out'
  }
];

const planningProjects: ArchitectureProject[] = [
  {
    title: '莆田白塘湖旅遊規劃',
    location: 'Putian Baitang Lake Tourism Plan',
    image: 'https://ai-public.mastergo.com/ai/img_res/81a525b7ecfaf07ec2c5fc188be7a6b6.jpg',
    className: 'col-span-12 md:col-span-4 opacity-0 transition-opacity duration-800 ease-in-out'
  },
  {
    title: '上海吳中路地鐵上蓋',
    location: 'Shanghai Wuzhong Rd Metro TOD',
    image: 'https://ai-public.mastergo.com/ai/img_res/f2355ba9f80dd8be3b0f72a15fd0751f.jpg',
    className: 'col-span-12 md:col-span-4 opacity-0 transition-opacity duration-800 ease-in-out'
  },
  {
    title: '萬華區政中心規劃',
    location: 'Wanhua Municipal Center Plan',
    image: 'https://ai-public.mastergo.com/ai/img_res/1f901132cd16c0ccd2730052c4eac87d.jpg',
    className: 'col-span-12 md:col-span-4 opacity-0 transition-opacity duration-800 ease-in-out'
  }
];

const ArchitectureDesign: React.FC = () => {
  return (
    <section id="architecture" className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        {/* 建築設計 */}
        <div className="mb-20">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-center text-black">建築設計</h2>
          <p className="text-center text-gray-600 mb-8 md:mb-12 lg:mb-16">Architecture Design</p>
          <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
            {architectureProjects.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                subtitle={project.location}
                image={project.image}
                className={project.className}
                gradientColors={{
                  top: 'bg-blue-500/10',
                  bottom: 'bg-purple-500/10'
                }}
              />
            ))}
          </div>
        </div>

        {/* 室內設計 */}
        <div className="mb-20" id="interior">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-center text-black">室內設計</h2>
          <p className="text-center text-gray-600 mb-8 md:mb-12 lg:mb-16">Interior Design</p>
          <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
            {interiorProjects.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                subtitle={project.location}
                image={project.image}
                className={project.className}
                gradientColors={{
                  top: 'bg-green-500/10',
                  bottom: 'bg-blue-500/10'
                }}
              />
            ))}
          </div>
        </div>

        {/* 城市規劃 */}
        <div id="planning">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-center text-black">城市規劃</h2>
          <p className="text-center text-gray-600 mb-8 md:mb-12 lg:mb-16">Urban Planning</p>
          <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
            {planningProjects.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                subtitle={project.location}
                image={project.image}
                className={project.className}
                gradientColors={{
                  top: 'bg-orange-500/10',
                  bottom: 'bg-red-500/10'
                }}
              />
            ))}
          </div>
        </div>

        <div className="col-span-12 mt-12 md:mt-16">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureDesign; 