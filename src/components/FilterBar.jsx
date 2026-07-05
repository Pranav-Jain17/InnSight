const FilterBar = ({ filters, onFilterChange }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onFilterChange({ ...filters, [name]: value });
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-8 flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <input
                    type="text"
                    name="search"
                    value={filters.search}
                    onChange={handleChange}
                    placeholder="Search hotels by name/location"
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {/* Location Dropdown */}
            <div className="md:w-48">
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <select
                    name="location"
                    value={filters.location}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">All Locations</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Noida">Noida</option>
                    <option value="Jaipur">Jaipur</option>
                </select>
            </div>

            {/* Sort Dropdown */}
            <div className="md:w-48">
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select
                    name="sort"
                    value={filters.sort}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="">Default</option>
                    <option value="price">Price: Low to High</option>
                    <option value="-price">Price: High to Low</option>
                    <option value="-rating">Highest Rated</option>
                </select>
            </div>
            {/* Price Range */}
            <div className="flex gap-2 md:w-64">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                    <input
                        type="number"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleChange}
                        placeholder="₹0"
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                    <input
                        type="number"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleChange}
                        placeholder="₹10000"
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterBar;