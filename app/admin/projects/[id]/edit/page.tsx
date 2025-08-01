'use client'

import { ProjectForm } from '@/app/components/admin/ProjectForm';
import { useRouter } from 'next/navigation';


export default function EditProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const handleSuccess = () => {
        router.push('/admin');
  };

  return (
    <ProjectForm 
      mode="edit" 
      projectId={params.id}
      onSuccess={handleSuccess} 
    />
  );
}
