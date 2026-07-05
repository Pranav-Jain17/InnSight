import { Link } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
    return (
        <Link to={`/hotel/${hotel.id}`} className="block">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                <img
                    src={hotel.photos || "https://via.placeholder.com/400x250?text=No+Image"}
                    alt={hotel.name}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{hotel.name}</h3>
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">$ {hotel.price}</span>
                        <span className="bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 text-sm font-medium px-2.5 py-0.5 rounded">
                            ★ {hotel.rating}
                        </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">{hotel.location}</p>
                </div>
            </div>
        </Link>
    );
};

export default HotelCard;