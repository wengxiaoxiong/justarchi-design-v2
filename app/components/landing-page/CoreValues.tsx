import React from 'react';

interface CoreValue {
  number: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
}

const coreValues: CoreValue[] = [
  {
    number: '01',
    title: '中庸的態度',
    titleEn: 'Just Attitude',
    description: '受到藏系佛法與印度瑜伽文化影響，我們相信佛陀所倡導的中道實相觀理念，凡事過與不及都是不得體的。在實務中，我們需要在各種對立的條件與環境下找到平衡點，如造價預算與細緻度、工期，甚至甲方之間不同的觀點與看法。',
    descriptionEn: 'Influenced by Tibetan Buddhism and Indian yoga culture, we believe in the Buddha\'s concept of the Middle Way and ultimate reality. Everything that is excessive or insufficient is inappropriate. In practice, we need to find balance points under various opposing conditions and environments, such as cost budget and refinement, construction period, and even different viewpoints and opinions among clients.'
  },
  {
    number: '02',
    title: '緊湊都市主義',
    titleEn: 'Compact Urbanism',
    description: '我們希望城市不要無限制擴張，而是更緊湊地改造舊市區，通過更有效的規劃實現自然與人文的和諧共生。這種緊湊的都市主義不僅可以降低資源浪費，通過合理的規劃減少對土地與能源的浪費。',
    descriptionEn: 'We hope that cities will not expand indefinitely, but rather transform old urban areas more compactly, achieving harmonious coexistence between nature and humanity through more effective planning. This compact urbanism can not only reduce resource waste but also reduce waste of land and energy through reasonable planning.'
  },
  {
    number: '03',
    title: '傳統與現代融合',
    titleEn: 'Tradition Meets Modern',
    description: '在全球化的今日，我們探求如何將傳統文化精神做現代性的演繹。從符號的策略到空間的詮釋，我們致力於創造既保留歷史情感，又具備現代功能的建築作品。',
    descriptionEn: 'In today\'s globalized world, we explore how to make modern interpretations of traditional cultural spirit. From symbolic strategies to spatial interpretations, we are committed to creating architectural works that both preserve historical emotions and possess modern functionality.'
  }
];

const CoreValues: React.FC = () => {
  return (
    <section id="core-values" className="bg-white py-16 md:py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* 标题 */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-sm md:text-base font-medium tracking-[0.2em] text-gray-600 uppercase mb-4">
            DESIGN PHILOSOPHY
          </h2>
          <h3 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900">
            得體設計的哲學
            <div className="text-lg md:text-xl font-light text-gray-600 mt-2">
              The Philosophy of Justarchi
            </div>
          </h3>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto leading-relaxed">
            JUST蘊含公平、正義、恰當、剛剛好的多重意涵，體現了中庸之道與至善狀態的價值取向。做一個得體的設計並非容易之事。
            <div className="text-base text-gray-500 mt-2 leading-relaxed">
              JUST embodies multiple meanings of fairness, justice, appropriateness, and just-rightness, reflecting the value orientation of the golden mean and the state of perfection. Creating a just design is not an easy task.
            </div>
          </p>
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
                  <h3 className="font-playfair text-xl md:text-2xl font-light text-gray-900 mb-2 leading-tight">
                    {value.title}
                  </h3>
                  <h4 className="text-sm text-gray-500 font-medium tracking-wider uppercase mb-4">
                    {value.titleEn}
                  </h4>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed font-light mb-3">
                    {value.description}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-light">
                    {value.descriptionEn}
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