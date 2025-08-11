export interface ConversionEvent {
  id: string;
  type: 'chat_open' | 'chat_message' | 'ticket_created' | 'popup_open' | 'popup_submit' | 'contact_form' | 'cookie_accept' | 'page_view' | 'service_click' | 'scroll_depth';
  userId: string;
  sessionId: string;
  timestamp: Date;
  data: Record<string, any>;
}

export interface UserSession {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  events: ConversionEvent[];
  deviceInfo: {
    userAgent: string;
    screenResolution?: string;
    isMobile: boolean;
  };
  location?: {
    city?: string;
    country?: string;
  };
}

// Simulação de banco de dados
let conversionEvents: ConversionEvent[] = [];
let userSessions: UserSession[] = [];

export function generateUserId(): string {
  let userId = localStorage.getItem('gamb_user_id');
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('gamb_user_id', userId);
  }
  return userId;
}

export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function getCurrentSession(): UserSession | null {
  const sessionId = sessionStorage.getItem('gamb_session_id');
  if (!sessionId) return null;
  
  return userSessions.find(session => session.id === sessionId) || null;
}

export function startSession(): UserSession {
  const userId = generateUserId();
  const sessionId = generateSessionId();
  
  const session: UserSession = {
    id: sessionId,
    userId,
    startTime: new Date(),
    events: [],
    deviceInfo: {
      userAgent: navigator.userAgent,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      isMobile: /Mobile|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    }
  };
  
  userSessions.push(session);
  sessionStorage.setItem('gamb_session_id', sessionId);
  
  // Registrar evento de página view
  trackEvent('page_view', { path: window.location.pathname });
  
  return session;
}

export function endSession(): void {
  const session = getCurrentSession();
  if (session) {
    session.endTime = new Date();
    sessionStorage.removeItem('gamb_session_id');
  }
}

export function trackEvent(type: ConversionEvent['type'], data: Record<string, any> = {}): void {
  let session = getCurrentSession();
  
  if (!session) {
    session = startSession();
  }
  
  const event: ConversionEvent = {
    id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type,
    userId: session.userId,
    sessionId: session.id,
    timestamp: new Date(),
    data
  };
  
  conversionEvents.push(event);
  session.events.push(event);
  
  // Enviar para analytics (simulação)
  console.log(`📊 [Analytics] ${type}:`, data);
}

export function getConversionMetrics() {
  const now = new Date();
  const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  const recentEvents = conversionEvents.filter(event => event.timestamp >= last7Days);
  const monthlyEvents = conversionEvents.filter(event => event.timestamp >= last30Days);
  
  const metrics = {
    totalEvents: conversionEvents.length,
    recentEvents: recentEvents.length,
    monthlyEvents: monthlyEvents.length,
    
    // Taxas de conversão
    chatOpenRate: calculateConversionRate(recentEvents, 'page_view', 'chat_open'),
    ticketCreationRate: calculateConversionRate(recentEvents, 'chat_open', 'ticket_created'),
    popupConversionRate: calculateConversionRate(recentEvents, 'popup_open', 'popup_submit'),
    contactFormRate: calculateConversionRate(recentEvents, 'contact_form', 'contact_form'),
    
    // Eventos por tipo
    eventsByType: getEventsByType(recentEvents),
    
    // Sessões
    totalSessions: userSessions.length,
    activeSessions: userSessions.filter(s => !s.endTime).length,
    avgSessionDuration: getAverageSessionDuration(),
    
    // Dispositivos
    deviceStats: getDeviceStats()
  };
  
  return metrics;
}

function calculateConversionRate(events: ConversionEvent[], triggerType: string, conversionType: string): number {
  const triggers = events.filter(e => e.type === triggerType).length;
  const conversions = events.filter(e => e.type === conversionType).length;
  
  return triggers > 0 ? (conversions / triggers) * 100 : 0;
}

function getEventsByType(events: ConversionEvent[]): Record<string, number> {
  return events.reduce((acc, event) => {
    acc[event.type] = (acc[event.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

function getAverageSessionDuration(): number {
  const completedSessions = userSessions.filter(s => s.endTime);
  if (completedSessions.length === 0) return 0;
  
  const totalDuration = completedSessions.reduce((sum, session) => {
    return sum + (session.endTime!.getTime() - session.startTime.getTime());
  }, 0);
  
  return totalDuration / completedSessions.length / 1000 / 60; // em minutos
}

function getDeviceStats() {
  const totalSessions = userSessions.length;
  if (totalSessions === 0) return { mobile: 0, desktop: 0 };
  
  const mobileSessions = userSessions.filter(s => s.deviceInfo.isMobile).length;
  
  return {
    mobile: (mobileSessions / totalSessions) * 100,
    desktop: ((totalSessions - mobileSessions) / totalSessions) * 100
  };
}

// Hook para tracking de scroll depth
export function trackScrollDepth() {
  let maxScroll = 0;
  
  const handleScroll = () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      
      // Registrar eventos de scroll depth
      if (scrollPercent >= 25 && maxScroll < 30) {
        trackEvent('scroll_depth', { depth: 25 });
      } else if (scrollPercent >= 50 && maxScroll < 55) {
        trackEvent('scroll_depth', { depth: 50 });
      } else if (scrollPercent >= 75 && maxScroll < 80) {
        trackEvent('scroll_depth', { depth: 75 });
      } else if (scrollPercent >= 90 && maxScroll < 95) {
        trackEvent('scroll_depth', { depth: 90 });
      }
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}

// Hook para tracking de cliques em serviços
export function trackServiceClick(serviceName: string) {
  trackEvent('service_click', { service: serviceName });
}