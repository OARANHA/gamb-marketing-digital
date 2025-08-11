"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Brain, FileText, Target, Users, TrendingUp, AlertCircle, CheckCircle, Loader2 } from "lucide-react";

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

interface BriefingFormProps {
  onBriefingGenerated: (data: BriefingData, generatedContent: string) => void;
}

const industries = [
  { value: "ecommerce", label: "E-commerce" },
  { value: "saas", label: "SaaS" },
  { value: "services", label: "Serviços" },
  { value: "education", label: "Educação" },
  { value: "health", label: "Saúde" },
  { value: "real-estate", label: "Imobiliário" },
  { value: "restaurant", label: "Restaurantes" },
  { value: "finance", label: "Finanças" },
  { value: "technology", label: "Tecnologia" },
  { value: "other", label: "Outro" }
];

const companySizes = [
  { value: "micro", label: "Microempresa (até 9 funcionários)" },
  { value: "small", label: "Pequena (10-49 funcionários)" },
  { value: "medium", label: "Média (50-249 funcionários)" },
  { value: "large", label: "Grande (250+ funcionários)" }
];

const budgetRanges = [
  { value: "5k-15k", label: "R$ 5.000 - R$ 15.000" },
  { value: "15k-30k", label: "R$ 15.000 - R$ 30.000" },
  { value: "30k-50k", label: "R$ 30.000 - R$ 50.000" },
  { value: "50k-100k", label: "R$ 50.000 - R$ 100.000" },
  { value: "100k+", label: "Acima de R$ 100.000" }
];

const timelines = [
  { value: "urgent", label: "Urgente (1-2 semanas)" },
  { value: "short", label: "Curto prazo (1 mês)" },
  { value: "medium", label: "Médio prazo (2-3 meses)" },
  { value: "long", label: "Longo prazo (3+ meses)" }
];

const deliverableOptions = [
  { value: "website", label: "Website Institucional" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "landing-page", label: "Landing Page" },
  { value: "seo", label: "SEO" },
  { value: "trafego-pago", label: "Tráfego Pago" },
  { value: "redes-sociais", label: "Gestão de Redes Sociais" },
  { value: "email-marketing", label: "Email Marketing" },
  { value: "branding", label: "Branding" },
  { value: "consultoria", label: "Consultoria" }
];

