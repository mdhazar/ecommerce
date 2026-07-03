import type React from "react";
import { useState } from "react";
import { useFilterStore } from "@/stores/filter-store";

const ProductFilter: React.FC = () => {
	const setFilterParams = useFilterStore((state) => state.setFilterParams);
	const totalResults = useFilterStore((state) => state.total);
	const [localFilter, setLocalFilter] = useState<string>("");
	const [localSort, setLocalSort] = useState<string>("");

	const handleFilterClick = (): void => {
		setFilterParams({ filter: localFilter, sort: localSort });
	};

	return (
		<div className="container flex justify-between items-center mb-4">
			<div className="text-gray-600">Showing all {totalResults} results</div>

			<div className="flex items-center space-x-4">
				<input
					type="text"
					placeholder="Search products..."
					value={localFilter}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setLocalFilter(e.target.value)
					}
					className="border px-2 py-1 rounded-md"
				/>

				<select
					value={localSort}
					onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
						setLocalSort(e.target.value)
					}
					className="border px-2 py-1 rounded-md"
				>
					<option value="">Sort By</option>
					<option value="price:asc">Price: Low to High</option>
					<option value="price:desc">Price: High to Low</option>
					<option value="rating:asc">Rating: Low to High</option>
					<option value="rating:desc">Rating: High to Low</option>
				</select>

				<button
					onClick={handleFilterClick}
					className="bg-blue-500 text-white px-4 py-1 rounded-md"
				>
					Filter
				</button>
			</div>
		</div>
	);
};

export default ProductFilter;
