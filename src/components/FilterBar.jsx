const FilterBar = ({ filters, onFilterChange }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onFilterChange({ ...filters, [name]: value });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Search</label>
                    <input
                        type="text"
                        name="search"
                        value={filters.search}
                        onChange={handleChange}
                        placeholder="Search hotels by name/location"
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                </div>

                <div className="md:w-48">
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Location</label>
                    <select
                        name="location"
                        value={filters.location}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                        <option value="">All Locations</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Noida">Noida</option>
                        <option value="Jaipur">Jaipur</option>
                        <option value="Ahmedabad">Ahmedabad</option>
                    </select>
                </div>

                <div className="md:w-48">
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Sort By</label>
                    <select
                        name="sort"
                        value={filters.sort}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                        <option value="">Default</option>
                        <option value="price">Price: Low to High</option>
                        <option value="-price">Price: High to Low</option>
                        <option value="rating">Rating: Low to High</option>
                        <option value="-rating">Highest Rated</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Exact Price</label>
                    <input
                        type="number"
                        name="price"
                        value={filters.price}
                        onChange={handleChange}
                        placeholder="e.g. 2000"
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Exact Rating</label>
                    <input
                        type="number"
                        step="0.1"
                        min="1"
                        max="5"
                        name="rating"
                        value={filters.rating}
                        onChange={handleChange}
                        placeholder="e.g. 4.5"
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Price Limits</label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            name="minPrice"
                            value={filters.minPrice}
                            onChange={handleChange}
                            placeholder="Min"
                            className="w-1/2 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                        <input
                            type="number"
                            name="maxPrice"
                            value={filters.maxPrice}
                            onChange={handleChange}
                            placeholder="Max"
                            className="w-1/2 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Star Rating Range</label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            step="0.1"
                            min="1"
                            max="5"
                            name="minRating"
                            value={filters.minRating}
                            onChange={handleChange}
                            placeholder="Min ★"
                            className="w-1/2 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                        <input
                            type="number"
                            step="0.1"
                            min="1"
                            max="5"
                            name="maxRating"
                            value={filters.maxRating}
                            onChange={handleChange}
                            placeholder="Max ★"
                            className="w-1/2 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;