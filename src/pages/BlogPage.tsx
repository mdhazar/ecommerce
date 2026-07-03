import { Link } from "@tanstack/react-router";
import type React from "react";
import {
	Badge,
	Card,
	CardContent,
	Container,
	PageHeader,
	Section,
} from "@/components/ui/common";
import { blogPosts, formatBlogDate } from "@/data/blog";
import SiteLayout from "@/layouts/SiteLayout";
import { onImageError } from "@/lib/images";

const [featured, ...rest] = blogPosts;

const BlogPage: React.FC = () => (
	<SiteLayout>
		<Container>
			<Section className="pb-6 md:pb-8">
				<PageHeader
					eyebrow="Journal"
					title="Stories & field notes"
					description="Notes from the workshop on slow fashion, caring for natural fibres, and building a wardrobe and home that last."
				/>
			</Section>

			{/* Featured lead article */}
			<Link
				to="/blog/$slug"
				params={{ slug: featured.slug }}
				className="group block"
			>
				<Card className="overflow-hidden transition-colors hover:border-primary/40">
					<div className="grid gap-0 md:grid-cols-2">
						<div className="aspect-[4/3] overflow-hidden bg-muted md:aspect-auto">
							<img
								src={featured.cover}
								alt={featured.title}
								onError={onImageError}
								className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
							/>
						</div>
						<CardContent className="flex flex-col justify-center gap-4 p-8 md:p-12">
							<div className="flex items-center gap-3">
								<Badge variant="secondary">{featured.category}</Badge>
								<span className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
									Featured
								</span>
							</div>
							<h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
								{featured.title}
							</h2>
							<p className="text-muted-foreground">{featured.excerpt}</p>
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<span>{formatBlogDate(featured.date)}</span>
								<span aria-hidden>&middot;</span>
								<span>{featured.readingTime}</span>
							</div>
						</CardContent>
					</div>
				</Card>
			</Link>

			{/* Article grid */}
			<Section>
				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{rest.map((post) => (
						<Link
							key={post.slug}
							to="/blog/$slug"
							params={{ slug: post.slug }}
							className="group block"
						>
							<Card className="flex h-full flex-col overflow-hidden transition-colors hover:border-primary/40">
								<div className="aspect-[4/3] overflow-hidden bg-muted">
									<img
										src={post.cover}
										alt={post.title}
										onError={onImageError}
										className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
									/>
								</div>
								<CardContent className="flex flex-1 flex-col gap-3 p-6">
									<Badge variant="secondary" className="self-start">
										{post.category}
									</Badge>
									<h3 className="text-xl font-semibold tracking-tight">
										{post.title}
									</h3>
									<p className="flex-1 text-sm text-muted-foreground">
										{post.excerpt}
									</p>
									<div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
										<span>{formatBlogDate(post.date)}</span>
										<span aria-hidden>&middot;</span>
										<span>{post.readingTime}</span>
									</div>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			</Section>
		</Container>
	</SiteLayout>
);

export default BlogPage;
