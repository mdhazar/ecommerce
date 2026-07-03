import { ChevronDown } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

/** Lightweight styled native <select> — accessible, no extra dependencies. */
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
	({ className, children, ...props }, ref) => (
		<div className="relative">
			<select
				ref={ref}
				className={cn(
					"flex h-11 w-full appearance-none rounded-md border border-input bg-card px-3.5 pr-10 text-sm text-foreground shadow-xs transition-colors",
					"focus-visible:border-ring focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring/40",
					"disabled:cursor-not-allowed disabled:opacity-50",
					className,
				)}
				{...props}
			>
				{children}
			</select>
			<ChevronDown
				size={16}
				aria-hidden="true"
				className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
			/>
		</div>
	),
);
Select.displayName = "Select";

export { Select };
