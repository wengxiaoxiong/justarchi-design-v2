'use client';

import React from 'react';
import { motion } from 'framer-motion';
import PersonCard from './PersonCard';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.1 }
  }
};

const 
About: React.FC = () => {
  const honors = [
    { title: "上海世博會阿曼館", desc: "國際招標第二名" },
    { title: "日本JCD設計大賞", desc: "與臺灣龍采合作" },
    { title: "湖南株洲天元區政中心", desc: "與上海合院合作 招標首獎" },
    { title: "揚州京華城", desc: "與上海合院合作 招標第一名" },
    { title: "228公園與萬華406", desc: "國際競圖佳作" },
    { title: "中國民族建築協會", desc: "設計影響力人物" }
  ];

  return (
    <section id="about" className="py-16 md:py-24 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* 主标题 */}
        <motion.div 
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm md:text-base font-medium tracking-[0.2em] text-gray-600 uppercase mb-4">
            ABOUT
          </h2>
          <h3 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            關於團隊
          </h3>
        </motion.div>

        {/* 團隊卡片 */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 mb-20"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {[{
            name: "翁獅（紹珉）",
            nameEn: "Leo Weng",
            title: "創辦人",
            description: "美國紐約州註冊建築師，台灣註冊建築師，英國倫敦大學巴特雷學院建築碩士，淡江大學建築系傑出系友"
          }, {
            name: "陳馥郁",
            nameEn: "Fuyu Chen",
            title: "室內設計師",
            description: "擁有30餘年空間設計經驗，擅長融合現代美學與空間機能。"
          }, {
            name: "宋偉祥",
            nameEn: "Wei-Hsiang Song",
            title: "建築設計師",
            description: "美國賓州大學建築碩士，淡江大學建築系講師，20餘年建築設計經驗"
          }].map((person, i) => (
            <motion.div key={i} variants={fadeInUp} transition={{ duration: 0.6, ease: "easeOut" }}>
              <PersonCard {...person} />
            </motion.div>
          ))}
        </motion.div>

        {/* 國際榮譽 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h4 className="text-xl md:text-2xl font-semibold text-gray-900 mb-8 text-center">
            國際設計榮譽
          </h4>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {honors.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
                variants={scaleIn}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: "0 15px 30px rgba(0,0,0,0.1)"
                }}
              >
                <h5 className="font-medium text-gray-900 mb-2">{item.title}</h5>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
