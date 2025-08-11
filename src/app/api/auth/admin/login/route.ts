import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

interface AdminLoginData {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: AdminLoginData = await request.json();

    // Validação básica
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // Buscar administrador pelo email
    const admin = await db.teamMember.findUnique({
      where: { 
        email: body.email,
        role: 'ADMIN', // Apenas administradores podem fazer login aqui
        isActive: true
      }
    });

    if (!admin) {
      return NextResponse.json(
        { error: 'Email ou senha incorretos' },
        { status: 401 }
      );
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(body.password, admin.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Email ou senha incorretos' },
        { status: 401 }
      );
    }

    // Remover a senha do objeto de resposta
    const { password, ...adminWithoutPassword } = admin;

    // Em uma aplicação real, você geraria um JWT aqui
    // Por enquanto, vamos retornar os dados do administrador
    
    return NextResponse.json({
      success: true,
      message: 'Login administrativo realizado com sucesso!',
      admin: adminWithoutPassword
    });

  } catch (error) {
    console.error('Error in admin login:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}