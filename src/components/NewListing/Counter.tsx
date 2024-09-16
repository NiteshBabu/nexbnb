"use client";

import { Button } from "@/components/ui/button";
import { Icon } from '@iconify/react'
import { useState } from "react";

export function Counter({ name }: { name: string }) {
  const [count, setCount] = useState(0);

  function plus() {
    setCount(count + 1);
  }

  function minus() {
    if (count > 0) {
      setCount(count - 1);
    }
  }
  return (
    <div className="flex items-center gap-x-4">
      <input type="hidden" name={name} value={count} />
      <Button variant="outline" size="icon" type="button" onClick={minus}>
        <Icon icon="fa-solid:plus" />
      </Button>
      <p className="font-medium text-lg">{count}</p>
      <Button variant="outline" size="icon" type="button" onClick={plus}>
        <Icon icon="fa-solid:minus" />
      </Button>
    </div>
  )
}
