import { useState, useEffect } from 'react';

interface UseActiveSectionOptions {
  offset?: number;
  sections?: string[];
}

const useActiveSection = (options: UseActiveSectionOptions = {}) => {
  const { offset = 100, sections } = options;
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      // 检测当前可视区域
      const sectionElements = sections 
        ? sections.map(id => document.getElementById(id)).filter(Boolean)
        : document.querySelectorAll('section');
      
      sectionElements.forEach((section) => {
        if (!section) return;
        
        const rect = section.getBoundingClientRect();
        if (rect.top <= offset && rect.bottom >= offset) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // 初始化时执行一次
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset, sections]);

  return activeSection;
};

export default useActiveSection; 