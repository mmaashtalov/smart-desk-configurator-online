import React, { createContext, useContext, useState, ReactNode } from 'react'
import { ChatMessage, ChatContextType, ProductConfiguration } from '@/types/chat'

export const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Привет! Я AI-консультант Офис Интеллект. Помогу вам выбрать идеальный умный стол. О чем хотите узнать?',
      timestamp: new Date()
    }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [currentConfiguration, setCurrentConfiguration] = useState<ProductConfiguration>({})

  const addMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
  }

  const clearMessages = () => {
    setMessages([{
      id: '1',
      role: 'assistant',
      content: 'Привет! Я AI-консультант Офис Интеллект. Помогу вам выбрать идеальный умный стол. О чем хотите узнать?',
      timestamp: new Date()
    }])
  }

  return (
    <ChatContext.Provider value={{
      isOpen,
      setIsOpen,
      messages,
      addMessage,
      clearMessages,
      isTyping,
      setIsTyping,
      currentConfiguration,
      setCurrentConfiguration
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}

