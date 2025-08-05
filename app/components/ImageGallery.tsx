'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  title: string;
  aspectRatio?: 'square' | '4:3' | '16:9' | '3:2';
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  title, 
  aspectRatio = '4:3' 
}) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const aspectRatioClasses = {
    'square': 'aspect-square',
    '4:3': 'aspect-[4/3]',
    '16:9': 'aspect-[16/9]',
    '3:2': 'aspect-[3/2]'
  };

  const openPreview = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closePreview = () => {
    console.log('关闭按钮被点击');
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImage === null) return;
    
    switch (e.key) {
      case 'Escape':
        closePreview();
        break;
      case 'ArrowRight':
        nextImage();
        break;
      case 'ArrowLeft':
        prevImage();
        break;
    }
  };

  return (
    <>
      {/* 图片网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-lg cursor-pointer group ${aspectRatioClasses[aspectRatio]}`}
            onClick={() => openPreview(index)}
          >
            <Image
              src={image}
              alt={`${title} - Image ${index + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* 图片序号指示器 */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                {index + 1}/{images.length}
              </div>
            </div>

            {/* 点击提示 */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                点击查看
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 图片预览模态框 */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black/95 z-[9999]"
          onKeyDown={handleKeyDown}
          onClick={closePreview}
          tabIndex={0}
        >
          {/* 关闭按钮 */}
          <div className="absolute top-4 right-4 z-[10000]">
            <button
              onClick={closePreview}
              className="text-white hover:text-gray-300 transition-colors bg-black/40 hover:bg-black/60 rounded-full p-3 backdrop-blur cursor-pointer border border-white/20"
              type="button"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 图片容器 */}
          <div 
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[selectedImage]}
              alt={`${title} - Image ${selectedImage + 1}`}
              fill
              className="object-contain"
              priority
            />
            {/* 图片信息 */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm z-[10000]">
              {selectedImage + 1} / {images.length}
            </div>
          </div>

          {/* 导航按钮 */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-0 top-1/2 -translate-y-1/2 h-full flex items-center px-2 sm:px-4 z-[10000] cursor-pointer"
                style={{outline: 'none'}}
              >
                <span className="bg-black/40 hover:bg-black/60 rounded-full p-2 sm:p-3 flex items-center justify-center backdrop-blur">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </span>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-0 top-1/2 -translate-y-1/2 h-full flex items-center px-2 sm:px-4 z-[10000] cursor-pointer"
                style={{outline: 'none'}}
              >
                <span className="bg-black/40 hover:bg-black/60 rounded-full p-2 sm:p-3 flex items-center justify-center backdrop-blur">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </>
          )}

          {/* 键盘提示 */}
          <div className="absolute bottom-4 right-4 text-white/60 text-xs z-[10000]">
            使用 ← → 键浏览，ESC 关闭
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery; 