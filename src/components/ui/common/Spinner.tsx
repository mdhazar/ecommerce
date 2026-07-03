import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Spinner({
	className,
	size = 20,
}: {
	className?: string;
	size?: number;
}) {
	return (
		<Loader2
			size={size}
			className={cn("animate-spin text-muted-foreground", className)}
			aria-hidden="true"
		/>
	);
}

/** Full-height centered loading state for route/page-level fetches. */
export function PageLoader({ label = "Loading…" }: { label?: string }) {
	return (
		<div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
			<Spinner size={28} />
			<p className="text-sm text-muted-foreground">{label}</p>
		</div>
	);
}
