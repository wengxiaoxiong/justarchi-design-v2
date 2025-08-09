'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ProjectCategory } from '../../../lib/types';
import { createProject, updateProject, getProjectById, type ProjectFormData } from '../../../lib/actions';
import { MultiImageUpload } from './MultiImageUpload';
import { SingleImageUpload } from './SingleImageUpload';

// 项目类型选项
const categoryOptions = [
  { value: ProjectCategory.ARCHITECTURE, label: '建築設計' },
  { value: ProjectCategory.INTERIOR, label: '室内设计' },
  { value: ProjectCategory.PLANNING, label: ' 城市規劃' },
  { value: ProjectCategory.LANDSCAPE, label: '景观设计' },
  // 已移除：URBAN_DESIGN（城市設計）
  // 已移除：RESEARCH（研究項目）
];


// 使用从 actions 导入的 ProjectFormData 类型，但添加年份可以为空字符串的本地接口
interface LocalProjectFormData extends Omit<ProjectFormData, 'year'> {
  year: number | '';
}

interface ProjectFormProps {
  mode: 'create' | 'edit';
  projectId?: string;
  onSuccess: () => void;
}

export function ProjectForm({ mode, projectId, onSuccess }: ProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(mode === 'edit');
  
  const [formData, setFormData] = useState<LocalProjectFormData>({
    title: '',
    description: '',
    category: ProjectCategory.ARCHITECTURE,
    coverImage: '',
    images: [],
    year: '',
    location: '',
    city: '',
    client: '',
    area: '',
    brief: '',
    isPublished: true,
    isFeatured: false,
    sortOrder: 0,
  });

  // 加载项目数据（仅编辑模式）
  useEffect(() => {
    if (mode === 'edit' && projectId) {
      const loadProject = async () => {
        try {
          const result = await getProjectById(projectId);
          
          if (result.success && result.project) {
            const project = result.project;
            setFormData({
              title: project.title || '',
              description: project.description || '',
              category: project.category || ProjectCategory.ARCHITECTURE,
              coverImage: project.coverImage || '',
              images: project.images || [],
              year: project.year || '',
              location: project.location || '',
              city: project.city || '',
              client: project.client || '',
              area: project.area || '',
              brief: project.brief || '',
              isPublished: project.isPublished ?? true,
              isFeatured: project.isFeatured ?? false,
              sortOrder: project.sortOrder || 0,
            });
          } else {
            alert(result.error || '项目不存在或加载失败');
            onSuccess(); // 返回列表页
          }
        } catch (error) {
          console.error('加载项目失败:', error);
          alert('加载项目失败，请稍后重试');
        } finally {
          setIsLoading(false);
        }
      };

      loadProject();
    }
  }, [mode, projectId, onSuccess]);

  const handleInputChange = (field: keyof LocalProjectFormData, value: LocalProjectFormData[keyof LocalProjectFormData]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };


  const handleImagesChange = (urls: string[]) => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...urls]
    }));
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 准备数据 - 转换为 ProjectFormData 格式
      const submitData: ProjectFormData = {
        ...formData,
        year: formData.year || undefined,
        description: formData.description || undefined,
        city: formData.city || undefined,
        client: formData.client || undefined,
        area: formData.area || undefined,
        brief: formData.brief || undefined,
      };

      let result;
      if (mode === 'create') {
        result = await createProject(submitData);
      } else {
        result = await updateProject(projectId!, submitData);
      }

      if (result.success) {
        onSuccess();
      } else {
        alert(`${mode === 'create' ? '创建' : '更新'}失败: ${result.error}`);
      }
    } catch (error) {
      console.error(`${mode === 'create' ? '创建' : '更新'}项目失败:`, error);
      alert(`${mode === 'create' ? '创建' : '更新'}失败，请稍后重试`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/admin" className="text-blue-600 hover:text-blue-800 font-medium">
                ← 返回管理后台
              </Link>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">
              {mode === 'create' ? '新建项目' : '编辑项目'}
            </h1>
            <div></div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 基本信息 */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">基本信息</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  项目标题 *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入项目标题"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  项目类型 *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value as ProjectCategory)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categoryOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  项目位置 *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="如：Shanghai Urban Complex"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  城市
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="如：上海"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  项目年份
                </label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => handleInputChange('year', parseInt(e.target.value) || '')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="如：2023"
                  min="1990"
                  max={new Date().getFullYear() + 10}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  项目面积
                </label>
                <input
                  type="text"
                  value={formData.area}
                  onChange={(e) => handleInputChange('area', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="如：50,000㎡"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  委托方
                </label>
                <input
                  type="text"
                  value={formData.client}
                  onChange={(e) => handleInputChange('client', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="如：京华城集团"
                />
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  排序权重
                </label>
                <input
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => handleInputChange('sortOrder', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="数字越小越靠前"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  项目描述
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="简短描述项目概况，支持Markdown格式"
                />
              </div>
            </div>
          </div>

          {/* 项目图片 */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">項目圖片</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  封面图片 *
                </label>
                <SingleImageUpload
                  value={formData.coverImage}
                  onChange={(url) => handleInputChange('coverImage', url)}
                  placeholder="点击上传封面图片或拖拽图片到此处"
                  maxSize={10}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  项目图片集
                </label>
                
                {/* 已上传的图片列表 */}
                {formData.images.length > 0 && (
                  <div className="mb-4 space-y-2">
                    {formData.images.map((image, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 rounded-md">
                        <img 
                          src={image} 
                          alt={`图片 ${index + 1}`}
                          className="w-16 h-16 object-cover rounded-md mr-3"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                        <div className="flex-1 truncate text-sm text-gray-600">
                          {image}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="ml-3 text-red-600 hover:text-red-800 text-sm"
                        >
                          删除
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* 图片上传组件 */}
                <MultiImageUpload
                  value={[]}
                  onChange={handleImagesChange}
                  placeholder="上传项目图片"
                  maxImages={20}
                  maxSize={10}
                />
              </div>
            </div>
          </div>

          {/* 发布设置 */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">发布设置</h3>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={formData.isPublished}
                  onChange={(e) => handleInputChange('isPublished', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900">
                  立即发布（不勾选则保存为草稿）
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-900">
                  设为精选项目（将在首页优先展示）
                </label>
              </div>
            </div>
          </div>

          {/* 提交按钮 */}
          <div className="flex justify-end space-x-4">
            <Link
              href="/admin"
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              取消
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? (mode === 'create' ? '创建中...' : '更新中...') : (mode === 'create' ? '创建项目' : '更新项目')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}