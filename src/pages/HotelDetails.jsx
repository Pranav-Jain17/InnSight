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

    if (loading) return <div className="text-center mt-20 text-xl font-bold">Loading details...</div>;
    if (!hotel) return <div className="text-center mt-20 text-xl text-red-500">Hotel not found.</div>;

    const baseApiUrl = "https://demohotelsapi.pythonanywhere.com";
    const imageUrl = hotel.thumbnail ? (hotel.thumbnail.startsWith('http') ? hotel.thumbnail : `${baseApiUrl}${hotel.thumbnail}`) : "https://placehold.co/800x400?text=No+Image";

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Hotels</Link>
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <img src={imageUrl} alt={hotel.name} className="w-full h-96 object-cover" />
                <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                        <h1 className="text-4xl font-extrabold text-gray-900">{hotel.name}</h1>
                        <span className="bg-blue-100 text-blue-800 text-lg font-semibold px-4 py-1 rounded">
                            ${hotel.price}
                        </span>
                    </div>
                    <p className="text-gray-500 text-lg mb-6">{hotel.location} • ⭐ {hotel.rating}</p>
                    <h3 className="text-2xl font-bold mb-2">About this hotel</h3>
                    <p className="text-gray-700 leading-relaxed">{hotel.description || "No description available for this property."}</p>

                    {/* We will map the extra photos here later! */}
                </div>
            </div>
        </div>
    );
};

export default HotelDetails;