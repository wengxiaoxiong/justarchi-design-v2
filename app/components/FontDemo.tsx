import React from 'react';

const FontDemo: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-16">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Playfair Display Font Demo
          </h1>
          <p className="text-lg text-gray-600">
            一个优雅的衬线字体，适合标题和装饰性文本
          </p>
        </div>

        <div className="space-y-16">
          {/* 不同粗细 */}
          <section className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="font-playfair text-3xl font-bold mb-8 text-gray-900">字体粗细 (Font Weights)</h2>
            <div className="space-y-4">
              <p className="font-playfair text-2xl font-normal text-gray-800">Regular (400) - 建筑设计的艺术</p>
              <p className="font-playfair text-2xl font-medium text-gray-800">Medium (500) - 建筑设计的艺术</p>
              <p className="font-playfair text-2xl font-semibold text-gray-800">Semibold (600) - 建筑设计的艺术</p>
              <p className="font-playfair text-2xl font-bold text-gray-800">Bold (700) - 建筑设计的艺术</p>
              <p className="font-playfair text-2xl font-extrabold text-gray-800">Extra Bold (800) - 建筑设计的艺术</p>
              <p className="font-playfair text-2xl font-black text-gray-800">Black (900) - 建筑设计的艺术</p>
            </div>
          </section>

          {/* 斜体 */}
          <section className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="font-playfair text-3xl font-bold mb-8 text-gray-900">斜体样式 (Italic)</h2>
            <div className="space-y-4">
              <p className="font-playfair-italic text-2xl font-normal text-gray-800">Regular Italic - 建筑设计的艺术</p>
              <p className="font-playfair-italic text-2xl font-bold text-gray-800">Bold Italic - 建筑设计的艺术</p>
            </div>
          </section>

          {/* 不同大小 */}
          <section className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="font-playfair text-3xl font-bold mb-8 text-gray-900">字体大小 (Font Sizes)</h2>
            <div className="space-y-4">
              <p className="font-playfair text-sm font-semibold text-gray-800">Small (14px) - Creating Timeless Architectural Art</p>
              <p className="font-playfair text-base font-semibold text-gray-800">Base (16px) - Creating Timeless Architectural Art</p>
              <p className="font-playfair text-lg font-semibold text-gray-800">Large (18px) - Creating Timeless Architectural Art</p>
              <p className="font-playfair text-xl font-semibold text-gray-800">XL (20px) - Creating Timeless Architectural Art</p>
              <p className="font-playfair text-2xl font-semibold text-gray-800">2XL (24px) - Creating Timeless Architectural Art</p>
              <p className="font-playfair text-3xl font-semibold text-gray-800">3XL (30px) - Creating Timeless Architectural Art</p>
              <p className="font-playfair text-4xl font-semibold text-gray-800">4XL (36px) - Creating Timeless Architectural Art</p>
              <p className="font-playfair text-5xl font-semibold text-gray-800">5XL (48px) - Timeless Architecture</p>
              <p className="font-playfair text-6xl font-semibold text-gray-800">6XL (60px) - Architecture</p>
            </div>
          </section>

          {/* 实际应用示例 */}
          <section className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="font-playfair text-3xl font-bold mb-8 text-gray-900">实际应用示例</h2>
            <div className="space-y-8">
              {/* 主标题 */}
              <div>
                <h3 className="text-lg font-medium text-gray-600 mb-2">主标题样式</h3>
                <h1 className="font-playfair text-5xl font-bold text-gray-900 leading-tight">
                  JUSTARCHI DESIGN
                </h1>
              </div>

              {/* 二级标题 */}
              <div>
                <h3 className="text-lg font-medium text-gray-600 mb-2">二级标题样式</h3>
                <h2 className="font-playfair text-3xl font-semibold text-gray-800">
                  Creating Timeless Architectural Art
                </h2>
              </div>

              {/* 三级标题 */}
              <div>
                <h3 className="text-lg font-medium text-gray-600 mb-2">三级标题样式</h3>
                <h3 className="font-playfair text-xl font-medium text-gray-700">
                  A commitment to quality
                </h3>
              </div>

              {/* 引用文本 */}
              <div>
                <h3 className="text-lg font-medium text-gray-600 mb-2">引用文本样式</h3>
                <blockquote className="font-playfair-italic text-2xl font-normal text-gray-700 border-l-4 border-gray-300 pl-6">
                  &ldquo;Architecture is a visual art, and the buildings speak for themselves.&rdquo;
                </blockquote>
              </div>
            </div>
          </section>

          {/* 与其他字体的对比 */}
          <section className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="font-playfair text-3xl font-bold mb-8 text-gray-900">字体对比</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-600 mb-2">Playfair Display (新)</h3>
                <p className="font-playfair text-2xl font-semibold text-gray-800">
                  JUSTARCHI DESIGN - Creating Timeless Architectural Art
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-600 mb-2">Inter (当前默认)</h3>
                <p className="font-sans text-2xl font-semibold text-gray-800">
                  JUSTARCHI DESIGN - Creating Timeless Architectural Art
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-600 mb-2">系统衬线字体</h3>
                <p className="font-serif text-2xl font-semibold text-gray-800">
                  JUSTARCHI DESIGN - Creating Timeless Architectural Art
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default FontDemo; 