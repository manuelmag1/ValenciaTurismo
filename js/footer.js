// Unified Footer Component
const footerHTML = `
    <footer class="bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 pt-16 pb-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div class="col-span-1 md:col-span-1">
                    <a href="index.html" class="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
                        <span class="material-symbols-outlined text-primary text-3xl">eco</span>
                        <h2 class="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Valencia</h2>
                    </a>
                    <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6" data-i18n="index_footer_description">
                        Leading the Mediterranean in sustainable urban tourism through conservation, community support,
                        and green infrastructure.
                    </p>
                    <div class="flex gap-4">
                        <a class="size-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all" href="#">
                            <span class="material-symbols-outlined text-base">share</span>
                        </a>
                        <a class="size-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all" href="#">
                            <span class="material-symbols-outlined text-base">public</span>
                        </a>
                        <a class="size-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all" href="#">
                            <span class="material-symbols-outlined text-base">camera</span>
                        </a>
                    </div>
                </div>
                <div>
                    <h4 class="font-bold text-slate-900 dark:text-white mb-6" data-i18n="index_footer_discover">Discover</h4>
                    <ul class="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                        <li><a class="hover:text-primary transition-colors" href="#" data-i18n="index_turia_garden">Turia Garden</a></li>
                        <li><a class="hover:text-primary transition-colors" href="#" data-i18n="index_city_arts_sciences">City of Arts &amp; Sciences</a></li>
                        <li><a class="hover:text-primary transition-colors" href="#" data-i18n="index_eco_gastronomy">Eco-Gastronomy</a></li>
                        <li><a class="hover:text-primary transition-colors" href="#" data-i18n="index_sustainable_lodging">Sustainable Lodging</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-slate-900 dark:text-white mb-6" data-i18n="index_commitment">Commitment</h4>
                    <ul class="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                        <li><a class="hover:text-primary transition-colors" href="#" data-i18n="index_plan_2030">2030 Green Plan</a></li>
                        <li><a class="hover:text-primary transition-colors" href="#" data-i18n="index_carbon_neutral">Carbon Neutral Goal</a></li>
                        <li><a class="hover:text-primary transition-colors" href="#" data-i18n="index_local_artisans">Local Artisans</a></li>
                        <li><a class="hover:text-primary transition-colors" href="#" data-i18n="index_reports_data">Reports &amp; Data</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-slate-900 dark:text-white mb-6" data-i18n="index_newsletter">Newsletter</h4>
                    <p class="text-sm text-slate-600 dark:text-slate-400 mb-4" data-i18n="index_stay_updated">Stay updated on our latest green initiatives.</p>
                    <div class="flex flex-col gap-2">
                        <input class="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-primary focus:border-primary" placeholder="Email address" type="email" data-i18n-placeholder="index_email_address" />
                        <button class="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold py-2 rounded-lg text-sm hover:opacity-90 transition-opacity" data-i18n="index_subscribe">Subscribe</button>
                    </div>
                </div>
            </div>
            <div class="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                <p data-i18n="index_copyright">&copy; 2024 Sustainable Valencia Tourism Board. All rights reserved.</p>
                <div class="flex gap-6">
                    <a class="hover:text-slate-900 dark:hover:text-white" href="#" data-i18n="index_privacy_policy">Privacy Policy</a>
                    <a class="hover:text-slate-900 dark:hover:text-white" href="#" data-i18n="index_terms_use">Terms of Use</a>
                    <a class="hover:text-slate-900 dark:hover:text-white" href="#" data-i18n="index_cookie_settings">Cookie Settings</a>
                </div>
            </div>
        </div>
    </footer>
`;

// Load footer on page ready
document.addEventListener('DOMContentLoaded', function() {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.insertAdjacentHTML('beforeend', footerHTML);
    }
});
