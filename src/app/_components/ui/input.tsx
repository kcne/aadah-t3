import * as React from "react"
import { cn } from "~/utils/utils"
import { useFormField } from "./form"


export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const { error } = useFormField()
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          error ? "focus-visible:outline-none ring-1 focus-visible:ring-1 focus-visible:ring-destructive ring-destructive":"focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
