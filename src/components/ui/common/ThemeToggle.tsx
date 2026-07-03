import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Toggles the `.dark` class on <html> and persists the choice under the plain
 * `theme` key that the pre-paint script in __root reads. Renders a stable
 * placeholder until mounted so server and client markup match (no hydration
 * mismatch, no icon flash).
 */
export function ThemeToggle({ className }: { className?: string }) {
	const [dark, setDark] = useState<boolean | null>(null);

	useEffect(() => {
		setDark(document.documentElement.classList.contains("dark"));
	}, []);

	const toggle = () => {
		const next = !dark;
		const root = document.documentElement;
		root.classList.toggle("dark", next);
		root.style.colorScheme = next ? "dark" : "light";
		try {
			localStorage.setItem("theme", next ? "dark" : "light");
		} catch {
			/* storage may be unavailable; the class toggle still applies */
		}
		setDark(next);
	};

	const base = cn(
		"inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring",
		className,
	);

	if (dark === null) {
		return (
			<span className={base} aria-hidden="true">
				<span className="h-5 w-5" />
			</span>
		);
	}

	return (
		<button
			type="button"
			onClick={toggle}
			className={base}
			aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
		>
			{dark ? <Sun size={18} /> : <Moon size={18} />}
		</button>
	);
}

export default ThemeToggle;
