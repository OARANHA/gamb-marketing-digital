import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

interface LoginData {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: LoginData = await request.json();

    // Validação básica
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    // Buscar cliente pelo email
    const client = await db.client.findUnique({
      where: { email: body.email }
    });

    if (!client) {
      return NextResponse.json(
        { error: 'Email ou senha incorretos' },
        { status: 401 }
      );
    }

    // Verificar status do cliente
    if (client.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Conta inativa ou bloqueada' },
        { status: 403 }
      );
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(body.password, client.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Email ou senha incorretos' },
        { status: 401 }
      );
    }

    // Remover a senha do objeto de resposta
    const { password, ...clientWithoutPassword } = client;

    // Em uma aplicação real, você geraria um JWT aqui
    // Por enquanto, vamos retornar os dados do cliente
    
    return NextResponse.json({
      success: true,
      message: 'Login realizado com sucesso!',
      client: clientWithoutPassword
    });

  } catch (error) {
    console.error('Error in login:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}