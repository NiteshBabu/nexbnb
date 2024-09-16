"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export function NewListingSubmit() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled size="lg">
          Please Wait
        </Button>
      ) : (
        <Button type="submit" size="lg">
          Next
        </Button>
      )}
    </>
  );
}
