export interface KnowledgeItem {
  id: string;
  category: string;
  title: string;
  content: string;
  keywords: string[];
  priority: number;
}

export const gambKnowledgeBase: KnowledgeItem[] = [
  {
    id: "servicos-seo",
    category: "servicos",
    title: "SEO Otimizado",
    content: "A Gamb oferece serviços de SEO (Search Engine Optimization) completo incluindo: análise de palavras-chave, otimização on-page, otimização técnica, link building, SEO local e relatórios mensais. Nossos pacotes começam em R$ 1.500/mês para pequenos negócios e podem chegar a R$ 10.000/mês para grandes empresas. O tempo médio para ver resultados é de 3-6 meses.",
    keywords: ["seo", "otimização", "google", "busca", "palavras-chave", "ranking", "orgânico"],
    priority: 10
  },
  {
    id: "servicos-trafego-pago",
    category: "servicos",
    title: "Tráfego Pago",
    content: "Nossos serviços de tráfego pago incluem Google Ads, Meta Ads (Facebook/Instagram), LinkedIn Ads e TikTok Ads. Trabalhamos com estratégias de remarketing, campanhas de conversão, geração de leads e e-commerce. O investimento mínimo recomendado é de R$ 2.000/mês (excluindo taxa de gestão de 15%). Oferecemos relatórios semanais e otimizações diárias.",
    keywords: ["tráfego pago", "google ads", "facebook ads", "meta", "anúncios", "ppc", "campanhas"],
    priority: 10
  },
  {
    id: "servicos-redes-sociais",
    category: "servicos",
    title: "Redes Sociais",
    content: "Gestão completa de redes sociais incluindo: criação de conteúdo, agendamento de posts, monitoramento de engajamento, gestão de comunidade, anúncios sociais e análise de métricas. Atendemos Instagram, Facebook, LinkedIn, TikTok e Twitter. Pacotes a partir de R$ 1.200/mês para 3 redes sociais com 12 posts/mês.",
    keywords: ["redes sociais", "instagram", "facebook", "linkedin", "conteúdo", "posts", "engajamento"],
    priority: 10
  },
  {
    id: "servicos-web-design",
    category: "servicos",
    title: "Web Design",
    content: "Desenvolvemos sites modernos, responsivos e otimizados para conversão. Nossos serviços incluem: sites institucionais (a partir de R$ 3.000), e-commerce (a partir de R$ 8.000), landing pages (a partir de R$ 1.500) e reformas de sites. Todos os projetos incluem SEO básico, design responsivo e treinamento para o cliente.",
    keywords: ["site", "web design", "website", "página", "desenvolvimento", "responsivo", "conversão"],
    priority: 10
  },
  {
    id: "empresa-sobre",
    category: "empresa",
    title: "Sobre a Gamb",
    content: "A Gamb é uma agência de marketing digital fundada em 2019, sediada em Alvorada - RS. Contamos com equipe de 15 especialistas entre designers, desenvolvedores, analistas de marketing e gestores de tráfego. Atendemos mais de 50 clientes ativos em todo o Brasil. Nossa missão é transformar negócios através de estratégias digitais inovadoras.",
    keywords: ["gamb", "empresa", "sobre", "história", "equipe", "alvorada", "rs", "fundação"],
    priority: 8
  },
  {
    id: "empresa-contato",
    category: "empresa",
    title: "Informações de Contato",
    content: "Endereço: Alvorada - RS (atendimento remoto em todo Brasil). Telefone: (51) 9999-9999. E-mail: contato@gamb.com.br. Horário de atendimento: Segunda a Sexta das 9h às 18h, Sábado das 9h às 12h. Para emergências, clientes VIP têm acesso a suporte 24/7 através do WhatsApp.",
    keywords: ["contato", "telefone", "email", "endereço", "horário", "atendimento", "whatsapp"],
    priority: 9
  },
  {
    id: "empresa-processo",
    category: "empresa",
    title: "Processo de Trabalho",
    content: "Nosso processo de trabalho segue 4 etapas: 1) Diagnóstico (análise do negócio e concorrência), 2) Estratégia (planejamento personalizado), 3) Execução (implementação das ações), 4) Otimização (análise contínua e ajustes). Cada projeto tem um gestor dedicado e relatórios periódicos.",
    keywords: ["processo", "metodologia", "etapas", "diagnóstico", "estratégia", "execução", "otimização"],
    priority: 8
  },
  {
    id: "cases-sucesso",
    category: "cases",
    title: "Cases de Sucesso",
    content: "Case 1: Loja de roupas aumentou 300% as vendas em 6 meses com SEO e tráfego pago. Case 2: Clínica médica conquistou 200 novos pacientes/mês com anúncios locais. Case 3: Escola de idiomas dobrou as matrículas com marketing de conteúdo. Case 4: Indústria reduziu custo por lead em 60% com otimização de campanhas.",
    keywords: ["cases", "sucesso", "resultados", "exemplos", "clientes", "vendas", "leads", "matrículas"],
    priority: 7
  },
  {
    id: "precos-pacotes",
    category: "precos",
    title: "Pacotes e Preços",
    content: "Pacote Start (R$ 1.500/mês): SEO básico + 2 redes sociais. Pacote Growth (R$ 3.000/mês): SEO avançado + 3 redes sociais + tráfego pago básico. Pacote Scale (R$ 6.000/mês): Todos os serviços + gestão completa. Pacote Enterprise (sob consulta): Soluções personalizadas. Todos os pacotes incluem relatórios mensais e suporte por e-mail.",
    keywords: ["preços", "pacotes", "valores", "custos", "investimento", "planos", "mensalidade"],
    priority: 9
  },
  {
    id: "prazos-entrega",
    category: "operacional",
    title: "Prazos de Entrega",
    content: "Sites institucionais: 30-45 dias. E-commerce: 60-90 dias. Landing pages: 7-15 dias. Resultados de SEO: 3-6 meses. Campanhas de tráfego: resultados iniciais em 7-15 dias. Gestão de redes sociais: primeiro conteúdo em 5 dias úteis. Todos os prazos são após aprovação e fornecimento de materiais pelo cliente.",
    keywords: ["prazos", "tempo", "entrega", "duração", "dias", "meses", "cronograma"],
    priority: 8
  },
  {
    id: "garantias",
    category: "operacional",
    title: "Garantias e Políticas",
    content: "Oferecemos garantia de satisfação de 30 dias para serviços de gestão. Para desenvolvimento de sites, garantia técnica de 6 meses. Política de cancelamento: 30 dias de aviso prévio para serviços mensais. Não reembolsamos valores por serviços já executados. Todos os contratos são formalizados por documento digital.",
    keywords: ["garantia", "política", "cancelamento", "reembolso", "contrato", "satisfação", "prazo"],
    priority: 7
  },
  {
    id: "diferenciais",
    category: "empresa",
    title: "Diferenciais Competitivos",
    content: "Nossos diferenciais: equipe especializada com certificações Google e Meta, atendimento personalizado com gestor dedicado, tecnologia de ponta para análise de dados, foco em ROI (Retorno sobre Investimento), transparência total nos resultados e metodologia comprovada com mais de 50 cases de sucesso.",
    keywords: ["diferenciais", "vantagens", "competitivo", "certificação", "tecnologia", "roi", "transparência"],
    priority: 8
  },
  {
    id: "ferramentas",
    category: "tecnologia",
    title: "Ferramentas e Tecnologias",
    content: "Utilizamos as melhores ferramentas do mercado: Google Analytics, Google Search Console, SEMrush, Ahrefs, Meta Business Suite, HubSpot, RD Station, WordPress, Shopify, Figma, Adobe Creative Suite, Google Tag Manager, Hotjar e diversas ferramentas de automação de marketing.",
    keywords: ["ferramentas", "tecnologia", "plataformas", "software", "analytics", "automation", "marketing"],
    priority: 6
  }
];

export function searchKnowledgeBase(query: string): KnowledgeItem[] {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) return [];
  
  return gambKnowledgeBase
    .filter(item => {
      // Busca no título
      if (item.title.toLowerCase().includes(normalizedQuery)) return true;
      
      // Busca no conteúdo
      if (item.content.toLowerCase().includes(normalizedQuery)) return true;
      
      // Busca nas palavras-chave
      return item.keywords.some(keyword => keyword.toLowerCase().includes(normalizedQuery));
    })
    .sort((a, b) => b.priority - a.priority)
    .slice(0, 3); // Retorna no máximo 3 resultados mais relevantes
}

export function formatKnowledgeForPrompt(knowledgeItems: KnowledgeItem[]): string {
  if (knowledgeItems.length === 0) return "";
  
  return "\n\nCONHECIMENTO RELEVANTE:\n" + 
    knowledgeItems.map(item => 
      `Categoria: ${item.category}\n` +
      `Título: ${item.title}\n` +
      `Informação: ${item.content}\n`
    ).join("\n");
}