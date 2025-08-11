import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const zai = await ZAI.create({
      apiKey: 'd56c89e3fdd24034bd228576e2f40fd5.zfVpIPTnS55T9qRE',
      baseUrl: 'https://api.z.ai/api/paas/v4/'
    });

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'Você é um agente de marketing digital da Gamb, uma agência especializada em transformar negócios através de estratégias digitais inovadoras. Seja profissional, amigável e focado em ajudar os clientes com suas necessidades de marketing digital. A agência está localizada em Alvorada - RS e oferece serviços como SEO, tráfego pago, redes sociais e web design.'
        },
        {
          role: 'user',
          content: message
        }
      ],
      model: 'GLM-4.5-Flash',
      temperature: 0.7,
      max_tokens: 500
    });

    const response = completion.choices[0]?.message?.content || 'Desculpe, não consegui processar sua mensagem no momento.';

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}