"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  User, 
  LogOut, 
  Ticket, 
  FileText, 
  BarChart3, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  MessageSquare,
  TrendingUp,
  Users,
  Target,
  Settings,
  Bell,
  Plus
} from "lucide-react";

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
  createdAt: string;
  updatedAt: string;
}

interface Project {
  id: string;
  name: string;
  category: string;
  status: string;
  budget?: number;
  startDate?: string;
  endDate?: string;
  createdAt: string;
}

interface Briefing {
  id: string;
  title: string;
  category: string;
  status: string;
  createdAt: string;
}

interface ClientDashboardProps {
  client: Client;
  onLogout: () => void;
}

const statusColors = {
  OPEN: "bg-blue-100 text-blue-800",
  IN_PROGRESS: "bg-yellow-100 text-yellow-800",
  RESOLVED: "bg-green-100 text-green-800",
  CLOSED: "bg-gray-100 text-gray-800",
  CANCELLED: "bg-red-100 text-red-800",
  PLANNING: "bg-purple-100 text-purple-800",
  IN_PROGRESS: "bg-yellow-100 text-yellow-800",
  COMPLETED: "bg-green-100 text-green-800",
  ON_HOLD: "bg-orange-100 text-orange-800",
  DRAFT: "bg-gray-100 text-gray-800",
  REVIEW: "bg-blue-100 text-blue-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800"
};

