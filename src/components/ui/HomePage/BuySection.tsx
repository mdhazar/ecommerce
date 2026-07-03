import { Link } from "@tanstack/react-router";
import type React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Container, Input, Section } from "@/components/ui/common";

/** Newsletter / promo band closing out the home page. */
const BuySection: React.FC = () => {
	const [email, setEmail] = useState("");

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!email.trim()) return;
		toast.success("You're on the list — welcome to North & Grove.");
		setEmail("");
	};

	return (
		<Section>
			<Container>
				<div className="rounded-2xl border border-border bg-card px-6 py-14 text-center md:px-16">
					<p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
						The North &amp; Grove list
					</p>
					<h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight md:text-4xl">
						Slow style, straight to your inbox
					</h2>
					<p className="mx-auto mt-4 max-w-md text-muted-foreground">
						Early access to new arrivals, quiet restocks and the occasional note
						on how things are made. No noise.
					</p>

					<form
						onSubmit={handleSubmit}
						className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
					>
						<Input
							type="email"
							required
							value={email}
							onChange={(event) => setEmail(event.target.value)}
							placeholder="you@email.com"
							aria-label="Email address"
							className="flex-1"
						/>
						<Button type="submit">Subscribe</Button>
					</form>

					<div className="mt-6">
						<Button asChild variant="link">
							<Link to="/shop" search={{}}>
								Or browse the full collection
							</Link>
						</Button>
					</div>
				</div>
			</Container>
		</Section>
	);
};

export default BuySection;
