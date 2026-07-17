import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild = false,
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-[10px] font-semibold transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-700)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 tracking-wide";

    const variants = {
      primary:
        "bg-[var(--color-brand-500)] text-white shadow-[0_1px_2px_rgba(0,0,0,0.06)] hover:bg-[var(--color-brand-600)] hover:shadow-[0_8px_24px_-4px_hsl(24_90%_54%_/_0.25)] hover:-translate-y-[1px] active:translate-y-0 active:shadow-none",
      secondary:
        "border-[1.5px] border-[var(--color-ink-900)] border-opacity-12 text-[var(--color-ink-900)] bg-transparent hover:border-opacity-100 hover:bg-[var(--color-brand-25)] active:translate-y-[1px]",
      ghost:
        "text-[var(--color-ink-700)] hover:bg-[var(--color-paper-sunken)] hover:text-[var(--color-ink-900)]",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg",
    };

    return (
      <Comp
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex space-x-1 items-center justify-center">
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" />
          </span>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, cn };
