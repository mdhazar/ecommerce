import { Link } from "@tanstack/react-router";
import type React from "react";
import heroImage from "@/assets/coupleWithScarf.png";
import { Button, Container } from "@/components/ui/common";

/** Editorial split hero: warm serif statement + a single strong lifestyle image. */
const NewCollection: React.FC = () => {
	return (
		<section className="border-b border-border bg-secondary">
			<Container className="grid items-center gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-24">
				<div className="max-w-xl">
					<p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
						New season · Considered essentials
					</p>
					<h1 className="text-4xl leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
						Considered pieces for a warmer everyday
					</h1>
					<p className="mt-6 max-w-md text-lg text-muted-foreground">
						Softly structured knitwear, honest materials and quiet colour — made
						in small batches to keep and wear for years, not seasons.
					</p>
					<div className="mt-8 flex flex-wrap items-center gap-3">
						<Button asChild size="lg">
							<Link to="/shop" search={{}}>
								Shop the collection
							</Link>
						</Button>
						<Button asChild variant="link" size="lg">
							<Link to="/about">Our story</Link>
						</Button>
					</div>
				</div>

				<div className="relative">
					<img
						src={heroImage}
						alt="Two people in soft-toned scarves against a warm backdrop"
						className="aspect-[4/5] w-full rounded-lg object-cover shadow-sm"
					/>
				</div>
			</Container>
		</section>
	);
};

export default NewCollection;
