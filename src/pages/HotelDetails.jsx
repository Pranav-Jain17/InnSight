import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchHotelById } from '../services/api';

const HotelDetails = () => {
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadHotel = async () => {
            const response = await fetchHotelById(id);
            if (response && response.data) {
                setHotel(response.data);
            } else {
                setHotel(null);
            }

            setLoading(false);
        };
        loadHotel();
    }, [id]);

    if (loading) return <div className="text-center mt-20 text-xl font-bold dark:text-gray-200">Loading details...</div>;
    if (!hotel) return <div className="text-center mt-20 text-xl text-red-500 dark:text-red-400">Hotel not found.</div>;

    const baseApiUrl = "https://demohotelsapi.pythonanywhere.com";
    const imageUrl = hotel.thumbnail ? (hotel.thumbnail.startsWith('http') ? hotel.thumbnail : `${baseApiUrl}${hotel.thumbnail}`) : "https://placehold.co/800x400?text=No+Image";

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block">&larr; Back to Hotels</Link>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transition-colors">
                <img src={imageUrl} alt={hotel.name} className="w-full h-96 object-cover" />
                <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">{hotel.name}</h1>
                        <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-lg font-semibold px-4 py-1 rounded">
                            ${hotel.price}
                        </span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-lg mb-6">{hotel.location} • ⭐ {hotel.rating}</p>
                    <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">About this hotel</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{hotel.description || "No description available for this property."}</p>

                    {/* We will map the extra photos here later! */}
                </div>
            </div>
        </div>
    );
};

export default HotelDetails;