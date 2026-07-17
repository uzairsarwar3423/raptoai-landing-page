import * as React from "react";
import { cn } from "./Button";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

export function Container({
  className,
  as: Component = "div",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-[1280px] px-[clamp(20px,5vw,80px)]",
        className
      )}
      {...props}
    />
  );
}
