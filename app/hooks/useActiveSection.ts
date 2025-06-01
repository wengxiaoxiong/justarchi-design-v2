import { useState, useEffect, useRef } from 'react';

interface UseActiveSectionOptions {
  offset?: number;
  sections?: string[];
}

const useActiveSection = (options: UseActiveSectionOptions = {}) => {
  const { offset = 100, sections } = options;
  const [activeSection, setActiveSection] = useState('home');
  const isMenuOpenRef = useRef(false);

  useEffect(() => {
    // 监听body的class变化来检测菜单状态
    const checkMenuStatus = () => {
      isMenuOpenRef.current = document.body.classList.contains('mobile-menu-open');
    };

    const handleScroll = () => {
      // 如果移动端菜单打开，不检测活动区域
      if (isMenuOpenRef.current) {
        return;
      }

      // 检测当前可视区域
      const sectionElements = sections 
        ? sections.map(id => document.getElementById(id)).filter(Boolean)
        : document.querySelectorAll('section');
      
      let foundActiveSection = '';
      
      sectionElements.forEach((section) => {
        if (!section) return;
        
        const rect = section.getBoundingClientRect();
        if (rect.top <= offset && rect.bottom >= offset) {
          foundActiveSection = section.id;
        }
      });

      // 只有找到有效的活动区域才更新状态
      if (foundActiveSection && foundActiveSection !== activeSection) {
        setActiveSection(foundActiveSection);
      }
    };

    // 创建一个MutationObserver来监听body class的变化
    const observer = new MutationObserver(checkMenuStatus);
    observer.observe(document.body, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // 初始化时执行一次
    checkMenuStatus();
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [offset, sections, activeSection]);

  return activeSection;
};

export default useActiveSection; 