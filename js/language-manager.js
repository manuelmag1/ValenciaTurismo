// Language Manager - handles real-time language switching
class LanguageManager {
    constructor() {
        this.currentLanguage = getCurrentLanguage();
        this.translationMap = new Map();
        this.init();
    }

    init() {
        // Build translation map from all text content
        this.buildTranslationMap();
        
        // Load saved language on page load
        this.applyLanguage(this.currentLanguage);
        
        // Setup language button
        this.setupLanguageButton();
    }

    buildTranslationMap() {
        // Map English strings to their Spanish equivalents
        if (typeof translations !== 'undefined') {
            const es = translations.es;
            const en = translations.en;
            
            for (let key in en) {
                if (en[key] && es[key]) {
                    this.translationMap.set(en[key], es[key]);
                    this.translationMap.set(es[key], en[key]);
                }
            }
        }
    }

    setupLanguageButton() {
        // Wait for dynamic header to load, then find and setup button
        const checkButton = setInterval(() => {
            const langButton = document.getElementById('language-toggle');
            if (langButton) {
                clearInterval(checkButton);
                langButton.addEventListener('click', () => this.toggleLanguage());
                this.updateButtonText();
            }
        }, 100);
        
        // Clear interval after 5 seconds if button not found
        setTimeout(() => clearInterval(checkButton), 5000);
    }

    toggleLanguage() {
        const newLang = this.currentLanguage === 'es' ? 'en' : 'es';
        this.setLanguage(newLang);
        this.updateButtonText();
    }

    setLanguage(lang) {
        this.currentLanguage = setLanguage(lang);
        this.applyLanguage(lang);
    }

    applyLanguage(lang) {
        // Replace text content of readable elements
        this.translatePageContent(lang);
        
        // Update document language
        document.documentElement.lang = lang === 'es' ? 'es' : 'en';
    }

    translatePageContent(lang) {
        const isSpanish = lang === 'es';
        
        // Translate all text nodes in the document
        this.walkDOM(document.body, (node) => {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                const text = node.textContent.trim();
                let translated = '';
                
                if (isSpanish && this.translationMap.has(text)) {
                    translated = this.translationMap.get(text);
                } else if (!isSpanish && this.translationMap.has(text)) {
                    // Get the English version if we're switching back
                    const spanishText = this.translationMap.get(text);
                    if (spanishText !== text) {
                        translated = spanishText;
                    }
                }
                
                if (translated && translated !== text) {
                    node.textContent = node.textContent.replace(text, translated);
                }
            }
        });
        
        // Specifically translate navigation items
        this.translateNavigationItems(lang);
        this.translateModalTitles(lang);
        this.translateDescriptions(lang);
    }

    translateNavigationItems(lang) {
        const isSpanish = lang === 'es';
        const navItems = document.querySelectorAll('nav a, nav button');
        
        navItems.forEach(item => {
            const text = item.textContent.trim();
            if (this.translationMap.has(text)) {
                const translated = isSpanish ? this.translationMap.get(text) : text;
                if (translated) {
                    item.textContent = translated;
                }
            }
        });
    }

    translateModalTitles(lang) {
        // Translate modal titles if they exist
        const modalTitles = document.querySelectorAll('[id$="-modal"] h2');
        modalTitles.forEach(title => {
            const text = title.textContent.trim();
            if (this.translationMap.has(text)) {
                title.textContent = this.translationMap.get(text);
            }
        });
    }

    translateDescriptions(lang) {
        // Translate common paragraph content
        const paragraphs = document.querySelectorAll('p, span.text-slate-600, div.text-slate-600');
        paragraphs.forEach(p => {
            const text = p.textContent.trim();
            if (this.translationMap.has(text)) {
                p.textContent = this.translationMap.get(text);
            }
        });
    }

    walkDOM(node, callback) {
        callback(node);
        if (node.hasChildNodes()) {
            for (let child of node.childNodes) {
                this.walkDOM(child, callback);
            }
        }
    }

    updateButtonText() {
        const indicator = document.getElementById('lang-indicator');
        if (indicator) {
            const current = this.currentLanguage.toUpperCase();
            const other = this.currentLanguage === 'es' ? 'EN' : 'ES';
            indicator.textContent = `${current} / ${other}`;
        }
    }
}

// Initialize language manager when document is ready
if (typeof translations !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new LanguageManager();
        });
    } else {
        new LanguageManager();
    }
}

