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
    const [totalItems, setTotalItems] = useState(0);
    const LIMIT = 20;
    const currentPage = Math.floor(skip / LIMIT) + 1;
    const totalPages = Math.ceil(totalItems / LIMIT);

    useEffect(() => {
        const loadHotels = async () => {
            setLoading(true);

            try {
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

                const queryString = queryParams.toString() ? `/?${queryParams.toString()}` : '/';
                const data = await fetchHotels(queryString);

                if (data && data.data) {
                    setHotels(data.data);
                    setTotalItems(data.count || 0);
                } else if (Array.isArray(data)) {
                    setHotels(data);
                    setTotalItems(data.length);
                } else {
                    setHotels([]);
                    setTotalItems(0);
                }
            } catch (error) {
                console.error("error: ", error);
            } finally {
                setLoading(false);
            }
        };

        loadHotels();
    }, [filters, skip]);

    const handleFilterUpdate = (newFilters) => {
        setFilters(newFilters);
        setSkip(0);
    };

    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 4) {
                for (let i = 1; i <= 5; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 3) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push('...');
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push('...');
                pages.push(totalPages);
            }
        }
        return pages;
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

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center mt-12 space-x-2">
                            <button
                                onClick={() => setSkip(Math.max(0, skip - LIMIT))}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 rounded-md font-medium transition-colors ${currentPage === 1
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                &larr; Prev
                            </button>

                            <div className="flex space-x-1">
                                {getPageNumbers().map((page, index) => (
                                    <button
                                        key={index}
                                        onClick={() => page !== '...' && setSkip((page - 1) * LIMIT)}
                                        disabled={page === '...'}
                                        className={`w-10 h-10 flex items-center justify-center rounded-md font-semibold transition-colors ${page === currentPage
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : page === '...'
                                                ? 'text-gray-400 cursor-default'
                                                : 'text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setSkip(skip + LIMIT)}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 rounded-md font-medium transition-colors ${currentPage === totalPages
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                Next &rarr;
                            </button>
                        </div>
                    )}
                </>
            )}
        </main>
    );
};

export default Home;