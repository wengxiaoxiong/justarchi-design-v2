export interface ArchitectureProject {
  id: string;
  title: string;
  location: string;
  image: string;
  className: string;
  category: 'architecture' | 'interior' | 'planning';
  description?: string;
  year?: string;
  area?: string;
  client?: string;
  status?: string;
} 