"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, CheckCircle, AlertCircle, Info } from "lucide-react";

interface ServiceOption {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  features: string[];
}

interface BudgetFormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  companySize: string;
  industry: string;
  services: string[];
  budget: string;
  timeline: string;
  objectives: string;
  additionalInfo: string;
}

const serviceOptions: ServiceOption[] = [
  {
    id: "seo",
    name: "SEO Otimizado",
    basePrice: 1500,
    description: "Otimização para mecanismos de busca",
    features: ["Análise de palavras-chave", "Otimização on-page", "SEO técnico", "Link building", "Relatórios mensais"]
  },
  {
    id: "trafego-pago",
    name: "Tráfego Pago",
    basePrice: 2000,
    description: "Gestão de anúncios pagos",
    features: ["Google Ads", "Meta Ads", "Remarketing", "Otimização de campanhas", "Relatórios semanais"]
  },
  {
    id: "redes-sociais",
    name: "Redes Sociais",
    basePrice: 1200,
    description: "Gestão completa de redes sociais",
    features: ["Criação de conteúdo", "Agendamento", "Gestão de comunidade", "Análise de métricas", "3 redes sociais"]
  },
  {
    id: "web-design",
    name: "Web Design",
    basePrice: 3000,
    description: "Desenvolvimento de sites modernos",
    features: ["Design responsivo", "Otimizado para SEO", "Performance", "Treinamento", "6 meses garantia"]
  }
];

const companySizes = [
  { value: "micro", label: "Microempresa (até 9 funcionários)" },
  { value: "small", label: "Pequena (10-49 funcionários)" },
  { value: "medium", label: "Média (50-249 funcionários)" },
  { value: "large", label: "Grande (250+ funcionários)" }
];

const industries = [
  { value: "ecommerce", label: "E-commerce" },
  { value: "saas", label: "SaaS" },
  { value: "services", label: "Serviços" },
  { value: "education", label: "Educação" },
  { value: "health", label: "Saúde" },
  { value: "real-estate", label: "Imobiliário" },
  { value: "restaurant", label: "Restaurantes" },
  { value: "other", label: "Outro" }
];

const budgetRanges = [
  { value: "1000-3000", label: "R$ 1.000 - R$ 3.000/mês", min: 1000, max: 3000 },
  { value: "3000-6000", label: "R$ 3.000 - R$ 6.000/mês", min: 3000, max: 6000 },
  { value: "6000-10000", label: "R$ 6.000 - R$ 10.000/mês", min: 6000, max: 10000 },
  { value: "10000+", label: "Acima de R$ 10.000/mês", min: 10000, max: Infinity }
];

const timelines = [
  { value: "immediate", label: "Imediato (1-2 semanas)" },
  { value: "short", label: "Curto prazo (1 mês)" },
  { value: "medium", label: "Médio prazo (2-3 meses)" },
  { value: "long", label: "Longo prazo (3+ meses)" }
];

interface BudgetFormProps {
  onSubmit: (data: BudgetFormData, calculation: any) => void;
}

