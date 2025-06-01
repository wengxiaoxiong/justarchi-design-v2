import React from 'react';

interface ProjectCardProps {
  title: string;
  subtitle: string;
  image: string;
  className: string;
  gradientColors?: {
    top: string;
    bottom: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  subtitle,
  image,
  className,
  gradientColors = {
    top: 'bg-blue-500/10',
    bottom: 'bg-purple-500/10'
  }
}) => {
  return (
    <div className={`group relative overflow-hidden rounded-lg ${className}`}>
      <div className={`absolute -left-20 -top-20 w-40 h-40 ${gradientColors.top} rounded-full blur-3xl`}></div>
      <div className={`absolute -right-20 -bottom-20 w-40 h-40 ${gradientColors.bottom} rounded-full blur-3xl`}></div>
      <div className="relative w-full h-full min-h-[240px] sm:min-h-[280px] md:min-h-[320px]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-6 md:p-8">
          <div className="relative">
            <div className="absolute -left-2 sm:-left-4 top-1/2 w-1 sm:w-2 h-6 sm:h-8 bg-white/80 transform -translate-y-1/2"></div>
            <h3 className="font-playfair text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">{title}</h3>
            <p className="text-sm sm:text-base text-gray-300">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard; 