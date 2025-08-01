import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';
import { ProjectCategory, ProjectStatus } from '../../../../lib/types';

// 创建新项目
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 验证必填字段
    if (!body.title || !body.location || !body.coverImage) {
      return NextResponse.json(
        { error: '缺少必填字段：标题、位置或封面图片' },
        { status: 400 }
      );
    }

    // 创建项目
    const project = await prisma.project.create({
      data: {
        title: body.title,
        description: body.description || null,
        category: body.category,
        coverImage: body.coverImage,
        images: body.images || [],
        year: body.year || null,
        location: body.location,
        city: body.city || null,
        client: body.client || null,
        architect: body.architect || null,
        area: body.area || null,
        status: body.status,
        brief: body.brief || null,
        concept: body.concept || null,
        features: body.features || [],
        tags: body.tags || [],
        isPublished: body.isPublished || false,
        isFeatured: body.isFeatured || false,
        sortOrder: body.sortOrder || 0,
      },
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error('创建项目失败:', error);
    return NextResponse.json(
      { error: '创建项目失败，请稍后重试' },
      { status: 500 }
    );
  }
}

// 获取所有项目（管理员视图）
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const published = searchParams.get('published');

    const where: any = {};
    
    if (category) {
      where.category = category as ProjectCategory;
    }
    
    if (status) {
      where.status = status as ProjectStatus;
    }
    
    if (published !== null) {
      where.isPublished = published === 'true';
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: [
        { isFeatured: 'desc' },
        { sortOrder: 'asc' },
        { updatedAt: 'desc' }
      ],
    });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error('获取项目列表失败:', error);
    return NextResponse.json(
      { error: '获取项目列表失败' },
      { status: 500 }
    );
  }
}