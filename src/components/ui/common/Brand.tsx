import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/**
 * The canonical "North & Grove" wordmark. Single source of truth for the brand
 * name (previously split between "BrandName" in the navbar and "Bandage" in the
 * footer).
 */
export function Brand({
	className,
	as = "link",
}: {
	className?: string;
	as?: "link" | "plain";
}) {
	const content = (
		<span className="font-serif text-xl font-semibold tracking-tight text-foreground">
			North
			<span className="text-primary">&amp;</span>
			Grove
		</span>
	);

	if (as === "plain") {
		return <span className={cn("inline-flex", className)}>{content}</span>;
	}

	return (
		<Link
			to="/"
			className={cn(
				"inline-flex items-center rounded-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
				className,
			)}
			aria-label="North & Grove — home"
		>
			{content}
		</Link>
	);
}

export default Brand;
