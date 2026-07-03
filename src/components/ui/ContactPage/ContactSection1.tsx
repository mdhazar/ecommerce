import type React from "react";
import heroImage from "@/assets/coupleWithScarf.png";
import { Container, PageHeader, Section } from "@/components/ui/common";
import { onImageError } from "@/lib/images";

const ContactSection1: React.FC = () => {
	return (
		<Section className="pb-8 md:pb-10">
			<Container>
				<PageHeader
					eyebrow="Contact"
					title="Get in touch"
					description="Questions about an order, a sizing detail, or a wholesale enquiry — our small studio team reads every message and replies within one business day."
				/>

				<div className="mt-12 overflow-hidden rounded-lg border border-border">
					<img
						src={heroImage}
						alt="North & Grove studio interior with layered linens and knitwear"
						onError={onImageError}
						className="h-64 w-full object-cover md:h-80"
					/>
				</div>
			</Container>
		</Section>
	);
};

export default ContactSection1;
