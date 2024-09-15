import * as React from "react"
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"


const Scroller = ({ className, ...props }: React.ComponentProps<"ul">) => (
    <ul
        className={cn("flex gap-4 overflow-x-scroll", className)}
        {...props}
    />
)
Scroller.displayName = "Scroller"

const ScrollItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
    <li ref={ref} className={cn("", className)} {...props} />
))

ScrollItem.displayName = "ScrollItem"


export { Scroller, ScrollItem }