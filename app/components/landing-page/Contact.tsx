import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact-us" className="min-h-screen bg-black text-white flex items-center">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 lg:py-32">
        <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold mb-10 sm:mb-16 md:mb-24 text-center">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <div className="space-y-10 md:space-y-16">
            <div>
              <h3 className="font-playfair text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Studio Address</h3>
              <p className="text-gray-300 mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg">
                1000 Century Avenue, Pudong New Area<br />
                88F, Shanghai World Financial Center<br />
                Shanghai, 200120, China
              </p>
            </div>
            <div>
              <h3 className="font-playfair text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Contact Information</h3>
              <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
                Tel: +86 21 5888 8888<br />
                Email: contact@justarchi-design.com<br />
                Working Hours: Mon-Fri 9:00-18:00
              </p>
            </div>
            <div>
              <h3 className="font-playfair text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Social Media</h3>
              <div className="flex gap-6">
                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                  <i className="fab fa-weixin text-2xl sm:text-3xl"></i>
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                  <i className="fab fa-weibo text-2xl sm:text-3xl"></i>
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                  <i className="fab fa-linkedin text-2xl sm:text-3xl"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="space-y-6 md:space-y-8">
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-lg opacity-0 transition-opacity duration-800 ease-in-out">
              <img
                src="https://ai-public.mastergo.com/ai/img_res/eead2060bab466c68e9e3ebbbbb77b6b.jpg"
                alt="Office"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>
            <button className="!rounded-button w-full bg-white text-black py-3 md:py-4 text-base md:text-lg font-medium hover:bg-gray-100 transition-colors duration-300">
              Get in Touch <i className="fas fa-arrow-right ml-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 