import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/db';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// 获取单个项目详情
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return NextResponse.json(
        { error: '项目不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error('获取项目详情失败:', error);
    return NextResponse.json(
      { error: '获取项目详情失败' },
      { status: 500 }
    );
  }
}

// 更新项目
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    // 验证项目是否存在
    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return NextResponse.json(
        { error: '项目不存在' },
        { status: 404 }
      );
    }

    // 更新项目
    const project = await prisma.project.update({
      where: { id },
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
        isPublished: body.isPublished ?? existingProject.isPublished,
        isFeatured: body.isFeatured ?? existingProject.isFeatured,
        sortOrder: body.sortOrder ?? existingProject.sortOrder,
      },
    });

    return NextResponse.json({ project });
  } catch (error) {
    console.error('更新项目失败:', error);
    return NextResponse.json(
      { error: '更新项目失败，请稍后重试' },
      { status: 500 }
    );
  }
}

// 删除项目
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // 验证项目是否存在
    const existingProject = await prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return NextResponse.json(
        { error: '项目不存在' },
        { status: 404 }
      );
    }

    // 删除项目
    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ message: '项目删除成功' });
  } catch (error) {
    console.error('删除项目失败:', error);
    return NextResponse.json(
      { error: '删除项目失败，请稍后重试' },
      { status: 500 }
    );
  }
}