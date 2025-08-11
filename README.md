# 🚀 Gamb - Plataforma de Marketing Digital

Uma plataforma completa de marketing digital desenvolvida com tecnologias modernas, oferecendo serviços de SEO, tráfego pago, gestão de redes sociais e web design para empresas de todos os portes.

## ✨ Visão Geral

O Gamb é uma agência de marketing digital sediada em Alvorada - RS, especializada em transformar negócios através de estratégias digitais inovadoras. Esta plataforma web oferece:

- 🎯 **Briefing Inteligente** - Sistema automatizado de criação de briefings com IA
- 🛠️ **Ferramentas de Marketing** - Suite completa para análise e otimização
- 👥 **Área do Cliente** - Dashboard exclusivo para acompanhamento de projetos
- 💬 **Chat com RGA** - Chat inteligente com Retrieval-Augmented Generation
- 📊 **Analytics Completo** - Tracking de conversões e métricas em tempo real

## 🚀 Tecnologias Utilizadas

### Frontend
- **⚡ Next.js 15** - Framework React com App Router
- **📘 TypeScript 5** - Tipagem segura e desenvolvimento robusto
- **🎨 Tailwind CSS 4** - Framework CSS utility-first
- **🧩 shadcn/ui** - Componentes UI acessíveis e modernos
- **🎯 Lucide React** - Biblioteca de ícones consistente

### Backend & IA
- **🤖 Z.ai SDK** - Integração com modelo GLM-4.5-Flash para IA
- **🗄️ Prisma ORM** - Mapeamento objeto-relacional com SQLite
- **🔐 bcryptjs** - Hashing de senhas seguro
- **📊 Socket.io** - Comunicação em tempo real

### Infraestrutura
- **🗄️ Banco de Dados** - SQLite (desenvolvimento) / Supabase (produção)
- **🌐 API Routes** - Endpoints RESTful no Next.js
- **📱 Responsivo** - Design mobile-first

## 🎯 Funcionalidades Principais

### 1. 🏠 Página Principal
- Hero section com call-to-action
- Showcase de serviços (SEO, Tráfego Pago, Redes Sociais, Web Design)
- Depoimentos de clientes
- Formulário de contato
- Popup promocional
- Aviso de cookies

### 2. 🤖 Chat Inteligente com RGA
- Chat em tempo real disponível em todas as páginas
- Integração com base de conhecimento da Gamb
- Sistema de tickets integrado
- Respostas contextualizadas com histórico

### 3. 📝 Briefing Inteligente
- Formulário guiado para criação de briefings
- Processamento com IA da Z.ai
- Geração automática de conteúdo estruturado
- Categorização inteligente por tipo de projeto

### 4. 🛠️ Ferramentas de Marketing
- **Analisador SEO** - Análise de palavras-chave e sugestões
- **Gerador de Anúncios** - Criação de copy para Google Ads e Facebook
- **Gerador de Posts** - Conteúdo para redes sociais
- **Calculadora de ROI** - Projeção de retorno sobre investimento

### 5. 👥 Área do Cliente
- Sistema de autenticação completo
- Dashboard com métricas principais
- Gerenciamento de tickets
- Acompanhamento de projetos
- Histórico de briefings
- Relatórios e analytics

### 6. 📊 Sistema de Analytics
- Tracking de eventos personalizados
- Análise de conversões
- Métricas de engajamento
- Relatórios de desempenho

## 🗄️ Estrutura do Banco de Dados

### Modelos Principais
```sql
-- Clientes
Client {
  id: String (primary key)
  email: String (unique)
  name: String
  phone: String?
  companyName: String?
  industry: String?
  companySize: String?
  status: String
  createdAt: DateTime
}

-- Tickets de Suporte
Ticket {
  id: String (primary key)
  ticketNumber: String (unique)
  clientId: String (foreign key)
  subject: String
  category: String
  priority: String
  status: String
  messages: Json
  createdAt: DateTime
  updatedAt: DateTime
}

-- Projetos
Project {
  id: String (primary key)
  clientId: String (foreign key)
  name: String
  category: String
  status: String
  budget: Float?
  startDate: DateTime?
  endDate: DateTime?
  description: String?
  createdAt: DateTime
}

-- Briefings
Briefing {
  id: String (primary key)
  clientId: String (foreign key)
  title: String
  category: String
  content: String
  status: String
  createdAt: DateTime
}

-- Eventos de Analytics
AnalyticsEvent {
  id: String (primary key)
  clientId: String?
  eventType: String
  eventData: Json?
  timestamp: DateTime
}

-- Membros da Equipe
TeamMember {
  id: String (primary key)
  name: String
  email: String (unique)
  role: String
  department: String
  bio: String?
  avatar: String?
  isActive: Boolean
  createdAt: DateTime
}
```

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Conta na Z.ai (para funcionalidades de IA)

