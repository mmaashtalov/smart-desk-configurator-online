import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { CATEGORIES } from '@/data/catalog'
import { cn } from '@/lib/utils'

export const CategoryTabs: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>()

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {CATEGORIES.map((category) => (
        <Link
          key={category.id}
          to={category.path}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200',
            categoryId === category.id
              ? 'bg-accent text-accent-foreground shadow-md'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          )}
        >
          {category.name}
        </Link>
      ))}
    </div>
  )
} 