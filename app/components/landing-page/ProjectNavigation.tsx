import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';

interface CategoryItem {
  name: string;
  nameEn: string;
  key: string;
  href: string;
}

const categoryItems: CategoryItem[] = [
  { name: '建築設計', nameEn: 'Architecture', key: 'architecture', href: '/projects/architecture' },
  { name: '室內設計', nameEn: 'Interior', key: 'interior', href: '/projects/interior' },
  { name: '城市規劃', nameEn: 'Planning', key: 'planning', href: '/projects/planning' },
  { name: '景觀設計', nameEn: 'Landscape', key: 'landscape', href: '/projects/landscape' },
  // 已移除：城市設計（urban-design）
  // 已移除：研究項目（research）
];

interface ProjectNavigationProps {
  currentCategory?: string;
}

const ProjectNavigation: React.FC<ProjectNavigationProps> = ({ currentCategory }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollPositionRef = useRef(-1);
  const isRestoringRef = useRef(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // 防抖处理滚动事件
  const handleScrollDebounced = useCallback(() => {
    const scrollPosition = window.scrollY;
    setIsScrolled(scrollPosition > 50);
  }, []);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScrollDebounced();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // 初始化时执行一次
    handleScrollDebounced();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScrollDebounced]);

  // 处理移动端菜单的滚动锁定
  useEffect(() => {
    if (mobileMenuOpen) {
      // 菜单打开时锁定滚动位置
      scrollPositionRef.current = window.scrollY;
      document.body.classList.add('mobile-menu-open');
      document.body.style.top = `-${scrollPositionRef.current}px`;
    } else {
      // 菜单关闭时恢复滚动位置
      document.body.classList.remove('mobile-menu-open');
      document.body.style.top = '';
      
      // 只有在有有效滚动位置且没有正在进行导航时才恢复位置
      if (scrollPositionRef.current >= 0 && !isRestoringRef.current) {
        const savedPosition = scrollPositionRef.current;
        scrollPositionRef.current = -1; // 立即重置以防止重复恢复
        
        requestAnimationFrame(() => {
          window.scrollTo({
            top: savedPosition,
            behavior: 'auto'
          });
        });
      }
    }

    return () => {
      document.body.classList.remove('mobile-menu-open');
      document.body.style.top = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      ref={headerRef}
      className={`mobile-nav-fix fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 will-change-transform ${isScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
        }`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        perspective: 1000,
        WebkitPerspective: 1000
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center">
          <Link 
            href="/"
            className={`font-playfair text-lg sm:text-xl font-bold text-white tracking-wider cursor-pointer relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 after:w-0 hover:after:w-full`}
          >
            得體設計
          </Link>
          {/* 桌面导航 - 项目分类 */}
          <nav className="ml-8 md:ml-12 hidden md:flex gap-3 lg:gap-6">
            <Link
              href="/projects"
              className={`text-white hover:text-gray-300 transition-all duration-300 text-xs lg:text-sm relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white hover:after:w-full after:transition-all after:duration-300 ${!currentCategory ? 'after:w-full' : ''
                }`}
            >
              全部項目
            </Link>
            {categoryItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`text-white hover:text-gray-300 transition-all duration-300 text-xs lg:text-sm relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white hover:after:w-full after:transition-all after:duration-300 ${currentCategory === item.key ? 'after:w-full' : ''
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* 桌面联系按钮 */}
        <Link
          href="/#contact-us"
          className="hidden md:block !rounded-button bg-white/10 border border-white/20 text-white px-4 py-2 text-sm font-medium hover:bg-white/20 transition-colors duration-300 whitespace-nowrap backdrop-blur-sm"
        >
          聯繫我們 <i className="fas fa-arrow-right ml-2" />
        </Link>

        {/* 移动端菜单按钮 */}
        <button
          className="md:hidden text-white text-2xl p-2 z-[10001] relative"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`} />
        </button>
      </div>

      {/* 移动端导航菜单 */}
      <div 
        className={`mobile-nav-menu md:hidden fixed inset-0 bg-black/95 backdrop-blur-md z-[10000] transition-transform duration-300 transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          position: 'fixed',
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          willChange: 'transform'
        }}
      >
        <div className="flex justify-end p-6">
          <button
            className="text-white text-2xl z-[10002]"
            onClick={() => setMobileMenuOpen(false)}
          >
            <i className="fas fa-times" />
          </button>
        </div>
        <nav className="flex flex-col items-center justify-center h-[calc(100vh-80px)] gap-6 overflow-y-auto">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white text-xl font-bold transition-colors duration-200 hover:text-gray-300"
          >
            首頁
          </Link>
          <Link
            href="/projects"
            onClick={() => setMobileMenuOpen(false)}
            className={`text-white text-xl font-bold transition-colors duration-200 ${!currentCategory ? 'text-blue-400' : 'hover:text-gray-300'}`}
          >
            全部項目
          </Link>
          {categoryItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-white text-xl font-bold transition-colors duration-200 ${currentCategory === item.key ? 'text-blue-400' : 'hover:text-gray-300'}`}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/#contact-us"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-8 !rounded-button bg-white/10 border border-white/20 text-white px-8 py-3 text-lg font-medium hover:bg-white/20 transition-colors duration-300 whitespace-nowrap backdrop-blur-sm"
          >
            聯繫我們 <i className="fas fa-arrow-right ml-2" />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default ProjectNavigation;