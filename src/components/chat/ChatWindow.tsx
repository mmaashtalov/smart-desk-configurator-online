import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Send, X, Bot, User, MessageSquare } from 'lucide-react';
import { useChat } from '@/contexts/ChatContext';
import { useChatAPI } from '@/hooks/useChatAPI';
import { cn } from '@/lib/utils';
import { ChatAnalytics } from '@/components/chat/ChatAnalytics';

export const ChatWindow: React.FC = () => {
  const { isOpen, setIsOpen, messages, clearMessages, isTyping } = useChat();
  const { sendMessage } = useChatAPI();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <ChatAnalytics />
      <Card className="fixed bottom-20 right-4 w-96 h-[70vh] shadow-lg z-50 flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
          <CardTitle className="text-lg">Чат-консультант</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-grow p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  'flex items-start gap-3',
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {msg.role === 'assistant' && (
                  <div className="bg-gray-200 p-2 rounded-full">
                    <Bot className="h-5 w-5 text-gray-600" />
                  </div>
                )}
                <div
                  className={cn(
                    'px-4 py-2 rounded-lg max-w-xs',
                    msg.role === 'user'
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  )}
                >
                  {msg.content}
                </div>
                {msg.role === 'user' && (
                   <div className="bg-blue-500 p-2 rounded-full">
                    <User className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2">
                 <div className="bg-gray-200 p-2 rounded-full">
                    <Bot className="h-5 w-5 text-gray-600" />
                  </div>
                <div className="text-sm text-gray-500">
                  Печатает...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
            <Input
              type="text"
              placeholder="Спросите что-нибудь..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isTyping}
              className="flex-grow"
            />
            <Button type="submit" size="icon" disabled={isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </>
  );
};

