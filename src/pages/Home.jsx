import { useState, useEffect } from 'react';
import HotelCard from '../components/HotelCard';
import FilterBar from '../components/FilterBar';
import { fetchHotels } from '../services/api';

const Home = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState({
        search: '',
        location: '',
        sort: '',
        price: '',
        minPrice: '',
        maxPrice: '',
        rating: '',
        minRating: '',
        maxRating: '',
    });

    const [skip, setSkip] = useState(0);
    const LIMIT = 8;

    useEffect(() => {
        const loadHotels = async () => {
            setLoading(true);

            const queryParams = new URLSearchParams();

            // 1. Text Search & Dropdown Filters
            if (filters.search) queryParams.append('search', filters.search);
            if (filters.location) queryParams.append('location', filters.location);
            if (filters.sort) queryParams.append('order_by', filters.sort);

            // 2. Price Filters (Exact and Range)
            if (filters.price) queryParams.append('price', filters.price);
            if (filters.minPrice) queryParams.append('min_price', filters.minPrice);
            if (filters.maxPrice) queryParams.append('max_price', filters.maxPrice);

            // 3. Rating Filters (Exact and Range)
            if (filters.rating) queryParams.append('rating', filters.rating);
            if (filters.minRating) queryParams.append('min_rating', filters.minRating);
            if (filters.maxRating) queryParams.append('max_rating', filters.maxRating);

            // 4. Limit / Skip Pagination Parameters
            queryParams.append('limit', LIMIT);
            queryParams.append('skip', skip);

            const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
            const data = await fetchHotels(queryString);

            if (data && data.data) {
                setHotels(data.data);
            } else if (Array.isArray(data)) {
                setHotels(data);
            } else {
                setHotels([]);
            }

            setLoading(false);
        };

        loadHotels();
    }, [filters, skip]);

    const handleFilterUpdate = (newFilters) => {
        setFilters(newFilters);
        setSkip(0);
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    Discover Your Next Stay
                </h2>
            </div>

            <FilterBar filters={filters} onFilterChange={handleFilterUpdate} />

            {loading ? (
                <div className="text-center py-20 text-xl font-bold text-blue-600">Updating results...</div>
            ) : hotels.length === 0 ? (
                <div className="text-center py-20 text-gray-500 text-lg">No hotels match your parameters.</div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {hotels.map((hotel) => (
                            <HotelCard key={hotel.id} hotel={hotel} />
                        ))}
                    </div>

                    <div className="flex justify-center items-center mt-12 gap-6">
                        <button
                            onClick={() => setSkip(Math.max(0, skip - LIMIT))}
                            disabled={skip === 0}
                            className={`px-6 py-2 rounded-md font-semibold transition-colors ${skip === 0
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                                }`}
                        >
                            &larr; Previous
                        </button>

                        <span className="text-gray-700 font-medium">
                            Page {(skip / LIMIT) + 1}
                        </span>

                        <button
                            onClick={() => setSkip(skip + LIMIT)}
                            disabled={hotels.length < LIMIT}
                            className={`px-6 py-2 rounded-md font-semibold transition-colors ${hotels.length < LIMIT
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                                }`}
                        >
                            Next &rarr;
                        </button>
                    </div>
                </>
            )}
        </main>
    );
};

export default Home;