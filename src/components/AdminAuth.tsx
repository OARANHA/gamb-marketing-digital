"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Shield, Lock, Mail, Eye, EyeOff } from "lucide-react";

interface AdminAuthProps {
  onAuthSuccess: (admin: any) => void;
  onClose?: () => void;
}

interface LoginData {
  email: string;
  password: string;
}

export function AdminAuth({ onAuthSuccess, onClose }: AdminAuthProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [authMessage, setAuthMessage] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginChange = (field: keyof LoginData, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
    // Limpar erro quando o campo é preenchido
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateLogin = () => {
    const newErrors: Record<string, string> = {};

    if (!loginData.email.trim()) newErrors.email = "Email é obrigatório";
    if (!loginData.password) newErrors.password = "Senha é obrigatória";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateLogin()) return;

    setIsLoading(true);
    setAuthMessage(null);

    try {
      const response = await fetch('/api/auth/admin/login', {
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
          message: 'Login administrativo realizado com sucesso!'
        });
        
        // Salvar dados do administrador no localStorage
        localStorage.setItem('gamb_admin', JSON.stringify(data.admin));
        
        // Notificar componente pai
        onAuthSuccess(data.admin);
      } else {
        setAuthMessage({
          type: 'error',
          message: data.error || 'Erro ao fazer login administrativo'
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
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-background flex items-center justify-center p-4">
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
              ×
            </Button>
          </div>
        )}

        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-3xl font-bold">Gamb Admin</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Painel Administrativo</h1>
          <p className="text-muted-foreground">
            Acesso restrito para administradores da Gamb
          </p>
        </div>

        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <Shield className="h-5 w-5" />
              Login Administrativo
            </CardTitle>
            <CardDescription>
              Entre com suas credenciais de administrador
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
                    placeholder="admin@gamb.com.br"
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
                    type={showPassword ? "text" : "password"}
                    value={loginData.password}
                    onChange={(e) => handleLoginChange('password', e.target.value)}
                    placeholder="••••••••"
                    className={`pl-10 pr-10 ${errors.password ? "border-red-500" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700" 
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar como Administrador"}
              </Button>
            </form>
          </CardContent>
        </Card>

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

        {/* Avisos de Segurança */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-red-600" />
            <span>Acesso restrito e monitorado</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="h-4 w-4 text-red-600" />
            <span>Use apenas em redes seguras</span>
          </div>
        </div>
      </div>
    </div>
  );
}