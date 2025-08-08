import React from 'react';
import WorldMap from "react-svg-worldmap";

interface ProjectLocation {
  name: string;
  nameEn: string;
  projects: number;
  featured?: boolean;
  countryCode?: string;
}

const projectLocations: ProjectLocation[] = [
  { name: '台北', nameEn: 'Taipei', projects: 5, featured: true, countryCode: 'tw' },
  { name: '上海', nameEn: 'Shanghai', projects: 8, featured: true, countryCode: 'cn' },
  { name: '北京', nameEn: 'Beijing', projects: 3, countryCode: 'cn' },
  { name: '揚州', nameEn: 'Yangzhou', projects: 4, featured: true, countryCode: 'cn' },
  { name: '蘇州', nameEn: 'Suzhou', projects: 3, countryCode: 'cn' },
  { name: '鄭州', nameEn: 'Zhengzhou', projects: 2, countryCode: 'cn' },
  { name: '南京', nameEn: 'Nanjing', projects: 2, countryCode: 'cn' },
  { name: '合肥', nameEn: 'Hefei', projects: 1, countryCode: 'cn' },
  { name: '長沙', nameEn: 'ChangSha', projects: 1, countryCode: 'cn' },
  { name: '廣州', nameEn: 'Guangzhou', projects: 2, countryCode: 'cn' },
  { name: '香港', nameEn: 'Hong Kong', projects: 1, countryCode: 'hk' },
  { name: '曼谷', nameEn: 'Bangkok', projects: 3, countryCode: 'th' },
  { name: '柬埔寨', nameEn: 'Cambodia', projects: 1, countryCode: 'kh' }
];

const ProjectDistribution: React.FC = () => {
  const totalProjects = projectLocations.reduce((sum, location) => sum + location.projects, 0);

  // 根据项目位置生成地图数据
  const generateMapData = () => {
    const countryProjects: { [key: string]: number } = {};
    
    // 聚合每个国家的项目数量
    projectLocations.forEach(location => {
      if (location.countryCode) {
        const countryCode = location.countryCode.toLowerCase();
        countryProjects[countryCode] = (countryProjects[countryCode] || 0) + location.projects;
      }
    });

    // 转换为 WorldMap 需要的格式，使用统一的值以显示相同颜色
    return Object.entries(countryProjects).map(([country]) => ({
      country,
      value: 1 // 使用统一值，让所有国家显示相同颜色
    }));
  };

  const mapData = generateMapData();

  // 自定义国家名称显示
  const getCountryDisplayName = (countryCode: string) => {
    const countryNames: { [key: string]: string } = {
      'cn': '中国大陆',
      'tw': '台湾地区',
      'hk': '香港特别行政区',
      'th': '泰国',
      'kh': '柬埔寨'
    };
    return countryNames[countryCode.toLowerCase()] || countryCode;
  };

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
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">100+</div>
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
          <h4 className="text-xl font-semibold text-white mb-8 text-center">詳細項目分布</h4>
          
          {/* 世界地图 */}
          <div className="mb-12 flex justify-center">
            <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700/50 overflow-hidden">
              <div className="scale-[2] translate-x-[-200%] -translate-y-[5%] sm:scale-200 sm:translate-x-[-300px] sm:translate-y-0" style={{ transformOrigin: 'center' }}>
                <WorldMap 
                  color="#3b82f6" 
                  valueSuffix=" 個項目" 
                  size={600}
                  data={mapData}
                  backgroundColor="transparent"
                  tooltipBgColor="#1f2937"
                  tooltipTextColor="#ffffff"
                  valuePrefix=""
                  borderColor="#6b7280"
                  strokeOpacity={0.8}
                  frame={false}
                  richInteraction={true}
                  tooltipTextFunction={(context) => {
                    // 获取该国家的实际项目数量
                    const countryCode = context.countryCode.toLowerCase();
                    const actualProjects = projectLocations
                      .filter(location => location.countryCode?.toLowerCase() === countryCode)
                      .reduce((sum, location) => sum + location.projects, 0);
                    return `${getCountryDisplayName(context.countryCode)}: ${actualProjects} 個項目`;
                  }}
                />
              </div>
            </div>
          </div>

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
      </div>
    </section>
  );
};

export default ProjectDistribution; 