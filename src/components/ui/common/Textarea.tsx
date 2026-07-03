import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, ...props }, ref) => (
		<textarea
			ref={ref}
			className={cn(
				"flex min-h-[7rem] w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-sm text-foreground shadow-xs transition-colors",
				"placeholder:text-muted-foreground/70",
				"focus-visible:border-ring focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring/40",
				"disabled:cursor-not-allowed disabled:opacity-50",
				"aria-[invalid=true]:border-destructive",
				className,
			)}
			{...props}
		/>
	),
);
Textarea.displayName = "Textarea";

export { Textarea };
