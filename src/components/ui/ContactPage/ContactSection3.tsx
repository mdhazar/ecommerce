import { Building2, Newspaper, PackageCheck } from "lucide-react";
import type React from "react";
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardTitle,
	Container,
	Section,
} from "@/components/ui/common";

const routes = [
	{
		icon: PackageCheck,
		title: "Orders & returns",
		description:
			"Track a shipment, start a return, or ask about an exchange. Include your order number for the fastest reply.",
		cta: "Email support",
		href: "mailto:orders@northandgrove.com?subject=Order%20enquiry",
	},
	{
		icon: Building2,
		title: "Wholesale",
		description:
			"Stock North & Grove in your shop. Request our line sheet and terms for the coming season.",
		cta: "Request line sheet",
		href: "mailto:wholesale@northandgrove.com?subject=Wholesale%20enquiry",
	},
	{
		icon: Newspaper,
		title: "Press",
		description:
			"Features, samples, and brand assets for editors and stylists. Our media kit is a message away.",
		cta: "Contact press",
		href: "mailto:press@northandgrove.com?subject=Press%20enquiry",
	},
];

const ContactSection3: React.FC = () => {
	return (
		<Section className="border-t border-border bg-muted/40">
			<Container>
				<div className="mb-10 max-w-2xl">
					<p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
						Support
					</p>
					<h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
						Find the right desk
					</h2>
					<p className="mt-3 text-muted-foreground">
						Prefer to reach a specific team directly? Choose the route that fits
						your enquiry.
					</p>
				</div>

				<div className="grid gap-6 md:grid-cols-3">
					{routes.map(({ icon: Icon, title, description, cta, href }) => (
						<Card key={title} className="flex flex-col">
							<CardContent className="flex flex-1 flex-col p-6">
								<span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
									<Icon className="h-5 w-5" />
								</span>
								<CardTitle className="text-xl">{title}</CardTitle>
								<CardDescription className="mt-2 flex-1">
									{description}
								</CardDescription>
								<div className="mt-5">
									<Button asChild variant="outline" size="sm">
										<a href={href}>{cta}</a>
									</Button>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</Container>
		</Section>
	);
};

export default ContactSection3;
