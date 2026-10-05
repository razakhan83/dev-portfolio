import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.12em]",
  {
    variants: {
      variant: {
        pine: "border-pine-line bg-pine-soft text-pine-deep",
        amber: "border-amber/30 bg-amber-soft text-amber-deep",
        neutral: "border-line bg-card text-muted",
      },
    },
    defaultVariants: { variant: "neutral" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
