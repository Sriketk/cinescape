import * as React from "react";
import { cn } from "@/lib/utils";

interface IconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function IconButton({ 
  children, 
  onClick, 
  href, 
  className,
  style 
}: IconButtonProps) {
  const baseClasses = "flex items-center justify-center transition-colors h-10 w-10";
  
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(baseClasses, className)}
        style={style}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(baseClasses, className)}
      style={style}
    >
      {children}
    </button>
  );
} 