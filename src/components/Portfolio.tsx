"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, TrendingUp, Users, Target, Award, Calendar, CheckCircle } from "lucide-react";

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  client: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: {
    metric: string;
    value: string;
    change: string;
    icon: any;
  }[];
  technologies: string[];
  duration: string;
  images: string[];
  testimonial?: {
    text: string;
    author: string;
    position: string;
  };
}

const caseStudies: CaseStudy[] = [
  {
    id: "tech-solutions",
    title: "Transformação Digital para E-commerce",
    category: "E-commerce",
    client: "Tech Solutions",
    description: "Implementação completa de estratégia de marketing digital para e-commerce de tecnologia",
    challenge: "A Tech Solutions enfrentava baixas taxas de conversão e tráfego limitado, com dificuldade em competir com grandes marketplaces.",
    solution: "Desenvolvemos uma estratégia integrada incluindo SEO técnico, tráfego pago segmentado, email marketing e otimização de taxa de conversão.",
    results: [
      "Aumento de 300% nas vendas online",
      "Redução de 40% no custo por aquisição",
      "Melhoria de 60% na taxa de conversão",
      "Crescimento de 250% no tráfego orgânico"
    ],
    metrics: [
      { metric: "Vendas", value: "+300%", change: "vs período anterior", icon: TrendingUp },
      { metric: "Tráfego", value: "+250%", change: "orgânico", icon: Users },
      { metric: "Conversão", value: "+60%", change: "taxa", icon: Target },
      { metric: "ROI", value: "450%", change: "retorno", icon: Award }
    ],
    technologies: ["Google Ads", "SEO", "Email Marketing", "Google Analytics", "Shopify"],
    duration: "6 meses",
    images: [],
    testimonial: {
      text: "A Gamb transformou completamente nossos resultados. Em 6 meses, passamos de um e-commerce marginal para um canal de vendas principal da empresa.",
      author: "João Silva",
      position: "CEO, Tech Solutions"
    }
  },
  {
    id: "boutique-chic",
    title: "Expansão de Marca de Moda",
    category: "Varejo",
    client: "Boutique Chic",
    description: "Estratégia de marketing digital para expansão de marca de moda local para mercado nacional",
    challenge: "A Boutique Chic era uma loja local com presença digital limitada e dificuldade em alcançar clientes fora de sua região.",
    solution: "Criamos uma estratégia de branding digital, gestão de redes sociais, influencer marketing e campanhas de tráfego pago geolocalizado.",
    results: [
      "Expansão para 15 estados brasileiros",
      "Aumento de 400% nas vendas online",
      "Crescimento de 800% no Instagram",
      "Colaborações com 20+ influenciadores"
    ],
    metrics: [
      { metric: "Alcance", value: "+800%", change: "Instagram", icon: Users },
      { metric: "Vendas", value: "+400%", change: "online", icon: TrendingUp },
      { metric: "Estados", value: "15", change: "cobertura nacional", icon: Target },
      { metric: "Engajamento", value: "+600%", change: "médio", icon: Award }
    ],
    technologies: ["Instagram Ads", "Influencer Marketing", "SEO Local", "Email Marketing", "Shopee"],
    duration: "8 meses",
    images: [],
    testimonial: {
      text: "Sonhávamos em levar nossa marca para todo Brasil e a Gamb tornou isso realidade. O atendimento e os resultados superaram todas as expectativas.",
      author: "Maria Santos",
      position: "Fundadora, Boutique Chic"
    }
  },
  {
    id: "restaurante-sabor",
    title: "Digitalização de Restaurante",
    category: "Alimentação",
    client: "Restaurante Sabor",
    description: "Transformação digital para restaurante tradicional com foco em delivery e reservas online",
    challenge: "Restaurante familiar com 20 anos de tradição enfrentando a necessidade de digitalização pós-pandemia e aumento da concorrência.",
    solution: "Implementamos sistema de pedidos online, gestão de redes sociais, campanhas de tráfego local e programa de fidelidade digital.",
    results: [
      "Aumento de 180% nos pedidos online",
      "Redução de 30% no tempo de entrega",
      "Crescimento de 200% nas reservas",
      "Programa de fidelidade com 5.000+ membros"
    ],
    metrics: [
      { metric: "Pedidos", value: "+180%", change: "online", icon: TrendingUp },
      { metric: "Reservas", value: "+200%", change: "digitais", icon: Target },
      { metric: "Entrega", value: "-30%", change: "tempo médio", icon: Award },
      { metric: "Fidelidade", value: "5.000+", change: "membros", icon: Users }
    ],
    technologies: ["Google My Business", "Facebook Ads", "Sistema de Delivery", "WhatsApp Business", "App Próprio"],
    duration: "4 meses",
    images: [],
    testimonial: {
      text: "A Gamb nos ajudou a modernizar nosso restaurante mantendo nossa essência familiar. Hoje somos referência em delivery na região.",
      author: "Carlos Oliveira",
      position: "Proprietário, Restaurante Sabor"
    }
  },
  {
    id: "clinica-saude",
    title: "Aquisição de Pacientes para Clínica",
    category: "Saúde",
    client: "Clínica Vida Saudável",
    description: "Estratégia de marketing digital para clínica médica especializada em saúde preventiva",
    challenge: "Clínica médica com excelentes serviços mas dificuldade em atrair novos pacientes e baixo reconhecimento da marca.",
    solution: "Desenvolvemos estratégia de conteúdo médico, SEO local, campanhas educativas e gestão de reputação online.",
    results: [
      "Aquisição de 200+ novos pacientes/mês",
      "Aumento de 150% no tráfego do site",
      "Melhoria de 90% nas avaliações online",
      "Posicionamento no topo do Google para 15+ palavras-chave"
    ],
    metrics: [
      { metric: "Pacientes", value: "200+", change: "novos/mês", icon: Users },
      { metric: "Tráfego", value: "+150%", change: "orgânico", icon: TrendingUp },
      { metric: "Avaliações", value: "+90%", change: "satisfação", icon: Award },
      { metric: "Keywords", value: "15+", change: "topo Google", icon: Target }
    ],
    technologies: ["SEO Médico", "Google Ads", "Content Marketing", "Reputação Online", "CRM Médico"],
    duration: "5 meses",
    images: [],
    testimonial: {
      text: "A estratégia da Gamb trouxe resultados além das expectativas. Hoje somos referência em saúde preventiva na região.",
      author: "Dra. Ana Paula",
      position: "Diretora Clínica, Clínica Vida Saudável"
    }
  },
  {
    id: "escola-idiomas",
    title: "Captação de Alunos para Escola",
    category: "Educação",
    client: "Speak Up Idiomas",
    description: "Campanha de captação de alunos para escola de idiomas com foco em resultados mensuráveis",
    challenge: "Escola de idiomas com alta qualidade no ensino mas dificuldade em competir com grandes franquias e atrair novos alunos.",
    solution: "Criamos campanhas de performance, marketing de conteúdo, aulas experimentais online e programa de indicação digital.",
    results: [
      "Dobro de matrículas em 3 meses",
      "Redução de 50% no custo por aluno",
      "Taxa de conversão de 25% em aulas experimentais",
      "Programa de indicação com 30% das matrículas"
    ],
    metrics: [
      { metric: "Matrículas", value: "+100%", change: "3 meses", icon: TrendingUp },
      { metric: "CPA", value: "-50%", change: "custo por aluno", icon: Award },
      { metric: "Conversão", value: "25%", change: "aulas experimentais", icon: Target },
      { metric: "Indicações", value: "30%", change: "das matrículas", icon: Users }
    ],
    technologies: ["Meta Ads", "Google Ads", "Email Marketing", "CRM Educacional", "Zoom"],
    duration: "3 meses",
    images: [],
    testimonial: {
      text: "A Gamb entendeu perfeitamente nossas necessidades e entregou resultados excepcionais. Recomendo fortemente!",
      author: "Roberto Mendes",
      position: "Diretor, Speak Up Idiomas"
    }
  },
  {
    id: "industria-maquinas",
    title: "Geração de Leads B2B",
    category: "Indústria",
    client: "Máquinas Industriais SA",
    description: "Estratégia de marketing digital B2B para empresa de máquinas industriais",
    challenge: "Empresa tradicional de máquinas industriais com processo de vendas analógico e dificuldade em gerar leads qualificados.",
    solution: "Implementamos marketing de conteúdo técnico, LinkedIn Ads, email marketing segmentado e automação de vendas.",
    results: [
      "Geração de 150+ leads qualificados/mês",
      "Redução de 60% no ciclo de vendas",
      "Aumento de 300% no engajamento no LinkedIn",
      "Taxa de conversão de 20% lead para cliente"
    ],
    metrics: [
      { metric: "Leads", value: "150+", change: "qualificados/mês", icon: Target },
      { metric: "Ciclo Vendas", value: "-60%", change: "tempo redução", icon: Award },
      { metric: "LinkedIn", value: "+300%", change: "engajamento", icon: Users },
      { metric: "Conversão", value: "20%", change: "lead → cliente", icon: TrendingUp }
    ],
    technologies: ["LinkedIn Ads", "Marketing de Conteúdo", "CRM", "Automação", "SEO Técnico"],
    duration: "7 meses",
    images: [],
    testimonial: {
      text: "A Gamb trouxe inovação digital para nosso setor tradicional. Hoje temos um fluxo constante de oportunidades comerciais qualificadas.",
      author: "Fernando Costa",
      position: "Diretor Comercial, Máquinas Industriais SA"
    }
  }
];

