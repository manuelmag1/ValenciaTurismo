// Simple and lightweight translations
const translations = {
    es: {
        "Welcome to Sustainable Valencia": "Bienvenidos a Valencia Sostenible",
        "Discover the green soul of the Mediterranean. Explore the historic Turia Garden and local gems responsibly.": "Descubre el alma verde del Mediterráneo. Explora el Histórico Jardín del Turia y joyas locales responsablemente.",
        "Discover Valencia's eco-tours...": "Descubre los eco-tours de Valencia...",
        "Search": "Buscar"
    },
    en: {
        "Welcome to Sustainable Valencia": "Welcome to Sustainable Valencia",
        "Discover the green soul of the Mediterranean. Explore the historic Turia Garden and local gems responsibly.": "Discover the green soul of the Mediterranean. Explore the historic Turia Garden and local gems responsibly.",
        "Discover Valencia's eco-tours...": "Discover Valencia's eco-tours...",
        "Search": "Search"
    }
};

// Utility functions
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'es';
}

function setLanguage(lang) {
    localStorage.setItem('language', lang);
    return lang;
}

function getTranslation(key) {
    const lang = getCurrentLanguage();
    return translations[lang] && translations[lang][key] ? translations[lang][key] : key;
}