### Passo 1: Clonar o Projeto
```bash
git clone https://github.com/OARANHA/gamb-marketing-digital.git
cd gamb-marketing-digital
```

### Passo 2: Instalar Dependências
```bash
npm install
```

### Passo 3: Configurar Variáveis de Ambiente
Criar arquivo `.env.local` na raiz do projeto:
```env
# Z.ai Configuration
ZAI_API_KEY=sua_chave_api_zai
ZAI_BASE_URL=https://api.z.ai/v1

# Database Configuration
DATABASE_URL="file:./dev.db"

# NextAuth Configuration
NEXTAUTH_SECRET=sua_chave_secreta
NEXTAUTH_URL=http://localhost:3000
```

### Passo 4: Configurar Banco de Dados
```bash
# Gerar Prisma Client
npx prisma generate

# Push do schema para o banco
npm run db:push

# (Opcional) Visualizar banco de dados
npx prisma studio
```

### Passo 5: Iniciar Servidor de Desenvolvimento
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) para visualizar a aplicação.

## 🌐 Migração para Supabase

### Passo 1: Criar Projeto Supabase
1. Acesse [Supabase](https://supabase.com)
2. Crie um novo projeto
3. Copie as credenciais do projeto

### Passo 2: Configurar Variáveis de Ambiente
Atualize `.env.local`:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Passo 3: Migrar Schema do Banco
1. Acesse o painel do Supabase
2. Vá para "SQL Editor"
3. Execute o schema do Prisma adaptado para PostgreSQL:

```sql
-- Tabela de Clientes
CREATE TABLE clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  company_name VARCHAR(255),
  industry VARCHAR(100),
  company_size VARCHAR(50),
  status VARCHAR(50) DEFAULT 'ACTIVE',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Tickets
CREATE TABLE tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_number VARCHAR(50) UNIQUE NOT NULL,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  subject VARCHAR(500) NOT NULL,
  category VARCHAR(100) NOT NULL,
  priority VARCHAR(20) DEFAULT 'MEDIUM',
  status VARCHAR(50) DEFAULT 'OPEN',
  messages JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Projetos
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  status VARCHAR(50) DEFAULT 'PLANNING',
  budget DECIMAL(10,2),
  start_date DATE,
  end_date DATE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Briefings
CREATE TABLE briefings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'DRAFT',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Analytics
CREATE TABLE analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  event_type VARCHAR(100) NOT NULL,
  event_data JSONB,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Membros da Equipe
CREATE TABLE team_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(100) NOT NULL,
  department VARCHAR(100),
  bio TEXT,
  avatar VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para performance
CREATE INDEX idx_tickets_client_id ON tickets(client_id);
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_projects_client_id ON projects(client_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_briefings_client_id ON briefings(client_id);
CREATE INDEX idx_analytics_client_id ON analytics_events(client_id);
CREATE INDEX idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_timestamp ON analytics_events(timestamp);
```

### Passo 4: Atualizar Prisma Schema
Modificar `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Modelos adaptados para PostgreSQL com UUID
model Client {
  id          String   @id @default(uuid()) @db.Uuid
  email       String   @unique
  name        String
  phone       String?
  companyName String?
  industry    String?
  companySize String?
  status      String   @default("ACTIVE")
  createdAt   DateTime @default(now()) @db.Timestamp(6)
  updatedAt   DateTime @updatedAt @db.Timestamp(6)

  tickets     Ticket[]
  projects    Project[]
  briefings   Briefing[]
  analytics   AnalyticsEvent[]

  @@map("clients")
}

// ... outros modelos adaptados similarmente
```

### Passo 5: Instalar Cliente Supabase
```bash
npm install @supabase/supabase-js
```

### Passo 6: Criar Cliente Supabase
Criar `src/lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
```

### Passo 7: Migrar Dados (Opcional)
Se tiver dados existentes no SQLite, crie um script de migração.

## 📁 Estrutura do Projeto

```
src/
├── app/                          # Next.js App Router
│   ├── api/                     # API Routes
│   │   ├── auth/               # Autenticação
│   │   ├── briefing/           # Briefing inteligente
│   │   ├── chat/               # Chat com IA
│   │   ├── tickets/            # Sistema de tickets
│   │   └── health/             # Health check
│   ├── page.tsx                # Página principal
│   ├── layout.tsx              # Layout raiz
│   └── globals.css             # Estilos globais
├── components/                  # Componentes React
│   ├── ui/                     # shadcn/ui components
│   ├── AuthForms.tsx           # Formulários de autenticação
│   ├── BriefingForm.tsx        # Formulário de briefing
│   ├── BudgetForm.tsx          # Calculadora de orçamento
│   ├── ClientDashboard.tsx     # Dashboard do cliente
│   ├── MarketingTools.tsx      # Ferramentas de marketing
│   ├── ModalLayout.tsx         # Layout de modais
│   ├── Portfolio.tsx           # Portfólio de cases
│   └── TicketForm.tsx          # Formulário de tickets
├── hooks/                       # Custom hooks
│   ├── use-analytics.ts        # Hook de analytics
│   └── use-toast.ts           # Hook de notificações
├── lib/                         # Utilitários
│   ├── db.ts                   # Cliente Prisma
│   ├── knowledge-base.ts       # Base de conhecimento RGA
│   └── socket.ts              # Configuração Socket.io
└── prisma/                      # Schema do banco
    └── schema.prisma
```

## 🎨 Componentes UI Disponíveis

### Layout
- **ModalLayout** - Layout consistente para modais com header/footer
- **Card** - Container para conteúdo
- **Separator** - Divisores visuais

### Formulários
- **Input** - Campos de texto
- **Textarea** - Áreas de texto
- **Select** - Seleção de opções
- **Button** - Botões com vários estilos

### Feedback
- **Alert** - Mensagens de alerta
- **Toast** - Notificações temporárias
- **Progress** - Indicadores de progresso
- **Skeleton** - Loading states

### Navegação
- **Tabs** - Abas para organização de conteúdo
- **Navigation Menu** - Menus de navegação

### Dados
- **Badge** - Tags e indicadores
- **Avatar** - Imagens de perfil

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Iniciar servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Iniciar servidor de produção
npm run lint         # Verificar linting

# Banco de Dados
npm run db:push      # Push do schema para o banco
npm run db:studio    # Abrir Prisma Studio
npm run db:generate  # Gerar Prisma Client

# Outros
npm run type-check   # Verificação de tipos
npm run format       # Formatar código
```

## 🚀 Deploy

### Vercel (Recomendado)
1. Conectar repositório GitHub à Vercel
2. Configurar variáveis de ambiente
3. Deploy automático em cada push

### Outras Plataformas
- **Netlify** - Configurar build command e output directory
- **Railway** - Configurar serviço Node.js
- **Digital Ocean** - Deploy com App Platform

## 🔐 Segurança

- Autenticação com bcryptjs
- Validação de formulários no cliente e servidor
- Proteção contra XSS e CSRF
- Variáveis de ambiente sensíveis
- CORS configurado

## 📈 Monitoramento e Analytics

- Tracking de eventos personalizados
- Análise de conversões
- Métricas de engajamento
- Monitoramento de erros
- Performance monitoring

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Contato

**Gamb Marketing Digital**
- 📍 Alvorada - RS
- 📧 contato@gamb.com.br
- 📱 (51) 9999-9999
- 🌐 https://gamb.com.br

---

Desenvolvido com ❤️ pela equipe Gamb. Transformando negócios através de estratégias digitais inovadoras.