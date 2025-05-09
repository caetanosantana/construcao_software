"use client"

import { useState, forwardRef, type InputHTMLAttributes } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

export interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  containerClassName?: string
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput({ className, containerClassName, ...props }, ref) {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <div className={cn("relative", containerClassName)}>
        <Input type={showPassword ? "text" : "password"} className={cn("pr-10", className)} ref={ref} {...props} />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Eye className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </div>
    )
  },
);

export { PasswordInput }
