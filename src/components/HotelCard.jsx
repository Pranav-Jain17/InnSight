const HotelCard = ({ hotel }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <img
                src={hotel.photos || "https://via.placeholder.com/400x250?text=No+Image"}
                alt={hotel.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">{hotel.name}</h2>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold text-blue-600">$ {hotel.price}</span>
                    <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2.5 py-0.5 rounded">
                        ★ {hotel.rating}
                    </span>
                </div>
                <p className="text-gray-600 text-sm mt-2">{hotel.location}</p>
            </div>
        </div>
    );
};

export default HotelCard;