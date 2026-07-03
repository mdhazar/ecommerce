import type { ErrorComponentProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import type React from "react";
import { Brand } from "@/components/ui/common/Brand";
import { Button } from "@/components/ui/common/Button";

const DefaultCatchBoundary: React.FC<ErrorComponentProps> = ({ error }) => (
	<div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4 text-center">
		<Brand />
		<div className="space-y-2">
			<h1 className="text-3xl font-semibold tracking-tight">
				Something went wrong
			</h1>
			<p className="max-w-lg text-muted-foreground">
				We hit an unexpected snag. Try refreshing, or head back home while we
				sort it out.
			</p>
		</div>
		{error?.message ? (
			<p className="max-w-lg break-words rounded-md border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
				{error.message}
			</p>
		) : null}
		<div className="flex flex-wrap items-center justify-center gap-3">
			<Button type="button" size="lg" onClick={() => window.location.reload()}>
				Reload page
			</Button>
			<Button asChild variant="outline" size="lg">
				<Link to="/">Back to home</Link>
			</Button>
		</div>
	</div>
);

export default DefaultCatchBoundary;
