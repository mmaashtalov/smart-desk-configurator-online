import { useChat } from '@/contexts/ChatContext'
import { getChatCompletion } from '@/services/openai'

export function useChatAPI() {
  const { messages, addMessage, setIsTyping, currentConfiguration, setCurrentConfiguration } = useChat()

  const sendMessage = async (text: string) => {
    addMessage({ role: 'user', content: text })
    setIsTyping(true)

    let systemMessage = '';
    if (currentConfiguration && Object.keys(currentConfiguration).length > 0) {
      systemMessage = `Пользователь смотрит на конфигурацию стола и ему нужна помощь.
      Конфигурация: ${JSON.stringify(currentConfiguration, null, 2)}
      Помоги ему с разделом: ${currentConfiguration.helpTopic}`;
      
      // Clear the configuration from context after using it
      setCurrentConfiguration({});
    }

    const messagesWithContext = systemMessage 
      ? [{ role: 'system', content: systemMessage }, ...messages, { role: 'user', content: text }]
      : [...messages, { role: 'user', content: text }]
      
    const response = await getChatCompletion(messagesWithContext);

    if (response) {
      addMessage({ role: 'assistant', content: response })
    }

    setIsTyping(false)
  }

  return { sendMessage, error: null }
}

