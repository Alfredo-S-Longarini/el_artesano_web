import React from 'react';

const LanguagePicker = ({ lang }) => {
    const isSpanish = lang === 'es';

    const toggleLanguage = () => {
        const currentPath = window.location.pathname;
        if (isSpanish) {
            // Switch to English
            // If we are at root /, go to /en
            // If we are at /foo, go to /en/foo
            window.location.href = currentPath === '/' ? '/en' : `/en${currentPath}`;
        } else {
            // Switch to Spanish
            // If we are at /en, go to /
            // If we are at /en/foo, go to /foo
            const newPath = currentPath.replace(/^\/en/, '') || '/';
            window.location.href = newPath;
        }
    };

    return (
        <button
            onClick={toggleLanguage}
            className="ml-4 flex items-center gap-2 px-3 py-1 bg-stone-800 hover:bg-stone-700 border border-stone-600 rounded-full transition-all duration-300 group"
            aria-label={isSpanish ? "Switch to English" : "Cambiar a Español"}
        >
            <span className="text-lg leading-none filter grayscale group-hover:grayscale-0 transition-all duration-300">
                {isSpanish ? '🇺🇸' : '🇦🇷'}
            </span>
            <span className="text-stone-300 text-sm font-medium group-hover:text-white transition-colors">
                {isSpanish ? 'EN' : 'ES'}
            </span>
        </button>
    );
};

export default LanguagePicker;
