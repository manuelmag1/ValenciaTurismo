// Unified Header Component
const headerHTML = `
    <header class="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 items-center justify-between">
                <a href="index.html" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <span class="material-symbols-outlined text-primary text-3xl">eco</span>
                    <h2 class="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Valencia</h2>
                </a>
                <nav class="hidden md:flex items-center gap-8 z-50">
                    <div class="relative group">
                        <a class="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1 py-4" href="discover.html">
                            <span data-i18n="header_discover">Discover</span>
                            <span class="material-symbols-outlined text-sm transition-transform duration-200 group-hover:rotate-180">expand_more</span>
                        </a>
                        <div class="absolute left-0 top-[100%] w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform origin-top scale-95 group-hover:scale-100">
                            <div class="relative group/sub">
                                <a class="block px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors rounded-xl m-1 break-words flex items-center justify-between">
                                    <span data-i18n="header_sustainable_natural">Sustainable Natural</span>
                                    <span class="material-symbols-outlined text-sm">chevron_right</span>
                                </a>
                                <div class="absolute left-full top-0 w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 z-50">
                                    <a class="block px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors rounded-xl m-1" href="albufera.html" data-i18n="header_albufera_park">Albufera Natural Park</a>
                                    <a class="block px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors rounded-xl m-1" href="turia_garden.html" data-i18n="index_turia_garden">Turia Garden</a>
                                    <a class="block px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors rounded-xl m-1" href="bioparc_valencia.html" data-i18n="header_bioparc">Bioparc Valencia</a>
                                    <a class="block px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors rounded-xl m-1" href="dehesa_saler.html" data-i18n="header_dehesa_saler">Dehesa del Saler</a>
                                </div>
                            </div>
                            <a class="block px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors rounded-xl m-1 break-words" href="eco_friendly_activities.html" data-i18n="header_eco_friendly">Eco-Friendly Activities</a>
                            <a class="block px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors rounded-xl m-1 break-words" href="itineraries.html" data-i18n="header_itineraries">Itineraries</a>
                        </div>
                    </div>

                    <div class="relative group">
                        <a class="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1 py-4" href="gastronomy.html">
                            <span data-i18n="index_gastronomy">Gastronomy</span>
                            <span class="material-symbols-outlined text-sm transition-transform duration-200 group-hover:rotate-180">expand_more</span>
                        </a>
                        <div class="absolute left-0 top-[100%] w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform origin-top scale-95 group-hover:scale-100">
                            <a class="block px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors rounded-xl m-1 break-words" href="traditional_dishes.html" data-i18n="header_traditional_dishes">Traditional Dishes</a>
                            <a class="block px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors rounded-xl m-1 break-words" href="central_markets.html" data-i18n="header_central_markets">Central Markets</a>
                        </div>
                    </div>

                    <div class="relative group">
                        <a class="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1 py-4" href="events.html">
                            <span data-i18n="index_events">Events</span>
                            <span class="material-symbols-outlined text-sm transition-transform duration-200 group-hover:rotate-180">expand_more</span>
                        </a>
                        <div class="absolute left-0 top-[100%] w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform origin-top scale-95 group-hover:scale-100">
                            <a class="block px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors rounded-xl m-1 break-words" href="cultural_festivals.html" data-i18n="header_cultural_festivals">Cultural Festivals</a>
                            <a class="block px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors rounded-xl m-1 break-words" href="local_workshops.html" data-i18n="header_local_workshops">Local Workshops</a>
                        </div>
                    </div>

                    <div class="relative group">
                        <a class="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1 py-4" href="about.html">
                            <span data-i18n="header_about">About</span>
                            <span class="material-symbols-outlined text-sm transition-transform duration-200 group-hover:rotate-180">expand_more</span>
                        </a>
                        <div class="absolute left-0 top-[100%] w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform origin-top scale-95 group-hover:scale-100">
                            <a class="block px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors rounded-xl m-1 break-words" href="history_heritage.html" data-i18n="header_history_heritage">History &amp; Heritage</a>
                            <a class="block px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors rounded-xl m-1 break-words" href="our_mission.html" data-i18n="header_our_mission">Our Mission</a>
                        </div>
                    </div>
                </nav>
                <div class="flex items-center gap-4">
                    <!-- Mobile Menu Toggle Button -->
                    <button id="mobile-menu-btn" class="md:hidden flex items-center justify-center p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <span class="material-symbols-outlined text-slate-700 dark:text-slate-200">menu</span>
                    </button>
                    
                    <!-- Language Toggle -->
                    <button id="language-toggle" class="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all" title="Toggle between English and Spanish / Cambiar entre Inglés y Español">
                        <span class="material-symbols-outlined text-sm">language</span>
                        <span id="lang-display">ES / EN</span>
                    </button>
                </div>
            </div>
        </div>
    </header>
    
    <!-- Mobile Navigation Menu -->
    <nav id="mobile-navigation" class="hidden md:hidden flex-col bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl">
        <div class="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 space-y-2">
            <!-- Mobile: Discover Section -->
            <div class="mobile-nav-group">
                <div class="flex items-center justify-between w-full border-b border-transparent">
                    <a href="discover.html" class="flex-1 px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors rounded-lg" data-i18n="header_discover">Discover</a>
                    <button class="mobile-nav-toggle p-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                        <span class="material-symbols-outlined text-sm transition-transform">expand_more</span>
                    </button>
                </div>
                <div class="mobile-nav-submenu hidden flex-col bg-slate-50 dark:bg-slate-800 ml-4 mt-1 rounded-lg overflow-hidden">
                    <a href="albufera.html" class="px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary transition-colors" data-i18n="header_albufera_park">Albufera Natural Park</a>
                    <a href="turia_garden.html" class="px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary transition-colors" data-i18n="index_turia_garden">Turia Garden</a>
                    <a href="bioparc_valencia.html" class="px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary transition-colors" data-i18n="header_bioparc">Bioparc Valencia</a>
                    <a href="dehesa_saler.html" class="px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary transition-colors" data-i18n="header_dehesa_saler">Dehesa del Saler</a>
                    <a href="eco_friendly_activities.html" class="px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary transition-colors" data-i18n="header_eco_friendly">Eco-Friendly Activities</a>
                    <a href="itineraries.html" class="px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary transition-colors" data-i18n="header_itineraries">Itineraries</a>
                </div>
            </div>
            
            <!-- Mobile: Gastronomy Section -->
            <div class="mobile-nav-group">
                <div class="flex items-center justify-between w-full border-b border-transparent">
                    <a href="gastronomy.html" class="flex-1 px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors rounded-lg" data-i18n="index_gastronomy">Gastronomy</a>
                    <button class="mobile-nav-toggle p-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                        <span class="material-symbols-outlined text-sm transition-transform">expand_more</span>
                    </button>
                </div>
                <div class="mobile-nav-submenu hidden flex-col bg-slate-50 dark:bg-slate-800 ml-4 mt-1 rounded-lg overflow-hidden">
                    <a href="traditional_dishes.html" class="px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary transition-colors" data-i18n="header_traditional_dishes">Traditional Dishes</a>
                    <a href="central_markets.html" class="px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary transition-colors" data-i18n="header_central_markets">Central Markets</a>
                </div>
            </div>
            
            <!-- Mobile: Events Section -->
            <div class="mobile-nav-group">
                <div class="flex items-center justify-between w-full border-b border-transparent">
                    <a href="events.html" class="flex-1 px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors rounded-lg" data-i18n="index_events">Events</a>
                    <button class="mobile-nav-toggle p-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                        <span class="material-symbols-outlined text-sm transition-transform">expand_more</span>
                    </button>
                </div>
                <div class="mobile-nav-submenu hidden flex-col bg-slate-50 dark:bg-slate-800 ml-4 mt-1 rounded-lg overflow-hidden">
                    <a href="cultural_festivals.html" class="px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary transition-colors" data-i18n="header_cultural_festivals">Cultural Festivals</a>
                    <a href="local_workshops.html" class="px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary transition-colors" data-i18n="header_local_workshops">Local Workshops</a>
                </div>
            </div>
            
            <!-- Mobile: About Section -->
            <div class="mobile-nav-group">
                <div class="flex items-center justify-between w-full border-b border-transparent">
                    <a href="about.html" class="flex-1 px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors rounded-lg" data-i18n="header_about">About</a>
                    <button class="mobile-nav-toggle p-3 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                        <span class="material-symbols-outlined text-sm transition-transform">expand_more</span>
                    </button>
                </div>
                <div class="mobile-nav-submenu hidden flex-col bg-slate-50 dark:bg-slate-800 ml-4 mt-1 rounded-lg overflow-hidden">
                    <a href="history_heritage.html" class="px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary transition-colors" data-i18n="header_history_heritage">History &amp; Heritage</a>
                    <a href="our_mission.html" class="px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary transition-colors" data-i18n="header_our_mission">Our Mission</a>
                </div>
            </div>
        </div>
    </nav>
`;

