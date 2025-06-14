import React from 'react'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'

interface OptionItem {
  id: string
  name: string
  addPrice: number
}

interface OptionGroupProps {
  title: string
  options: ReadonlyArray<OptionItem>
  selectedValue: string
  onValueChange: (value: string) => void
  className?: string
}

export const OptionGroup: React.FC<OptionGroupProps> = ({
  title,
  options,
  selectedValue,
  onValueChange,
  className
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <RadioGroup value={selectedValue} onValueChange={onValueChange as (value: string) => void} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => (
          <div key={option.id} className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-accent/5 transition-colors duration-200">
            <RadioGroupItem value={option.id} id={option.id} />
            <Label htmlFor={option.id} className="flex-1 cursor-pointer">
              <p className="font-medium">{option.name}</p>
              {option.addPrice > 0 && (
                <p className="text-sm text-gray-500">+ {option.addPrice} ₽</p>
              )}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
} 