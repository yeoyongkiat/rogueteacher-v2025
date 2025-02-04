import { cn } from "@/lib/utils";

interface GridProps {
  children: React.ReactNode;
  columns?: {
    default: number;
    md?: number;
    lg?: number;
  };
  gap?: string;
  className?: string;
}

export function Grid({ 
  children, 
  columns = { default: 1, md: 2 },
  gap = "gap-8",
  className 
}: GridProps) {
  const gridCols = {
    default: `grid-cols-${columns.default}`,
    md: columns.md ? `md:grid-cols-${columns.md}` : '',
    lg: columns.lg ? `lg:grid-cols-${columns.lg}` : ''
  };

  return (
    <div className={cn(
      "grid",
      gap,
      gridCols.default,
      gridCols.md,
      gridCols.lg,
      className
    )}>
      {children}
    </div>
  );
} 