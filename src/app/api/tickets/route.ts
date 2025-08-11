import { NextRequest, NextResponse } from 'next/server';
import { createTicket, getAllTickets, TicketFormData } from '@/lib/tickets';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    if (action === 'create') {
      const { name, email, phone, subject, description, category, chatHistory } = data;
      
      if (!name || !email || !subject || !description || !category) {
        return NextResponse.json({ error: 'Campos obrigatórios não preenchidos' }, { status: 400 });
      }

      const ticketData: TicketFormData = {
        name,
        email,
        phone: phone || '',
        subject,
        description,
        category
      };

      const ticket = createTicket(ticketData, chatHistory || []);
      
      return NextResponse.json({ 
        success: true, 
        ticket: {
          id: ticket.id,
          status: ticket.status,
          createdAt: ticket.createdAt
        }
      });
    }

    return NextResponse.json({ error: 'Ação não suportada' }, { status: 400 });
  } catch (error) {
    console.error('Error in tickets API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const tickets = getAllTickets();
    return NextResponse.json({ tickets });
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}