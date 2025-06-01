import { useEffect } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
}

const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { threshold = 100 } = options;

  useEffect(() => {
    const handleScroll = () => {
      // 处理滚动动画
      const scrollElements = document.querySelectorAll('[data-scroll], .opacity-0');
      scrollElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = elementTop < window.innerHeight - threshold && elementBottom > 0;
        
        if (isVisible) {
          element.classList.add('opacity-100');
          // 为所有元素添加过渡效果
          if (element instanceof HTMLElement) {
            element.style.transition = element.classList.contains('h-[2px]')
              ? 'width 1.5s ease-in-out'
              : 'opacity 0.8s ease-in-out';
          }
          
          if (element.classList.contains('h-[2px]')) {
            element.classList.add('w-full');
          }
        } else {
          element.classList.remove('opacity-100');
          if (element.classList.contains('h-[2px]')) {
            element.classList.remove('w-full');
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // 初始化时执行一次
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);
};

export default useScrollAnimation; 