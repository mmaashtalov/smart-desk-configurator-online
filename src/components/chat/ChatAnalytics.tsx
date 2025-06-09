import { useEffect } from 'react';
import { useAnalytics } from '@/contexts/AnalyticsContext';
import { useChat } from '@/contexts/ChatContext';

export function ChatAnalytics() {
  const { trackEvent } = useAnalytics();
  const { isOpen, messages } = useChat();

  useEffect(() => {
    if (isOpen) {
      trackEvent('chat_opened', window.location.pathname, 'chat_widget');
    }
  }, [isOpen, trackEvent]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage) {
      trackEvent(
        lastMessage.role === 'user' ? 'user_message_sent' : 'assistant_message_received',
        window.location.pathname,
        'chat_window',
        { messageLength: lastMessage.content.length }
      );
    }
  }, [messages, trackEvent]);

  return null;
} 