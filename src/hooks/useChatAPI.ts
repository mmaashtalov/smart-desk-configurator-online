import { useChat } from '@/contexts/ChatContext'
import { getChatCompletion } from '@/services/openai'

export function useChatAPI() {
  const { messages, addMessage, setIsTyping } = useChat()

  const sendMessage = async (text: string) => {
    addMessage({ role: 'user', content: text })
    setIsTyping(true)

    const newMessages = [...messages, { role: 'user', content: text }]
    const response = await getChatCompletion(newMessages)

    if (response) {
      addMessage({ role: 'assistant', content: response })
    }

    setIsTyping(false)
  }

  return { sendMessage, error: null }
}

