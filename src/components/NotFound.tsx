import { Link } from "@tanstack/react-router";
import type React from "react";
import { Brand } from "@/components/ui/common/Brand";
import { Button } from "@/components/ui/common/Button";

const NotFound: React.FC = () => (
	<div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4 text-center">
		<Brand />
		<p className="font-serif text-7xl font-semibold text-primary">404</p>
		<div className="space-y-2">
			<h1 className="text-2xl font-semibold tracking-tight">
				This page has wandered off
			</h1>
			<p className="max-w-md text-muted-foreground">
				The page you're looking for doesn't exist or may have moved. Let's get
				you back to the good stuff.
			</p>
		</div>
		<div className="flex flex-wrap items-center justify-center gap-3">
			<Button asChild size="lg">
				<Link to="/">Back to home</Link>
			</Button>
			<Button asChild variant="outline" size="lg">
				<Link to="/shop" search={{}}>
					Browse the shop
				</Link>
			</Button>
		</div>
	</div>
);

export default NotFound;
