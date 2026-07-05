import { useState, useEffect } from 'react';
import HotelCard from '../components/HotelCard';
import { fetchHotels } from '../services/api';

function Home() {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadHotels = async () => {
            const data = await fetchHotels();
            const hotelsData = data.data || [];
            // console.log(hotelsData);
            setHotels(hotelsData);
            setLoading(false);
        };

        loadHotels();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="container mx-auto px-4 py-8">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        Discover Your Next Stay
                    </h2>
                    <p className="mt-4 text-lg text-gray-500">
                        Explore our curated list of top-rated hotels and book your perfect getaway.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="text-xl text-blue-600 font-semibold flex items-center space-x-2">
                            <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Fetching hotels...</span>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {hotels.map((hotel) => (
                            <HotelCard key={hotel.id} hotel={hotel} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Home;