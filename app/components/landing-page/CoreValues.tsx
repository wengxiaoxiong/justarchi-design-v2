import React from 'react';

interface CoreValue {
  number: string;
  title: string;
  description: string;
}

const coreValues: CoreValue[] = [
  {
    number: '01',
    title: 'A commitment to quality',
    description: 'We specialize in exceptional boutique properties focused on quality and are uniquely structured to develop and maintain valuable real estate.'
  },
  {
    number: '02',
    title: 'Hands on approach',
    description: 'Having successfully sourced, repositioned, managed, and sold some of Boston\'s most beautiful real estate, we have a proven track record of performance through our direct involvement with our assets.'
  },
  {
    number: '03',
    title: 'Family values with institutional expertise',
    description: 'Our approach has been born from family-valued real estate. Working closely with institutional-level investors, we have the structure to satisfy sophisticated requirements while focusing on long-term value, hard work, discipline, and integrity.'
  }
];

const CoreValues: React.FC = () => {
  return (
    <section id="core-values" className="bg-white py-16 md:py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* 标题 */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-sm md:text-base font-medium tracking-[0.2em] text-gray-600 uppercase">
            CORE VALUES
          </h2>
        </div>

        {/* 核心价值列表 - 横向排列 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {coreValues.map((value) => (
            <div key={value.title} className="group opacity-0 transition-all duration-800 ease-in-out" data-scroll>
              <div className="text-center md:text-left">
                {/* 数字编号 */}
                <div className="mb-6">
                  <span className="text-5xl md:text-6xl font-light text-gray-200 leading-none">
                    {value.number}
                  </span>
                </div>

                {/* 内容区域 */}
                <div>
                  <h3 className="font-playfair text-xl md:text-2xl font-light text-gray-900 mb-4 leading-tight">
                    {value.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed font-light">
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues; 