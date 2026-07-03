import type React from "react";
import SiteLayout from "@/layouts/SiteLayout";
import ContactSection1 from "../components/ui/ContactPage/ContactSection1";
import ContactSection2 from "../components/ui/ContactPage/ContactSection2";
import ContactSection3 from "../components/ui/ContactPage/ContactSection3";
import ContactSection4 from "../components/ui/ContactPage/ContactSection4";

const ContactPage: React.FC = () => {
	return (
		<SiteLayout>
			<ContactSection1 />
			<ContactSection2 />
			<ContactSection3 />
			<ContactSection4 />
		</SiteLayout>
	);
};

export default ContactPage;
