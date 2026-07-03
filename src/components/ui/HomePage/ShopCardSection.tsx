import { Link } from "@tanstack/react-router";
import type React from "react";
import accessories from "@/assets/accessories.png";
import kids from "@/assets/kids.png";
import men from "@/assets/men.png";
import women from "@/assets/women.png";
import { Container, Section, Skeleton } from "@/components/ui/common";
import { useCategories } from "@/queries/categories";
import type { Category } from "@/types/models";

const IMAGES = [women, men, kids, accessories];

/**
 * Rotate through the four local tile images so the category grid stays visually
 * varied (the API's first categories are all one gender, so keying off gender
 * would render four identical tiles).
 */
function imageFor(_category: Category, index: number): string {
	return IMAGES[index % IMAGES.length];
}

const genderLabel = (gender: string): string =>
	gender === "k" ? "Women" : gender === "e" ? "Men" : "Everyone";

const Tile: React.FC<{ category: Category; index: number }> = ({
	category,
	index,
}) => (
	<Link
		to="/shop"
		search={{
			gender: category.gender as "k" | "e",
			category: String(category.id),
		}}
		className="group relative block overflow-hidden rounded-lg bg-muted"
	>
		<img
			src={imageFor(category, index)}
			alt={category.title}
			className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
		/>
		<div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-card/90 px-4 py-3 backdrop-blur">
			<span className="font-sans text-sm font-semibold uppercase tracking-[0.15em] text-card-foreground">
				{category.title}
			</span>
			<span className="text-xs text-muted-foreground">
				Shop {genderLabel(category.gender)}
			</span>
		</div>
	</Link>
);

const ShopCardSection: React.FC = () => {
	const { data, isLoading } = useCategories();
	const categories = (data ?? []).slice(0, 4);

	return (
		<Section>
			<Container>
				<div className="mb-10 max-w-2xl">
					<p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
						Shop by category
					</p>
					<h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
						Find your everyday edit
					</h2>
					<p className="mt-3 text-muted-foreground">
						Quietly versatile pieces, organised the way you actually get
						dressed.
					</p>
				</div>

				<div className="grid grid-cols-2 gap-5 md:grid-cols-4">
					{isLoading
						? Array.from({ length: 4 }).map((_, i) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: fixed-length skeleton list, never reordered
								<Skeleton key={i} className="aspect-[3/4] w-full rounded-lg" />
							))
						: categories.map((category, i) => (
								<Tile key={category.id} category={category} index={i} />
							))}
				</div>
			</Container>
		</Section>
	);
};

export default ShopCardSection;
