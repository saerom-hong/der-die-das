import React from "react";
import Link from "next/link";
import { cn } from "../lib/utils";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  size?: "sm" | "md" | "lg";
  href: string;
}

export const LevelLink = ({
  className,
  children,
  size = "lg",
  href,
  ...props
}: LinkProps) => {
  const baseStyles =
    "font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-pink-600 text-white hover:bg-pink-700 active:bg-purple-800 my-4";

  const sizes = {
    sm: "h-8 px-3 text-xs rounded-md",
    md: "h-10 px-4 py-2 text-sm rounded-md",
    lg: "h-12 px-16 py-3 text-base rounded-lg",
  };

  return (
    <Link
      href={href}
      className={cn(baseStyles, sizes[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
};
