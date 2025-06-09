import React from 'react'
import { useChat } from '@/contexts/ChatContext'
import { Button } from '@/components/ui/button'
import { MessageCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ChatWidget() {
  const { isOpen, setIsOpen, messages } = useChat()

  // Подсчитываем непрочитанные сообщения (сообщения ассистента после последнего сообщения пользователя)
  const unreadCount = React.useMemo(() => {
    let count = 0
    let foundUserMessage = false
    
    // Идем с конца массива
    for (let i = messages.length - 1; i >= 0; i--) {
      const message = messages[i]
      if (message.role === 'user') {
        foundUserMessage = true
        break
      }
      if (message.role === 'assistant') {
        count++
      }
    }
    
    // Если не нашли сообщений пользователя, считаем все сообщения ассистента как непрочитанные
    if (!foundUserMessage && !isOpen) {
      return messages.filter(m => m.role === 'assistant').length
    }
    
    return isOpen ? 0 : count
  }, [messages, isOpen])

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Пульсирующий эффект для привлечения внимания */}
      {!isOpen && unreadCount > 0 && (
        <div className="absolute inset-0 w-14 h-14 rounded-full bg-blue-400 animate-ping opacity-75 pointer-events-none" />
      )}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative w-14 h-14 rounded-full shadow-lg transition-all duration-200 hover:scale-105",
          isOpen
            ? "bg-red-500 hover:bg-red-600"
            : "bg-blue-500 hover:bg-blue-600"
        )}
        size="icon"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}

        {/* Индикатор непрочитанных сообщений */}
        {unreadCount > 0 && !isOpen && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </div>
        )}
      </Button>
    </div>
  )
}

