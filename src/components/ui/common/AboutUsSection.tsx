import { Link } from "@tanstack/react-router";
import type React from "react";
import roomImage from "@/assets/roomImage.png";
import { Button, Container, Section } from "@/components/ui/common";
import { onImageError } from "@/lib/images";

/**
 * "Our story" editorial block for the About page: a considered image paired
 * with the North & Grove founding story and a real call to action.
 */
const AboutUsSection: React.FC = () => {
	return (
		<Section className="bg-card">
			<Container>
				<div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
					<div className="overflow-hidden rounded-2xl border border-border">
						<img
							src={roomImage}
							alt="A North & Grove piece styled in a calm, sunlit room"
							onError={onImageError}
							className="h-full w-full object-cover"
						/>
					</div>

					<div className="flex flex-col items-start">
						<p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
							Our story
						</p>
						<h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
							Made in small batches, meant to last for years
						</h2>
						<div className="mt-5 space-y-4 text-muted-foreground">
							<p>
								North &amp; Grove began in a quiet workshop with a simple
								frustration: too much of what we owned was designed to be
								replaced. We wanted the opposite — a small, considered wardrobe
								of pieces that only look better with wear.
							</p>
							<p>
								So we work slowly. Every style is cut in limited runs from
								natural fibres, sewn by makers we know by name, and finished by
								hand. Nothing is rushed to hit a trend, and nothing leaves the
								studio until it feels genuinely worth keeping.
							</p>
						</div>
						<Button asChild size="lg" className="mt-8">
							<Link
								to="/shop"
								search={{ gender: undefined, category: undefined }}
							>
								Explore the collection
							</Link>
						</Button>
					</div>
				</div>
			</Container>
		</Section>
	);
};

export default AboutUsSection;
