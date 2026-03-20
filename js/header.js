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
                            Discover
                            <span class="material-symbols-outlined text-sm transition-transform duration-200 group-hover:rotate-180">expand_more</span>
                        </a>
                        <div class="absolute left-0 top-[100%] w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform origin-top scale-95 group-hover:scale-100">
                            <a class="block px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors rounded-xl m-1 break-words" href="itineraries.html">Itineraries</a>
                            <div class="relative group/sub">
                                <a class="block px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors rounded-xl m-1 break-words flex items-center justify-between">
                                    Sustainable Natural
                                    <span class="material-symbols-outlined text-sm">chevron_right</span>
                                </a>
                                <div class="absolute left-full top-0 w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 z-50">
                                    <a class="block px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors rounded-xl m-1" href="albufera.html">Albufera Natural Park</a>
                                    <a class="block px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors rounded-xl m-1" href="turia_garden.html">Turia Garden</a>
                                    <a class="block px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors rounded-xl m-1" href="bioparc_valencia.html">Bioparc Valencia</a>
                                    <a class="block px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors rounded-xl m-1" href="dehesa_saler.html">Dehesa del Saler</a>
                                </div>
                            </div>
                            <a class="block px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors rounded-xl m-1 break-words" href="eco_friendly_activities.html">Eco-Friendly Activities</a>
                        </div>
                    </div>

                    <div class="relative group">
                        <a class="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1 py-4" href="gastronomy.html">
                            Gastronomy
                            <span class="material-symbols-outlined text-sm transition-transform duration-200 group-hover:rotate-180">expand_more</span>
                        </a>
                        <div class="absolute left-0 top-[100%] w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform origin-top scale-95 group-hover:scale-100">
                            <a class="block px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors rounded-xl m-1 break-words" href="traditional_dishes.html">Traditional Dishes</a>
                            <a class="block px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors rounded-xl m-1 break-words" href="zero_mile_dining.html">Zero-Mile Dining</a>
                        </div>
                    </div>

                    <div class="relative group">
                        <a class="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1 py-4" href="events.html">
                            Events
                            <span class="material-symbols-outlined text-sm transition-transform duration-200 group-hover:rotate-180">expand_more</span>
                        </a>
                        <div class="absolute left-0 top-[100%] w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform origin-top scale-95 group-hover:scale-100">
                            <a class="block px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors rounded-xl m-1 break-words" href="cultural_festivals.html">Cultural Festivals</a>
                            <a class="block px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors rounded-xl m-1 break-words" href="local_workshops.html">Local Workshops</a>
                        </div>
                    </div>

                    <div class="relative group">
                        <a class="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1 py-4" href="about.html">
                            About
                            <span class="material-symbols-outlined text-sm transition-transform duration-200 group-hover:rotate-180">expand_more</span>
                        </a>
                        <div class="absolute left-0 top-[100%] w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform origin-top scale-95 group-hover:scale-100">
                            <a class="block px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors rounded-xl m-1 break-words" href="history_heritage.html">History &amp; Heritage</a>
                            <a class="block px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors rounded-xl m-1 break-words" href="our_mission.html">Our Mission</a>
                        </div>
                    </div>
                </nav>
                <div class="flex items-center gap-4">
                    <button class="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all">
                        <span class="material-symbols-outlined text-sm">language</span>
                        <span>ES / EN</span>
                    </button>
                    <div class="size-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border border-slate-200 dark:border-slate-800">
                        <img alt="User Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-pR-f3oWdptjhTklJ9h_V6yPVQqVtcjeZKGgZEas_rPzB9lfTLEJtdg7XBpkBgbtjFPnVMXJWzdMbPwhAAbCnkPvpXS_XpYbr27ullUL5zvXMspnBIDAcEh7ypASw8WcNAJVR2JqKekR0-DaXZQfK9IXGZKj4MEQhF4bIzQeMwu8Tq9aCfB9GLHkH-r539nUaXT5BHPHYAD6DoBjZ1MZElj4QG6Q3mNIhrT737p3uAmMOylV7ISK1g-72ZPQXRngj8Cj3PdG1H4M" />
                    </div>
                </div>
            </div>
        </div>
    </header>
`;

// Load header on page ready
document.addEventListener('DOMContentLoaded', function() {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        headerContainer.insertAdjacentHTML('beforeend', headerHTML);
    }
});
