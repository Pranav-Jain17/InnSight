import { useState, useEffect } from 'react';
import HotelCard from '../components/HotelCard';
import FilterBar from '../components/FilterBar';
import { fetchHotels } from '../services/api';

const Home = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState({
        search: '', location: '', sort: '', minPrice: '', maxPrice: ''
    });

    useEffect(() => {
        const loadHotels = async () => {
            setLoading(true);

            const queryParams = new URLSearchParams();
            if (filters.search) queryParams.append('search', filters.search);
            if (filters.location) queryParams.append('location', filters.location);
            if (filters.sort) queryParams.append('order_by', filters.sort);
            if (filters.minPrice) queryParams.append('min_price', filters.minPrice);
            if (filters.maxPrice) queryParams.append('max_price', filters.maxPrice);

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
    }, [filters]);

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    Discover Your Next Stay
                </h2>
            </div>

            <FilterBar filters={filters} onFilterChange={setFilters} />

            {loading ? (
                <div className="text-center py-20 text-xl font-bold text-blue-600">Updating results...</div>
            ) : hotels.length === 0 ? (
                <div className="text-center py-20 text-gray-500 text-lg">No hotels match your search.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {hotels.map((hotel) => (
                        <HotelCard key={hotel.id} hotel={hotel} />
                    ))}
                </div>
            )}
        </main>
    );
};

export default Home;