const statusLabels = {
  OPEN: "Aberto",
  IN_PROGRESS: "Em Andamento",
  RESOLVED: "Resolvido",
  CLOSED: "Fechado",
  CANCELLED: "Cancelado",
  PLANNING: "Planejamento",
  IN_PROGRESS: "Em Andamento",
  COMPLETED: "Concluído",
  ON_HOLD: "Em Pausa",
  DRAFT: "Rascunho",
  REVIEW: "Em Revisão",
  APPROVED: "Aprovado",
  REJECTED: "Rejeitado"
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

export function ClientDashboard({ client, onLogout }: ClientDashboardProps) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [briefings, setBriefings] = useState<Briefing[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Simular carregamento de dados
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // Simular API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dados mockados para demonstração
      setTickets([
        {
          id: "1",
          ticketNumber: "TKT-2024-001",
          subject: "Dúvida sobre SEO do site",
          category: "DUVIDA",
          priority: "MEDIUM",
          status: "RESOLVED",
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
          startDate: "2024-01-01T00:00:00Z",
          endDate: "2024-02-15T00:00:00Z",
          createdAt: "2023-12-15T00:00:00Z"
        },
        {
          id: "2",
          name: "Campanha Google Ads",
          category: "TRAFEGO_PAGO",
          status: "PLANNING",
          budget: 5000,
          startDate: "2024-02-01T00:00:00Z",
          endDate: "2024-04-30T00:00:00Z",
          createdAt: "2024-01-10T00:00:00Z"
        }
      ]);

      setBriefings([
        {
          id: "1",
          title: "Briefing para E-commerce",
          category: "ECOMMERCE",
          status: "APPROVED",
          createdAt: "2024-01-05T00:00:00Z"
        },
        {
          id: "2",
          title: "Briefing Campanha Natal",
          category: "MARKETING_DIGITAL",
          status: "DRAFT",
          createdAt: "2024-01-12T00:00:00Z"
        }
      ]);

      setLoading(false);
    };

    loadData();
  }, []);

  const stats = {
    totalTickets: tickets.length,
    openTickets: tickets.filter(t => t.status === 'OPEN' || t.status === 'IN_PROGRESS').length,
    activeProjects: projects.filter(p => p.status === 'IN_PROGRESS' || p.status === 'PLANNING').length,
    totalBriefings: briefings.length
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xl">G</span>
                </div>
                <span className="text-2xl font-bold">Gamb</span>
              </div>
              <div className="hidden md:block">
                <h1 className="text-lg font-semibold">Área do Cliente</h1>
                <p className="text-sm text-muted-foreground">Bem-vindo de volta, {client.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notificações
              </Button>
              <Button variant="outline" size="sm" onClick={onLogout}>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
              <div className="text-2xl font-bold">{projects.length}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeProjects} ativos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Briefings</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBriefings}</div>
              <p className="text-xs text-muted-foreground">
                {briefings.filter(b => b.status === 'APPROVED').length} aprovados
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Ativo</div>
              <p className="text-xs text-muted-foreground">
                Desde {formatDate(client.createdAt)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
            <TabsTrigger value="projects">Projetos</TabsTrigger>
            <TabsTrigger value="briefings">Briefings</TabsTrigger>
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
                    Seus tickets mais recentes e seu status
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
                              {ticket.ticketNumber} • {formatDate(ticket.createdAt)}
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

              {/* Active Projects */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Projetos Ativos
                  </CardTitle>
                  <CardDescription>
                    Seus projetos em andamento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Carregando...
                    </div>
                  ) : projects.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Nenhum projeto encontrado.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {projects.filter(p => p.status === 'IN_PROGRESS' || p.status === 'PLANNING').map((project) => (
                        <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium text-sm">{project.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {project.budget ? `R$ ${project.budget.toLocaleString()}` : 'Orçamento a definir'}
                            </div>
                          </div>
                          <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                            {statusLabels[project.status as keyof typeof statusLabels]}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
                <CardDescription>
                  Acesse rapidamente as funcionalidades mais utilizadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <Plus className="h-6 w-6 mb-2" />
                    <span className="text-xs">Novo Ticket</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <FileText className="h-6 w-6 mb-2" />
                    <span className="text-xs">Novo Briefing</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <BarChart3 className="h-6 w-6 mb-2" />
                    <span className="text-xs">Relatórios</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Settings className="h-6 w-6 mb-2" />
                    <span className="text-xs">Configurações</span>
                  </Button>
                </div>
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
                      Meus Tickets
                    </CardTitle>
                    <CardDescription>
                      Acompanhe o status e andamento dos seus tickets de suporte
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
                    Carregando tickets...
                  </div>
                ) : tickets.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Ticket className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum ticket encontrado.</p>
                    <Button className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Criar Primeiro Ticket
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {tickets.map((ticket) => (
                      <div key={ticket.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold">{ticket.subject}</h3>
                            <Badge variant="outline">{ticket.ticketNumber}</Badge>
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
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <span>Categoria: {ticket.category}</span>
                            <span>•</span>
                            <span>Criado em: {formatDate(ticket.createdAt)}</span>
                            {ticket.updatedAt !== ticket.createdAt && (
                              <>
                                <span>•</span>
                                <span>Atualizado: {formatDate(ticket.updatedAt)}</span>
                              </>
                            )}
                          </div>
                          <Button variant="outline" size="sm">
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Meus Projetos
                    </CardTitle>
                    <CardDescription>
                      Acompanhe o andamento dos seus projetos
                    </CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Projeto
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Carregando projetos...
                  </div>
                ) : projects.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum projeto encontrado.</p>
                    <Button className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Criar Primeiro Projeto
                    </Button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {projects.map((project) => (
                      <Card key={project.id}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{project.name}</CardTitle>
                            <Badge className={statusColors[project.status as keyof typeof statusColors]}>
                              {statusLabels[project.status as keyof typeof statusLabels]}
                            </Badge>
                          </div>
                          <CardDescription>
                            {project.category}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {project.budget && (
                              <div className="flex justify-between text-sm">
                                <span>Orçamento:</span>
                                <span className="font-medium">R$ {project.budget.toLocaleString()}</span>
                              </div>
                            )}
                            {project.startDate && (
                              <div className="flex justify-between text-sm">
                                <span>Início:</span>
                                <span className="font-medium">{formatDate(project.startDate)}</span>
                              </div>
                            )}
                            {project.endDate && (
                              <div className="flex justify-between text-sm">
                                <span>Término:</span>
                                <span className="font-medium">{formatDate(project.endDate)}</span>
                              </div>
                            )}
                            <div className="flex justify-between text-sm">
                              <span>Criado em:</span>
                              <span className="font-medium">{formatDate(project.createdAt)}</span>
                            </div>
                          </div>
                          <Button className="w-full mt-4" variant="outline">
                            Ver Detalhes
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Briefings Tab */}
          <TabsContent value="briefings" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Meus Briefings
                    </CardTitle>
                    <CardDescription>
                      Acompanhe seus briefings e documentos estratégicos
                    </CardDescription>
                  </div>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Briefing
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Carregando briefings...
                  </div>
                ) : briefings.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum briefing encontrado.</p>
                    <Button className="mt-4">
                      <Plus className="h-4 w-4 mr-2" />
                      Criar Primeiro Briefing
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {briefings.map((briefing) => (
                      <div key={briefing.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{briefing.title}</h3>
                          <Badge className={statusColors[briefing.status as keyof typeof statusColors]}>
                            {statusLabels[briefing.status as keyof typeof statusLabels]}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <span>Categoria: {briefing.category}</span>
                            <span>•</span>
                            <span>Criado em: {formatDate(briefing.createdAt)}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Visualizar
                            </Button>
                            <Button variant="outline" size="sm">
                              Baixar
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}