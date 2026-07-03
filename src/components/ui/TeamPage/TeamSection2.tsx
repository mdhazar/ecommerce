import type React from "react";
import about1 from "@/assets/about1.png";
import { Container, Section } from "@/components/ui/common";
import { onImageError } from "@/lib/images";

const TeamSection2: React.FC = () => {
	return (
		<Section className="bg-card">
			<Container>
				<div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
					<div className="order-2 flex flex-col items-start lg:order-1">
						<p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
							How we work
						</p>
						<blockquote className="text-2xl font-semibold leading-snug tracking-tight md:text-3xl">
							&ldquo;We would rather make twelve things properly than a hundred
							things quickly. Everyone here has a hand in that decision.&rdquo;
						</blockquote>
						<p className="mt-6 text-muted-foreground">
							From the first sketch to the final press, our collections pass
							through only a handful of hands. That closeness is deliberate — it
							keeps our standards high, our runs small and our makers proud of
							what leaves the studio.
						</p>
						<p className="mt-4 font-sans text-sm font-medium text-foreground">
							&mdash; Mara Ellison &amp; Jonah Reyes, founders
						</p>
					</div>

					<div className="order-1 overflow-hidden rounded-2xl border border-border lg:order-2">
						<img
							src={about1}
							alt="Inside the North & Grove studio"
							onError={onImageError}
							className="h-full w-full object-cover"
						/>
					</div>
				</div>
			</Container>
		</Section>
	);
};

export default TeamSection2;
