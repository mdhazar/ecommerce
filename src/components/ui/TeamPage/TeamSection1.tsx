import { Link } from "@tanstack/react-router";
import type React from "react";
import { Container, Section } from "@/components/ui/common";

const TeamSection1: React.FC = () => {
	return (
		<Section className="bg-background">
			<Container>
				<div className="mx-auto flex max-w-2xl flex-col items-center text-center">
					<p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
						The people behind the label
					</p>
					<h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
						A small studio of makers and menders
					</h1>
					<p className="mt-5 text-lg text-muted-foreground">
						North &amp; Grove is built by a close-knit team of designers,
						pattern-cutters and workshop partners who care as much about how a
						garment is made as how it looks.
					</p>

					<nav
						aria-label="Breadcrumb"
						className="mt-8 flex items-center gap-2 text-sm text-muted-foreground"
					>
						<Link to="/" className="transition-colors hover:text-foreground">
							Home
						</Link>
						<span aria-hidden="true">/</span>
						<span className="text-foreground">Team</span>
					</nav>
				</div>
			</Container>
		</Section>
	);
};

export default TeamSection1;
