"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowRight, Mail, Phone, MapPin, CheckCircle, Star, Users, Target, TrendingUp, MessageCircle } from "lucide-react";

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<{text: string, sender: 'user' | 'agent'}[]>([]);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    // Mostrar popup após 5 segundos
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleCookieAccept = () => {
    setShowCookieBanner(false);
    localStorage.setItem('cookieAccepted', 'true');
  };

  const handleSendMessage = async () => {
    if (chatInput.trim()) {
      const userMessage = chatInput;
      setChatMessages([...chatMessages, { text: userMessage, sender: 'user' }]);
      setChatInput("");
      
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
        
        if (response.ok) {
          setChatMessages(prev => [...prev, { 
            text: data.response, 
            sender: 'agent' 
          }]);
        } else {
          setChatMessages(prev => [...prev, { 
            text: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.', 
            sender: 'agent' 
          }]);
        }
      } catch (error) {
        console.error('Error sending message:', error);
        setChatMessages(prev => [...prev, { 
          text: 'Desculpe, não foi possível conectar ao serviço. Por favor, tente novamente mais tarde.', 
          sender: 'agent' 
        }]);
      }
    }
  };

  const services = [
    {
      title: "SEO Otimizado",
      description: "Aumente sua visibilidade nos mecanismos de busca e atraia mais clientes qualificados.",
      icon: Target
    },
    {
      title: "Tráfego Pago",
      description: "Campanhas eficazes no Google Ads e redes sociais com ROI comprovado.",
      icon: TrendingUp
    },
    {
      title: "Redes Sociais",
      description: "Gestão completa de suas redes sociais para engajar seu público.",
      icon: Users
    },
    {
      title: "Web Design",
      description: "Sites modernos e responsivos que convertem visitantes em clientes.",
      icon: CheckCircle
    }
  ];

  const testimonials = [
    {
      name: "João Silva",
      company: "Tech Solutions",
      text: "A Gamb transformou nosso negócio. Aumentamos 300% as vendas em 6 meses!",
      rating: 5
    },
    {
      name: "Maria Santos",
      company: "Boutique Chic",
      text: "Equipe profissional e resultados excepcionais. Recomendo fortemente!",
      rating: 5
    },
    {
      name: "Carlos Oliveira",
      company: "Restaurante Sabor",
      text: "O atendimento e os resultados superaram todas as expectativas.",
      rating: 4
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Cookie Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-primary text-primary-foreground p-4 z-50">
          <div className="container mx-auto flex items-center justify-between">
            <p className="text-sm">Utilizamos cookies para melhorar sua experiência. Ao continuar, você concorda com nossa política de cookies.</p>
            <Button onClick={handleCookieAccept} variant="secondary" size="sm">
              Aceitar
            </Button>
          </div>
        </div>
      )}

      {/* Chat Widget */}
      <div className="fixed bottom-4 right-4 z-50">
        {showChat ? (
          <div className="bg-white rounded-lg shadow-lg w-80 h-96 flex flex-col">
            <div className="bg-primary text-primary-foreground p-4 rounded-t-lg flex justify-between items-center">
              <h3 className="font-semibold">Chat com Agente</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowChat(false)}>
                ×
              </Button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-2 rounded-lg ${
                    msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button onClick={handleSendMessage} size="sm">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => setShowChat(true)}
            className="bg-primary hover:bg-primary/90 rounded-full p-4 shadow-lg"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        )}
      </div>

      {/* Popup */}
      {showPopup && (
        <Dialog open={showPopup} onOpenChange={setShowPopup}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">
                Oferta Especial!
              </DialogTitle>
              <DialogDescription className="text-center">
                Ganhe uma consultoria gratuita de marketing digital para seu negócio.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Seu nome" />
              <Input type="email" placeholder="Seu e-mail" />
              <Input placeholder="Seu telefone" />
              <Button className="w-full" onClick={() => setShowPopup(false)}>
                Quero minha consultoria gratuita
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">G</span>
              </div>
              <span className="text-2xl font-bold">Gamb</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#servicos" className="hover:text-primary transition-colors">Serviços</a>
              <a href="#sobre" className="hover:text-primary transition-colors">Sobre</a>
              <a href="#depoimentos" className="hover:text-primary transition-colors">Depoimentos</a>
              <a href="#contato" className="hover:text-primary transition-colors">Contato</a>
            </nav>
            <Button>
              Fale Conosco
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                Marketing Digital de Resultados
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Transforme Seu Negócio com Estratégias Digitais Inovadoras
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                A Gamb é especializada em criar soluções de marketing digital que impulsionam o crescimento do seu negócio. Da estratégia à execução, estamos com você em cada passo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg">
                  Comece Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg">
                  Ver Portfólio
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary to-primary/60 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Resultados Comprovados</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5" />
                    <span>+300% aumento em vendas</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5" />
                    <span>+200% tráfego orgânico</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5" />
                    <span>50+ clientes satisfeitos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Nossos Serviços
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Soluções Completas para Seu Negócio
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Oferecemos uma gama completa de serviços de marketing digital para ajudar sua empresa a alcançar seu potencial máximo.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                Sobre a Gamb
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Especialistas em Transformar Negócios Digitais
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Com sede em Alvorada - RS, a Gamb nasceu da paixão por ajudar negócios a prosperarem no ambiente digital. Nossa equipe de especialistas combina criatividade, tecnologia e dados para criar estratégias que geram resultados reais.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Acreditamos que cada negócio é único, e por isso desenvolvemos soluções personalizadas que atendem às necessidades específicas de cada cliente.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">50+</div>
                  <div className="text-muted-foreground">Clientes Atendidos</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">5+</div>
                  <div className="text-muted-foreground">Anos de Experiência</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary to-primary/60 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Nossa Missão</h3>
              <p className="mb-6">
                Capacitar negócios de todos os portes a alcançarem seu pleno potencial através de estratégias digitais inovadoras e resultados mensuráveis.
              </p>
              <h3 className="text-2xl font-bold mb-4">Nossa Visão</h3>
              <p>
                Ser a agência de marketing digital mais referenciada do Rio Grande do Sul, reconhecida pela excelência em resultados e atendimento ao cliente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Depoimentos
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O Que Nossos Clientes Dizem
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A satisfação de nossos clientes é nossa maior recompensa. Veja o que eles têm a dizer sobre trabalhar com a Gamb.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Contato
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Vamos Conversar Sobre Seu Projeto
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Estamos prontos para ajudar sua empresa a alcançar novos horizontes. Entre em contato conosco hoje mesmo.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Envie-nos uma mensagem</CardTitle>
                  <CardDescription>
                    Preencha o formulário abaixo e entraremos em contato o mais rápido possível.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Seu nome" />
                  <Input type="email" placeholder="Seu e-mail" />
                  <Input placeholder="Seu telefone" />
                  <Textarea placeholder="Sua mensagem" rows={4} />
                  <Button className="w-full">
                    Enviar Mensagem
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold">Endereço</div>
                      <div className="text-muted-foreground">Alvorada - RS</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold">Telefone</div>
                      <div className="text-muted-foreground">(51) 9999-9999</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold">E-mail</div>
                      <div className="text-muted-foreground">contato@gamb.com.br</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Horário de Atendimento</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <div>Segunda - Sexta: 9h - 18h</div>
                    <div>Sábado: 9h - 12h</div>
                    <div>Domingo: Fechado</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold">G</span>
                </div>
                <span className="text-xl font-bold">Gamb</span>
              </div>
              <p className="text-primary-foreground/80">
                Transformando negócios através de estratégias digitais inovadoras.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Serviços</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>SEO Otimizado</li>
                <li>Tráfego Pago</li>
                <li>Redes Sociais</li>
                <li>Web Design</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>Sobre Nós</li>
                <li>Portfólio</li>
                <li>Blog</li>
                <li>Carreiras</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contato</h3>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>Alvorada - RS</li>
                <li>(51) 9999-9999</li>
                <li>contato@gamb.com.br</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2024 Gamb Marketing Digital. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}