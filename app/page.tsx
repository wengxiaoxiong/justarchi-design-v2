import React from 'react';

import { 
  getArchitectureIndexProjects,
  getInteriorIndexProjects,
  getPlanningIndexProjects
} from '../lib/actions';
import LandingPageClient from './components/landing-page/LandingPageClient';

export const dynamic = 'force-dynamic'
export const revalidate = 0

const App = async () => {
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
