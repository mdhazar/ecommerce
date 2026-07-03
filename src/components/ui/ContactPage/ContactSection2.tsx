import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Container,
	Input,
	Label,
	Section,
	Textarea,
} from "@/components/ui/common";

const contactSchema = z.object({
	name: z.string().min(2, "Please tell us your name"),
	email: z.string().min(1, "Email is required").email("Enter a valid email"),
	subject: z.string().min(2, "Please add a subject"),
	message: z
		.string()
		.min(10, "Please add a little more detail (10+ characters)"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const details = [
	{
		icon: MapPin,
		label: "Studio",
		lines: ["48 Grove Lane", "Portland, OR 97204"],
	},
	{
		icon: Mail,
		label: "Email",
		lines: ["hello@northandgrove.com"],
		href: "mailto:hello@northandgrove.com",
	},
	{
		icon: Phone,
		label: "Phone",
		lines: ["+1 (503) 555-0142"],
		href: "tel:+15035550142",
	},
	{
		icon: Clock,
		label: "Hours",
		lines: ["Mon–Fri, 9am–5pm PT", "Weekends by appointment"],
	},
];

const ContactSection2: React.FC = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<ContactFormData>({
		resolver: zodResolver(contactSchema),
		defaultValues: { name: "", email: "", subject: "", message: "" },
	});

	const onSubmit = async (data: ContactFormData) => {
		// No backend for contact — simulate the round-trip.
		await new Promise((resolve) => setTimeout(resolve, 600));
		toast.success(
			`Thanks, ${data.name.split(" ")[0]} — your message is on its way. We'll reply within one business day.`,
		);
		reset();
	};

	return (
		<Section className="pt-6 md:pt-8">
			<Container className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
				<Card>
					<CardHeader>
						<CardTitle>Send us a message</CardTitle>
					</CardHeader>
					<CardContent>
						<form
							onSubmit={handleSubmit(onSubmit)}
							noValidate
							className="space-y-5"
						>
							<div className="grid gap-5 sm:grid-cols-2">
								<div className="space-y-1.5">
									<Label htmlFor="name">Name</Label>
									<Input
										id="name"
										placeholder="Your name"
										aria-invalid={!!errors.name}
										{...register("name")}
									/>
									{errors.name ? (
										<p className="text-sm text-destructive">
											{errors.name.message}
										</p>
									) : null}
								</div>

								<div className="space-y-1.5">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="you@example.com"
										aria-invalid={!!errors.email}
										{...register("email")}
									/>
									{errors.email ? (
										<p className="text-sm text-destructive">
											{errors.email.message}
										</p>
									) : null}
								</div>
							</div>

							<div className="space-y-1.5">
								<Label htmlFor="subject">Subject</Label>
								<Input
									id="subject"
									placeholder="What can we help with?"
									aria-invalid={!!errors.subject}
									{...register("subject")}
								/>
								{errors.subject ? (
									<p className="text-sm text-destructive">
										{errors.subject.message}
									</p>
								) : null}
							</div>

							<div className="space-y-1.5">
								<Label htmlFor="message">Message</Label>
								<Textarea
									id="message"
									rows={6}
									placeholder="Tell us a little about your enquiry…"
									aria-invalid={!!errors.message}
									{...register("message")}
								/>
								{errors.message ? (
									<p className="text-sm text-destructive">
										{errors.message.message}
									</p>
								) : null}
							</div>

							<Button type="submit" size="lg" disabled={isSubmitting}>
								{isSubmitting ? "Sending…" : "Send message"}
							</Button>
						</form>
					</CardContent>
				</Card>

				<div className="space-y-4">
					{details.map(({ icon: Icon, label, lines, href }) => (
						<Card key={label}>
							<CardContent className="flex gap-4 p-5">
								<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
									<Icon className="h-5 w-5" />
								</span>
								<div>
									<p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary">
										{label}
									</p>
									<div className="mt-1.5 space-y-0.5 text-sm text-muted-foreground">
										{href ? (
											<a
												href={href}
												className="text-foreground transition-colors hover:text-primary"
											>
												{lines[0]}
											</a>
										) : null}
										{lines.slice(href ? 1 : 0).map((line) => (
											<p key={line}>{line}</p>
										))}
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</Container>
		</Section>
	);
};

export default ContactSection2;
