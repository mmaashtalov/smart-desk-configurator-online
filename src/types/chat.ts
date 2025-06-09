export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  typing?: boolean
}

export interface ChatSession {
  id: string
  messages: ChatMessage[]
  createdAt: Date
  updatedAt: Date
}

export interface ProductConfiguration {
  deskModel?: string
  size?: string
  color?: string
  accessories?: string[]
  price?: number
}

export interface ChatContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  messages: ChatMessage[]
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void
  clearMessages: () => void
  isTyping: boolean
  setIsTyping: (typing: boolean) => void
  currentConfiguration?: ProductConfiguration
  setCurrentConfiguration: (config: ProductConfiguration) => void
}

