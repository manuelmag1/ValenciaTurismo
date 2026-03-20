// Initialize i18n (Internationalization) system
// This file ensures translations.js and language-manager.js are loaded and initialized

(function() {
    // Load translations.js
    const transScript = document.createElement('script');
    transScript.src = 'js/translations.js';
    transScript.onload = function() {
        // Load language-manager.js after translations are loaded
        const langScript = document.createElement('script');
        langScript.src = 'js/language-manager.js';
        document.head.appendChild(langScript);
    };
    document.head.appendChild(transScript);
})();
