'use client'
import filterItems from '../../data/filters.json'
import { Icon } from '@iconify/react'
import { Separator } from '../ui/separator'

export function CategoryShowcase({ categoryName }: { categoryName: string }) {
  const category = filterItems.find((item) => item.name === categoryName)

  return (
    <>
      <div className="flex items-center">
        <Icon icon={category?.icon} className="h-10 w-10" />

        <div className="flex flex-col ml-4">
          <h3 className="font-medium">{category?.title}</h3>
          <p className="text-sm text-muted-foreground">
            {category?.description}
          </p>
        </div>
      </div>
      <Separator className="my-5" />
    </>
  )
}
