
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '@/lib/auth-config';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

const updateStatusSchema = z.object({
  status: z.enum(['pending', 'read', 'replied']),
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
    const { status } = updateStatusSchema.parse(body);

    const message = await prisma.contactForm.update({
      where: { id: params.id },
      data: { status }
    });

    return NextResponse.json(message);

  } catch (error) {
    console.error('Erro ao atualizar status da mensagem:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Status inválido', errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
