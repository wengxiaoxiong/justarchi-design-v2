import React from 'react';

interface ProjectLocation {
  name: string;
  nameEn: string;
  projects: number;
  featured?: boolean;
}

const projectLocations: ProjectLocation[] = [
  { name: '台北', nameEn: 'Taipei', projects: 5, featured: true },
  { name: '上海', nameEn: 'Shanghai', projects: 8, featured: true },
  { name: '北京', nameEn: 'Beijing', projects: 3 },
  { name: '揚州', nameEn: 'Yangzhou', projects: 4, featured: true },
  { name: '蘇州', nameEn: 'Suzhou', projects: 3 },
  { name: '鄭州', nameEn: 'Zhengzhou', projects: 2 },
  { name: '南京', nameEn: 'Nanjing', projects: 2 },
  { name: '合肥', nameEn: 'Hefei', projects: 1 },
  { name: '長沙', nameEn: 'ChangSha', projects: 1 },
  { name: '廣州', nameEn: 'Guangzhou', projects: 2 },
  { name: '香港', nameEn: 'Hong Kong', projects: 1 },
  { name: '曼谷', nameEn: 'Bangkok', projects: 2 },
  { name: '柬埔寨', nameEn: 'Cambodia', projects: 1 }
];

const ProjectDistribution: React.FC = () => {
  const totalProjects = projectLocations.reduce((sum, location) => sum + location.projects, 0);

  return (
    <section id="project-distribution" className="py-16 md:py-24 lg:py-32 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* 标题 */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-sm md:text-base font-medium tracking-[0.2em] text-gray-400 uppercase mb-4">
            PROJECT DISTRIBUTION
          </h2>
          <h3 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
            項目分佈
          </h3>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            作品遍及海峽兩岸、香港、柬埔寨、泰國等地，總計 {totalProjects} 個重要項目
          </p>
        </div>

        {/* 统计概览 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">{totalProjects}+</div>
            <div className="text-gray-400">完成項目</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">5+</div>
            <div className="text-gray-400">地區覆蓋</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">{projectLocations.length}</div>
            <div className="text-gray-400">城市覆蓋</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">20+</div>
            <div className="text-gray-400">年經驗</div>
          </div>
        </div>

        {/* 地理分布 */}
        <div className="mb-16">
          <h4 className="text-xl font-semibold text-white mb-8 text-center">項目地理分布</h4>
          
          {/* 重點項目區域 */}
          <div className="mb-12">
            <h5 className="text-lg font-medium text-blue-400 mb-6">重點項目城市</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectLocations.filter(location => location.featured).map((location) => (
                <div 
                  key={location.name}
                  className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 p-6 rounded-lg hover:from-blue-500/30 hover:to-blue-600/20 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h6 className="text-lg font-semibold text-white">{location.name}</h6>
                      <p className="text-sm text-blue-300">{location.nameEn}</p>
                    </div>
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      重點
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-white">{location.projects}</div>
                    <div className="text-sm text-gray-300">個項目</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 其他項目區域 */}
          <div>
            <h5 className="text-lg font-medium text-gray-300 mb-6">其他項目</h5>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {projectLocations.filter(location => !location.featured).map((location) => (
                <div 
                  key={location.name}
                  className="bg-gray-800/50 p-4 rounded-lg hover:bg-gray-700/50 transition-all duration-300 border border-gray-700/50"
                >
                  <div className="text-center">
                    <h6 className="font-medium text-white mb-1">{location.name}</h6>
                    <p className="text-xs text-gray-400 mb-2">{location.nameEn}</p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-lg font-semibold text-white">{location.projects}</span>
                      <span className="text-xs text-gray-400">項目</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 重要里程碑 */}
        <div className="mt-20">
          <h4 className="text-xl font-semibold text-white mb-8 text-center">重要里程碑</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-blue-400 mb-2">2010</div>
              <h5 className="font-medium text-white mb-2">上海世博會阿曼館</h5>
              <p className="text-sm text-gray-400">國際招標第二名</p>
            </div>
            <div className="text-center p-6 bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-green-400 mb-2">2016</div>
              <h5 className="font-medium text-white mb-2">揚州京華城</h5>
              <p className="text-sm text-gray-400">招標第一名</p>
            </div>
            <div className="text-center p-6 bg-gray-800/50 rounded-lg">
              <div className="text-2xl font-bold text-orange-400 mb-2">2019</div>
              <h5 className="font-medium text-white mb-2">淡江大學</h5>
              <p className="text-sm text-gray-400">傑出系友</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDistribution; 