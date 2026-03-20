// Simple Language Manager
class LanguageManager {
    constructor() {
        this.init();
    }

    init() {
        // Apply saved language on page load
        const lang = getCurrentLanguage();
        this.applyLanguage(lang);
        
        // Setup language button
        this.setupLanguageButton();
    }

    setupLanguageButton() {
        const checkButton = setInterval(() => {
            const btn = document.getElementById('language-toggle');
            if (btn) {
                clearInterval(checkButton);
                btn.addEventListener('click', () => {
                    const newLang = getCurrentLanguage() === 'es' ? 'en' : 'es';
                    setLanguage(newLang);
                    this.applyLanguage(newLang);
                });
            }
        }, 100);
    }

    applyLanguage(lang) {
        // Update document language
        document.documentElement.lang = lang;
        
        // Translate elements with data-en/data-es attributes
        document.querySelectorAll('[data-en][data-es]').forEach(el => {
            el.textContent = lang === 'es' ? el.getAttribute('data-es') : el.getAttribute('data-en');
        });
        
        // Update language indicator
        const indicator = document.getElementById('lang-indicator');
        if (indicator) {
            const current = lang.toUpperCase();
            const other = lang === 'es' ? 'EN' : 'ES';
            indicator.textContent = current + ' / ' + other;
        }
    }
}

// Initialize when document is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new LanguageManager();
    });
} else {
    new LanguageManager();
}
