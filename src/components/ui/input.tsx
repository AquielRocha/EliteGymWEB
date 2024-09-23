import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-all duration-300 peer-focus:text-primary">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "peer w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm shadow-md transition-all duration-300",
            "placeholder:text-gray-400",
            "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20",
            "hover:border-gray-400",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-300",
            icon ? "pl-10" : "pl-4",
            "focus:shadow-lg focus:shadow-primary/10",
            className
          )}
          ref={ref}
          {...props}
        />
        <div className="absolute inset-0 rounded-lg transition-all duration-300 peer-focus:bg-primary/5 pointer-events-none" />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