export function BriefingForm({ onBriefingGenerated }: BriefingFormProps) {
  const [formData, setFormData] = useState<BriefingData>({
    projectName: "",
    companyName: "",
    industry: "",
    companySize: "",
    targetAudience: "",
    mainObjectives: "",
    keyMessage: "",
    competitors: "",
    budgetRange: "",
    timeline: "",
    deliverables: [],
    additionalInfo: ""
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generatedContent, setGeneratedContent] = useState("");
  const [activeTab, setActiveTab] = useState("form");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof BriefingData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpar erro quando o campo é preenchido
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const toggleDeliverable = (deliverable: string) => {
    const currentDeliverables = formData.deliverables;
    const newDeliverables = currentDeliverables.includes(deliverable)
      ? currentDeliverables.filter(d => d !== deliverable)
      : [...currentDeliverables, deliverable];
    
    handleInputChange('deliverables', newDeliverables);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.projectName.trim()) newErrors.projectName = "Nome do projeto é obrigatório";
    if (!formData.companyName.trim()) newErrors.companyName = "Nome da empresa é obrigatório";
    if (!formData.industry) newErrors.industry = "Selecione o setor";
    if (!formData.companySize) newErrors.companySize = "Selecione o porte";
    if (!formData.targetAudience.trim()) newErrors.targetAudience = "Público-alvo é obrigatório";
    if (!formData.mainObjectives.trim()) newErrors.mainObjectives = "Objetivos principais são obrigatórios";
    if (!formData.budgetRange) newErrors.budgetRange = "Selecione a faixa de orçamento";
    if (!formData.timeline) newErrors.timeline = "Selecione o prazo";
    if (formData.deliverables.length === 0) newErrors.deliverables = "Selecione pelo menos um deliverable";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateBriefing = async () => {
    if (!validateForm()) return;

    setIsGenerating(true);
    setGenerationProgress(0);
    setGeneratedContent("");

    try {
      // Simular progresso
      const progressInterval = setInterval(() => {
        setGenerationProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await fetch('/api/briefing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setGeneratedContent(data.content);
        setGenerationProgress(100);
        setActiveTab("preview");
        onBriefingGenerated(formData, data.content);
      } else {
        throw new Error(data.error || 'Erro ao gerar briefing');
      }
    } catch (error) {
      console.error('Error generating briefing:', error);
      setErrors(prev => ({
        ...prev,
        general: 'Erro ao gerar briefing. Por favor, tente novamente.'
      }));
    } finally {
      setIsGenerating(false);
      clearInterval(progressInterval);
    }
  };

  const isFormValid = formData.projectName && formData.companyName && formData.industry &&
                     formData.companySize && formData.targetAudience && formData.mainObjectives &&
                     formData.budgetRange && formData.timeline && formData.deliverables.length > 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Brain className="h-8 w-8 text-primary" />
          Briefing Inteligente
        </h2>
        <p className="text-muted-foreground">
          Nossa IA vai analisar suas informações e gerar um briefing completo e profissional para seu projeto
        </p>
      </div>

      {errors.general && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errors.general}</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="form">Formulário</TabsTrigger>
          <TabsTrigger value="preview" disabled={!generatedContent}>
            Preview do Briefing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="form" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Informações Básicas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Informações Básicas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Nome do Projeto *</label>
                  <Input
                    value={formData.projectName}
                    onChange={(e) => handleInputChange('projectName', e.target.value)}
                    placeholder="Ex: Reformulação do Website"
                    className={errors.projectName ? "border-red-500" : ""}
                  />
                  {errors.projectName && <p className="text-xs text-red-500 mt-1">{errors.projectName}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Nome da Empresa *</label>
                  <Input
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    placeholder="Sua empresa"
                    className={errors.companyName ? "border-red-500" : ""}
                  />
                  {errors.companyName && <p className="text-xs text-red-500 mt-1">{errors.companyName}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Setor de Atuação *</label>
                  <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                    <SelectTrigger className={errors.industry ? "border-red-500" : ""}>
                      <SelectValue placeholder="Selecione o setor" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry.value} value={industry.value}>
                          {industry.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.industry && <p className="text-xs text-red-500 mt-1">{errors.industry}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Porte da Empresa *</label>
                  <Select value={formData.companySize} onValueChange={(value) => handleInputChange('companySize', value)}>
                    <SelectTrigger className={errors.companySize ? "border-red-500" : ""}>
                      <SelectValue placeholder="Selecione o porte" />
                    </SelectTrigger>
                    <SelectContent>
                      {companySizes.map((size) => (
                        <SelectItem key={size.value} value={size.value}>
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.companySize && <p className="text-xs text-red-500 mt-1">{errors.companySize}</p>}
                </div>
              </CardContent>
            </Card>

            {/* Estratégia */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Estratégia
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Público-Alvo *</label>
                  <Textarea
                    value={formData.targetAudience}
                    onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                    placeholder="Descreva seu público-alvo..."
                    rows={3}
                    className={errors.targetAudience ? "border-red-500" : ""}
                  />
                  {errors.targetAudience && <p className="text-xs text-red-500 mt-1">{errors.targetAudience}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Objetivos Principais *</label>
                  <Textarea
                    value={formData.mainObjectives}
                    onChange={(e) => handleInputChange('mainObjectives', e.target.value)}
                    placeholder="Quais são os principais objetivos deste projeto?"
                    rows={3}
                    className={errors.mainObjectives ? "border-red-500" : ""}
                  />
                  {errors.mainObjectives && <p className="text-xs text-red-500 mt-1">{errors.mainObjectives}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Mensagem Chave</label>
                  <Textarea
                    value={formData.keyMessage}
                    onChange={(e) => handleInputChange('keyMessage', e.target.value)}
                    placeholder="Qual a principal mensagem que você quer transmitir?"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Concorrentes</label>
                  <Textarea
                    value={formData.competitors}
                    onChange={(e) => handleInputChange('competitors', e.target.value)}
                    placeholder="Quem são seus principais concorrentes?"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Orçamento e Prazo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Orçamento e Prazo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-1 block">Faixa de Orçamento *</label>
                  <Select value={formData.budgetRange} onValueChange={(value) => handleInputChange('budgetRange', value)}>
                    <SelectTrigger className={errors.budgetRange ? "border-red-500" : ""}>
                      <SelectValue placeholder="Selecione o orçamento" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetRanges.map((range) => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.budgetRange && <p className="text-xs text-red-500 mt-1">{errors.budgetRange}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">Prazo Desejado *</label>
                  <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                    <SelectTrigger className={errors.timeline ? "border-red-500" : ""}>
                      <SelectValue placeholder="Selecione o prazo" />
                    </SelectTrigger>
                    <SelectContent>
                      {timelines.map((timeline) => (
                        <SelectItem key={timeline.value} value={timeline.value}>
                          {timeline.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.timeline && <p className="text-xs text-red-500 mt-1">{errors.timeline}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Deliverables */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Deliverables Desejados *
              </CardTitle>
              <CardDescription>
                Selecione os deliverables que você precisa para seu projeto
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {deliverableOptions.map((deliverable) => (
                  <div
                    key={deliverable.value}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      formData.deliverables.includes(deliverable.value)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    } ${errors.deliverables ? "border-red-500" : ""}`}
                    onClick={() => toggleDeliverable(deliverable.value)}
                  >
                    <div className="text-sm font-medium">{deliverable.label}</div>
                  </div>
                ))}
              </div>
              {errors.deliverables && <p className="text-xs text-red-500 mt-2">{errors.deliverables}</p>}
            </CardContent>
          </Card>

          {/* Informações Adicionais */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Adicionais</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <label className="text-sm font-medium mb-1 block">Observações</label>
                <Textarea
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                  placeholder="Qualquer outra informação relevante..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Progresso de Geração */}
          {isGenerating && (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="font-medium">Gerando briefing inteligente...</span>
                  </div>
                  <Progress value={generationProgress} className="w-full" />
                  <p className="text-sm text-muted-foreground">
                    Nossa IA está analisando suas informações e criando um briefing personalizado
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Submit */}
          <div className="flex justify-center">
            <Button 
              onClick={generateBriefing}
              disabled={!isFormValid || isGenerating}
              size="lg"
              className="px-8"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Gerar Briefing com IA
                </>
              )}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          {generatedContent && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Briefing Gerado com Sucesso!
                </CardTitle>
                <CardDescription>
                  Seu briefing foi gerado pela IA com base nas informações fornecidas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap">{generatedContent}</div>
                </div>
                
                <div className="mt-6 flex gap-4">
                  <Button onClick={() => navigator.clipboard.writeText(generatedContent)}>
                    Copiar Briefing
                  </Button>
                  <Button variant="outline">
                    Baixar PDF
                  </Button>
                  <Button variant="outline">
                    Enviar por E-mail
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}