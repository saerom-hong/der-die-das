import React from "react";
import { cn } from "../lib/utils";

interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  label: string;
  draggable?: boolean;
}

export const ChoiceChip = ({
  className,
  size = "lg",
  children,
  draggable,
  onDragStart,
  ...props
}: ChipProps) => {
  const baseStyles =
    "font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-pink-600 text-white hover:bg-pink-700 active:bg-purple-800 my-4";

  const sizes = {
    sm: "h-8 px-3 text-xs rounded-md",
    md: "h-10 px-4 py-2 text-sm rounded-md",
    lg: "h-12 px-16 py-3 text-base rounded-lg",
  };

  return (
    <div
      className={cn(baseStyles, sizes[size], className)}
      draggable={draggable}
      onDragStart={onDragStart}
      {...props}
    >
      {children}
    </div>
  );
};
