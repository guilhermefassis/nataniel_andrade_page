
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '@/lib/auth-config';
import { prisma } from '@/lib/db';
import { getYouTubeId, getYouTubeThumbnail } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const videoSchema = z.object({
  title: z.string().min(1).max(255),
  url: z.string().url(),
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
    const validatedData = videoSchema.parse(body);

    // Validate YouTube URL
    const videoId = getYouTubeId(validatedData.url);
    if (!videoId) {
      return NextResponse.json(
        { message: 'URL do YouTube inválida' },
        { status: 400 }
      );
    }

    const thumbnail = getYouTubeThumbnail(validatedData.url);

    const video = await prisma.video.update({
      where: { id: params.id },
      data: {
        title: validatedData.title,
        url: validatedData.url,
        thumbnail: thumbnail,
      }
    });

    return NextResponse.json(video);

  } catch (error) {
    console.error('Erro ao atualizar vídeo:', error);
    
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

    await prisma.video.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Vídeo excluído com sucesso' });

  } catch (error) {
    console.error('Erro ao excluir vídeo:', error);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