// Load header on page ready
document.addEventListener('DOMContentLoaded', function() {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        headerContainer.insertAdjacentHTML('beforeend', headerHTML);
        
        // Apply translations to the newly inserted header
        const applyHeaderTranslations = () => {
            if (typeof window.i18nManager !== 'undefined') {
                window.i18nManager.applyLanguage(window.i18nManager.getLanguage());
            } else {
                // Wait a bit more for i18nManager to be available
                setTimeout(applyHeaderTranslations, 50);
            }
        };
        applyHeaderTranslations();
    }

    // Setup language toggle button
    setupLanguageToggle();
    
    // Setup mobile menu functionality
    setupMobileMenu();

    // Listen for language changes from other pages
    window.addEventListener('languageChanged', function(e) {
        updateLanguageDisplay(e.detail.language);
    });
});

/**
 * Setup language toggle button functionality
 */
function setupLanguageToggle() {
    const button = document.getElementById('language-toggle');
    if (!button) return;

    // Wait for i18nManager to be available
    const waitForI18n = setInterval(() => {
        if (typeof window.i18nManager !== 'undefined') {
            clearInterval(waitForI18n);

            // Update display on load
            updateLanguageDisplay(window.i18nManager.getLanguage());

            // Add click handler
            button.addEventListener('click', function(e) {
                e.preventDefault();
                toggleLanguage();
            });
        }
    }, 100);
}

