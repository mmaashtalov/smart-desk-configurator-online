import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { logger } from '@/services/logger.service'

interface ConsultationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  subject?: string
}

export const ConsultationDialog: React.FC<ConsultationDialogProps> = ({ open, onOpenChange, subject }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [time, setTime] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      logger.info('Consultation form submitted successfully', { name, phone, time, subject })
      onOpenChange(false)
    } catch (error) {
      logger.error('Failed to submit consultation form', error as Error, { name, phone, time, subject })
      // Optionally, show an error message to the user
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{subject ? `Заявка: ${subject}` : 'Получить консультацию'}</DialogTitle>
          <DialogDescription>
            Заполните форму, и мы свяжемся с вами в ближайшее время
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-md px-4 py-3 focus:outline-accent"
            required
          />
          <input
            type="tel"
            placeholder="Телефон для связи"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded-md px-4 py-3 focus:outline-accent"
            required
          />
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border rounded-md px-4 py-3 focus:outline-accent"
            required
          >
            <option value="">Удобное время для звонка</option>
            <option>Как можно быстрее</option>
            <option>До 12:00</option>
            <option>С 12 до 14:00</option>
            <option>С 14 до 18:00</option>
            <option>После 18:00</option>
          </select>
          <DialogFooter>
            <Button type="submit" size="lg" className="w-full">
              Отправить запрос
            </Button>
          </DialogFooter>
        </form>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Нажимая на кнопку, вы соглашаетесь с нашей политикой конфиденциальности.
        </p>
        <DialogClose asChild>
          <button aria-label="Close" className="hidden" />
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
} 