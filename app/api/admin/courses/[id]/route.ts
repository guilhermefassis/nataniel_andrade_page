
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '@/lib/auth-config';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

const courseSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(1000),
  link: z.string().url(),
  image: z.string().optional(),
});

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { message: 'Não autorizado' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = courseSchema.parse(body);

    const course = await prisma.course.update({
      where: { id: params.id },
      data: {
        name: validatedData.name,
        description: validatedData.description,
        link: validatedData.link,
        image: validatedData.image || null,
      }
    });

    return NextResponse.json(course);

  } catch (error) {
    console.error('Erro ao atualizar curso:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Dados inválidos', errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { message: 'Não autorizado' },
        { status: 401 }
      );
    }

    await prisma.course.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Curso excluído com sucesso' });

  } catch (error) {
    console.error('Erro ao excluir curso:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
