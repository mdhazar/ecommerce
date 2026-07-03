import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import type React from "react";
import { Button, Container, Section } from "@/components/ui/common";

const SOCIALS = [
	{
		Icon: Instagram,
		label: "North & Grove on Instagram",
		href: "https://instagram.com/northandgrove",
	},
	{
		Icon: Facebook,
		label: "North & Grove on Facebook",
		href: "https://facebook.com/northandgrove",
	},
	{
		Icon: Linkedin,
		label: "North & Grove on LinkedIn",
		href: "https://linkedin.com/company/northandgrove",
	},
];

const TeamSection4: React.FC = () => {
	return (
		<Section className="bg-card">
			<Container>
				<div className="mx-auto flex max-w-2xl flex-col items-center text-center">
					<p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
						Join the studio
					</p>
					<h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
						We are always looking for careful hands
					</h2>
					<p className="mt-4 text-muted-foreground">
						Designers, makers and menders who believe in slower, better clothing
						— we would love to hear from you.
					</p>

					<div className="mt-8 flex flex-wrap justify-center gap-3">
						<Button asChild size="lg">
							<Link to="/contact">Get in touch</Link>
						</Button>
						<Button asChild size="lg" variant="outline">
							<Link
								to="/shop"
								search={{ gender: undefined, category: undefined }}
							>
								See what we make
							</Link>
						</Button>
					</div>

					<div className="mt-10 flex items-center gap-5">
						{SOCIALS.map(({ Icon, label, href }) => (
							<a
								key={label}
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={label}
								className="text-muted-foreground transition-colors hover:text-primary"
							>
								<Icon size={22} aria-hidden="true" />
							</a>
						))}
					</div>
				</div>
			</Container>
		</Section>
	);
};

export default TeamSection4;
