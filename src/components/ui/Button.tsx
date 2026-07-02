import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 font-light transition-all duration-500 overflow-hidden group whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-white text-black hover:bg-accent-gray shadow-[0_1px_0_rgba(255,255,255,0.08)_inset]",
        secondary:
          "bg-transparent text-foreground border border-white/40 hover:bg-white/10 hover:border-white/60",
        ghost:
          "text-muted hover:text-foreground hover:bg-white/5",
        outline:
          "border border-white/30 text-foreground hover:bg-white/10 hover:border-white/50",
      },
      size: {
        sm: "px-5 py-2.5 text-sm min-h-[40px]",
        md: "px-7 py-3 text-sm min-h-[44px]",
        lg: "px-9 py-3.5 text-base min-h-[48px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        style={{ transitionTimingFunction: "cubic-bezier(0.25, 1.25, 0.5, 1)" }}
        {...props}
      >
        <span className="relative z-10 inline-flex items-center justify-center gap-2">{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
