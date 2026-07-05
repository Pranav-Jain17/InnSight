const API_URL = 'https://demohotelsapi.pythonanywhere.com/hotels/';

export const fetchHotels = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response failed');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};