import React from 'react';

interface CoreValue {
  number: string;
  icon: string;
  title: string;
  description: string;
}

const coreValues: CoreValue[] = [
  {
    number: '01',
    icon: 'fa-lightbulb',
    title: 'Innovation',
    description: 'Pushing boundaries with cutting-edge architectural solutions and creative design thinking. We continuously explore new possibilities and embrace emerging technologies to create groundbreaking architectural designs that stand at the forefront of the industry.'
  },
  {
    number: '02',
    icon: 'fa-leaf',
    title: 'Sustainability',
    description: 'Creating eco-friendly designs that harmonize with nature and minimize environmental impact. Our commitment to sustainable architecture goes beyond mere compliance, incorporating innovative green technologies and biophilic design principles to create buildings that respect and enhance their environment.'
  },
  {
    number: '03',
    icon: 'fa-handshake',
    title: 'Excellence',
    description: 'Delivering premium quality and attention to detail in every project we undertake. Our dedication to excellence is reflected in every aspect of our work, from the initial concept to the final execution, ensuring that each project exceeds expectations and creates lasting value.'
  }
];

const CoreValues: React.FC = () => {
  return (
    <section id="core-values" className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-16 md:py-24 lg:py-32">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 md:mb-16 lg:mb-24 text-center opacity-0 tracking-wider transition-opacity duration-800 ease-in-out" data-scroll>Core Values</h2>
        <div className="flex flex-col gap-12 md:gap-16 lg:gap-24">
          {coreValues.map((value) => (
            <div key={value.title} className="group relative opacity-0 transition-all duration-800 ease-in-out" data-scroll>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 lg:gap-12">
                <div className="w-full md:w-32 mb-4 md:mb-0">
                  <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-700">{value.number}</span>
                </div>
                <div className="flex-1">
                  <div className="h-[2px] bg-white w-0 transition-all duration-800 mb-4 md:mb-8" data-scroll></div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <i className={`fas ${value.icon} text-xl sm:text-2xl text-white`}></i>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-wide">{value.title}</h3>
                  </div>
                  <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl font-light">{value.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues; 