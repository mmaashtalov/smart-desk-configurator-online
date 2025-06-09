import React from 'react'
import { useChat } from '@/contexts/ChatContext'
import { useChatAPI } from '@/hooks/useChatAPI'
import { Button } from '@/components/ui/button'

const quickQuestions = [
  'Какой стол выбрать для двух мониторов?',
  'Что делает кнопка памяти?',
  'В чем отличие Arctic и Wenge?',
  'Какая тумба подойдет для левши?',
  'Помогите подобрать конфигурацию'
]

export function QuickActions() {
  const { messages } = useChat()
  const { sendMessage } = useChatAPI()

  // Показываем быстрые действия только в начале разговора
  if (messages.length > 1) return null

  const handleQuickQuestion = async (question: string) => {
    await sendMessage(question)
  }

  return (
    <div className="p-4 border-b bg-gray-50">
      <p className="text-xs text-gray-600 mb-3">Популярные вопросы:</p>
      <div className="flex flex-wrap gap-2">
        {quickQuestions.map((question, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => handleQuickQuestion(question)}
            className="text-xs h-auto py-1 px-2 whitespace-normal text-left"
          >
            {question}
          </Button>
        ))}
      </div>
    </div>
  )
}

