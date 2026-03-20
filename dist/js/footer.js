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
                    <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
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
                    <h4 class="font-bold text-slate-900 dark:text-white mb-6">Discover</h4>
                    <ul class="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                        <li><a class="hover:text-primary transition-colors" href="#">Turia Garden</a></li>
                        <li><a class="hover:text-primary transition-colors" href="#">City of Arts &amp; Sciences</a></li>
                        <li><a class="hover:text-primary transition-colors" href="#">Eco-Gastronomy</a></li>
                        <li><a class="hover:text-primary transition-colors" href="#">Sustainable Lodging</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-slate-900 dark:text-white mb-6">Commitment</h4>
                    <ul class="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                        <li><a class="hover:text-primary transition-colors" href="#">2030 Green Plan</a></li>
                        <li><a class="hover:text-primary transition-colors" href="#">Carbon Neutral Goal</a></li>
                        <li><a class="hover:text-primary transition-colors" href="#">Local Artisans</a></li>
                        <li><a class="hover:text-primary transition-colors" href="#">Reports &amp; Data</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-slate-900 dark:text-white mb-6">Newsletter</h4>
                    <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">Stay updated on our latest green initiatives.</p>
                    <div class="flex flex-col gap-2">
                        <input class="w-full rounded-lg border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-sm focus:ring-primary focus:border-primary" placeholder="Email address" type="email" />
                        <button class="w-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold py-2 rounded-lg text-sm hover:opacity-90 transition-opacity">Subscribe</button>
                    </div>
                </div>
            </div>
            <div class="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                <p>&copy; 2024 Sustainable Valencia Tourism Board. All rights reserved.</p>
                <div class="flex gap-6">
                    <a class="hover:text-slate-900 dark:hover:text-white" href="#">Privacy Policy</a>
                    <a class="hover:text-slate-900 dark:hover:text-white" href="#">Terms of Use</a>
                    <a class="hover:text-slate-900 dark:hover:text-white" href="#">Cookie Settings</a>
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
