'use client'

import { ProjectForm } from '@/app/components/admin/ProjectForm';
import { useRouter } from 'next/navigation';
import { use } from 'react';


export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  const handleSuccess = () => {
        router.push('/admin');
  };

  return (
    <ProjectForm 
      mode="edit" 
      projectId={id}
      onSuccess={handleSuccess} 
    />
  );
}
