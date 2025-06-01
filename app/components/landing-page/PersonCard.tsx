
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

const PersonCard: React.FC<PersonCardProps> = ({
  name,
  nameEn,
  title,
  image,
  description,
  variants
}) => {
  const getInitials = (name: string, nameEn?: string) => {
    if (nameEn) {
      return nameEn.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return name.slice(0, 1);
  };

  const initials = getInitials(name, nameEn);

  return (
    <motion.div
      className="max-w-sm w-full bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
      variants={variants}
      whileHover={{ y: -6 }}
    >
      {/* 头像区域 */}
      <div className="w-full h-56 bg-gray-100 flex items-center justify-center overflow-hidden">
        {image ? (
          <motion.img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-300 text-white flex items-center justify-center text-2xl font-semibold">
            {initials}
          </div>
        )}
      </div>

      {/* 内容区域 */}
      <div className="p-5 text-center">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        {nameEn && <p className="text-sm text-gray-500 mb-1">{nameEn}</p>}
        <span className="inline-block mt-1 mb-3 px-3 py-1 text-sm text-white bg-black rounded-full">
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
