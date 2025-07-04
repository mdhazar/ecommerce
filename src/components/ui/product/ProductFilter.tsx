import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilterParams } from "../../../redux/actions/filterActions";
import { RootState, AppDispatch } from "../../../redux/store";

interface FilterParams {
  filter: string;
  sort: string;
}

const ProductFilter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [localFilter, setLocalFilter] = useState<string>("");
  const [localSort, setLocalSort] = useState<string>("");

  const totalResults =
    useSelector((state: RootState) => state.product.total) || 0;

  const handleFilterClick = (): void => {
    dispatch(setFilterParams({ filter: localFilter, sort: localSort }));
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
