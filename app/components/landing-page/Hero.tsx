import React from 'react';

const Hero: React.FC = () => {
  // 平滑滚动到指定section的函数
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section id="home" className="relative h-screen">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E6%B1%9F%E5%B1%B1-X6lmEL6ax3hR1Mwvd3b7NJpjpzdOI4.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent md:to-transparent" />
      </div>
      <div className="relative h-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="absolute bottom-12 sm:bottom-12 md:bottom-16 lg:bottom-20 xl:bottom-24 2xl:bottom-32 left-4 sm:left-4 md:left-6 lg:left-8 xl:left-12 2xl:left-16 max-w-[360px] sm:max-w-[380px] md:max-w-[450px] lg:max-w-[520px] xl:max-w-[600px] 2xl:max-w-[680px] text-white text-left px-4 sm:px-0">
          <h1 className="font-playfair text-3xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-3 sm:mb-3 md:mb-4 lg:mb-5 xl:mb-6 leading-normal tracking-wider">
            得體設計建築師事務所
            <div className="text-lg sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light text-gray-300 mt-2">
              Justarchi
            </div>
          </h1>
          <h2 className="text-lg sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light mb-3 sm:mb-3 md:mb-4 lg:mb-5 text-gray-200 tracking-wider">
            JUSTARCHI / WENG SHI ARCHITECTS
          </h2>
          <p className="text-base sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl mb-4 sm:mb-4 md:mb-5 lg:mb-6 xl:mb-8 leading-relaxed tracking-wide font-light">
            創辦人翁獅，致力於創造融合傳統與現代的建築作品。JUST蘊含公平、正義、恰當、剛剛好的多重意涵，體現中庸之道與至善狀態的價值取向。
            <div className="text-sm sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl text-gray-300 mt-2 leading-relaxed">
              Founded by Leo Weng, we are dedicated to creating architectural works that blend tradition with modernity. JUST embodies multiple meanings of fairness, justice, appropriateness, and just-rightness, reflecting the value orientation of the golden mean and the state of perfection.
            </div>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 md:gap-4 lg:gap-5">
            <button onClick={() => {
              scrollToSection('about');
            }} className="!rounded-button bg-white text-black px-4 sm:px-3 md:px-4 lg:px-6 xl:px-8 py-3 sm:py-2 md:py-2.5 lg:py-3 text-base sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium hover:bg-gray-100 transition-colors duration-300 whitespace-nowrap shadow-lg">
              了解更多 <i className="fas fa-arrow-right ml-2 sm:ml-2" />
            </button>
            <button onClick={()=>{
              scrollToSection('architecture');
            }} className="!rounded-button border-2 border-white text-white px-4 sm:px-3 md:px-4 lg:px-6 xl:px-8 py-3 sm:py-2 md:py-2.5 lg:py-3 text-base sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium hover:bg-white hover:text-black transition-colors duration-300 whitespace-nowrap">
              查看作品
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 