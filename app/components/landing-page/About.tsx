import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 lg:py-32 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* 主标题 */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-sm md:text-base font-medium tracking-[0.2em] text-gray-600 uppercase mb-4">
            ABOUT
          </h2>
          <h3 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900">
            關於翁紹珉
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* 左侧图片 */}
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src="https://ai-public.mastergo.com/ai/img_res/eead2060bab466c68e9e3ebbbbb77b6b.jpg"
                alt="Leo Weng"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">翁紹珉（獅）</h4>
              <p className="text-gray-600">Leo Weng</p>
              <p className="text-gray-600">得體設計建築師事務所 創辦人</p>
            </div>
          </div>

          {/* 右侧内容 */}
          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">設計理念</h4>
              <p className="text-gray-600 leading-relaxed mb-4">
                JUST這個詞蘊含公平、正義、恰當、剛剛好的多重意涵，體現了中庸之道與至善狀態的價值取向。做一個得體的設計並非容易之事，無論是公共或私人項目，營建的過程大部分都是極為昂貴的成本。
              </p>
              <p className="text-gray-600 leading-relaxed">
                我曾經參加藏系佛法的菩提道次第廣論班6年，也斷續到印度班加羅爾學習了幾年吠陀文化最後成了印度的瑜伽老師。其實佛陀所倡導的中道實相觀理念，與儒家思想的中庸之道不謀而合。
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">專業資歷</h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-600">美國紐約州註冊建築師</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-600">台灣註冊建築師</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-600">淡江大學建築系傑出系友 (2019)</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">教學經歷</h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-600">2001-2003 淡江大學建築系設計課</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-600">中原大學、台灣科技大學課評</p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <p className="text-gray-600">Archigram國際建築營</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 展览和出版 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <h4 className="text-xl font-semibold text-gray-900 mb-6">個人展覽</h4>
            <div className="space-y-4">
              <div className="border-l-4 border-gray-300 pl-4">
                <h5 className="font-medium text-gray-900">2016</h5>
                <p className="text-gray-600">上海nana大房子個人建築展</p>
              </div>
              <div className="border-l-4 border-gray-300 pl-4">
                <h5 className="font-medium text-gray-900">2013</h5>
                <p className="text-gray-600">台南總爺文化中心建築展</p>
              </div>
              <div className="border-l-4 border-gray-300 pl-4">
                <h5 className="font-medium text-gray-900">2012</h5>
                <p className="text-gray-600">國家文官學院個人建築展</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold text-gray-900 mb-6">建築刊物發表</h4>
            <div className="space-y-4">
              <div className="border-l-4 border-gray-300 pl-4">
                <h5 className="font-medium text-gray-900">2017</h5>
                <p className="text-gray-600">台灣建築雜誌</p>
              </div>
              <div className="border-l-4 border-gray-300 pl-4">
                <h5 className="font-medium text-gray-900">2016</h5>
                <p className="text-gray-600">台灣建築 vol.200</p>
              </div>
              <div className="border-l-4 border-gray-300 pl-4">
                <h5 className="font-medium text-gray-900">2003</h5>
                <p className="text-gray-600">MVRDV 建築師雜誌</p>
              </div>
            </div>
          </div>
        </div>

        {/* 国际荣誉 */}
        <div>
          <h4 className="text-xl font-semibold text-gray-900 mb-6 text-center">國際設計榮譽</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h5 className="font-medium text-gray-900 mb-2">上海世博會阿曼館</h5>
              <p className="text-gray-600 text-sm">國際招標第二名 (2010)</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h5 className="font-medium text-gray-900 mb-2">日本JCD設計大賞</h5>
              <p className="text-gray-600 text-sm">與臺灣龍采合作</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h5 className="font-medium text-gray-900 mb-2">湖南株洲天元區政中心</h5>
              <p className="text-gray-600 text-sm">招標首獎</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h5 className="font-medium text-gray-900 mb-2">揚州京華城</h5>
              <p className="text-gray-600 text-sm">招標第一名</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h5 className="font-medium text-gray-900 mb-2">228公園與萬華406</h5>
              <p className="text-gray-600 text-sm">國際競圖佳作</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h5 className="font-medium text-gray-900 mb-2">中國民族建築協會</h5>
              <p className="text-gray-600 text-sm">設計影響力人物</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 