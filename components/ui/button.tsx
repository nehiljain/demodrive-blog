"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-fd-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        accent:
          "border-2 border-fd-accent bg-fd-accent/40 text-fd-foreground hover:bg-fd-accent/90 shadow-sm font-medium",
        default:
          "bg-fd-primary text-fd-primary-foreground shadow hover:bg-fd-primary/90",
        destructive:
          "bg-fd-destructive text-fd-destructive-foreground shadow-sm hover:bg-fd-destructive/90",
        outline:
          "border border-fd-input bg-transparent shadow-sm hover:bg-fd-accent hover:text-fd-accent-foreground",
        secondary:
          "bg-fd-secondary text-fd-secondary-foreground shadow-sm hover:bg-fd-secondary/80",
        ghost: "hover:bg-fd-accent hover:text-fd-accent-foreground",
        link: "text-fd-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 rounded-full px-4 py-2",
        sm: "h-8 rounded-full px-3 text-xs",
        lg: "h-10 rounded-full px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
