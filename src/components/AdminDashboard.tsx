"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  LogOut, 
  Users, 
  Ticket, 
  FileText, 
  BarChart3, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  MessageSquare,
  TrendingUp,
  Target,
  Settings,
  Bell,
  Plus,
  Eye,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  Activity,
  DollarSign,
  Database,
  Globe
} from "lucide-react";

interface Admin {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  bio?: string;
  specialties?: string[];
  isActive: boolean;
  createdAt: string;
}

interface Client {
  id: string;
  email: string;
  name: string;
  companyName?: string;
  industry?: string;
  companySize?: string;
  status: string;
  createdAt: string;
}

interface Ticket {
  id: string;
  ticketNumber: string;
  subject: string;
  category: string;
  priority: string;
  status: string;
  client: {
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface Project {
  id: string;
  name: string;
  category: string;
  status: string;
  budget?: number;
  client: {
    name: string;
    email: string;
  };
  createdAt: string;
}

interface Briefing {
  id: string;
  title: string;
  category: string;
  status: string;
  client: {
    name: string;
    email: string;
  };
  createdAt: string;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

interface AdminDashboardProps {
  admin: Admin;
  onLogout: () => void;
}

const statusColors = {
  OPEN: "bg-blue-100 text-blue-800",
  IN_PROGRESS: "bg-yellow-100 text-yellow-800",
  RESOLVED: "bg-green-100 text-green-800",
  CLOSED: "bg-gray-100 text-gray-800",
  CANCELLED: "bg-red-100 text-red-800",
  PLANNING: "bg-purple-100 text-purple-800",
  COMPLETED: "bg-green-100 text-green-800",
  ON_HOLD: "bg-orange-100 text-orange-800",
  DRAFT: "bg-gray-100 text-gray-800",
  REVIEW: "bg-blue-100 text-blue-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
  ACTIVE: "bg-green-100 text-green-800",
  INACTIVE: "bg-red-100 text-red-800",
  PENDING: "bg-yellow-100 text-yellow-800",
  BLOCKED: "bg-red-100 text-red-800"
};

const statusLabels = {
  OPEN: "Aberto",
  IN_PROGRESS: "Em Andamento",
  RESOLVED: "Resolvido",
  CLOSED: "Fechado",
  CANCELLED: "Cancelado",
  PLANNING: "Planejamento",
  COMPLETED: "Concluído",
  ON_HOLD: "Em Pausa",
  DRAFT: "Rascunho",
  REVIEW: "Em Revisão",
  APPROVED: "Aprovado",
  REJECTED: "Rejeitado",
  ACTIVE: "Ativo",
  INACTIVE: "Inativo",
  PENDING: "Pendente",
  BLOCKED: "Bloqueado"
};

const priorityColors = {
  LOW: "bg-green-100 text-green-800",
  MEDIUM: "bg-yellow-100 text-yellow-800",
  HIGH: "bg-orange-100 text-orange-800",
  URGENT: "bg-red-100 text-red-800"
};

const priorityLabels = {
  LOW: "Baixa",
  MEDIUM: "Média",
  HIGH: "Alta",
  URGENT: "Urgente"
};

const roleLabels = {
  ADMIN: "Administrador",
  MANAGER: "Gerente",
  AGENT: "Agente",
  INTERN: "Estagiário"
};

export function AdminDashboard({ admin, onLogout }: AdminDashboardProps) {
  const [clients, setClients] = useState<Client[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [briefings, setBriefings] = useState<Briefing[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Simular carregamento de dados
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dados mockados para demonstração
      setClients([
        {
          id: "1",
          email: "joao@empresa.com",
          name: "João Silva",
          companyName: "Tech Solutions",
          industry: "Tecnologia",
          companySize: "small",
          status: "ACTIVE",
          createdAt: "2024-01-15T10:30:00Z"
        },
        {
          id: "2",
          email: "maria@boutique.com",
          name: "Maria Santos",
          companyName: "Boutique Chic",
          industry: "Varejo",
          companySize: "micro",
          status: "ACTIVE",
          createdAt: "2024-01-18T09:15:00Z"
        },
        {
          id: "3",
          email: "carlos@restaurante.com",
          name: "Carlos Oliveira",
          companyName: "Restaurante Sabor",
          industry: "Alimentação",
          companySize: "small",
          status: "PENDING",
          createdAt: "2024-01-20T11:00:00Z"
        }
      ]);

      setTickets([
        {
          id: "1",
          ticketNumber: "TKT-2024-001",
          subject: "Dúvida sobre SEO do site",
          category: "DUVIDA",
          priority: "MEDIUM",
          status: "RESOLVED",
          client: { name: "João Silva", email: "joao@empresa.com" },
          createdAt: "2024-01-15T10:30:00Z",
          updatedAt: "2024-01-16T14:20:00Z"
        },
        {
          id: "2",
          ticketNumber: "TKT-2024-002",
          subject: "Orçamento para campanha de tráfego pago",
          category: "ORCAMENTO",
          priority: "HIGH",
          status: "IN_PROGRESS",
          client: { name: "Maria Santos", email: "maria@boutique.com" },
          createdAt: "2024-01-18T09:15:00Z",
          updatedAt: "2024-01-18T16:45:00Z"
        },
        {
          id: "3",
          ticketNumber: "TKT-2024-003",
          subject: "Problema no acesso ao relatório",
          category: "SUPORTE",
          priority: "URGENT",
          status: "OPEN",
          client: { name: "Carlos Oliveira", email: "carlos@restaurante.com" },
          createdAt: "2024-01-20T11:00:00Z",
          updatedAt: "2024-01-20T11:00:00Z"
        }
      ]);

      setProjects([
        {
          id: "1",
          name: "Reformulação do Website",
          category: "WEBSITE",
          status: "IN_PROGRESS",
          budget: 15000,
          client: { name: "João Silva", email: "joao@empresa.com" },
          createdAt: "2023-12-15T00:00:00Z"
        },
        {
          id: "2",
          name: "Campanha Google Ads",
          category: "TRAFEGO_PAGO",
          status: "PLANNING",
          budget: 5000,
          client: { name: "Maria Santos", email: "maria@boutique.com" },
          createdAt: "2024-01-10T00:00:00Z"
        }
      ]);

      setBriefings([
        {
          id: "1",
          title: "Briefing para E-commerce",
          category: "ECOMMERCE",
          status: "APPROVED",
          client: { name: "João Silva", email: "joao@empresa.com" },
          createdAt: "2024-01-05T00:00:00Z"
        },
        {
          id: "2",
          title: "Briefing Campanha Natal",
          category: "MARKETING_DIGITAL",
          status: "DRAFT",
          client: { name: "Maria Santos", email: "maria@boutique.com" },
          createdAt: "2024-01-12T00:00:00Z"
        }
      ]);

      setTeamMembers([
        {
          id: "1",
          name: "Ana Administradora",
          email: "ana@gamb.com.br",
          role: "ADMIN",
          isActive: true,
          createdAt: "2023-01-01T00:00:00Z"
        },
        {
          id: "2",
          name: "Carlos Gerente",
          email: "carlos@gamb.com.br",
          role: "MANAGER",
          isActive: true,
          createdAt: "2023-02-15T00:00:00Z"
        },
        {
          id: "3",
          name: "Bruna Agente",
          email: "bruna@gamb.com.br",
          role: "AGENT",
          isActive: true,
          createdAt: "2023-03-10T00:00:00Z"
        }
      ]);

      setLoading(false);
    };

    loadData();
  }, []);

  const stats = {
    totalClients: clients.length,
    activeClients: clients.filter(c => c.status === 'ACTIVE').length,
    totalTickets: tickets.length,
    openTickets: tickets.filter(t => t.status === 'OPEN' || t.status === 'IN_PROGRESS').length,
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'IN_PROGRESS' || p.status === 'PLANNING').length,
    totalBriefings: briefings.length,
    totalTeamMembers: teamMembers.length,
    activeTeamMembers: teamMembers.filter(t => t.isActive).length
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-red-600 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <span className="text-2xl font-bold">Gamb Admin</span>
              </div>
              <div className="hidden md:block">
                <h1 className="text-lg font-semibold">Painel Administrativo</h1>
                <p className="text-sm text-red-100">Bem-vindo, {admin.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-white text-red-600">
                {roleLabels[admin.role as keyof typeof roleLabels]}
              </Badge>
              <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-red-600">
                <Bell className="h-4 w-4 mr-2" />
                Notificações
              </Button>
              <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-red-600" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalClients}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeClients} ativos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tickets</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTickets}</div>
              <p className="text-xs text-muted-foreground">
                {stats.openTickets} em andamento
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projetos</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProjects}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeProjects} ativos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Equipe</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTeamMembers}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeTeamMembers} ativos
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
            <TabsTrigger value="team">Equipe</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Tickets */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ticket className="h-5 w-5" />
                    Tickets Recentes
                  </CardTitle>
                  <CardDescription>
                    Tickets mais recentes e seu status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Carregando...
                    </div>
                  ) : tickets.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Ticket className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Nenhum ticket encontrado.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {tickets.slice(0, 3).map((ticket) => (
                        <div key={ticket.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium text-sm">{ticket.subject}</div>
                            <div className="text-xs text-muted-foreground">
                              {ticket.ticketNumber} • {ticket.client.name}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={statusColors[ticket.status as keyof typeof statusColors]}>
                              {statusLabels[ticket.status as keyof typeof statusLabels]}
                            </Badge>
                            <Badge className={priorityColors[ticket.priority as keyof typeof priorityColors]}>
                              {priorityLabels[ticket.priority as keyof typeof priorityLabels]}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Clients */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Clientes Recentes
                  </CardTitle>
                  <CardDescription>
                    Novos clientes cadastrados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Carregando...
                    </div>
                  ) : clients.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Nenhum cliente encontrado.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {clients.slice(0, 3).map((client) => (
                        <div key={client.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium text-sm">{client.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {client.companyName || 'N/A'} • {client.email}
                            </div>
                          </div>
                          <Badge className={statusColors[client.status as keyof typeof statusColors]}>
                            {statusLabels[client.status as keyof typeof statusLabels]}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Status do Sistema
                </CardTitle>
                <CardDescription>
                  Status dos serviços e componentes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium text-sm">API Z.ai</div>
                      <div className="text-xs text-muted-foreground">Operacional</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium text-sm">Banco de Dados</div>
                      <div className="text-xs text-muted-foreground">Conectado</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium text-sm">Socket.io</div>
                      <div className="text-xs text-muted-foreground">Ativo</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Gerenciamento de Clientes
                    </CardTitle>
                    <CardDescription>
                      Todos os clientes cadastrados na plataforma
                    </CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Cliente
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Carregando...
                  </div>
                ) : clients.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum cliente encontrado.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {clients.map((client) => (
                      <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{client.name}</div>
                          <div className="text-sm text-muted-foreground">{client.email}</div>
                          <div className="text-xs text-muted-foreground">
                            {client.companyName} • {client.industry} • {client.companySize}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={statusColors[client.status as keyof typeof statusColors]}>
                            {statusLabels[client.status as keyof typeof statusLabels]}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tickets Tab */}
          <TabsContent value="tickets" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Ticket className="h-5 w-5" />
                      Gerenciamento de Tickets
                    </CardTitle>
                    <CardDescription>
                      Todos os tickets de suporte
                    </CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Ticket
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Carregando...
                  </div>
                ) : tickets.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Ticket className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum ticket encontrado.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {tickets.map((ticket) => (
                      <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{ticket.subject}</div>
                          <div className="text-sm text-muted-foreground">
                            {ticket.ticketNumber} • {ticket.client.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Criado em {formatDate(ticket.createdAt)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={statusColors[ticket.status as keyof typeof statusColors]}>
                            {statusLabels[ticket.status as keyof typeof statusLabels]}
                          </Badge>
                          <Badge className={priorityColors[ticket.priority as keyof typeof priorityColors]}>
                            {priorityLabels[ticket.priority as keyof typeof priorityLabels]}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <UserCheck className="h-5 w-5" />
                      Gerenciamento de Equipe
                    </CardTitle>
                    <CardDescription>
                      Membros da equipe interna
                    </CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Membro
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Carregando...
                  </div>
                ) : teamMembers.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <UserCheck className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum membro da equipe encontrado.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.email}</div>
                          <div className="text-xs text-muted-foreground">
                            {roleLabels[member.role as keyof typeof roleLabels]} • Desde {formatDate(member.createdAt)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={member.isActive ? "default" : "secondary"}>
                            {member.isActive ? "Ativo" : "Inativo"}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          {member.role !== 'ADMIN' && (
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Métricas Gerais
                  </CardTitle>
                  <CardDescription>
                    Estatísticas da plataforma
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total de Clientes</span>
                      <span className="font-bold">{stats.totalClients}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total de Tickets</span>
                      <span className="font-bold">{stats.totalTickets}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total de Projetos</span>
                      <span className="font-bold">{stats.totalProjects}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total de Briefings</span>
                      <span className="font-bold">{stats.totalBriefings}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Crescimento
                  </CardTitle>
                  <CardDescription>
                    Indicadores de crescimento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Novos Clientes (Mês)</span>
                      <span className="font-bold text-green-600">+3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Tickets Resolvidos (Mês)</span>
                      <span className="font-bold text-green-600">+12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Projetos Concluídos (Mês)</span>
                      <span className="font-bold text-green-600">+2</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Taxa de Satisfação</span>
                      <span className="font-bold text-green-600">98%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Status do Sistema
                </CardTitle>
                <CardDescription>
                  Monitoramento em tempo real
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="font-medium">API Z.ai</div>
                    <div className="text-sm text-muted-foreground">100% Uptime</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="font-medium">Banco de Dados</div>
                    <div className="text-sm text-muted-foreground">99.9% Uptime</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="font-medium">Socket.io</div>
                    <div className="text-sm text-muted-foreground">Ativo</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Globe className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="font-medium">CDN</div>
                    <div className="text-sm text-muted-foreground">Global</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}