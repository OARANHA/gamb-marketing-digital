import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const adminEmail = 'admin@gamb.com.br';
    const adminPassword = 'admin123'; // Você deve alterar isso!
    const adminName = 'Administrador Gamb';

    // Verificar se o administrador já existe
    const existingAdmin = await prisma.teamMember.findUnique({
      where: { email: adminEmail }
    });

    if (existingAdmin) {
      console.log('✅ Administrador já existe:', existingAdmin.email);
      return;
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    // Criar administrador
    const admin = await prisma.teamMember.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: adminName,
        role: 'ADMIN',
        isActive: true,
        specialties: JSON.stringify(['Administração', 'Marketing Digital', 'Gestão de Equipe']),
        bio: 'Administrador principal da plataforma Gamb Marketing Digital'
      }
    });

    console.log('✅ Administrador criado com sucesso!');
    console.log('📧 Email:', admin.email);
    console.log('👤 Nome:', admin.name);
    console.log('🔑 Senha:', adminPassword);
    console.log('⚠️  IMPORTANTE: Altere a senha após o primeiro login!');
    
  } catch (error) {
    console.error('❌ Erro ao criar administrador:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();