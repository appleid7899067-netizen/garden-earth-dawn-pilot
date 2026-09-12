"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40 active:scale-[0.98] min-h-11",
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-foreground hover:opacity-90",
        secondary: "bg-surface text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
        ghost: "bg-transparent text-fg-muted hover:text-fg hover:bg-surface",
        danger: "bg-danger text-danger-fg hover:opacity-90",
      },
      size: {
        md: "rounded-[var(--radius-sm)] px-4 text-sm",
        sm: "rounded-[var(--radius-xs)] px-3 text-xs min-h-9",
        lg: "rounded-[var(--radius-md)] px-5 text-sm min-h-12",
        icon: "size-11 rounded-[var(--radius-sm)] p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>
>(({ className, variant, size, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
));
Button.displayName = "Button";
