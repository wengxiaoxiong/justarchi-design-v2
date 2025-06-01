import React, { useEffect, useRef, useState } from 'react';

interface NavItem {
  name: string;
  nameEn: string;
  id: string;
}

const navItems: NavItem[] = [
  { name: '關於我們', nameEn: 'About', id: 'about' },
  { name: '建築設計', nameEn: 'Architecture', id: 'architecture' },
  { name: '室內設計', nameEn: 'Interior', id: 'interior' },
  { name: '城市規劃', nameEn: 'Planning', id: 'planning' },
  { name: '設計理念', nameEn: 'Philosophy', id: 'core-values' },
  { name: '項目分佈', nameEn: 'Project Distribution', id: 'project-distribution' },
  { name: '聯繫', nameEn: 'Contact', id: 'contact-us' }
];

interface NavigationProps {
  activeSection: string;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    // 初始化时执行一次
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
        }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center">
          <div
            className={`font-playfair text-lg sm:text-xl font-bold text-white tracking-wider cursor-pointer relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 ${activeSection === 'home' ? 'after:w-full' : 'after:w-0 hover:after:w-full'
              }`}
            onClick={() => scrollToSection('home')}
          >
            得體設計
          </div>
          {/* 桌面导航 - 在中等屏幕以上显示 */}
          <nav className="ml-8 md:ml-12 hidden md:flex gap-3 lg:gap-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className={`text-white hover:text-gray-300 transition-all duration-300 text-xs lg:text-sm relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-white hover:after:w-full after:transition-all after:duration-300 ${activeSection === item.id ? 'after:w-full' : ''
                  }`}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>

        {/* 桌面联系按钮 */}
        <button
          className="hidden md:block !rounded-button bg-white/10 border border-white/20 text-white px-4 py-2 text-sm font-medium hover:bg-white/20 transition-colors duration-300 whitespace-nowrap backdrop-blur-sm"
          onClick={() => scrollToSection('contact-us')}
        >
          聯繫我們 <i className="fas fa-arrow-right ml-2" />
        </button>

        {/* 移动端菜单按钮 */}
        <button
          className="md:hidden text-white text-2xl p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`} />
        </button>
      </div>

      {/* 移动端导航菜单 */}
      <div className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-md z-50 transition-transform duration-300 transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
        <div className="flex justify-end p-6">
          <button
            className="text-white text-2xl"
            onClick={() => setMobileMenuOpen(false)}
          >
            <i className="fas fa-times" />
          </button>
        </div>
        <nav className="flex flex-col items-center justify-center h-[calc(100%-80px)] gap-6">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className={`text-white text-xl font-bold ${activeSection === 'home' ? 'text-blue-400' : ''}`}
          >
            首頁
          </a>
          {navItems.map((item) => (
            <a
              key={item.name}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
              className={`text-white text-xl font-bold ${activeSection === item.id ? 'text-blue-400' : ''}`}
            >
              {item.name}
            </a>
          ))}
          <button
            className="mt-8 !rounded-button bg-white/10 border border-white/20 text-white px-8 py-3 text-lg font-medium hover:bg-white/20 transition-colors duration-300 whitespace-nowrap backdrop-blur-sm"
            onClick={() => scrollToSection('contact-us')}
          >
            聯繫我們 <i className="fas fa-arrow-right ml-2" />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navigation; 