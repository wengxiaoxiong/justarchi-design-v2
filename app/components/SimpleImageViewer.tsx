'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { createPortal } from 'react-dom';

const OPEN_FULL_IMAGE_LABEL = '點擊查看大圖';

interface SimpleImageViewerProps {
  images: string[];
  title: string;
  projectId: string;
}

export default function SimpleImageViewer({ images, title, projectId }: SimpleImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const openFullscreen = (index: number) => {
    setCurrentIndex(index);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // 键盘事件处理
  React.useEffect(() => {
    if (!isFullscreen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          closeFullscreen();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // 组件挂载检测
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // 阻止滚动
  React.useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isFullscreen]);

  return (
    <div>
      {/* 主图展示 */}
      <div className="mb-8">
        <div 
          className="relative aspect-[16/9] overflow-hidden rounded-lg cursor-pointer group bg-gray-100"
          onClick={() => openFullscreen(currentIndex)}
        >
          <Image
            src={images[currentIndex]}
            alt={`${title} - 主图 ${currentIndex + 1}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            priority
          />
          {/* 悬停遮罩 */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
          
          {/* 点击提示 */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 backdrop-blur-sm text-gray-800 px-6 py-3 rounded-full font-medium shadow-lg">
              {OPEN_FULL_IMAGE_LABEL}
            </div>
          </div>

          {/* 图片计数 */}
          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>

      {/* 缩略图网格 */}
      {images.length > 1 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {images.map((image, index) => (
            <button
              key={`${projectId}-thumb-${index}`}
              onClick={() => setCurrentIndex(index)}
              className={`relative aspect-square overflow-hidden rounded-lg transition-all duration-300 ${
                index === currentIndex 
                  ? 'ring-2 ring-blue-500 ring-offset-2' 
                  : 'hover:ring-2 hover:ring-gray-400 ring-offset-2'
              }`}
            >
              <Image
                src={image}
                alt={`${title} - 缩略图 ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 25vw, (max-width: 1024px) 16vw, 12vw"
              />
              
              {/* 选中状态指示器 */}
              {index === currentIndex && (
                <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* 全屏查看器 - 使用 Portal 渲染到 body */}
      {mounted && isFullscreen && createPortal(
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[9999] flex items-center justify-center"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999
          }}
          onClick={closeFullscreen}
        >
          {/* 关闭按钮 */}
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors bg-black/40 hover:bg-black/60 rounded-full p-3 backdrop-blur border border-white/20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* 图片信息 */}
          <div className="absolute top-4 left-4 z-10 text-white font-medium bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
            {title} - {currentIndex + 1} / {images.length}
          </div>

          {/* 主图 */}
          <div 
            className="absolute inset-0 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              padding: '1rem'
            }}
          >
            <Image
              src={images[currentIndex]}
              alt={`${title} - 大图 ${currentIndex + 1}`}
              fill
              className="object-contain"
              style={{
                objectFit: 'contain',
                width: '100%',
                height: '100%'
              }}
              priority
              sizes="100vw"
            />
          </div>

          {/* 导航按钮 */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white hover:text-gray-300 transition-colors bg-black/40 hover:bg-black/60 rounded-full p-4 backdrop-blur border border-white/20"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white hover:text-gray-300 transition-colors bg-black/40 hover:bg-black/60 rounded-full p-4 backdrop-blur border border-white/20"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* 底部缩略图导航 */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
              <div className="flex space-x-2 bg-black/40 backdrop-blur-sm rounded-lg p-2 border border-white/20 max-w-[80vw] overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={`fullscreen-thumb-${index}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(index);
                    }}
                    className={`relative w-12 h-12 flex-shrink-0 overflow-hidden rounded transition-all duration-200 ${
                      index === currentIndex 
                        ? 'ring-2 ring-white ring-offset-1 ring-offset-black/40' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`缩略图 ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 操作提示 */}
          <div className="absolute bottom-4 right-4 z-20 text-white/60 text-sm bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/20">
            使用 ← → 键浏览，ESC 关闭
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}