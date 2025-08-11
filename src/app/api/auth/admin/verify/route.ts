import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { adminId } = body;

    if (!adminId) {
      return NextResponse.json(
        { error: 'ID do administrador não fornecido' },
        { status: 400 }
      );
    }

    // Buscar administrador pelo ID
    const admin = await db.teamMember.findUnique({
      where: { 
        id: adminId,
        role: 'ADMIN',
        isActive: true
      }
    });

    if (!admin) {
      return NextResponse.json(
        { error: 'Administrador não encontrado ou inativo' },
        { status: 404 }
      );
    }

    // Remover a senha do objeto de resposta
    const { password, ...adminWithoutPassword } = admin;

    return NextResponse.json({
      success: true,
      admin: adminWithoutPassword
    });

  } catch (error) {
    console.error('Error in admin verify:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}