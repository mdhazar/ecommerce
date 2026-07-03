import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter } from "lucide-react";
import type React from "react";
import { useId, useState } from "react";
import { toast } from "react-toastify";
import { Brand } from "@/components/ui/common/Brand";
import { Button } from "@/components/ui/common/Button";
import { Input } from "@/components/ui/common/Input";

const COLUMNS: { heading: string; links: { label: string; to: string }[] }[] = [
	{
		heading: "Shop",
		links: [
			{ label: "All products", to: "/shop" },
			{ label: "Women", to: "/shop" },
			{ label: "Men", to: "/shop" },
			{ label: "Wishlist", to: "/wishlist" },
		],
	},
	{
		heading: "Company",
		links: [
			{ label: "About us", to: "/about" },
			{ label: "The team", to: "/team" },
			{ label: "Journal", to: "/blog" },
			{ label: "Contact", to: "/contact" },
		],
	},
	{
		heading: "Support",
		links: [
			{ label: "Order history", to: "/orders" },
			{ label: "Shipping & returns", to: "/contact" },
			{ label: "Track your order", to: "/orders" },
			{ label: "Help", to: "/contact" },
		],
	},
];

const SOCIALS = [
	{ label: "Instagram", href: "https://instagram.com", Icon: Instagram },
	{ label: "Facebook", href: "https://facebook.com", Icon: Facebook },
	{ label: "Twitter", href: "https://twitter.com", Icon: Twitter },
];

const Footer: React.FC = () => {
	const emailId = useId();
	const [email, setEmail] = useState("");

	const handleSubscribe = (event: React.FormEvent) => {
		event.preventDefault();
		if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
			toast.error("Please enter a valid email address.");
			return;
		}
		toast.success("Thanks for subscribing — welcome to North & Grove.");
		setEmail("");
	};

	return (
		<footer className="mt-auto border-t border-border bg-card">
			<div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
				<div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
					<div className="max-w-sm">
						<Brand />
						<p className="mt-4 text-sm leading-relaxed text-muted-foreground">
							Considered clothing and homeware made in small batches — designed
							to be lived in and last.
						</p>
						<form
							onSubmit={handleSubscribe}
							className="mt-6 flex max-w-sm gap-2"
						>
							<label htmlFor={emailId} className="sr-only">
								Email address
							</label>
							<Input
								id={emailId}
								type="email"
								value={email}
								onChange={(event) => setEmail(event.target.value)}
								placeholder="Your email"
							/>
							<Button type="submit">Subscribe</Button>
						</form>
					</div>

					{COLUMNS.map((column) => (
						<div key={column.heading}>
							<h2 className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
								{column.heading}
							</h2>
							<ul className="mt-4 space-y-2.5">
								{column.links.map((link) => (
									<li key={link.label}>
										<Link
											to={link.to}
											className="text-sm text-muted-foreground transition-colors hover:text-primary"
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
					<p className="text-xs text-muted-foreground">
						© {2026} North &amp; Grove. All rights reserved.
					</p>
					<div className="flex items-center gap-3">
						{SOCIALS.map(({ label, href, Icon }) => (
							<a
								key={label}
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={label}
								className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
							>
								<Icon size={17} />
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
