import { Link } from "@tanstack/react-router";
import { Clock8, HeartHandshake, Leaf, Scissors } from "lucide-react";
import type React from "react";
import aboutHero from "@/assets/coupleWithScarf.png";
import { Button, Container, Section } from "@/components/ui/common";
import AboutUsSection from "@/components/ui/common/AboutUsSection";
import ShopPageBrandIcons from "@/components/ui/ProductDetailPage/ShopPageBrandIcons";
import SiteLayout from "@/layouts/SiteLayout";
import { onImageError } from "@/lib/images";

const VALUES = [
	{
		Icon: Leaf,
		title: "Natural materials",
		body: "Organic cotton, linen and responsibly sourced wool — fibres that breathe, soften and age with grace.",
	},
	{
		Icon: Scissors,
		title: "Small-batch making",
		body: "We produce in short, deliberate runs. Less waste, closer quality, and pieces that never feel mass-produced.",
	},
	{
		Icon: HeartHandshake,
		title: "Fair workshops",
		body: "Every garment is made by partners we visit in person, in workshops that pay fairly and work safely.",
	},
	{
		Icon: Clock8,
		title: "Built to last",
		body: "Reinforced seams and timeless cuts, designed to stay in your wardrobe for seasons rather than weeks.",
	},
];

const STATS = [
	{ value: "2016", label: "Founded in Portland" },
	{ value: "40+", label: "Independent makers" },
	{ value: "12", label: "Pieces per collection" },
	{ value: "30k", label: "Wardrobes and counting" },
];

const AboutUs: React.FC = () => {
	return (
		<SiteLayout>
			{/* Hero */}
			<Section className="bg-background">
				<Container>
					<div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
						<div className="flex flex-col items-start">
							<p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
								Our name is North &amp; Grove
							</p>
							<h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
								Considered clothing, made to be kept
							</h1>
							<p className="mt-5 max-w-xl text-lg text-muted-foreground">
								We design a small, seasonless collection of everyday essentials
								— honest fabrics, quiet colours and cuts you will reach for long
								after the trend has moved on.
							</p>
							<div className="mt-8 flex flex-wrap gap-3">
								<Button asChild size="lg">
									<Link
										to="/shop"
										search={{ gender: undefined, category: undefined }}
									>
										Shop the collection
									</Link>
								</Button>
								<Button asChild size="lg" variant="outline">
									<Link to="/contact">Get in touch</Link>
								</Button>
							</div>
						</div>

						<div className="overflow-hidden rounded-2xl border border-border">
							<img
								src={aboutHero}
								alt="Two people wrapped in warm North & Grove knitwear"
								onError={onImageError}
								className="h-full w-full object-cover"
							/>
						</div>
					</div>
				</Container>
			</Section>

			{/* Our story */}
			<AboutUsSection />

			{/* Values */}
			<Section className="bg-background">
				<Container>
					<div className="mx-auto max-w-2xl text-center">
						<p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
							What we stand for
						</p>
						<h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
							The principles behind every piece
						</h2>
						<p className="mt-4 text-muted-foreground">
							Four commitments shape everything we make — from the fibre we
							choose to the hands that stitch it together.
						</p>
					</div>

					<div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
						{VALUES.map(({ Icon, title, body }) => (
							<div
								key={title}
								className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6"
							>
								<span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
									<Icon size={20} aria-hidden="true" />
								</span>
								<h3 className="text-lg font-semibold">{title}</h3>
								<p className="text-sm text-muted-foreground">{body}</p>
							</div>
						))}
					</div>
				</Container>
			</Section>

			{/* Stats band */}
			<section className="bg-primary text-primary-foreground">
				<Container>
					<div className="grid gap-8 py-14 text-center sm:grid-cols-2 lg:grid-cols-4 md:py-20">
						{STATS.map(({ value, label }) => (
							<div key={label} className="flex flex-col gap-2">
								<span className="text-4xl font-semibold tracking-tight md:text-5xl">
									{value}
								</span>
								<span className="font-sans text-xs uppercase tracking-[0.2em] text-primary-foreground/80">
									{label}
								</span>
							</div>
						))}
					</div>
				</Container>
			</section>

			{/* Assurances */}
			<ShopPageBrandIcons />

			{/* Closing CTA */}
			<Section className="bg-card">
				<Container>
					<div className="mx-auto flex max-w-2xl flex-col items-center text-center">
						<h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
							Build a wardrobe you will actually keep
						</h2>
						<p className="mt-4 text-muted-foreground">
							Start with a single considered piece. We think you will feel the
							difference the moment it arrives.
						</p>
						<Button asChild size="lg" className="mt-8">
							<Link
								to="/shop"
								search={{ gender: undefined, category: undefined }}
							>
								Browse everything
							</Link>
						</Button>
					</div>
				</Container>
			</Section>
		</SiteLayout>
	);
};

export default AboutUs;