const categories = ["Todos", "E-commerce", "Varejo", "Alimentação", "Saúde", "Educação", "Indústria"];

export function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const filteredCases = selectedCategory === "Todos" 
    ? caseStudies 
    : caseStudies.filter(caseStudy => caseStudy.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Portfólio
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Cases de Sucesso
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conheça os projetos que transformamos e os resultados que entregamos para nossos clientes em diversos setores.
          </p>
        </div>

        {/* Filtro por Categoria */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="mb-2"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Grid de Cases */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredCases.map((caseStudy) => (
            <Card 
              key={caseStudy.id} 
              className="hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => setSelectedCase(caseStudy)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{caseStudy.category}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    {caseStudy.duration}
                  </div>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {caseStudy.title}
                </CardTitle>
                <CardDescription className="font-medium text-foreground">
                  {caseStudy.client}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {caseStudy.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {caseStudy.metrics.slice(0, 2).map((metric, index) => (
                    <div key={index} className="text-center">
                      <div className="text-lg font-bold text-primary">{metric.value}</div>
                      <div className="text-xs text-muted-foreground">{metric.metric}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1">
                  {caseStudy.technologies.slice(0, 3).map((tech, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {caseStudy.technologies.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{caseStudy.technologies.length - 3}
                    </Badge>
                  )}
                </div>

                <Button variant="outline" className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Ver Detalhes
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal de Detalhes do Case */}
        {selectedCase && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <Badge variant="secondary" className="mb-2">{selectedCase.category}</Badge>
                    <h2 className="text-3xl font-bold">{selectedCase.title}</h2>
                    <p className="text-xl text-muted-foreground">{selectedCase.client}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="lg"
                    onClick={() => setSelectedCase(null)}
                  >
                    ×
                  </Button>
                </div>

                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                    <TabsTrigger value="results">Resultados</TabsTrigger>
                    <TabsTrigger value="technologies">Tecnologias</TabsTrigger>
                    <TabsTrigger value="testimonial">Depoimento</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-3">Descrição do Projeto</h3>
                      <p className="text-muted-foreground">{selectedCase.description}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Desafio</h3>
                      <p className="text-muted-foreground">{selectedCase.challenge}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Solução</h3>
                      <p className="text-muted-foreground">{selectedCase.solution}</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="results" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Principais Resultados</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {selectedCase.metrics.map((metric, index) => (
                          <Card key={index}>
                            <CardContent className="p-4 text-center">
                              <metric.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                              <div className="text-2xl font-bold text-primary">{metric.value}</div>
                              <div className="text-sm font-medium">{metric.metric}</div>
                              <div className="text-xs text-muted-foreground">{metric.change}</div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Detalhamento dos Resultados</h3>
                      <ul className="space-y-2">
                        {selectedCase.results.map((result, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="technologies" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Tecnologias Utilizadas</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {selectedCase.technologies.map((tech, index) => (
                          <Badge key={index} variant="secondary" className="p-2 text-center justify-center">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Duração do Projeto</h3>
                      <p className="text-muted-foreground">{selectedCase.duration}</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="testimonial" className="space-y-6">
                    {selectedCase.testimonial && (
                      <Card>
                        <CardContent className="p-6">
                          <blockquote className="text-lg italic text-muted-foreground mb-4">
                            "{selectedCase.testimonial.text}"
                          </blockquote>
                          <div className="text-right">
                            <div className="font-semibold">{selectedCase.testimonial.author}</div>
                            <div className="text-sm text-muted-foreground">{selectedCase.testimonial.position}</div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}