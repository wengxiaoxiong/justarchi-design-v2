import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://ai-public.mastergo.com/ai/img_res/57ddd066c3326a2c37bc90c0245a2e96.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent md:to-transparent" />
      </div>
      <div className="relative h-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 flex items-center">
        <div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl text-white">
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight tracking-wide">
            得體設計建築師事務所
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-4 text-gray-200">
            JUSTARCHI / WENG SHI ARCHITECTS
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 md:mb-12 leading-relaxed tracking-wide font-light">
            創辦人翁獅，致力於創造融合傳統與現代的建築作品。JUST蘊含公平、正義、恰當、剛剛好的多重意涵，體現中庸之道與至善狀態的價值取向。
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="!rounded-button bg-white text-black px-4 sm:px-6 md:px-8 py-2 md:py-3 text-sm md:text-lg font-medium hover:bg-gray-100 transition-colors duration-300 whitespace-nowrap">
              了解更多 <i className="fas fa-arrow-right ml-2" />
            </button>
            <button className="!rounded-button border border-white text-white px-4 sm:px-6 md:px-8 py-2 md:py-3 text-sm md:text-lg font-medium hover:bg-white hover:text-black transition-colors duration-300 whitespace-nowrap">
              查看作品
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 