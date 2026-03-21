// Lightweight search functionality with real-time suggestions
// Requires SEARCH_INDEX from search-data.js

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        searchInputSelector: 'input[placeholder*="Discover Valencia"]',
        searchButtonSelector: 'button[data-i18n="index_search_button"]',
        resultsContainerSelector: '#search-results',
        minCharsToSearch: 2,
        debounceDelay: 300 // milliseconds
    };

    let debounceTimer = null;
    let selectedIndex = -1; // For keyboard navigation

    /**
     * Initialize search functionality when DOM is ready
     */
    function initSearch() {
        const searchInput = document.querySelector(CONFIG.searchInputSelector);
        const searchButton = document.querySelector(CONFIG.searchButtonSelector);
        const resultsContainer = document.querySelector(CONFIG.resultsContainerSelector);

        // Verify elements exist before attaching listeners
        if (!searchInput) {
            console.warn('Search input not found:', CONFIG.searchInputSelector);
            return;
        }
        if (!searchButton) {
            console.warn('Search button not found:', CONFIG.searchButtonSelector);
            return;
        }
        if (!resultsContainer) {
            console.warn('Results container not found:', CONFIG.resultsContainerSelector);
            return;
        }

        // Verify SEARCH_INDEX is available
        if (typeof SEARCH_INDEX === 'undefined') {
            console.error('SEARCH_INDEX not loaded. Ensure search-data.js is loaded before search.js');
            return;
        }

        console.log('✅ Search functionality initialized with real-time suggestions');

        // Event Listeners
        searchInput.addEventListener('input', handleLiveSearch);
        searchButton.addEventListener('click', handleSearchButton);
        searchInput.addEventListener('keypress', handleKeyPress);
        searchInput.addEventListener('keydown', handleKeyDown);
        
        // Close results when clicking outside
        document.addEventListener('click', handleClickOutside);
    }

    /**
     * Handle real-time search input
     */
    function handleLiveSearch(event) {
        const query = event.target.value.trim().toLowerCase();
        const resultsContainer = document.querySelector(CONFIG.resultsContainerSelector);
        
        selectedIndex = -1; // Reset keyboard selection

        // Hide results if input is empty
        if (!query || query.length < CONFIG.minCharsToSearch) {
            resultsContainer.classList.add('hidden');
            return;
        }

        // Perform search
        const results = performSearch(query);

        // Display results or hide
        if (results.length > 0) {
            displayResults(results, resultsContainer);
            resultsContainer.classList.remove('hidden');
        } else {
            resultsContainer.innerHTML = '';
            resultsContainer.classList.add('hidden');
        }
    }

    /**
     * Handle explicit search button click
     */
    function handleSearchButton(event) {
        event.preventDefault();
        const searchInput = document.querySelector(CONFIG.searchInputSelector);
        const query = searchInput.value.trim().toLowerCase();

        if (!query) {
            showMessage('Please enter a search term');
            return;
        }

        const results = performSearch(query);

        if (results.length > 0) {
            // Navigate to first result
            redirectToPage(results[0].url);
        } else {
            showMessage('No results found, try "Albufera" or "Bioparc"');
        }
    }

    /**
     * Handle Enter key in search input
     */
    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            handleSearchButton(event);
        }
    }

    /**
     * Handle arrow keys for suggestion navigation
     */
    function handleKeyDown(event) {
        const resultsContainer = document.querySelector(CONFIG.resultsContainerSelector);
        const isResultsVisible = !resultsContainer.classList.contains('hidden');

        if (!isResultsVisible) return;

        const suggestions = resultsContainer.querySelectorAll('[data-result-url]');
        const totalSuggestions = suggestions.length;

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            selectedIndex = Math.min(selectedIndex + 1, totalSuggestions - 1);
            updateSelectedSuggestion(suggestions);
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, -1);
            updateSelectedSuggestion(suggestions);
        } else if (event.key === 'Enter' && selectedIndex >= 0) {
            event.preventDefault();
            const selectedSuggestion = suggestions[selectedIndex];
            if (selectedSuggestion) {
                redirectToPage(selectedSuggestion.getAttribute('data-result-url'));
            }
        }
    }

    /**
     * Update visual indication of selected suggestion
     */
    function updateSelectedSuggestion(suggestions) {
        suggestions.forEach((suggestion, index) => {
            if (index === selectedIndex) {
                suggestion.classList.add('bg-slate-100', 'dark:bg-slate-700');
            } else {
                suggestion.classList.remove('bg-slate-100', 'dark:bg-slate-700');
            }
        });
    }

    /**
     * Search algorithm - looks for title or keyword matches
     * Returns array of matching items (max 8 results)
     */
    function performSearch(query) {
        const results = [];
        const seen = new Set();

        // Priority 1: Title match
        SEARCH_INDEX.forEach(item => {
            if (item.title.toLowerCase().includes(query) && !seen.has(item.url)) {
                results.push(item);
                seen.add(item.url);
            }
        });

        // Priority 2: Keyword match
        SEARCH_INDEX.forEach(item => {
            if (item.keywords.some(kw => kw.toLowerCase().includes(query)) && !seen.has(item.url)) {
                results.push(item);
                seen.add(item.url);
            }
        });

        // Priority 3: Description match
        SEARCH_INDEX.forEach(item => {
            if (item.description.toLowerCase().includes(query) && !seen.has(item.url)) {
                results.push(item);
                seen.add(item.url);
            }
        });

        // Return max 8 results
        return results.slice(0, 8);
    }

    /**
     * Display results as clickable suggestions
     */
    function displayResults(results, container) {
        container.innerHTML = results.map((result, index) => `
            <a href="#" data-result-url="${result.url}" class="block px-4 py-3 border-b border-slate-200 dark:border-slate-700 last:border-b-0 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer group ${index === selectedIndex ? 'bg-slate-100 dark:bg-slate-700' : ''}">
                <div class="flex items-start justify-between gap-2">
                    <div class="flex-1 min-w-0">
                        <p class="font-bold text-slate-900 dark:text-white text-sm truncate">${escapeHtml(result.title)}</p>
                        <p class="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">${escapeHtml(result.description)}</p>
                    </div>
                    <span class="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors flex-shrink-0 text-base">arrow_outward</span>
                </div>
            </a>
        `).join('');

        // Attach click listeners to suggestions
        container.querySelectorAll('[data-result-url]').forEach(suggestion => {
            suggestion.addEventListener('click', handleSuggestionClick);
        });
    }

    /**
     * Handle suggestion click
     */
    function handleSuggestionClick(event) {
        event.preventDefault();
        const url = event.currentTarget.getAttribute('data-result-url');
        redirectToPage(url);
    }

    /**
     * Close results when clicking outside search area
     */
    function handleClickOutside(event) {
        const searchInput = document.querySelector(CONFIG.searchInputSelector);
        const resultsContainer = document.querySelector(CONFIG.resultsContainerSelector);
        
        // Check if click is outside search area
        if (!searchInput.contains(event.target) && !resultsContainer.contains(event.target)) {
            resultsContainer.classList.add('hidden');
        }
    }

    /**
     * Escape HTML to prevent XSS
     */
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Show temporary message (error or info)
     */
    function showMessage(message) {
        const searchInput = document.querySelector(CONFIG.searchInputSelector);
        const resultsContainer = document.querySelector(CONFIG.resultsContainerSelector);
        
        resultsContainer.innerHTML = `
            <div class="px-4 py-3 text-center text-slate-600 dark:text-slate-400 text-sm">
                ${escapeHtml(message)}
            </div>
        `;
        resultsContainer.classList.remove('hidden');

        // Auto-hide after 4 seconds
        setTimeout(() => {
            resultsContainer.classList.add('hidden');
        }, 4000);
    }

    /**
     * Redirect to search result page
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
