import type React from "react";
import { Container, Section } from "@/components/ui/common";

interface Member {
	name: string;
	role: string;
	bio: string;
}

const MEMBERS: Member[] = [
	{
		name: "Mara Ellison",
		role: "Founder & Creative Director",
		bio: "Sets the direction for every collection and still signs off on each first sample by hand.",
	},
	{
		name: "Jonah Reyes",
		role: "Co-Founder & Head of Sourcing",
		bio: "Travels to our mills and workshops to make sure every fibre and every wage meets our standard.",
	},
	{
		name: "Priya Nair",
		role: "Lead Designer",
		bio: "Translates rough ideas into the quiet, wearable shapes the collection is known for.",
	},
	{
		name: "Tomas Berg",
		role: "Master Pattern-Cutter",
		bio: "Turns a flat sketch into a garment that actually fits — the unglamorous work that makes the difference.",
	},
	{
		name: "Amara Okafor",
		role: "Production Manager",
		bio: "Keeps our small-batch runs on schedule without ever rushing the people who sew them.",
	},
	{
		name: "Leah Whitfield",
		role: "Customer Care Lead",
		bio: "The voice on the other end of every email, and the reason our returns feel effortless.",
	},
];

/** Warm token backgrounds cycled across the monogram avatars. */
const AVATAR_TONES = [
	"bg-primary text-primary-foreground",
	"bg-secondary text-secondary-foreground",
	"bg-accent text-accent-foreground",
	"bg-muted text-foreground",
	"bg-secondary text-secondary-foreground",
	"bg-primary text-primary-foreground",
];

function initialsOf(name: string): string {
	return name
		.split(" ")
		.map((part) => part[0])
		.slice(0, 2)
		.join("")
		.toUpperCase();
}

const TeamSection3: React.FC = () => {
	return (
		<Section className="bg-background">
			<Container>
				<div className="mx-auto max-w-2xl text-center">
					<p className="mb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
						Meet the team
					</p>
					<h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
						Six people, one workshop
					</h2>
					<p className="mt-4 text-muted-foreground">
						Small on purpose — every name here has a direct hand in what you
						wear.
					</p>
				</div>

				<div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{MEMBERS.map((member, index) => (
						<div
							key={member.name}
							className="flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center"
						>
							<span
								className={`flex h-20 w-20 items-center justify-center rounded-full font-sans text-xl font-semibold tracking-wide ${AVATAR_TONES[index % AVATAR_TONES.length]}`}
								aria-hidden="true"
							>
								{initialsOf(member.name)}
							</span>
							<h3 className="mt-5 text-lg font-semibold">{member.name}</h3>
							<p className="mt-1 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
								{member.role}
							</p>
							<p className="mt-3 text-sm text-muted-foreground">{member.bio}</p>
						</div>
					))}
				</div>
			</Container>
		</Section>
	);
};

export default TeamSection3;
