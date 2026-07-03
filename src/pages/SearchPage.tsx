import { useNavigate, useSearch } from "@tanstack/react-router";
import { Search } from "lucide-react";
import type React from "react";
import { useId, useState } from "react";
import {
	Container,
	Input,
	Label,
	PageHeader,
	Section,
} from "@/components/ui/common";
import { Button } from "@/components/ui/common/Button";
import SiteLayout from "@/layouts/SiteLayout";

const SearchPage: React.FC = () => {
	const inputId = useId();
	const { q } = useSearch({ from: "/search" });
	const [query, setQuery] = useState(q ?? "");
	const navigate = useNavigate();

	const handleSearch = (event: React.FormEvent): void => {
		event.preventDefault();
		const trimmed = query.trim();
		if (!trimmed) return;
		navigate({ to: "/shop", search: { filter: trimmed } });
	};

	return (
		<SiteLayout>
			<Container>
				<Section className="flex flex-col items-center">
					<PageHeader
						eyebrow="Search"
						title="Find your pieces"
						description="Search our collection by name, material, or mood — from everyday knits to considered accessories."
					/>
					<form
						onSubmit={handleSearch}
						className="mt-10 flex w-full max-w-xl flex-col gap-3 sm:flex-row"
					>
						<div className="flex-1">
							<Label htmlFor={inputId} className="sr-only">
								Search products
							</Label>
							<Input
								id={inputId}
								type="search"
								value={query}
								onChange={(event) => setQuery(event.target.value)}
								placeholder="Try “linen”, “tote”, or “knit”…"
							/>
						</div>
						<Button type="submit" size="lg" className="sm:w-auto">
							<Search size={18} aria-hidden="true" />
							Search
						</Button>
					</form>
				</Section>
			</Container>
		</SiteLayout>
	);
};

export default SearchPage;
