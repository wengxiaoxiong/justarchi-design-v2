'use client'

import { useState, useRef, useCallback } from 'react'
import { Loader2, Upload, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SingleImageUploadProps {
  value?: string
  onChange: (url: string) => void
  disabled?: boolean
  className?: string
  placeholder?: string
  maxSize?: number // MB
}

export function SingleImageUpload({
  value = '',
  onChange,
  disabled = false,
  className,
  placeholder = '点击上传封面图片',
  maxSize = 5,
}: SingleImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = useCallback(
    (file: File): string | null => {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
      if (!allowedTypes.includes(file.type)) {
        return '不支持的文件类型。仅支持 JPEG, PNG, GIF, WEBP 格式'
      }

      if (file.size > maxSize * 1024 * 1024) {
        return `文件大小不能超过${maxSize}MB`
      }

      return null
    },
    [maxSize]
  )

  const uploadFile = async (file: File): Promise<string | null> => {
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      return null
    }

    try {
      const timestamp = Date.now()
      const randomString = Math.random().toString(36).substring(2, 15)
      const extension = file.name.split('.').pop()
      const filename = `${timestamp}-${randomString}.${extension}`

      const response = await fetch(`/api/upload?filename=${filename}`, {
        method: 'POST',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '上传失败')
      }
      return data.url
    } catch (err) {
      const message = err instanceof Error ? err.message : '上传失败，请重试'
      setError(message)
      return null
    }
  }

  const uploadSingleFile = useCallback(
    async (file: File) => {
      setIsUploading(true)
      setError('')

      const url = await uploadFile(file)
      if (url) {
        onChange(url)
      }

      setIsUploading(false)
    },
    [onChange]
  )

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        uploadSingleFile(files[0])
      }
      // 重置 file input
      if(e.target) {
        e.target.value = ''
      }
    },
    [uploadSingleFile]
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled && !isUploading) {
      setIsDragging(true)
    }
  }, [disabled, isUploading])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (disabled || isUploading) return

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      uploadSingleFile(files[0])
    }
  }, [disabled, isUploading, uploadSingleFile])

  const handleClick = () => {
    if (!disabled && !isUploading) {
      fileInputRef.current?.click()
    }
  }

  const handleRemove = () => {
    onChange('')
  }

  if (value) {
    return (
      <div className={cn('space-y-4', className)}>
        <div className="relative">
          <img 
            src={value} 
            alt="封面图片"
            className="w-full h-48 object-cover rounded-lg border"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="text-center">
          <button
            type="button"
            onClick={handleClick}
            disabled={disabled || isUploading}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium disabled:opacity-50"
          >
            更换图片
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled || isUploading}
        />

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400',
          disabled && 'cursor-not-allowed opacity-50',
          isUploading && 'cursor-not-allowed'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className="flex flex-col items-center space-y-4">
          {isUploading ? (
            <>
              <Loader2 className="w-12 h-12 text-gray-400 animate-spin" />
              <p className="text-gray-600">上传中...</p>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                <Upload className="w-6 h-6 text-gray-400" />
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">
                  {placeholder}
                </p>
                <p className="text-sm text-gray-500">
                  支持 JPEG, PNG, GIF, WEBP 格式，最大 {maxSize}MB
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || isUploading}
      />

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}