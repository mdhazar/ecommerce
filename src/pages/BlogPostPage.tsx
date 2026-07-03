import { getRouteApi, Link } from "@tanstack/react-router";
import type React from "react";
import {
	Badge,
	Button,
	Card,
	CardContent,
	Container,
	Section,
} from "@/components/ui/common";
import { formatBlogDate, getBlogPost, getRelatedPosts } from "@/data/blog";
import SiteLayout from "@/layouts/SiteLayout";
import { onImageError } from "@/lib/images";

const routeApi = getRouteApi("/blog/$slug");

const BlogPostPage: React.FC = () => {
	const { slug } = routeApi.useParams();
	const post = getBlogPost(slug);

	if (!post) {
		return (
			<SiteLayout>
				<Container>
					<Section className="flex flex-col items-center gap-6 text-center">
						<p className="font-sans text-xs uppercase tracking-[0.2em] text-primary">
							Journal
						</p>
						<h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
							We couldn't find that story
						</h1>
						<p className="max-w-md text-muted-foreground">
							The article you're looking for may have moved or been retired.
							Browse the journal to find something new to read.
						</p>
						<Button asChild>
							<Link to="/blog">Back to the Journal</Link>
						</Button>
					</Section>
				</Container>
			</SiteLayout>
		);
	}

	const related = getRelatedPosts(post.slug, 2);

	return (
		<SiteLayout>
			<article>
				{/* Hero */}
				<Container>
					<Section className="pb-6 md:pb-10">
						<div className="mx-auto max-w-3xl text-center">
							<Badge variant="secondary" className="mb-5">
								{post.category}
							</Badge>
							<h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
								{post.title}
							</h1>
							<div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
								<span>{post.author}</span>
								<span aria-hidden>&middot;</span>
								<span>{formatBlogDate(post.date)}</span>
								<span aria-hidden>&middot;</span>
								<span>{post.readingTime}</span>
							</div>
						</div>
						<div className="mt-10 aspect-[16/9] overflow-hidden rounded-lg bg-muted">
							<img
								src={post.cover}
								alt={post.title}
								onError={onImageError}
								className="h-full w-full object-cover"
							/>
						</div>
					</Section>
				</Container>

				{/* Prose column */}
				<Container>
					<div className="mx-auto max-w-2xl pb-14 md:pb-20">
						<p className="text-lg leading-relaxed text-foreground md:text-xl">
							{post.excerpt}
						</p>
						<div className="mt-8 space-y-6">
							{post.body.map((paragraph) => (
								<p
									key={paragraph.slice(0, 48)}
									className="leading-8 text-muted-foreground"
								>
									{paragraph}
								</p>
							))}
						</div>

						<div className="mt-12 border-t border-border pt-8">
							<Button asChild variant="ghost">
								<Link to="/blog">&larr; Back to the Journal</Link>
							</Button>
						</div>
					</div>
				</Container>

				{/* Keep reading */}
				{related.length > 0 ? (
					<div className="border-t border-border bg-muted/30">
						<Container>
							<Section>
								<h2 className="mb-8 text-2xl font-semibold tracking-tight">
									Keep reading
								</h2>
								<div className="grid gap-8 sm:grid-cols-2">
									{related.map((item) => (
										<Link
											key={item.slug}
											to="/blog/$slug"
											params={{ slug: item.slug }}
											className="group block"
										>
											<Card className="flex h-full flex-col overflow-hidden transition-colors hover:border-primary/40">
												<div className="aspect-[4/3] overflow-hidden bg-muted">
													<img
														src={item.cover}
														alt={item.title}
														onError={onImageError}
														className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
													/>
												</div>
												<CardContent className="flex flex-1 flex-col gap-3 p-6">
													<Badge variant="secondary" className="self-start">
														{item.category}
													</Badge>
													<h3 className="text-xl font-semibold tracking-tight">
														{item.title}
													</h3>
													<p className="flex-1 text-sm text-muted-foreground">
														{item.excerpt}
													</p>
													<div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
														<span>{formatBlogDate(item.date)}</span>
														<span aria-hidden>&middot;</span>
														<span>{item.readingTime}</span>
													</div>
												</CardContent>
											</Card>
										</Link>
									))}
								</div>
							</Section>
						</Container>
					</div>
				) : null}
			</article>
		</SiteLayout>
	);
};

export default BlogPostPage;
