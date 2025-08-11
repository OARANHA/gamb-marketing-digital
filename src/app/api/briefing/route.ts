import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

interface BriefingData {
  projectName: string;
  companyName: string;
  industry: string;
  companySize: string;
  targetAudience: string;
  mainObjectives: string;
  keyMessage: string;
  competitors: string;
  budgetRange: string;
  timeline: string;
  deliverables: string[];
  additionalInfo: string;
}

const industryLabels: Record<string, string> = {
  "ecommerce": "E-commerce",
  "saas": "SaaS",
  "services": "Serviços",
  "education": "Educação",
  "health": "Saúde",
  "real-estate": "Imobiliário",
  "restaurant": "Restaurantes",
  "finance": "Finanças",
  "technology": "Tecnologia",
  "other": "Outro"
};

const companySizeLabels: Record<string, string> = {
  "micro": "Microempresa (até 9 funcionários)",
  "small": "Pequena (10-49 funcionários)",
  "medium": "Média (50-249 funcionários)",
  "large": "Grande (250+ funcionários)"
};

const budgetLabels: Record<string, string> = {
  "5k-15k": "R$ 5.000 - R$ 15.000",
  "15k-30k": "R$ 15.000 - R$ 30.000",
  "30k-50k": "R$ 30.000 - R$ 50.000",
  "50k-100k": "R$ 50.000 - R$ 100.000",
  "100k+": "Acima de R$ 100.000"
};

const timelineLabels: Record<string, string> = {
  "urgent": "Urgente (1-2 semanas)",
  "short": "Curto prazo (1 mês)",
  "medium": "Médio prazo (2-3 meses)",
  "long": "Longo prazo (3+ meses)"
};

const deliverableLabels: Record<string, string> = {
  "website": "Website Institucional",
  "ecommerce": "E-commerce",
  "landing-page": "Landing Page",
  "seo": "SEO",
  "trafego-pago": "Tráfego Pago",
  "redes-sociais": "Gestão de Redes Sociais",
  "email-marketing": "Email Marketing",
  "branding": "Branding",
  "consultoria": "Consultoria"
};

export async function POST(request: NextRequest) {
  try {
    const data: BriefingData = await request.json();

    if (!data.projectName || !data.companyName || !data.industry) {
      return NextResponse.json({ error: 'Dados obrigatórios não fornecidos' }, { status: 400 });
    }

    const zai = await ZAI.create({
      apiKey: 'd56c89e3fdd24034bd228576e2f40fd5.zfVpIPTnS55T9qRE',
      baseUrl: 'https://api.z.ai/api/paas/v4/'
    });

    // Formatar os dados para o prompt
    const formattedDeliverables = data.deliverables.map(d => deliverableLabels[d] || d).join(', ');
    
    const prompt = `Você é um especialista em marketing digital e estratégia de negócios da Gamb Marketing Digital. Com base nas informações fornecidas, crie um briefing completo e profissional.

INFORMAÇÕES DO PROJETO:
• Nome do Projeto: ${data.projectName}
• Nome da Empresa: ${data.companyName}
• Setor de Atuação: ${industryLabels[data.industry] || data.industry}
• Porte da Empresa: ${companySizeLabels[data.companySize] || data.companySize}
• Público-Alvo: ${data.targetAudience}
• Objetivos Principais: ${data.mainObjectives}
• Mensagem Chave: ${data.keyMessage || 'Não especificado'}
• Concorrentes: ${data.competitors || 'Não especificado'}
• Faixa de Orçamento: ${budgetLabels[data.budgetRange] || data.budgetRange}
• Prazo Desejado: ${timelineLabels[data.timeline] || data.timeline}
• Deliverables Desejados: ${formattedDeliverables}
• Informações Adicionais: ${data.additionalInfo || 'Nenhuma'}

Crie um briefing profissional que inclua:

1. RESUMO EXECUTIVO
   - Visão geral do projeto
   - Contexto e importância
   - Oportunidade identificada

2. ANÁLISE DE CENÁRIO
   - Análise do mercado e setor
   - Perfil do público-alvo detalhado
   - Análise competitiva (se houver informações)
   - Desafios e oportunidades

3. OBJETIVOS ESTRATÉGICOS
   - Objetivos principais (SMART)
   - Objetivos secundários
   - KPIs e métricas de sucesso
   - Alinhamento com objetivos de negócio

4. ESTRATÉGIA PROPOSTA
   - Abordagem recomendada
   - Pilares estratégicos
   - Proposta de valor
   - Diferenciais competitivos

5. ESCOPO DO PROJETO
   - Deliverables detalhados
   - Fases do projeto
   - Responsabilidades
   - Exclusões (se aplicável)

6. CRONOGRAMA E RECURSOS
   - Timeline detalhada baseado no prazo informado
   - Marcos importantes
   - Recursos necessários
   - Dependências

7. ORÇAMENTO E INVESTIMENTO
   - Análise do orçamento informado
   - Distribuição recomendada dos investimentos
   - ROI esperado
   - Recomendações de otimização

8. RISCOS E MITIGAÇÃO
   - Principais riscos identificados
   - Plano de mitigação
   - Plano de contingência

9. PRÓXIMOS PASSOS
   - Ações imediatas
   - Entregáveis esperados
   - Cronograma de implementação

10. CONSIDERAÇÕES FINAIS
    - Recomendações estratégicas
    - Fatores críticos de sucesso
    - Oportunidades de otimização

IMPORTANTE:
- Seja profissional e estratégico
- Use linguagem clara e objetiva
- Forneça insights valiosos baseados na experiência
- Adapte o conteúdo ao porte da empresa e orçamento disponível
- Seja realista nas recomendações
- Inclua elementos específicos do setor quando relevante

Gere um briefing completo, bem estruturado e pronto para apresentação ao cliente.`;

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'Você é um especialista sênior em marketing digital e consultoria estratégica com vasta experiência em desenvolvimento de briefings para projetos de diversos portes e setores. Seu trabalho é transformar informações brutas em documentos estratégicos completos e acionáveis.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'GLM-4.5-Flash',
      temperature: 0.7,
      max_tokens: 4000
    });

    const content = completion.choices[0]?.message?.content || 
      'Não foi possível gerar o briefing neste momento. Por favor, tente novamente.';

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error in briefing API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}