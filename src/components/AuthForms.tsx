"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, CheckCircle, User, Lock, Building, Phone, Mail, X } from "lucide-react";

interface AuthFormsProps {
  onAuthSuccess: (user: any) => void;
  onClose?: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  companyName?: string;
  industry?: string;
  companySize?: string;
}

interface LoginData {
  email: string;
  password: string;
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

export function AuthForms({ onAuthSuccess, onClose }: AuthFormsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // Estados do formulário de registro
  const [registerData, setRegisterData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    companyName: "",
    industry: "",
    companySize: ""
  });

  // Estados do formulário de login
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleRegisterChange = (field: keyof RegisterData, value: string) => {
    setRegisterData(prev => ({ ...prev, [field]: value }));
    // Limpar erro quando o campo é preenchido
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleLoginChange = (field: keyof LoginData, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
    // Limpar erro quando o campo é preenchido
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateRegister = () => {
    const newErrors: Record<string, string> = {};

    if (!registerData.name.trim()) newErrors.name = "Nome é obrigatório";
    if (!registerData.email.trim()) newErrors.email = "Email é obrigatório";
    if (!registerData.password) newErrors.password = "Senha é obrigatória";
    if (registerData.password.length < 6) newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    if (registerData.password !== registerData.confirmPassword) newErrors.confirmPassword = "As senhas não coincidem";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLogin = () => {
    const newErrors: Record<string, string> = {};

    if (!loginData.email.trim()) newErrors.email = "Email é obrigatório";
    if (!loginData.password) newErrors.password = "Senha é obrigatória";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateRegister()) return;

    setIsLoading(true);
    setAuthMessage(null);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
          phone: registerData.phone || undefined,
          companyName: registerData.companyName || undefined,
          industry: registerData.industry || undefined,
          companySize: registerData.companySize || undefined
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAuthMessage({
          type: 'success',
          message: 'Conta criada com sucesso! Você já pode fazer login.'
        });
        
        // Limpar formulário
        setRegisterData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
          companyName: "",
          industry: "",
          companySize: ""
        });
      } else {
        setAuthMessage({
          type: 'error',
          message: data.error || 'Erro ao criar conta'
        });
      }
    } catch (error) {
      setAuthMessage({
        type: 'error',
        message: 'Erro de conexão. Tente novamente.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateLogin()) return;

    setIsLoading(true);
    setAuthMessage(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAuthMessage({
          type: 'success',
          message: 'Login realizado com sucesso!'
        });
        
        // Salvar dados do usuário no localStorage (simulação)
        localStorage.setItem('gamb_client', JSON.stringify(data.client));
        
        // Notificar componente pai
        onAuthSuccess(data.client);
      } else {
        setAuthMessage({
          type: 'error',
          message: data.error || 'Erro ao fazer login'
        });
      }
    } catch (error) {
      setAuthMessage({
        type: 'error',
        message: 'Erro de conexão. Tente novamente.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Botão de fechar */}
        {onClose && (
          <div className="flex justify-end mb-4">
            <Button 
              variant="ghost" 
              size="lg"
              onClick={onClose}
              className="h-10 w-10 p-0"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        )}

        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">G</span>
            </div>
            <span className="text-3xl font-bold">Gamb</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Área do Cliente</h1>
          <p className="text-muted-foreground">
            Acesse sua conta para acompanhar projetos e tickets
          </p>
        </div>

        <Card>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Criar Conta</TabsTrigger>
            </TabsList>

            {/* Login */}
            <TabsContent value="login" className="space-y-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Entrar na sua conta
                </CardTitle>
                <CardDescription>
                  Use suas credenciais para acessar a área do cliente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        value={loginData.email}
                        onChange={(e) => handleLoginChange('email', e.target.value)}
                        placeholder="seu@email.com"
                        className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Senha</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="password"
                        value={loginData.password}
                        onChange={(e) => handleLoginChange('password', e.target.value)}
                        placeholder="••••••••"
                        className={`pl-10 ${errors.password ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Entrando..." : "Entrar"}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>

            {/* Registro */}
            <TabsContent value="register" className="space-y-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Criar nova conta
                </CardTitle>
                <CardDescription>
                  Preencha os dados abaixo para criar sua conta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Nome Completo *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={registerData.name}
                        onChange={(e) => handleRegisterChange('name', e.target.value)}
                        placeholder="Seu nome completo"
                        className={`pl-10 ${errors.name ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        value={registerData.email}
                        onChange={(e) => handleRegisterChange('email', e.target.value)}
                        placeholder="seu@email.com"
                        className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Telefone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={registerData.phone}
                        onChange={(e) => handleRegisterChange('phone', e.target.value)}
                        placeholder="(51) 9999-9999"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Nome da Empresa</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={registerData.companyName}
                        onChange={(e) => handleRegisterChange('companyName', e.target.value)}
                        placeholder="Sua empresa"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Setor</label>
                      <Select value={registerData.industry} onValueChange={(value) => handleRegisterChange('industry', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Setor" />
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

                    <div>
                      <label className="text-sm font-medium mb-1 block">Porte</label>
                      <Select value={registerData.companySize} onValueChange={(value) => handleRegisterChange('companySize', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Porte" />
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
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Senha *</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="password"
                        value={registerData.password}
                        onChange={(e) => handleRegisterChange('password', e.target.value)}
                        placeholder="••••••••"
                        className={`pl-10 ${errors.password ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Confirmar Senha *</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="password"
                        value={registerData.confirmPassword}
                        onChange={(e) => handleRegisterChange('confirmPassword', e.target.value)}
                        placeholder="••••••••"
                        className={`pl-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? "Criando conta..." : "Criar Conta"}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>

          {/* Mensagens */}
          {authMessage && (
            <Alert className={authMessage.type === 'success' ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
              {authMessage.type === 'success' ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertDescription>{authMessage.message}</AlertDescription>
            </Alert>
          )}
        </Card>

        {/* Benefícios */}
        <div className="mt-8 space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Acompanhe seus projetos em tempo real</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Visualize o status dos seus tickets</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Acesse relatórios e analytics</span>
          </div>
        </div>
      </div>
    </div>
  );
}