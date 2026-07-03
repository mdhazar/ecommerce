import { Plus } from "lucide-react";
import type React from "react";
import { Container, Section } from "@/components/ui/common";

const faqs = [
	{
		question: "How long does shipping take?",
		answer:
			"Orders ship from Portland within one business day. Standard delivery arrives in 3–5 business days, and orders over $150 ship free. Express options are offered at checkout.",
	},
	{
		question: "What is your returns policy?",
		answer:
			"Unworn pieces can be returned within 30 days for a full refund. Start a return by emailing orders@northandgrove.com with your order number, and we'll send a prepaid label.",
	},
	{
		question: "How do I choose the right size?",
		answer:
			"Each product page lists measurements and a fit note. Our pieces run true to size with a relaxed drape — if you're between sizes, we recommend sizing down for a closer fit.",
	},
	{
		question: "Do you restock sold-out pieces?",
		answer:
			"Core styles are restocked each season. Add your email on any sold-out product page and we'll let you know the moment it returns.",
	},
];

const ContactSection4: React.FC = () => {
	return (
		<Section>
			<Container className="max-w-3xl">
				<div className="mb-10 text-center">
					<p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
						FAQ
					</p>
					<h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
						Before you write
					</h2>
					<p className="mt-3 text-muted-foreground">
						A few answers to the questions we hear most often.
					</p>
				</div>

				<div className="divide-y divide-border border-y border-border">
					{faqs.map(({ question, answer }) => (
						<details key={question} className="group py-1">
							<summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-medium text-foreground [&::-webkit-details-marker]:hidden">
								{question}
								<Plus className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-45" />
							</summary>
							<p className="pb-4 text-sm leading-relaxed text-muted-foreground">
								{answer}
							</p>
						</details>
					))}
				</div>
			</Container>
		</Section>
	);
};

export default ContactSection4;
