import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

/** Read-only star rating rendered from a 0–5 number. */
export function Rating({
	value,
	count,
	size = 16,
	className,
}: {
	value: number;
	count?: number;
	size?: number;
	className?: string;
}) {
	const rounded = Math.round(value);
	return (
		<div className={cn("flex items-center gap-1.5", className)}>
			<div className="flex items-center" aria-hidden="true">
				{[0, 1, 2, 3, 4].map((i) => (
					<Star
						key={i}
						size={size}
						className={
							i < rounded
								? "fill-amber-400 text-amber-400"
								: "fill-transparent text-muted-foreground/40"
						}
					/>
				))}
			</div>
			{typeof count === "number" ? (
				<span className="text-xs text-muted-foreground">
					{value.toFixed(1)} ({count})
				</span>
			) : (
				<span className="sr-only">{value.toFixed(1)} out of 5</span>
			)}
		</div>
	);
}
