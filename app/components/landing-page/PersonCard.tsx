'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface PersonCardProps {
  name: string;
  nameEn?: string;
  title: string;
  image?: string;
  description?: string;
  variants?: Variants;
}

// 黑灰色調配色方案
const gradientColors = [
  'from-gray-800 to-gray-900',
  'from-slate-700 to-gray-800',
  'from-zinc-800 to-slate-900',
  'from-gray-700 to-zinc-800',
  'from-slate-800 to-zinc-900',
  'from-gray-900 to-black'
];

const PersonCard: React.FC<PersonCardProps> = ({
  name,
  nameEn,
  title,
  image,
  description,
  variants
}) => {
  // 根據姓名生成一致的顏色
  const colorIndex = name.length % gradientColors.length;
  const gradientClass = gradientColors[colorIndex];
  
  // 提取姓名首字母
  const getInitials = (name: string, nameEn?: string) => {
    if (nameEn) {
      return nameEn.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return name.slice(0, 1);
  };

  const initials = getInitials(name, nameEn);

  return (
    <motion.div 
      className="group bg-gray-900 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-800"
      variants={variants}
      whileHover={{ y: -8 }}
    >
      {/* 頭像區域 */}
      <div className="relative overflow-hidden">
        {image ? (
          <motion.img
            src={image}
            alt={name}
            className="w-full h-[280px] object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <motion.div 
            className={`w-full h-[280px] bg-gradient-to-br ${gradientClass} flex items-center justify-center relative overflow-hidden`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* 背景裝飾圓圈 */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-white/5 rounded-full blur-sm"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-sm"></div>
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/3 rounded-full blur-lg transform -translate-x-1/2 -translate-y-1/2"></div>
            
            {/* 主要內容 */}
            <div className="relative z-10 text-center">
              <motion.div 
                className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto border border-white/20"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-3xl font-bold text-gray-100">{initials}</span>
              </motion.div>
              <motion.div 
                className="px-4"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                <h4 className="text-gray-100 font-medium text-lg mb-1">{name}</h4>
                {nameEn && <p className="text-gray-300 text-sm">{nameEn}</p>}
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>

      {/* 內容區域 */}
      <div className="p-6">
        {/* 職位 */}
        <div className="text-center mb-4">
          <motion.h3 
            className="text-xl font-semibold text-gray-100 mb-2"
            whileHover={{ scale: 1.02 }}
          >
            {!image && name}
          </motion.h3>
          <div className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-gray-800 text-gray-300 border border-gray-700">
            {title}
          </div>
        </div>
        
        {/* 描述 */}
        {description && (
          <motion.div 
            className="text-gray-400 text-sm leading-relaxed text-center"
            initial={{ opacity: 0.9 }}
            whileHover={{ opacity: 1 }}
          >
            <p>{description}</p>
          </motion.div>
        )}
      </div>
      
      {/* 底部裝飾線 */}
      <div className="h-1 bg-gradient-to-r from-gray-600 to-gray-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
    </motion.div>
  );
};

export default PersonCard; 