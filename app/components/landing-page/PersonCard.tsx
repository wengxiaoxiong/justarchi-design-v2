'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface PersonCardProps {
  name: string;
  nameEn?: string;
  title: string;
  description?: string;
  variants?: Variants;
}

const PersonCard: React.FC<PersonCardProps> = ({
  name,
  nameEn,
  title,
  description,
  variants
}) => {
  return (
    <motion.div
      className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300"
      variants={variants}
      whileHover={{ y: -4 }}
    >
      {/* 内容区域 */}
      <div className="p-4 md:p-6 text-center">
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">{name}</h3>
        {nameEn && <p className="text-sm text-gray-500 mb-3">{nameEn}</p>}
        <span className="inline-block mb-3 px-3 py-1 text-xs md:text-sm text-white bg-black rounded-full">
          {title}
        </span>
        {description && (
          <p className="text-sm text-gray-600 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default PersonCard;
