// Advanced Language Manager - Full page translation system
class LanguageManager {
    constructor() {
        this.currentLanguage = getCurrentLanguage();
        this.isTranslating = false;
        this.init();
    }

    init() {
        // Build translation map
        this.buildTranslationMap();
        
        // Apply language on page load
        this.applyLanguage(this.currentLanguage);
        
        // Setup language button after header is loaded
        this.setupLanguageButton();
        
        // Watch for dynamic changes
        this.observeDOM();
    }

    buildTranslationMap() {
        // Create bidirectional map of translations (EN ↔ ES)
        this.translationMap = new Map();
        
        if (typeof translations !== 'undefined') {
            const es = translations.es;
            const en = translations.en;
            
            // Sort by length (longest first) for better matching
            const entries = [];
            for (let key in en) {
                if (en[key] && es[key]) {
                    entries.push([en[key], es[key]]);
                    entries.push([es[key], en[key]]);
                }
            }
            // Sort by length descending for better partial matches
            entries.sort((a, b) => b[0].length - a[0].length);
            entries.forEach(([src, dst]) => {
                this.translationMap.set(src, dst);
            });
        }
    }

    setupLanguageButton() {
        // Wait for language button to appear in DOM
        const waitForButton = setInterval(() => {
            const langButton = document.getElementById('language-toggle');
            if (langButton) {
                clearInterval(waitForButton);
                langButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleLanguage();
                });
            }
        }, 50);
        
        setTimeout(() => clearInterval(waitForButton), 10000);
    }

    toggleLanguage() {
        const newLang = this.currentLanguage === 'es' ? 'en' : 'es';
        this.setLanguage(newLang);
    }

    setLanguage(lang) {
        this.currentLanguage = setLanguage(lang);
        this.applyLanguage(lang);
    }

    applyLanguage(lang) {
        this.isTranslating = true;
        
        // Translate all text in the document
        this.translateAllElements();
        
        // Update document language attribute
        document.documentElement.lang = lang;
        
        // Update language button indicator
        this.updateLanguageIndicator();
        
        this.isTranslating = false;
    }

    translateAllElements() {
        // Get all text nodes
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        const nodesToProcess = [];
        let node = walker.nextNode();
        
        while (node) {
            const text = node.textContent.trim();
            // Only process meaningful text nodes
            if (text.length > 0 && text.length < 500 && !this.isCode(node)) {
                nodesToProcess.push(node);
            }
            node = walker.nextNode();
        }
        
        // Process collected nodes - translate text
        nodesToProcess.forEach(textNode => {
            let text = textNode.textContent;
            let translated = text;
            
            // Try each translation in the map
            for (let [source, target] of this.translationMap) {
                if (text.includes(source)) {
                    translated = translated.split(source).join(target);
                }
            }
            
            if (translated !== text) {
                textNode.textContent = translated;
            }
        });
        
        // Also translate attributes
        this.translateAttributes();
    }

    translateAttributes() {
        // Translate alt text, titles, placeholders
        const allElements = document.querySelectorAll('*');
        
        allElements.forEach(element => {
            // Translate alt attribute
            if (element.alt) {
                let translated = element.alt;
                for (let [source, target] of this.translationMap) {
                    if (translated.includes(source)) {
                        translated = translated.split(source).join(target);
                    }
                }
                if (translated !== element.alt) element.alt = translated;
            }
            
            // Translate title attribute
            if (element.title) {
                let translated = element.title;
                for (let [source, target] of this.translationMap) {
                    if (translated.includes(source)) {
                        translated = translated.split(source).join(target);
                    }
                }
                if (translated !== element.title) element.title = translated;
            }
            
            // Translate placeholder attribute
            if (element.placeholder) {
                let translated = element.placeholder;
                for (let [source, target] of this.translationMap) {
                    if (translated.includes(source)) {
                        translated = translated.split(source).join(target);
                    }
                }
                if (translated !== element.placeholder) element.placeholder = translated;
            }
        });
    }

    updateLanguageIndicator() {
        const indicator = document.getElementById('lang-indicator');
        if (indicator) {
            const current = this.currentLanguage.toUpperCase();
            const other = this.currentLanguage === 'es' ? 'EN' : 'ES';
            indicator.textContent = `${current} / ${other}`;
        }
    }

    // Detect if node is inside code/script elements
    isCode(node) {
        let parent = node.parentElement;
        while (parent) {
            if (['CODE', 'PRE', 'SCRIPT', 'STYLE'].includes(parent.tagName)) {
                return true;
            }
            parent = parent.parentElement;
        }
        return false;
    }

    // Watch for dynamic DOM changes
    observeDOM() {
        const observer = new MutationObserver((mutations) => {
            if (this.isTranslating) return;
            
            // Re-apply translations if new content is added
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // Translate newly added nodes
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
                            let text = '';
                            if (node.nodeType === Node.TEXT_NODE) {
                                text = node.textContent;
                            } else {
                                text = node.textContent;
                            }
                            
                            let translated = text;
                            for (let [source, target] of this.translationMap) {
                                if (translated.includes(source)) {
                                    translated = translated.split(source).join(target);
                                }
                            }
                            
                            if (translated !== text) {
                                if (node.nodeType === Node.TEXT_NODE) {
                                    node.textContent = translated;
                                } else {
                                    node.innerHTML = node.innerHTML.split(text).join(translated);
                                }
                            }
                        }
                    });
                }
            });
        });
        
        // Observe for changes
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            characterData: false
        });
    }
}

// Initialize when ready
(function initLanguageManager() {
    if (typeof translations !== 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                window.languageManager = new LanguageManager();
            });
        } else {
            window.languageManager = new LanguageManager();
        }
    }
})();

