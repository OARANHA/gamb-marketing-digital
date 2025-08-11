"use client";

import { useEffect } from 'react';
import { 
  startSession, 
  endSession, 
  trackEvent, 
  trackScrollDepth,
  trackServiceClick,
  getConversionMetrics 
} from '@/lib/analytics';

export function useAnalytics() {
  useEffect(() => {
    // Iniciar sessão quando o componente montar
    const session = startSession();
    
    // Configurar tracking de scroll
    const cleanupScroll = trackScrollDepth();
    
    // Limpar quando o componente desmontar
    return () => {
      endSession();
      cleanupScroll();
    };
  }, []);

  const trackChatOpen = () => {
    trackEvent('chat_open', { timestamp: new Date().toISOString() });
  };

  const trackChatMessage = (message: string) => {
    trackEvent('chat_message', { 
      messageLength: message.length,
      timestamp: new Date().toISOString() 
    });
  };

  const trackTicketCreated = (ticketId: string, category: string) => {
    trackEvent('ticket_created', { 
      ticketId,
      category,
      timestamp: new Date().toISOString() 
    });
  };

  const trackPopupOpen = () => {
    trackEvent('popup_open', { timestamp: new Date().toISOString() });
  };

  const trackPopupSubmit = (data: any) => {
    trackEvent('popup_submit', { 
      hasEmail: !!data.email,
      hasPhone: !!data.phone,
      timestamp: new Date().toISOString() 
    });
  };

  const trackContactForm = (data: any) => {
    trackEvent('contact_form', { 
      hasEmail: !!data.email,
      hasPhone: !!data.phone,
      messageLength: data.message ? data.message.length : 0,
      timestamp: new Date().toISOString() 
    });
  };

  const trackCookieAccept = () => {
    trackEvent('cookie_accept', { timestamp: new Date().toISOString() });
  };

  const getMetrics = () => {
    return getConversionMetrics();
  };

  return {
    trackChatOpen,
    trackChatMessage,
    trackTicketCreated,
    trackPopupOpen,
    trackPopupSubmit,
    trackContactForm,
    trackCookieAccept,
    trackServiceClick,
    getMetrics
  };
}