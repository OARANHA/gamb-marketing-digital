export interface Ticket {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  chatHistory: { text: string; sender: 'user' | 'agent'; timestamp: Date }[];
  createdAt: Date;
  updatedAt: Date;
  assignedTo?: string;
}

export interface TicketFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  description: string;
  category: string;
}

// Simulação de banco de dados de tickets
let tickets: Ticket[] = [];

export function generateTicketId(): string {
  return `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

export function createTicket(data: TicketFormData, chatHistory: { text: string; sender: 'user' | 'agent' }[] = []): Ticket {
  const ticket: Ticket = {
    id: generateTicketId(),
    customerName: data.name,
    customerEmail: data.email,
    customerPhone: data.phone,
    subject: data.subject,
    description: data.description,
    status: 'open',
    priority: 'medium',
    category: data.category,
    chatHistory: chatHistory.map(msg => ({
      ...msg,
      timestamp: new Date()
    })),
    createdAt: new Date(),
    updatedAt: new Date()
  };

  tickets.push(ticket);
  
  // Simular envio de email para a equipe
  console.log(`📧 Novo ticket criado: ${ticket.id} - ${ticket.subject}`);
  
  return ticket;
}

export function getTicketById(id: string): Ticket | undefined {
  return tickets.find(ticket => ticket.id === id);
}

export function updateTicketStatus(id: string, status: Ticket['status']): boolean {
  const ticket = getTicketById(id);
  if (ticket) {
    ticket.status = status;
    ticket.updatedAt = new Date();
    return true;
  }
  return false;
}

export function assignTicket(id: string, assignedTo: string): boolean {
  const ticket = getTicketById(id);
  if (ticket) {
    ticket.assignedTo = assignedTo;
    ticket.status = 'in_progress';
    ticket.updatedAt = new Date();
    return true;
  }
  return false;
}

export function getTicketsByStatus(status: Ticket['status']): Ticket[] {
  return tickets.filter(ticket => ticket.status === status);
}

export function getTicketsByCategory(category: string): Ticket[] {
  return tickets.filter(ticket => ticket.category === category);
}

export function getAllTickets(): Ticket[] {
  return tickets.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
}

export function addMessageToTicket(ticketId: string, message: { text: string; sender: 'user' | 'agent' }): boolean {
  const ticket = getTicketById(ticketId);
  if (ticket) {
    ticket.chatHistory.push({
      ...message,
      timestamp: new Date()
    });
    ticket.updatedAt = new Date();
    return true;
  }
  return false;
}

// Categorias de tickets disponíveis
export const TICKET_CATEGORIES = [
  { value: 'orcamento', label: 'Orçamento' },
  { value: 'suporte', label: 'Suporte Técnico' },
  { value: 'duvida', label: 'Dúvidas' },
  { value: 'reclamacao', label: 'Reclamação' },
  { value: 'sugestao', label: 'Sugestão' },
  { value: 'parceria', label: 'Parceria' }
];

// Prioridades de tickets
export const TICKET_PRIORITIES = [
  { value: 'low', label: 'Baixa', color: 'text-green-600' },
  { value: 'medium', label: 'Média', color: 'text-yellow-600' },
  { value: 'high', label: 'Alta', color: 'text-orange-600' },
  { value: 'urgent', label: 'Urgente', color: 'text-red-600' }
];

// Status de tickets
export const TICKET_STATUSES = [
  { value: 'open', label: 'Aberto', color: 'bg-blue-100 text-blue-800' },
  { value: 'in_progress', label: 'Em Andamento', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'resolved', label: 'Resolvido', color: 'bg-green-100 text-green-800' },
  { value: 'closed', label: 'Fechado', color: 'bg-gray-100 text-gray-800' }
];