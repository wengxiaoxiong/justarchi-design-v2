'use client'

// 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果
import React, { useEffect } from 'react';
import Navigation from './components/landing-page/Navigation';
import Hero from './components/landing-page/Hero';
import About from './components/landing-page/About';
import CoreValues from './components/landing-page/CoreValues';
import ArchitectureDesign from './components/landing-page/ArchitectureDesign';
import ProjectDistribution from './components/landing-page/ProjectDistribution';
import Contact from './components/landing-page/Contact';
import useActiveSection from './hooks/useActiveSection';
import useScrollAnimation from './hooks/useScrollAnimation';

const App: React.FC = () => {
    // 使用自定义Hook检测当前活动区域
    const activeSection = useActiveSection({
        sections: ['home', 'about', 'core-values', 'architecture', 'interior', 'planning', 'contact-us']
    });
    
    // 使用自定义Hook处理滚动动画
    useScrollAnimation();

    // 添加一个检测视口宽度的效果，用于处理移动端状态
    useEffect(() => {
        // 处理字体图标库
        // 如果项目中没有加载Font Awesome，这里添加字体图标库
        const loadFontAwesome = () => {
            if (!document.querySelector('#font-awesome-css')) {
                const link = document.createElement('link');
                link.id = 'font-awesome-css';
                link.rel = 'stylesheet';
                link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css';
                document.head.appendChild(link);
            }
        };
        
        loadFontAwesome();

        // 添加视口元标签以确保响应式设计正常工作
        const ensureViewportMeta = () => {
            if (!document.querySelector('meta[name="viewport"]')) {
                const meta = document.createElement('meta');
                meta.name = 'viewport';
                meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
                document.head.appendChild(meta);
            }
        };
        
        ensureViewportMeta();
    }, []);

    return (
        <div className="min-h-screen w-full overflow-x-hidden landing-page">
            {/* 导航栏 */}
            <Navigation activeSection={activeSection} />
            {/* 页面内容 */}
            <Hero/>
            <About />
            <ArchitectureDesign />
            <CoreValues />
            <ProjectDistribution />
            <Contact />
        </div>
    );
};

export default App;
