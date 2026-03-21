// i18n Initialization Module
// Handles language preference detection, storage, and DOM modification

class I18NManager {
    constructor() {
        this.currentLanguage = this.detectLanguage();
        this.supportedLanguages = ['en', 'es'];
        this.storageKey = 'valencia-tourism-language';
        this.init();
    }

    /**
     * Detect user's language preference
     * Priority: localStorage > browser language > default (en)
     */
    detectLanguage() {
        // Check localStorage first
        const stored = localStorage.getItem(this.storageKey);
        if (stored && ['en', 'es'].includes(stored)) {
            return stored;
        }

        // Check browser language
        const browserLang = navigator.language?.slice(0, 2);
        if (browserLang === 'es') {
            return 'es';
        }

        // Default to English
        return 'en';
    }

    /**
     * Initialize i18n system
     */
    init() {
        // Wait for DOM and translations to be loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupLanguage());
        } else {
            this.setupLanguage();
        }
    }

    /**
     * Setup language on DOM ready
     */
    setupLanguage() {
        // Apply initial language
        this.applyLanguage(this.currentLanguage);
        
        // Update html lang attribute
        document.documentElement.lang = this.currentLanguage;
    }

    /**
     * Apply language translation to all elements with data-i18n
     */
    applyLanguage(lang) {
        if (!translations || !translations[lang]) {
            console.warn(`Translations for language '${lang}' not found`);
            return;
        }

        const translationDict = translations[lang];

        // Find all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = translationDict[key];

            if (translation) {
                // Check if element has children (preserve HTML structure)
                if (element.children.length > 0) {
                    // For elements with children, only update text nodes
                    this.updateTextNodes(element, translation);
                } else {
                    // For simple elements, replace entire content
                    element.textContent = translation;
                }
            } else {
                console.warn(`Translation key '${key}' not found for language '${lang}'`);
            }
        });

        this.currentLanguage = lang;
    }

    /**
     * Update only text nodes while preserving HTML structure
     */
    updateTextNodes(element, text) {
        // Clear existing text nodes only
        for (let i = element.childNodes.length - 1; i >= 0; i--) {
            const node = element.childNodes[i];
            if (node.nodeType === 3) { // Text node
                node.remove();
            }
        }

        // Add new text at the beginning
        element.insertAdjacentHTML('afterbegin', text);
    }

    /**
     * Change language and apply translations
     */
    setLanguage(lang) {
        if (!this.supportedLanguages.includes(lang)) {
            console.warn(`Unsupported language: ${lang}`);
            return false;
        }

        // Save preference to localStorage
        localStorage.setItem(this.storageKey, lang);

        // Apply language
        this.applyLanguage(lang);

        // Update HTML lang attribute
        document.documentElement.lang = lang;

        // Dispatch custom event for other scripts to listen
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));

        return true;
    }

    /**
     * Get current language
     */
    getLanguage() {
        return this.currentLanguage;
    }

    /**
     * Get translation for a specific key
     */
    getTranslation(key, lang = null) {
        lang = lang || this.currentLanguage;
        
        if (!translations[lang]) {
            return null;
        }

        return translations[lang][key] || null;
    }
}

// Initialize on window object for global access
window.i18nManager = new I18NManager();
