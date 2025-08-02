'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ProjectCategory } from '../../lib/types';
import { deleteProject } from '../../lib/actions';
import { Project } from '@prisma/client';

interface AdminProjectListProps {
  projects: Project[];
  categoryMap: Record<ProjectCategory, string>;
}

export default function AdminProjectList({ projects, categoryMap }: AdminProjectListProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (projectId: string, projectTitle: string) => {
    if (!confirm(`确定要删除项目"${projectTitle}"吗？此操作不可恢复。`)) {
      return;
    }

    setDeletingId(projectId);
    try {
      const result = await deleteProject(projectId);
      if (result.success) {
        router.refresh(); // 刷新页面数据
      } else {
        alert(`删除失败: ${result.error}`);
      }
    } catch (error) {
      console.error('删除项目失败:', error);
      alert('删除失败，请稍后重试');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">所有项目</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">管理您的项目内容</p>
          </div>
        </div>
      </div>

      <ul className="divide-y divide-gray-200">
        {projects.map((project) => (
          <li key={project.id}>
            <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-16 w-24">
                    <img
                      className="h-16 w-24 object-cover rounded-md"
                      src={project.coverImage}
                      alt={project.title}
                      width={96}
                      height={64}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {project.title}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        {project.isFeatured && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                            精选
                          </span>
                        )}
                        <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          project.isPublished
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {project.isPublished ? '已发布' : '草稿'}
                        </span>
                      </div>
                    </div>
                    <div className="mt-1">
                      <p className="text-sm text-gray-600">
                        {categoryMap[project.category]} • {project.location}
                        {project.year && ` • ${project.year}年`}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/projects/detail/${project.id}`}
                    target="_blank"
                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                  >
                    预览
                  </Link>
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                  >
                    编辑
                  </Link>
                  <button
                    type="button"
                    className="text-red-600 hover:text-red-900 text-sm font-medium disabled:opacity-50"
                    onClick={() => handleDelete(project.id, project.title)}
                    disabled={deletingId === project.id}
                  >
                    {deletingId === project.id ? '删除中...' : '删除'}
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {projects.length === 0 && (
        <div className="px-4 py-12 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">暂无项目</h3>
          <p className="mt-1 text-sm text-gray-500">开始创建您的第一个项目。</p>
          <div className="mt-6">
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              新建项目
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}