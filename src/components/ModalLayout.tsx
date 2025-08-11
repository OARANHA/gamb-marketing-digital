"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ModalLayoutProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  showFooter?: boolean;
}

export function ModalLayout({ title, onClose, children, showFooter = true }: ModalLayoutProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full h-full max-h-full overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b z-10 p-4">
          <div className="container mx-auto flex items-center justify-between">
            <h2 className="text-2xl font-bold">{title}</h2>
            <Button 
              variant="ghost" 
              size="lg"
              onClick={onClose}
              className="h-10 w-10 p-0"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto p-4">
          {children}
        </div>

        {/* Footer */}
        {showFooter && (
          <footer className="bg-primary text-primary-foreground py-12 mt-12">
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
        )}
      </div>
    </div>
  );
}