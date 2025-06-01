import React from 'react';

interface ProjectDetailProps {
  title: string;
  titleEn?: string;
  location: string;
  year?: string;
  area?: string;
  client?: string;
  status?: string;
  description: string;
  concept?: string;
  images: string[];
  type: 'architecture' | 'interior' | 'planning';
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({
  title,
  titleEn,
  location,
  year,
  area,
  client,
  status,
  description,
  concept,
  images,
  type
}) => {
  const getTypeColor = () => {
    switch (type) {
      case 'architecture':
        return 'bg-blue-500';
      case 'interior':
        return 'bg-green-500';
      case 'planning':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getTypeName = () => {
    switch (type) {
      case 'architecture':
        return '建築設計';
      case 'interior':
        return '室內設計';
      case 'planning':
        return '城市規劃';
      default:
        return '設計項目';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* 主图片 */}
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className={`${getTypeColor()} text-white px-3 py-1 rounded-full text-sm font-medium`}>
            {getTypeName()}
          </span>
        </div>
      </div>

      {/* 项目信息 */}
      <div className="p-6 md:p-8">
        <div className="mb-6">
          <h3 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {title}
          </h3>
          {titleEn && (
            <h4 className="text-lg text-gray-600 mb-3">{titleEn}</h4>
          )}
          <p className="text-gray-500 font-medium">{location}</p>
        </div>

        {/* 项目详情 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          {year && (
            <div>
              <h5 className="text-sm font-medium text-gray-500 mb-1">年份</h5>
              <p className="text-gray-900">{year}</p>
            </div>
          )}
          {area && (
            <div>
              <h5 className="text-sm font-medium text-gray-500 mb-1">面積</h5>
              <p className="text-gray-900">{area}</p>
            </div>
          )}
          {client && (
            <div>
              <h5 className="text-sm font-medium text-gray-500 mb-1">業主</h5>
              <p className="text-gray-900">{client}</p>
            </div>
          )}
          {status && (
            <div>
              <h5 className="text-sm font-medium text-gray-500 mb-1">狀態</h5>
              <p className="text-gray-900">{status}</p>
            </div>
          )}
        </div>

        {/* 设计概念 */}
        {concept && (
          <div className="mb-6">
            <h5 className="text-lg font-semibold text-gray-900 mb-3">設計概念</h5>
            <p className="text-gray-600 leading-relaxed">{concept}</p>
          </div>
        )}

        {/* 项目描述 */}
        <div className="mb-6">
          <h5 className="text-lg font-semibold text-gray-900 mb-3">項目描述</h5>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>

        {/* 更多图片 */}
        {images.length > 1 && (
          <div>
            <h5 className="text-lg font-semibold text-gray-900 mb-3">更多圖片</h5>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.slice(1).map((image, index) => (
                <div key={index} className="relative overflow-hidden rounded-lg aspect-square">
                  <img
                    src={image}
                    alt={`${title} - ${index + 2}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 相关链接 */}
        <div className="mt-8 flex gap-4">
          <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors">
            查看更多作品
          </button>
          <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-50 transition-colors">
            聯繫我們
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail; 