import React, { useState } from 'react'
import { useChat } from '@/contexts/ChatContext'
import { useChatAPI } from '@/hooks/useChatAPI'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Loader2 } from 'lucide-react'

export function ChatInput() {
  const { isTyping } = useChat()
  const { sendMessage, error } = useChatAPI()
  const [input, setInput] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return

    const message = input.trim()
    setInput('')
    
    await sendMessage(message)
  }

  return (
    <div className="border-t bg-white">
      {error && (
        <div className="px-4 py-2 bg-red-50 border-b border-red-200">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex gap-2 p-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Напишите ваш вопрос..."
          disabled={isTyping}
          className="flex-1"
        />
        <Button 
          type="submit" 
          disabled={!input.trim() || isTyping}
          size="icon"
          className="shrink-0"
        >
          {isTyping ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </form>
    </div>
  )
}

