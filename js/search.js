// Lightweight search functionality for index.html
// Requires SEARCH_INDEX from search-data.js

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        searchInputSelector: 'input[placeholder*="Discover Valencia"]',
        searchButtonSelector: 'button[data-i18n="index_search_button"]',
        messageDisplayDuration: 4000, // 4 seconds
        debounceDelay: 300 // milliseconds
    };

    let searchMessageTimeout = null;
    let debounceTimer = null;

    /**
     * Initialize search functionality when DOM is ready
     */
    function initSearch() {
        const searchInput = document.querySelector(CONFIG.searchInputSelector);
        const searchButton = document.querySelector(CONFIG.searchButtonSelector);

        // Verify elements exist before attaching listeners
        if (!searchInput) {
            console.warn('Search input not found:', CONFIG.searchInputSelector);
            return;
        }
        if (!searchButton) {
            console.warn('Search button not found:', CONFIG.searchButtonSelector);
            return;
        }

        // Verify SEARCH_INDEX is available
        if (typeof SEARCH_INDEX === 'undefined') {
            console.error('SEARCH_INDEX not loaded. Ensure search-data.js is loaded before search.js');
            return;
        }

        console.log('✅ Search functionality initialized');

        // Attach event listeners
        searchButton.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                handleSearch();
            }
        });

        // Optional: Live search as user types
        searchInput.addEventListener('input', function() {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(handleSearch, CONFIG.debounceDelay);
        });
    }

    /**
     * Main search handler
     */
    function handleSearch() {
        const searchInput = document.querySelector(CONFIG.searchInputSelector);
        const query = searchInput.value.trim().toLowerCase();

        // Clear previous message if exists
        clearSearchMessage();

        // Prevent empty searches
        if (!query) {
            showErrorMessage('Please enter a search term');
            return;
        }

        // Perform search
        const result = performSearch(query);

        if (result) {
            // Direct redirect on match
            console.log('🔍 Search match found:', result.title);
            redirectToPage(result.url);
        } else {
            // Show "no results" message with suggestions
            showErrorMessage('No results found, try "Albufera" or "Bioparc"');
        }
    }

    /**
     * Search algorithm - looks for title or keyword matches
     * @param {string} query - User search query (lowercase)
     * @returns {Object|null} - Matching page object or null
     */
    function performSearch(query) {
        // Priority 1: Exact title match (case-insensitive)
        const exactMatch = SEARCH_INDEX.find(item =>
            item.title.toLowerCase() === query
        );
        if (exactMatch) return exactMatch;

        // Priority 2: Title contains query
        const titleMatch = SEARCH_INDEX.find(item =>
            item.title.toLowerCase().includes(query)
        );
        if (titleMatch) return titleMatch;

        // Priority 3: Keyword matches
        const keywordMatch = SEARCH_INDEX.find(item =>
            item.keywords.some(keyword =>
                keyword.toLowerCase().includes(query) ||
                query.includes(keyword.toLowerCase())
            )
        );
        if (keywordMatch) return keywordMatch;

        // Priority 4: Description contains query
        const descriptionMatch = SEARCH_INDEX.find(item =>
            item.description.toLowerCase().includes(query)
        );
        if (descriptionMatch) return descriptionMatch;

        return null;
    }

    /**
     * Display error/no-results message below search bar
     * @param {string} message - Message to display
     */
    function showErrorMessage(message) {
        const searchInput = document.querySelector(CONFIG.searchInputSelector);
        
        if (!searchInput) return;

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = 'search-message search-message--error';
        messageEl.setAttribute('role', 'alert');
        messageEl.textContent = message;

        // Insert after search container
        const searchContainer = searchInput.closest('.flex');
        if (searchContainer && searchContainer.parentNode) {
            searchContainer.parentNode.insertBefore(messageEl, searchContainer.nextSibling);
        }

        // Add visual feedback
        searchInput.classList.add('search-input--error');

        // Auto-remove after timeout
        searchMessageTimeout = setTimeout(() => {
            clearSearchMessage();
        }, CONFIG.messageDisplayDuration);
    }

    /**
     * Clear any displayed search message
     */
    function clearSearchMessage() {
        const messageEl = document.querySelector('.search-message');
        const searchInput = document.querySelector(CONFIG.searchInputSelector);

        if (messageEl) {
            messageEl.remove();
        }

        if (searchInput) {
            searchInput.classList.remove('search-input--error');
        }

        if (searchMessageTimeout) {
            clearTimeout(searchMessageTimeout);
            searchMessageTimeout = null;
        }
    }

    /**
     * Redirect to search result page
     * @param {string} url - Page URL to navigate to
     */
    function redirectToPage(url) {
        // Add small delay for visual feedback
        setTimeout(() => {
            window.location.href = url;
        }, 200);
    }

    /**
     * Initialize when DOM is ready
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSearch);
    } else {
        // DOM already loaded
        initSearch();
    }
})();
