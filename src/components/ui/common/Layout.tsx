import type * as React from "react";
import { cn } from "@/lib/utils";

/** Centered max-width content wrapper. */
export function Container({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("mx-auto w-full max-w-7xl px-4 md:px-8", className)}
			{...props}
		/>
	);
}

/** Vertical rhythm wrapper for page sections. */
export function Section({
	className,
	...props
}: React.HTMLAttributes<HTMLElement>) {
	return <section className={cn("py-14 md:py-20", className)} {...props} />;
}

interface PageHeaderProps {
	title: string;
	eyebrow?: string;
	description?: string;
	className?: string;
	children?: React.ReactNode;
}

/** Consistent boutique page title block used across routed pages. */
export function PageHeader({
	title,
	eyebrow,
	description,
	className,
	children,
}: PageHeaderProps) {
	return (
		<div className={cn("text-center", className)}>
			{eyebrow ? (
				<p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
					{eyebrow}
				</p>
			) : null}
			<h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
				{title}
			</h1>
			{description ? (
				<p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
					{description}
				</p>
			) : null}
			{children}
		</div>
	);
}
