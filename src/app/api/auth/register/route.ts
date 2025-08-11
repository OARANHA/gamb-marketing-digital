import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  companyName?: string;
  industry?: string;
  companySize?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: RegisterData = await request.json();

    // Validação básica
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { error: 'Nome, email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    if (body.password.length < 6) {
      return NextResponse.json(
        { error: 'A senha deve ter pelo menos 6 caracteres' },
        { status: 400 }
      );
    }

    // Verificar se o email já existe
    const existingClient = await db.client.findUnique({
      where: { email: body.email }
    });

    if (existingClient) {
      return NextResponse.json(
        { error: 'Este email já está cadastrado' },
        { status: 409 }
      );
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(body.password, 12);

    // Criar o cliente
    const client = await db.client.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        phone: body.phone || null,
        companyName: body.companyName || null,
        industry: body.industry || null,
        companySize: body.companySize || null,
        status: 'ACTIVE'
      },
      select: {
        id: true,
        email: true,
        name: true,
        companyName: true,
        status: true,
        createdAt: true
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Conta criada com sucesso!',
      client
    });

  } catch (error) {
    console.error('Error in register:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}