import { Leaf, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import type React from "react";

const ASSURANCES = [
	{
		Icon: Truck,
		title: "Complimentary shipping",
		body: "On every order over $75, delivered carbon-neutral.",
	},
	{
		Icon: RotateCcw,
		title: "30-day returns",
		body: "Not quite right? Send it back, no questions asked.",
	},
	{
		Icon: Leaf,
		title: "Made responsibly",
		body: "Natural fibres, small batches, fair workshops.",
	},
	{
		Icon: ShieldCheck,
		title: "Secure checkout",
		body: "Encrypted payments and buyer protection.",
	},
];

/** Boutique assurances strip, reused across shop, product, and about pages. */
const ShopPageBrandIcons: React.FC = () => {
	return (
		<section className="border-y border-border bg-card">
			<div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 md:grid-cols-4 md:px-8">
				{ASSURANCES.map(({ Icon, title, body }) => (
					<div key={title} className="flex flex-col gap-2">
						<Icon size={22} className="text-primary" aria-hidden="true" />
						<h3 className="font-sans text-sm font-semibold text-foreground">
							{title}
						</h3>
						<p className="text-sm text-muted-foreground">{body}</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default ShopPageBrandIcons;
