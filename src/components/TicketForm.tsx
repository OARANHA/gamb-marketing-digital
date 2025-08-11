"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TicketCheck, Send, AlertCircle } from "lucide-react";
import { TICKET_CATEGORIES } from "@/lib/tickets";

interface TicketFormProps {
  chatHistory: { text: string; sender: 'user' | 'agent' }[];
  onTicketCreated: (ticketId: string) => void;
  onClose: () => void;
}

export function TicketForm({ chatHistory, onTicketCreated, onClose }: TicketFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    description: "",
    category: ""
  });
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: "" });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'create',
          ...formData,
          chatHistory
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus({
          type: 'success',
          message: `Ticket ${data.ticket.id} criado com sucesso! Entraremos em contato em até 24h.`
        });
        onTicketCreated(data.ticket.id);
        
        // Fechar após 3 segundos
        setTimeout(() => {
          setIsOpen(false);
          onClose();
          setSubmitStatus({ type: null, message: "" });
          // Reset form
          setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            description: "",
            category: ""
          });
        }, 3000);
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Erro ao criar ticket. Por favor, tente novamente.'
        });
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Erro de conexão. Verifique sua internet e tente novamente.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name && formData.email && formData.subject && formData.description && formData.category;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <TicketCheck className="h-4 w-4 mr-2" />
          Falar com Especialista
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TicketCheck className="h-5 w-5" />
            Abrir Ticket de Suporte
          </DialogTitle>
          <DialogDescription>
            Preencha o formulário abaixo para que um de nossos especialistas entre em contato com você.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {submitStatus.type && (
            <Alert className={submitStatus.type === 'success' ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{submitStatus.message}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Nome *</label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Seu nome"
                required
              />
            </div>
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
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Telefone</label>
            <Input
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="(51) 9999-9999"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Categoria *</label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {TICKET_CATEGORIES.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Assunto *</label>
            <Input
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              placeholder="Breve descrição do assunto"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Descrição *</label>
            <Textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Descreva detalhadamente sua necessidade..."
              rows={4}
              required
            />
          </div>

          {chatHistory.length > 0 && (
            <div className="bg-muted/50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">
                  Histórico do Chat
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {chatHistory.length} mensagens serão anexadas
                </span>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button 
              type="submit" 
              className="flex-1"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? (
                "Enviando..."
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Ticket
                </>
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}