'use client'

import { Card, CardHeader } from '@/components/ui/card'
import filterItems from '../../data/filters.json'
import { useState } from 'react'
import { Icon } from '@iconify/react'

export function SelectedCategory() {
  const [selectedCategory, setSelectredCategory] = useState<string | undefined>(
    undefined
  )
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 lg:w-3/5 mx-auto mb-36">
      <input
        type="hidden"
        name="categoryName"
        value={selectedCategory as string}
      />
      {filterItems.map((item) => (
        <div key={item.id} className="cursor-pointer">
          <Card
            className={selectedCategory === item.name ? 'border-primary' : ''}
            onClick={() => setSelectredCategory(item.name)}
          >
            <CardHeader>
              <div className="h-14">
                <Icon icon={item.icon} className='text-[30px] md:text-[40px] lg:text-[50px]' />
              </div>
              <h3 className="font-medium text-sm md:text-md">{item.title}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  )
}
