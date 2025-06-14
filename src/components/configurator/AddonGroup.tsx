import React from 'react'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

interface AddonItem {
  id: string
  name: string
  price: number
}

interface AddonGroupProps {
  title: string
  addons: ReadonlyArray<AddonItem>
  selectedAddons: string[]
  onCheckedChange: (id: string, checked: boolean | 'indeterminate') => void
  className?: string
}

export const AddonGroup: React.FC<AddonGroupProps> = ({
  title,
  addons,
  selectedAddons,
  onCheckedChange,
  className
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {addons.map((addon) => (
          <div key={addon.id} className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-accent/5 transition-colors duration-200">
            <Checkbox
              id={addon.id}
              checked={selectedAddons.includes(addon.id)}
              onCheckedChange={(checked) => onCheckedChange(addon.id, checked)}
            />
            <Label htmlFor={addon.id} className="flex-1 cursor-pointer">
              <p className="font-medium">{addon.name}</p>
              <p className="text-sm text-gray-500">+ {addon.price} ₽</p>
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
} 