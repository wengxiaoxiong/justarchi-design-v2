import React from 'react';

import { 
  getArchitectureIndexProjects,
  getInteriorIndexProjects,
  getPlanningIndexProjects
} from '../lib/actions';
import LandingPageClient from './components/landing-page/LandingPageClient';

const App: React.FC = async () => {
  // 并行获取所有项目数据
  const [architectureProjects, interiorProjects, planningProjects] = await Promise.all([
    getArchitectureIndexProjects(),
    getInteriorIndexProjects(),
    getPlanningIndexProjects()
  ]);

  return (
    <LandingPageClient 
      architectureProjects={architectureProjects}
      interiorProjects={interiorProjects}
      planningProjects={planningProjects}
    />
  );
};

export default App;
