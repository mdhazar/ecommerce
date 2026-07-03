import { Link } from "@tanstack/react-router";
import type React from "react";
import storyImage from "@/assets/about1.png";
import { Button, Container, Section } from "@/components/ui/common";

/** Editorial "our materials / story" band linking to the about page. */
const ShopSection: React.FC = () => {
	return (
		<Section className="bg-secondary">
			<Container className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
				<div className="order-2 md:order-1">
					<p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
						Our materials
					</p>
					<h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
						Made from what matters
					</h2>
					<p className="mt-5 max-w-md text-muted-foreground">
						We start with the fibre — long-staple cotton, garment-dyed linen,
						responsibly sourced wool — and let it lead. Every piece is cut in
						small runs by workshops we know by name, so nothing is made in a
						hurry and nothing is made to be thrown away.
					</p>
					<div className="mt-8">
						<Button asChild variant="outline" size="lg">
							<Link to="/about">Read our story</Link>
						</Button>
					</div>
				</div>

				<div className="order-1 md:order-2">
					<img
						src={storyImage}
						alt="A calm, naturally lit studio with folded garments"
						className="aspect-[5/4] w-full rounded-lg object-cover shadow-sm"
					/>
				</div>
			</Container>
		</Section>
	);
};

export default ShopSection;
