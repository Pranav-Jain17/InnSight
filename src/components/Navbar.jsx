import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            setIsDarkMode(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            setIsDarkMode(true);
        }
    };

    return (
        <nav className="bg-white dark:bg-gray-800 shadow-md py-4 transition-colors duration-300">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link to="/" className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    InnSight
                </Link>

                <button
                    onClick={toggleDarkMode}
                    className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors shadow-sm"
                >
                    {isDarkMode ? '☀️ Light' : '🌙 Dark'}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;