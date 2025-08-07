import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact-us" className="min-h-screen bg-black text-white flex items-center">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 lg:py-32">
        <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-10 sm:mb-16 md:mb-24 text-center">
          聯繫我們
          <div className="text-lg sm:text-xl md:text-2xl font-light text-gray-300 mt-2">
            Contact Us
          </div>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div className="space-y-10 md:space-y-16">
            <div>
              <h3 className="font-playfair text-xl sm:text-2xl font-bold mb-4 sm:mb-6">創辦人 / Founder</h3>
              <p className="text-gray-300 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg">
                翁獅/ Leo Weng<br />
                得體設計建築師事務所 創辦人<br />
                美國紐約州註冊建築師<br />
                台灣註冊建築師
                <div className="text-sm text-gray-400 mt-2 leading-relaxed">
                  Leo Weng<br />
                  Founder of Justarchi<br />
                  Registered Architect in New York State<br />
                  Taiwan Registered Architect
                </div>
              </p>
            </div>
            <div>
              <h3 className="font-playfair text-xl sm:text-2xl font-bold mb-4 sm:mb-6">學歷 / Education</h3>
              <p className="text-gray-300 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg">
                2000 英國倫敦大學巴特雷學院建築碩士<br />
                1996 淡江大學建築學士<br />
                1991 臺北市建國中學
                <div className="text-sm text-gray-400 mt-2 leading-relaxed">
                  2000 Master of Architecture, Bartlett School of Architecture, University College London<br />
                  1996 Bachelor of Architecture, Tamkang University<br />
                  1991 Taipei Municipal Jianguo High School
                </div>
              </p>
            </div>
            <div>
              <h3 className="font-playfair text-xl sm:text-2xl font-bold mb-4 sm:mb-6">國際榮譽 / Awards</h3>
              <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
                2010 上海世博會阿曼國家館國際招標第二名<br />
                日本JCD設計大賞<br />
                湖南株洲天元區政中心招標首獎<br />
                揚州京華城招標第一名<br />
                2019 淡江大學建築系傑出系友
                <div className="text-sm text-gray-400 mt-2 leading-relaxed">
                  2010 Second Place in International Tender for Shanghai Expo Oman Pavilion<br />
                  Japan JCD Design Award<br />
                  First Prize in Tender for Hunan Zhuzhou Tianyuan District Government Center<br />
                  First Place in Tender for Yangzhou Jinghua City<br />
                  2019 Outstanding Alumni of Department of Architecture, Tamkang University
                </div>
              </p>
            </div>
            <div>
              <h3 className="font-playfair text-xl sm:text-2xl font-bold mb-4 sm:mb-6">聯繫方式 / Contact</h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <i className="fab fa-weixin text-2xl sm:text-3xl"></i>
                  <span>微信号：wslion1973</span>
                </div>
                <div className="flex items-center gap-4">
                  <i className="fas fa-phone text-2xl sm:text-3xl"></i>
                  <span>电话：+886 0968608537</span>
                </div>
                <div className="flex items-center gap-4">
                  <i className="fab fa-line text-2xl sm:text-3xl"></i>
                  <span>LINE号：poohlion</span>
                </div>
                <div className="flex items-center gap-4">
                  <i className="fas fa-envelope text-2xl sm:text-3xl"></i>
                  <span>邮箱：wengshih@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6 md:space-y-8">
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-lg opacity-0 transition-opacity duration-800 ease-in-out">
              <img
                src="https://haskngpqhwuomnpw.public.blob.vercel-storage.com/%E6%B1%9F%E5%B1%B1-X6lmEL6ax3hR1Mwvd3b7NJpjpzdOI4.jpg"
                alt="Leo Weng Portrait"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <div className="text-center space-y-4">
              <p className="text-gray-300 text-sm leading-relaxed">
                &ldquo;作品遍及海峽兩岸、香港、柬埔寨、泰國等地<br />
                致力於創造融合傳統與現代的建築作品&rdquo;
                <div className="text-xs text-gray-400 mt-2 leading-relaxed">
                  &ldquo;Works span across the Taiwan Strait, Hong Kong, Cambodia, Thailand and other regions<br />
                  Dedicated to creating architectural works that blend tradition with modernity&rdquo;
                </div>
              </p>
              <button className="!rounded-button w-full bg-white text-black py-3 md:py-4 text-base md:text-lg font-medium hover:bg-gray-100 transition-colors duration-300">
                了解更多作品 <i className="fas fa-arrow-right ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 