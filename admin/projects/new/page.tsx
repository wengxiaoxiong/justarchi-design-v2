'use client'

import { ProjectForm } from '@/app/components/admin/ProjectForm';
import { useRouter } from 'next/navigation';

export default function NewProjectPage() {
  const router = useRouter();

  const handleSuccess = () => {
        router.push('/admin');
  };

  return (
    <ProjectForm 
      mode="create" 
      onSuccess={handleSuccess} 
    />
  );
}