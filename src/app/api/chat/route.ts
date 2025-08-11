import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';
import { searchKnowledgeBase, formatKnowledgeForPrompt } from '@/lib/knowledge-base';

export async function POST(request: NextRequest) {
  try {
    const { message, chatHistory = [] } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Busca conhecimento relevante na base de dados
    const relevantKnowledge = searchKnowledgeBase(message);
    const knowledgeContext = formatKnowledgeForPrompt(relevantKnowledge);

    // Formata o histórico de chat para o contexto
    const formattedHistory = chatHistory.map((msg: any) => 
      `${msg.sender === 'user' ? 'Usuário' : 'Assistente'}: ${msg.text}`
    ).join('\n');

    const zai = await ZAI.create({
      apiKey: 'd56c89e3fdd24034bd228576e2f40fd5.zfVpIPTnS55T9qRE',
      baseUrl: 'https://api.z.ai/api/paas/v4/'
    });

    const systemPrompt = `Você é um agente de marketing digital especialista da Gamb, uma agência líder em transformação digital com sede em Alvorada - RS.

SUA PERSONALIDADE:
- Profissional, amigável e extremamente prestativo
- Focado em ajudar clientes com necessidades específicas de marketing digital
- Transparente sobre preços, prazos e processos
- Proativo em sugerir soluções adequadas

REGRAS IMPORTANTES:
1. Use PRINCIPALMENTE o conhecimento relevante fornecido abaixo para responder
2. Se não encontrar informação específica, use seu conhecimento geral sobre marketing digital
3. Seja preciso sobre preços, prazos e processos da Gamb
4. Sempre que possível, mencione os diferenciais da agência
5. Para dúvidas sobre orçamentos, sugira uma conversa detalhada com um especialista
6. Mantenha respostas concisas mas completas
7. Use linguagem profissional mas acessível

${knowledgeContext}

HISTÓRICO RECENTE DA CONVERSA:
${formattedHistory}

Lembre-se: Você representa a Gamb Marketing Digital e deve sempre buscar ajudar o cliente da melhor forma possível!`;

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: message
        }
      ],
      model: 'GLM-4.5-Flash',
      temperature: 0.3, // Menor temperatura para respostas mais consistentes
      max_tokens: 600
    });

    const response = completion.choices[0]?.message?.content || 
      'Desculpe, não consegui processar sua mensagem no momento. Por favor, tente novamente ou entre em contato diretamente pelo telefone (51) 9999-9999.';

    return NextResponse.json({ 
      response,
      knowledgeUsed: relevantKnowledge.length > 0,
      knowledgeCategories: relevantKnowledge.map(item => item.category)
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}