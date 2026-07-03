import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type React from "react";
import { Brand } from "@/components/ui/common/Brand";

/**
 * Minimal chrome for auth pages — just the wordmark and a route back home, so
 * sign-in / register feel focused instead of buried under the full navbar.
 */
export function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col bg-background">
			<div className="border-b border-border">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
					<Brand />
					<Link
						to="/"
						className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
					>
						<ArrowLeft size={15} />
						Back to store
					</Link>
				</div>
			</div>
			<main className="flex flex-1 flex-col">{children}</main>
		</div>
	);
}

export default AuthLayout;
