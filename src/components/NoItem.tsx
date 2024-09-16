"use client"
import { Icon } from '@iconify/react'

interface Props {
  title: string
  description: string
}

export function NoItem({ description, title }: Props) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 mt-10">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <Icon icon="iconoir:file-not-found" className='w-1/2 h-1/2 fill-primary stroke-primary'/>
      </div>
      <h2 className="mt-6 text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-center text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  )
}
