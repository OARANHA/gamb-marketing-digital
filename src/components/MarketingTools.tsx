"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Calculator, 
  Search, 
  BarChart3, 
  Target, 
  Users, 
  TrendingUp, 
  FileText, 
  Link2, 
  Hash, 
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Loader2
} from "lucide-react";

interface ToolResult {
  type: 'success' | 'error' | 'info';
  title: string;
  content: string;
}

export function MarketingTools() {
  const [activeTab, setActiveTab] = useState("seo");
  const [results, setResults] = useState<ToolResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Estados para cada ferramenta
  const [seoData, setSeoData] = useState({
    keyword: "",
    title: "",
    description: "",
    url: ""
  });

  const [adData, setAdData] = useState({
    product: "",
    audience: "",
    objective: "",
    tone: "professional"
  });

  const [socialData, setSocialData] = useState({
    topic: "",
    platform: "instagram",
    tone: "engaging"
  });

  const [analyticsData, setAnalyticsData] = useState({
    visitors: "",
    conversionRate: "",
    avgOrderValue: ""
  });

  const addResult = (result: ToolResult) => {
    setResults(prev => [result, ...prev.slice(0, 4)]); // Mantém apenas os 5 mais recentes
  };

  const analyzeSEO = async () => {
    if (!seoData.keyword || !seoData.title) {
      addResult({
        type: 'error',
        title: 'Dados incompletos',
        content: 'Preencha a palavra-chave e o título para análise.'
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simular análise SEO
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const keywordDensity = (seoData.title.toLowerCase().split(seoData.keyword.toLowerCase()).length - 1) / seoData.title.split(' ').length * 100;
      const titleLength = seoData.title.length;
      const descriptionLength = seoData.description.length;
      
      let score = 0;
      let recommendations = [];
      
      if (titleLength >= 30 && titleLength <= 60) {
        score += 25;
      } else {
        recommendations.push("O título ideal deve ter entre 30-60 caracteres");
      }
      
      if (descriptionLength >= 120 && descriptionLength <= 160) {
        score += 25;
      } else {
        recommendations.push("A meta description ideal deve ter entre 120-160 caracteres");
      }
      
      if (keywordDensity >= 1 && keywordDensity <= 3) {
        score += 25;
      } else {
        recommendations.push("A densidade da palavra-chave deve estar entre 1-3%");
      }
      
      if (seoData.url) {
        score += 25;
      } else {
        recommendations.push("Inclua a URL para análise completa");
      }
      
      addResult({
        type: score >= 75 ? 'success' : score >= 50 ? 'info' : 'error',
        title: `Análise SEO - Score: ${score}/100`,
        content: `**Pontuação:** ${score}/100\n\n**Recomendações:**\n${recommendations.map(r => `• ${r}`).join('\n')}\n\n**Densidade da palavra-chave:** ${keywordDensity.toFixed(1)}%\n**Comprimento do título:** ${titleLength} caracteres`
      });
    } catch (error) {
      addResult({
        type: 'error',
        title: 'Erro na análise',
        content: 'Não foi possível realizar a análise SEO. Tente novamente.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const generateAdCopy = async () => {
    if (!adData.product || !adData.audience) {
      addResult({
        type: 'error',
        title: 'Dados incompletos',
        content: 'Preencha o produto e o público-alvo para gerar o texto.'
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simular geração de texto publicitário
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const adCopies = [
        `🚀 Transforme seu ${adData.product} com nossa solução especializada para ${adData.audience}! Resultados comprovados e ROI garantido. Fale conosco hoje!`,
        `📈 ${adData.audience}, descubra como nosso ${adData.product} pode revolucionar seus resultados. Estratégias personalizadas e suporte dedicado.`,
        `✨ Soluções completas de ${adData.product} para ${adData.audience}. Aumente suas conversões e alcance seus objetivos com nossa expertise!`
      ];
      
      const selectedCopy = adCopies[Math.floor(Math.random() * adCopies.length)];
      
      addResult({
        type: 'success',
        title: 'Texto Publicitário Gerado',
        content: `**Texto para ${adData.objective}:**\n\n${selectedCopy}\n\n**Público-alvo:** ${adData.audience}\n**Tom:** ${adData.tone}\n\n*Texto gerado automaticamente - revise antes de usar*`
      });
    } catch (error) {
      addResult({
        type: 'error',
        title: 'Erro na geração',
        content: 'Não foi possível gerar o texto publicitário. Tente novamente.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const generateSocialPost = async () => {
    if (!socialData.topic) {
      addResult({
        type: 'error',
        title: 'Dados incompletos',
        content: 'Preencha o tópico para gerar a postagem.'
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simular geração de post para redes sociais
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const hashtags = [
        `#${socialData.topic.replace(/\s+/g, '')}`,
        `#MarketingDigital`,
        `#Gamb`,
        `#Inovação`,
        `#Resultados`
      ];
      
      const posts = {
        instagram: `✨ ${socialData.topic}\n\nDescubra como transformar sua estratégia de marketing digital! 💡\n\nNossa equipe de especialistas está pronta para levar seu negócio ao próximo nível. 🚀\n\n${hashtags.slice(0, 3).join(' ')}\n\n📲 Fale conosco no link da bio!`,
        facebook: `📢 ${socialData.topic}\n\nVocê sabia que uma boa estratégia de marketing digital pode multiplicar seus resultados? 📈\n\nNa Gamb, desenvolvemos soluções personalizadas que impulsionam o crescimento do seu negócio. Nossa equipe combina criatividade, tecnologia e dados para entregar resultados excepcionais.\n\n${hashtags.join(' ')}\n\n👉 Entre em contato conosco e saiba mais!`,
        linkedin: `🎯 ${socialData.topic}\n\nNo atual cenário competitivo, empresas que investem em marketing digital estratégico estão se destacando no mercado.\n\nNa Gamb Marketing Digital, ajudamos empresas a:\n\n• Desenvolver estratégias digitais eficazes\n• Aumentar a visibilidade online\n• Gerar leads qualificados\n• Melhorar o ROI de marketing\n\nNossa abordagem data-driven e equipe especializada garantem resultados mensuráveis e sustentáveis.\n\n${hashtags.slice(0, 4).join(' ')}\n\n#MarketingEstratégico #TransformaçãoDigital #GambMarketing`
      };
      
      const selectedPost = posts[socialData.platform as keyof typeof posts] || posts.instagram;
      
      addResult({
        type: 'success',
        title: `Post para ${socialData.platform.charAt(0).toUpperCase() + socialData.platform.slice(1)}`,
        content: selectedPost
      });
    } catch (error) {
      addResult({
        type: 'error',
        title: 'Erro na geração',
        content: 'Não foi possível gerar a postagem. Tente novamente.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateROI = async () => {
    if (!analyticsData.visitors || !analyticsData.conversionRate || !analyticsData.avgOrderValue) {
      addResult({
        type: 'error',
        title: 'Dados incompletos',
        content: 'Preencha todos os campos para calcular o ROI.'
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Calcular métricas
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const visitors = parseFloat(analyticsData.visitors);
      const conversionRate = parseFloat(analyticsData.conversionRate) / 100;
      const avgOrderValue = parseFloat(analyticsData.avgOrderValue);
      
      const conversions = visitors * conversionRate;
      const revenue = conversions * avgOrderValue;
      
      // Estimar custos (simplificado)
      const estimatedCost = revenue * 0.3; // Assumindo 30% de custo
      const profit = revenue - estimatedCost;
      const roi = ((profit - estimatedCost) / estimatedCost) * 100;
      
      addResult({
        type: roi > 0 ? 'success' : 'error',
        title: 'Análise de ROI',
        content: `**Métricas Calculadas:**\n\n• Visitantes: ${visitors.toLocaleString()}\n• Taxa de Conversão: ${analyticsData.conversionRate}%\n• Conversões: ${conversions.toFixed(0)}\n• Ticket Médio: R$ ${avgOrderValue.toFixed(2)}\n• Receita Estimada: R$ ${revenue.toFixed(2)}\n• Custo Estimado: R$ ${estimatedCost.toFixed(2)}\n• Lucro: R$ ${profit.toFixed(2)}\n• ROI: ${roi.toFixed(1)}%\n\n${roi > 0 ? '✅ Campanha lucrativa!' : '⚠️ Campanha com prejuízo'}`
      });
    } catch (error) {
      addResult({
        type: 'error',
        title: 'Erro no cálculo',
        content: 'Não foi possível calcular o ROI. Verifique os dados e tente novamente.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Ferramentas de Marketing
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Ferramentas Inteligentes para Marketing Digital
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Utilize nossas ferramentas gratuitas para analisar, otimizar e melhorar suas estratégias de marketing digital
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Ferramentas */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="seo" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  SEO
                </TabsTrigger>
                <TabsTrigger value="ads" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Ads
                </TabsTrigger>
                <TabsTrigger value="social" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Social
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="seo" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="h-5 w-5" />
                      Analisador SEO
                    </CardTitle>
                    <CardDescription>
                      Analise sua página para otimização em mecanismos de busca
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Palavra-chave Principal</label>
                      <Input
                        value={seoData.keyword}
                        onChange={(e) => setSeoData(prev => ({ ...prev, keyword: e.target.value }))}
                        placeholder="ex: marketing digital"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Título da Página</label>
                      <Input
                        value={seoData.title}
                        onChange={(e) => setSeoData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Título SEO (30-60 caracteres)"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Meta Description</label>
                      <Textarea
                        value={seoData.description}
                        onChange={(e) => setSeoData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Descrição (120-160 caracteres)"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">URL (opcional)</label>
                      <Input
                        value={seoData.url}
                        onChange={(e) => setSeoData(prev => ({ ...prev, url: e.target.value }))}
                        placeholder="https://exemplo.com/pagina"
                      />
                    </div>
                    <Button onClick={analyzeSEO} disabled={isProcessing} className="w-full">
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analisando...
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          Analisar SEO
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="ads" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Gerador de Anúncios
                    </CardTitle>
                    <CardDescription>
                      Crie textos persuasivos para suas campanhas publicitárias
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Produto/Serviço</label>
                      <Input
                        value={adData.product}
                        onChange={(e) => setAdData(prev => ({ ...prev, product: e.target.value }))}
                        placeholder="ex: consultoria SEO"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Público-alvo</label>
                      <Input
                        value={adData.audience}
                        onChange={(e) => setAdData(prev => ({ ...prev, audience: e.target.value }))}
                        placeholder="ex: pequenas empresas"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Objetivo do Anúncio</label>
                      <select
                        value={adData.objective}
                        onChange={(e) => setAdData(prev => ({ ...prev, objective: e.target.value }))}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="">Selecione o objetivo</option>
                        <option value="vendas">Gerar Vendas</option>
                        <option value="leads">Capturar Leads</option>
                        <option value="tráfego">Aumentar Tráfego</option>
                        <option value="marca">Reforçar Marca</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Tom de Voz</label>
                      <select
                        value={adData.tone}
                        onChange={(e) => setAdData(prev => ({ ...prev, tone: e.target.value }))}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="professional">Profissional</option>
                        <option value="friendly">Amigável</option>
                        <option value="urgent">Urgente</option>
                        <option value="emotional">Emocional</option>
                      </select>
                    </div>
                    <Button onClick={generateAdCopy} disabled={isProcessing} className="w-full">
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Gerando...
                        </>
                      ) : (
                        <>
                          <FileText className="mr-2 h-4 w-4" />
                          Gerar Anúncio
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="social" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Gerador de Posts
                    </CardTitle>
                    <CardDescription>
                      Crie conteúdo engaging para suas redes sociais
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Tópico do Post</label>
                      <Input
                        value={socialData.topic}
                        onChange={(e) => setSocialData(prev => ({ ...prev, topic: e.target.value }))}
                        placeholder="ex: dicas de marketing digital"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Plataforma</label>
                      <select
                        value={socialData.platform}
                        onChange={(e) => setSocialData(prev => ({ ...prev, platform: e.target.value }))}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="instagram">Instagram</option>
                        <option value="facebook">Facebook</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="twitter">Twitter</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Tom do Post</label>
                      <select
                        value={socialData.tone}
                        onChange={(e) => setSocialData(prev => ({ ...prev, tone: e.target.value }))}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="engaging">Engajador</option>
                        <option value="educational">Educacional</option>
                        <option value="promotional">Promocional</option>
                        <option value="inspirational">Inspiracional</option>
                      </select>
                    </div>
                    <Button onClick={generateSocialPost} disabled={isProcessing} className="w-full">
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Gerando...
                        </>
                      ) : (
                        <>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Gerar Post
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Calculadora de ROI
                    </CardTitle>
                    <CardDescription>
                      Calcule o retorno sobre investimento das suas campanhas
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Número de Visitantes</label>
                      <Input
                        type="number"
                        value={analyticsData.visitors}
                        onChange={(e) => setAnalyticsData(prev => ({ ...prev, visitors: e.target.value }))}
                        placeholder="ex: 10000"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Taxa de Conversão (%)</label>
                      <Input
                        type="number"
                        step="0.1"
                        value={analyticsData.conversionRate}
                        onChange={(e) => setAnalyticsData(prev => ({ ...prev, conversionRate: e.target.value }))}
                        placeholder="ex: 2.5"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Ticket Médio (R$)</label>
                      <Input
                        type="number"
                        step="0.01"
                        value={analyticsData.avgOrderValue}
                        onChange={(e) => setAnalyticsData(prev => ({ ...prev, avgOrderValue: e.target.value }))}
                        placeholder="ex: 150"
                      />
                    </div>
                    <Button onClick={calculateROI} disabled={isProcessing} className="w-full">
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Calculando...
                        </>
                      ) : (
                        <>
                          <Calculator className="mr-2 h-4 w-4" />
                          Calcular ROI
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Resultados */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Resultados Recentes
                </CardTitle>
                <CardDescription>
                  Histórico das análises e gerações realizadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Nenhuma análise realizada ainda.</p>
                      <p className="text-sm">Use as ferramentas ao lado para gerar resultados.</p>
                    </div>
                  ) : (
                    results.map((result, index) => (
                      <Alert key={index} className={
                        result.type === 'success' ? "border-green-200 bg-green-50" :
                        result.type === 'error' ? "border-red-200 bg-red-50" :
                        "border-blue-200 bg-blue-50"
                      }>
                        {result.type === 'success' ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <AlertCircle className="h-4 w-4" />
                        )}
                        <AlertDescription>
                          <div className="font-medium mb-1">{result.title}</div>
                          <div className="text-sm whitespace-pre-wrap">{result.content}</div>
                        </AlertDescription>
                      </Alert>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Dicas Rápidas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Dicas Rápidas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium text-sm mb-1">SEO</div>
                  <div className="text-xs text-muted-foreground">
                    Use palavras-chave de forma natural e mantenha títulos entre 30-60 caracteres.
                  </div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium text-sm mb-1">Ads</div>
                  <div className="text-xs text-muted-foreground">
                    Foque no benefício principal e inclua uma chamada para ação clara.
                  </div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium text-sm mb-1">Social Media</div>
                  <div className="text-xs text-muted-foreground">
                    Use hashtags relevantes e mantenha o tom consistente com sua marca.
                  </div>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <div className="font-medium text-sm mb-1">Analytics</div>
                  <div className="text-xs text-muted-foreground">
                    Acompanhe o ROI regularmente e ajuste suas estratégias conforme necessário.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}