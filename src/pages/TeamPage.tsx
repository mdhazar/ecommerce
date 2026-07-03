import type React from "react";
import TeamSection1 from "@/components/ui/TeamPage/TeamSection1";
import TeamSection2 from "@/components/ui/TeamPage/TeamSection2";
import TeamSection3 from "@/components/ui/TeamPage/TeamSection3";
import TeamSection4 from "@/components/ui/TeamPage/TeamSection4";
import SiteLayout from "@/layouts/SiteLayout";

const TeamPage: React.FC = () => {
	return (
		<SiteLayout>
			<TeamSection1 />
			<TeamSection2 />
			<TeamSection3 />
			<TeamSection4 />
		</SiteLayout>
	);
};

export default TeamPage;