/**
 * Toggle between English and Spanish
 */
function toggleLanguage() {
    if (typeof window.i18nManager === 'undefined') {
        console.error('i18nManager not initialized');
        return;
    }

    const currentLang = window.i18nManager.getLanguage();
    const newLang = currentLang === 'en' ? 'es' : 'en';

    window.i18nManager.setLanguage(newLang);
    updateLanguageDisplay(newLang);
}

/**
 * Update language display on button
 */
function updateLanguageDisplay(lang) {
    const display = document.getElementById('lang-display');
    if (display) {
        display.textContent = lang === 'es' ? 'ES/EN' : 'EN/ES';
    }
}

/**
 * Setup mobile menu toggle functionality
 */
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNavigation = document.getElementById('mobile-navigation');
    
    if (!mobileMenuBtn || !mobileNavigation) {
        console.warn('Mobile menu elements not found');
        return;
    }
    
    // Toggle mobile menu on button click
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isHidden = mobileNavigation.classList.contains('hidden');
        
        if (isHidden) {
            // Open menu
            mobileNavigation.classList.remove('hidden');
            mobileNavigation.classList.add('flex');
            changeMobileMenuIcon(true);
        } else {
            // Close menu
            mobileNavigation.classList.add('hidden');
            mobileNavigation.classList.remove('flex');
            changeMobileMenuIcon(false);
        }
    });
    
    // Setup submenu toggles
    const mobileNavGroups = document.querySelectorAll('.mobile-nav-group');
    mobileNavGroups.forEach(group => {
        const toggle = group.querySelector('.mobile-nav-toggle');
        const submenu = group.querySelector('.mobile-nav-submenu');
        
        if (toggle && submenu) {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                
                const isHidden = submenu.classList.contains('hidden');
                const icon = toggle.querySelector('.material-symbols-outlined');
                
                if (isHidden) {
                    // Open submenu
                    submenu.classList.remove('hidden');
                    submenu.classList.add('flex');
                    if (icon) icon.classList.add('rotate-180');
                } else {
                    // Close submenu
                    submenu.classList.add('hidden');
                    submenu.classList.remove('flex');
                    if (icon) icon.classList.remove('rotate-180');
                }
            });
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        const isClickInside = mobileNavigation.contains(e.target) || mobileMenuBtn.contains(e.target);
        
        if (!isClickInside && !mobileNavigation.classList.contains('hidden')) {
            mobileNavigation.classList.add('hidden');
            mobileNavigation.classList.remove('flex');
            changeMobileMenuIcon(false);
        }
    });
    
    // Close menu when clicking on a link
    const mobileLinks = mobileNavigation.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNavigation.classList.add('hidden');
            mobileNavigation.classList.remove('flex');
            changeMobileMenuIcon(false);
        });
    });
}

/**
 * Change mobile menu button icon between menu and close
 */
function changeMobileMenuIcon(isOpen) {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (!mobileMenuBtn) return;
    
    const icon = mobileMenuBtn.querySelector('.material-symbols-outlined');
    if (!icon) return;
    
    if (isOpen) {
        icon.textContent = 'close';
    } else {
        icon.textContent = 'menu';
    }
}
