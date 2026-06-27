import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-neutral-900 text-neutral-50 shadow-sm hover:bg-neutral-800 hover:shadow-md hover:-translate-y-0.5",
        destructive: "bg-red-500 text-neutral-50 shadow-sm hover:bg-red-600 hover:shadow-md hover:-translate-y-0.5",
        outline: "border border-neutral-200 bg-white text-neutral-900 shadow-sm hover:bg-neutral-100 hover:shadow-md hover:-translate-y-0.5",
        secondary: "bg-neutral-100 text-neutral-900 shadow-sm hover:bg-neutral-200 hover:shadow-md hover:-translate-y-0.5",
        ghost: "text-neutral-900 hover:bg-neutral-100 hover:-translate-y-0.5",
        link: "text-neutral-900 underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white shadow-sm hover:opacity-90 hover:shadow-md hover:-translate-y-0.5",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-lg px-8",
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
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