export function BudgetForm({ onSubmit }: BudgetFormProps) {
  const [formData, setFormData] = useState<BudgetFormData>({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    companySize: "",
    industry: "",
    services: [],
    budget: "",
    timeline: "",
    objectives: "",
    additionalInfo: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: "" });

  const handleInputChange = (field: keyof BudgetFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleService = (serviceId: string) => {
    const currentServices = formData.services;
    const newServices = currentServices.includes(serviceId)
      ? currentServices.filter(id => id !== serviceId)
      : [...currentServices, serviceId];
    
    handleInputChange('services', newServices);
  };

  const calculateBudget = () => {
    const selectedServices = serviceOptions.filter(s => formData.services.includes(s.id));
    let baseTotal = selectedServices.reduce((sum, service) => sum + service.basePrice, 0);
    
    // Multiplicadores por tamanho da empresa
    const sizeMultipliers: Record<string, number> = {
      micro: 1.0,
      small: 1.2,
      medium: 1.5,
      large: 2.0
    };
    
    const sizeMultiplier = sizeMultipliers[formData.companySize] || 1.0;
    
    // Multiplicadores por complexidade da indústria
    const industryMultipliers: Record<string, number> = {
      ecommerce: 1.3,
      saas: 1.4,
      services: 1.0,
      education: 1.1,
      health: 1.2,
      "real-estate": 1.1,
      restaurant: 1.0,
      other: 1.0
    };
    
    const industryMultiplier = industryMultipliers[formData.industry] || 1.0;
    
    // Multiplicador por urgência
    const timelineMultipliers: Record<string, number> = {
      immediate: 1.3,
      short: 1.2,
      medium: 1.0,
      long: 0.9
    };
    
    const timelineMultiplier = timelineMultipliers[formData.timeline] || 1.0;
    
    const finalTotal = baseTotal * sizeMultiplier * industryMultiplier * timelineMultiplier;
    
    return {
      baseTotal,
      sizeMultiplier,
      industryMultiplier,
      timelineMultiplier,
      finalTotal,
      selectedServices,
      monthlyRange: {
        min: Math.round(finalTotal * 0.8),
        max: Math.round(finalTotal * 1.2)
      }
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const calculation = calculateBudget();
      
      // Simular envio do formulário
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus({
        type: 'success',
        message: 'Orçamento enviado com sucesso! Entraremos em contato em até 24h com uma proposta personalizada.'
      });
      
      onSubmit(formData, calculation);
      
      // Reset form após 3 segundos
      setTimeout(() => {
        setFormData({
          companyName: "",
          contactName: "",
          email: "",
          phone: "",
          companySize: "",
          industry: "",
          services: [],
          budget: "",
          timeline: "",
          objectives: "",
          additionalInfo: ""
        });
        setSubmitStatus({ type: null, message: "" });
      }, 3000);
      
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Erro ao enviar orçamento. Por favor, tente novamente.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculation = formData.services.length > 0 ? calculateBudget() : null;
  const isFormValid = formData.companyName && formData.contactName && formData.email && 
                     formData.companySize && formData.industry && formData.services.length > 0 &&
                     formData.budget && formData.timeline && formData.objectives;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Orçamento Inteligente</h2>
        <p className="text-muted-foreground">
          Calcule instantaneamente o investimento necessário para seu projeto de marketing digital
        </p>
      </div>

      {submitStatus.type && (
        <Alert className={submitStatus.type === 'success' ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{submitStatus.message}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações da Empresa */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Informações da Empresa
            </CardTitle>
            <CardDescription>
              Nos conte sobre seu negócio para personalizarmos sua proposta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Nome da Empresa *</label>
                <Input
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="Sua empresa"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Nome do Contato *</label>
                <Input
                  value={formData.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                  placeholder="Seu nome"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">E-mail *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Telefone *</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="(51) 9999-9999"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Porte da Empresa *</label>
                <Select value={formData.companySize} onValueChange={(value) => handleInputChange('companySize', value)}>
                  <SelectTrigger>
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
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Setor de Atuação *</label>
                <Select value={formData.industry} onValueChange={(value) => handleInputChange('industry', value)}>
                  <SelectTrigger>
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
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seleção de Serviços */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Serviços Desejados *
            </CardTitle>
            <CardDescription>
              Selecione os serviços que você precisa para seu negócio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {serviceOptions.map((service) => (
                <div
                  key={service.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    formData.services.includes(service.id)
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => toggleService(service.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">R$ {service.basePrice.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">/mês</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {service.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cálculo do Orçamento */}
        {calculation && (
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <CheckCircle className="h-5 w-5" />
                Cálculo do Orçamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-800">
                      R$ {calculation.monthlyRange.min.toLocaleString()}
                    </div>
                    <div className="text-sm text-green-600">Investimento mínimo</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-800">
                      R$ {calculation.monthlyRange.max.toLocaleString()}
                    </div>
                    <div className="text-sm text-green-600">Investimento máximo</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-800">
                      {formData.services.length}
                    </div>
                    <div className="text-sm text-green-600">Serviços selecionados</div>
                  </div>
                </div>
                
                <div className="text-sm text-green-700">
                  <strong>Detalhes do cálculo:</strong> Base R$ {calculation.baseTotal.toLocaleString()} × 
                  Porte ({(calculation.sizeMultiplier * 100).toFixed(0)}%) × 
                  Setor ({(calculation.industryMultiplier * 100).toFixed(0)}%) × 
                  Prazo ({(calculation.timelineMultiplier * 100).toFixed(0)}%)
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Informações do Projeto */}
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Projeto</CardTitle>
            <CardDescription>
              Informações adicionais para personalizarmos ainda mais sua proposta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Orçamento Disponível *</label>
                <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione seu orçamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Prazo Desejado *</label>
                <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                  <SelectTrigger>
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
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Objetivos Principais *</label>
              <Textarea
                value={formData.objectives}
                onChange={(e) => handleInputChange('objectives', e.target.value)}
                placeholder="Descreva seus principais objetivos com o marketing digital..."
                rows={3}
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">Informações Adicionais</label>
              <Textarea
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                placeholder="Qualquer outra informação que julgue relevante..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-center">
          <Button 
            type="submit" 
            size="lg"
            disabled={!isFormValid || isSubmitting}
            className="px-8"
          >
            {isSubmitting ? "Enviando..." : "Solicitar Orçamento Personalizado"}
          </Button>
        </div>
      </form>
    </div>
  );
}