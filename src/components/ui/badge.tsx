import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline';
  color?: 'primary' | 'neutral';
}

export function Badge({ 
  children, 
  variant = 'default', 
  color = 'primary',
  className,
  ...props 
}: BadgeProps) {
  const baseStyles = "inline-block px-3 py-1.5 rounded-full text-xs font-medium";
  const variants = {
    default: {
      primary: "bg-[rgb(217,233,233)] text-[rgb(43,154,154)]",
      neutral: "bg-neutral-100 text-neutral-600"
    },
    outline: {
      primary: "border border-[rgb(43,154,154)] text-[rgb(43,154,154)]",
      neutral: "border border-neutral-200 text-neutral-600"
    }
  };

  return (
    <div 
      className={cn(
        baseStyles, 
        variants[variant][color], 
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
}

// Only export the variants, not Badge again
export { badgeVariants }
