import { Mail, Truck } from "lucide-react";
import type React from "react";

/**
 * Slim announcement bar above the nav. Replaces the old fake-contact-info
 * header with brand-appropriate shipping messaging.
 */
const Header: React.FC = () => {
	return (
		<div className="bg-foreground text-background">
			<div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-xs font-medium tracking-wide md:justify-between md:px-8">
				<span className="hidden items-center gap-2 md:inline-flex">
					<Mail size={14} aria-hidden="true" />
					hello@northandgrove.com
				</span>
				<span className="inline-flex items-center gap-2">
					<Truck size={14} aria-hidden="true" />
					Complimentary shipping over $75 · easy 30-day returns
				</span>
				<span className="hidden md:inline">Crafted in small batches</span>
			</div>
		</div>
	);
};

export default Header;
