// Leaflet Map Configuration for Valencia Sustainable Tourism
// with Real-Time Routing and Geolocation

document.addEventListener('DOMContentLoaded', function() {
    // ====================
    // GLOBAL VARIABLES
    // ====================
    let userLocation = null; // Store user's geolocation
    let manualOriginMarker = null; // Store manually placed origin marker
    let currentRoutingControl = null; // Store current active routing control (single instance)
    let userMarker = null; // Store user location marker
    let userAccuracyCircle = null; // Store accuracy circle
    let originMode = null; // Store selected origin mode: 'gps' or 'pin'
    let gpsLocationRequest = null; // Store GPS location request ID

    // Initialize map centered on Valencia
    const map = L.map('map', {
        center: [39.4697, -0.3774],
        zoom: 13,
        zoomControl: false // Disable default Leaflet zoom control
    });

    // Add CartoDB DarkMatter tile layer for dark theme consistency
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap, © CartoDB',
        maxZoom: 19,
        subdomains: ['a', 'b', 'c']
    }).addTo(map);

    // Custom marker creation function with inline styling for Tailwind compatibility
    function createCustomMarker(lat, lng, name, icon, bgColor, ringColor) {
        const iconElement = document.createElement('div');
        iconElement.style.display = 'flex';
        iconElement.style.flexDirection = 'column';
        iconElement.style.alignItems = 'center';
        iconElement.style.gap = '0';

        // Main icon circle
        const circle = document.createElement('div');
        circle.style.backgroundColor = bgColor;
        circle.style.color = 'white';
        circle.style.padding = '8px';
        circle.style.borderRadius = '50%';
        circle.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.3)';
        circle.style.border = `4px solid ${ringColor}`;
        circle.style.display = 'flex';
        circle.style.alignItems = 'center';
        circle.style.justifyContent = 'center';
        circle.style.width = '36px';
        circle.style.height = '36px';

        // Icon
        const iconSpan = document.createElement('span');
        iconSpan.className = 'material-symbols-outlined';
        iconSpan.textContent = icon;
        iconSpan.style.fontSize = '18px';
        circle.appendChild(iconSpan);

        // Label
        const label = document.createElement('div');
        label.style.marginTop = '8px';
        label.style.backgroundColor = 'white';
        label.style.padding = '6px 12px';
        label.style.borderRadius = '8px';
        label.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        label.style.border = '1px solid #e2e8f0';
        label.style.whiteSpace = 'nowrap';
        label.style.fontSize = '12px';
        label.style.fontWeight = '700';
        label.style.color = '#1e293b';

        label.textContent = name;

        iconElement.appendChild(circle);
        iconElement.appendChild(label);

        const customIcon = L.divIcon({
            html: iconElement.outerHTML,
            iconSize: [100, 90],
            iconAnchor: [50, 90],
            popupAnchor: [0, -90],
            className: 'custom-marker'
        });

        return L.marker([lat, lng], {
            icon: customIcon,
            title: name
        }).addTo(map);
    }

    // Color configuration (matching Tailwind palette)
    const primaryColor = '#0ea5e9'; // cyan-500 (primary)
    const primaryRing = 'rgba(6, 182, 212, 0.2)';
    const blueColor = '#3b82f6'; // blue-500
    const blueRing = 'rgba(59, 130, 246, 0.2)';
    const amberColor = '#f59e0b'; // amber-500
    const amberRing = 'rgba(245, 158, 11, 0.2)';
    const tealColor = '#14b8a6'; // teal-500
    const tealRing = 'rgba(20, 184, 166, 0.2)';
    const emeraldColor = '#10b981'; // emerald-600
    const emeraldRing = 'rgba(16, 185, 129, 0.2)';

    // Store markers in an object for easy reference
    const markers = {};

    // Add markers for routes
    // 1. Turia Green Belt - Bike Route (Primary cyan color)
    markers.turia = createCustomMarker(
        39.476,
        -0.385,
        'Turia Garden Green Belt',
        'directions_bike',
        primaryColor,
        primaryRing
    );

    // 2. Albufera Natural Park - Water Route (Blue)
    markers.albufera = createCustomMarker(
        39.332,
        -0.334,
        'Albufera Natural Park',
        'favorite',
        blueColor,
        blueRing
    );

    // 3. Bioparc Valencia - Conservation (Amber)
    markers.bioparc = createCustomMarker(
        39.478,
        -0.407,
        'Bioparc Valencia',
        'pets',
        amberColor,
        amberRing
    );

    // 4. Dehesa del Saler - Coastal (Teal)
    markers.dehesa = createCustomMarker(
        39.340,
        -0.330,
        'Dehesa del Saler',
        'nature',
        tealColor,
        tealRing
    );

    // 5. Bird Watching Adventures - Albufera (Emerald)
    markers.birdwatch = createCustomMarker(
        39.358,
        -0.331,
        'Bird Watching Adventures',
        'favorite',
        emeraldColor,
        emeraldRing
    );

    // ====================
    // ROUTE CLEANUP FUNCTION
    // ====================
    function removeExistingRoute() {
        if (currentRoutingControl !== null) {
            try {
                map.removeControl(currentRoutingControl);
                currentRoutingControl = null;
                console.log('✅ Previous route removed');
            } catch (e) {
                console.warn('⚠️ Error removing route control:', e);
                currentRoutingControl = null;
            }
        }
    }

    // ====================
    // MANUAL ORIGIN MARKER FUNCTION
    // ====================
    function setManualOrigin(latlng) {
        // Remove previous manual origin marker if it exists
        if (manualOriginMarker !== null) {
            map.removeLayer(manualOriginMarker);
        }

        // Create custom origin marker with 'Tu Inicio' label
        const originIcon = L.divIcon({
            html: `
                <div style="
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0;
                ">
                    <div style="
                        background-color: #ef4444;
                        color: white;
                        padding: 8px;
                        border-radius: 50%;
                        border: 4px solid rgba(239, 68, 68, 0.3);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 36px;
                        height: 36px;
                        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
                    ">
                        <span class="material-symbols-outlined" style="font-size: 18px; color: white;">location_on</span>
                    </div>
                    <div style="
                        margin-top: 8px;
                        background-color: white;
                        padding: 6px 12px;
                        border-radius: 8px;
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                        border: 1px solid #e2e8f0;
                        white-space: nowrap;
                        font-size: 12px;
                        font-weight: 700;
                        color: #1e293b;
                    ">
                        Tu Inicio
                    </div>
                </div>
            `,
            iconSize: [100, 90],
            iconAnchor: [50, 90],
            className: 'manual-origin-marker'
        });

        // Create draggable marker
        manualOriginMarker = L.marker(latlng, {
            icon: originIcon,
            draggable: true,
            title: 'Arrastra para cambiar punto de inicio'
        }).addTo(map);

        // Update userLocation with manual origin coordinates
        userLocation = [latlng.lat, latlng.lng];

        // Show temporary toast notification
        showToastNotification('🎯 Punto de inicio fijado');
        updateOriginStatus('pin', '🎯 Punto de inicio fijado');

        // Clean up existing route when origin changes
        removeExistingRoute();

        // On dragend, update location and recalculate route if one exists
        manualOriginMarker.on('dragend', function(event) {
            const newLatlng = event.target.getLatLng();
            userLocation = [newLatlng.lat, newLatlng.lng];
            console.log('📍 Origin marker moved to:', userLocation);
            showToastNotification('🔄 Punto de inicio actualizado');
            
            // If there's a current destination (from card click), recalculate route
            if (window.lastDestination) {
                showToastNotification('🔄 Recalculando ruta...');
                drawRoute(userLocation[0], userLocation[1], window.lastDestination[0], window.lastDestination[1]);
            }
        });

        console.log('📍 Manual origin set at:', userLocation);
    }

    // ====================
    // TOAST NOTIFICATION FUNCTION
    // ====================
    function showToastNotification(message) {
        // Create toast element
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background-color: rgba(0, 0, 0, 0.85);
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            z-index: 9999;
            animation: slideUp 0.3s ease-out;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;
        toast.textContent = message;
        document.body.appendChild(toast);

        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideUp {
                from {
                    transform: translateY(100px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideUp 0.3s ease-out reverse';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // ====================
    // ORIGIN MODE FUNCTIONS
    // ====================
    function updateOriginStatus(mode, message) {
        const statusDiv = document.getElementById('origin-status');
        const statusText = document.getElementById('origin-status-text');
        
        if (message) {
            statusText.textContent = message;
            statusDiv.classList.remove('hidden');
        } else {
            statusDiv.classList.add('hidden');
        }
    }

    function activateGPSMode() {
        console.log('📍 Activating GPS mode');
        
        // Clean up previous pin mode
        if (originMode === 'pin') {
            map.off('click'); // Remove pin click listener
            map.dragging.enable(); // Re-enable map dragging
            map.cursor = 'grab';
        }
        
        // Update button states
        document.getElementById('origin-gps-btn').classList.add('bg-blue-500', 'dark:bg-blue-600', 'text-white');
        document.getElementById('origin-gps-btn').classList.remove('bg-slate-100', 'dark:bg-slate-700', 'text-slate-700', 'dark:text-slate-300');
        document.getElementById('origin-pin-btn').classList.remove('bg-blue-500', 'dark:bg-blue-600', 'text-white');
        document.getElementById('origin-pin-btn').classList.add('bg-slate-100', 'dark:bg-slate-700', 'text-slate-700', 'dark:text-slate-300');
        
        // Set mode
        originMode = 'gps';
        updateOriginStatus('gps', '📍 Solicita GPS...');
        
        // Remove manual marker if exists
        if (manualOriginMarker !== null) {
            map.removeLayer(manualOriginMarker);
            manualOriginMarker = null;
        }
        
        // Request GPS location
        initializeUserLocation(function() {
            updateOriginStatus('gps', '✅ GPS activado - Listo');
            showToastNotification('✅ Tu ubicación ha sido establecida');
        });
    }

    function activatePinMode() {
        console.log('🎯 Activating Pin mode');
        
        // Stop GPS if active
        if (originMode === 'gps' && gpsLocationRequest) {
            map.stopLocate();
        }
        
        // Clean GPS markers
        if (userMarker) {
            map.removeLayer(userMarker);
            userMarker = null;
        }
        if (userAccuracyCircle) {
            map.removeLayer(userAccuracyCircle);
            userAccuracyCircle = null;
        }
        
        // Update button states
        document.getElementById('origin-pin-btn').classList.add('bg-red-500', 'dark:bg-red-600', 'text-white');
        document.getElementById('origin-pin-btn').classList.remove('bg-slate-100', 'dark:bg-slate-700', 'text-slate-700', 'dark:text-slate-300');
        document.getElementById('origin-gps-btn').classList.remove('bg-blue-500', 'dark:bg-blue-600', 'text-white');
        document.getElementById('origin-gps-btn').classList.add('bg-slate-100', 'dark:bg-slate-700', 'text-slate-700', 'dark:text-slate-300');
        
        // Set mode
        originMode = 'pin';
        updateOriginStatus('pin', '🎯 Haz clic en el mapa para marcar inicio');
        
        // Change cursor to crosshair
        map.dragging.disable(); // Disable dragging while in pin mode
        document.querySelector('#map').style.cursor = 'crosshair';
        
        // Enable one-time click event for pin placement
        map.once('click', function(event) {
            setManualOrigin(event.latlng);
            map.dragging.enable(); // Re-enable dragging after pin placed
            document.querySelector('#map').style.cursor = 'grab';
        });
        
        showToastNotification('🎯 Modo de marcador activado');
    }

    // ====================
    // GEOLOCATION FUNCTION
    // ====================
    function initializeUserLocation(callback) {
        // Only request location if not already obtained
        if (userLocation && originMode === 'gps') {
            console.log('📍 User location already available:', userLocation);
            if (callback && typeof callback === 'function') callback();
            return;
        }

        console.log('📍 Requesting GPS location...');
        gpsLocationRequest = map.locate({ setView: false, maxZoom: 16, timeout: 10000 });

        map.on('locationfound', function(e) {
            // Validate geolocation data
            if (!e.latlng || typeof e.latlng.lat !== 'number' || typeof e.latlng.lng !== 'number') {
                console.error('❌ Invalid geolocation data:', e);
                return;
            }

            userLocation = [e.latlng.lat, e.latlng.lng];

            // Remove previous user marker if it exists
            if (userMarker) {
                map.removeLayer(userMarker);
            }
            if (userAccuracyCircle) {
                map.removeLayer(userAccuracyCircle);
            }

            // Create blue user location marker
            const userIcon = L.divIcon({
                html: `
                    <div style="
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 0;
                    ">
                        <div style="
                            background-color: #3b82f6;
                            color: white;
                            padding: 8px;
                            border-radius: 50%;
                            border: 4px solid rgba(59, 130, 246, 0.3);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 32px;
                            height: 32px;
                            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
                        ">
                            <span class="material-symbols-outlined" style="font-size: 16px;">my_location</span>
                        </div>
                    </div>
                `,
                iconSize: [48, 48],
                iconAnchor: [24, 48],
                className: 'user-location-marker'
            });

            userMarker = L.marker([e.latlng.lat, e.latlng.lng], {
                icon: userIcon,
                title: 'Your Location'
            }).addTo(map);

            // Add accuracy circle
            userAccuracyCircle = L.circle([e.latlng.lat, e.latlng.lng], {
                radius: e.accuracy || 50,
                color: '#3b82f6',
                fillColor: '#3b82f6',
                fillOpacity: 0.1,
                weight: 1
            }).addTo(map);

            console.log('✅ User location detected:', userLocation);

            if (callback && typeof callback === 'function') {
                callback();
            }
        });

        map.on('locationerror', function(e) {
            console.warn('❌ Geolocation denied or unavailable:', e.message);
            updateOriginStatus('gps', '❌ Permiso denegado');
            showToastNotification('❌ Permiso denegado. Usa "Marcar punto".');
            originMode = null;
        });
    }

    // ====================
    // ROUTE CALCULATION FUNCTION
    // ====================
    function calculateRoute(destLat, destLng) {
        // Validate that user has selected an origin
        if (!originMode || !userLocation) {
            console.warn('⚠️ No origin selected');
            showToastNotification('⚠️ Primero selecciona tu punto de partida en el mapa');
            return;
        }

        // Clean up any existing route first
        removeExistingRoute();

        // Ensure destination coordinates are parsed as numbers
        destLat = parseFloat(destLat);
        destLng = parseFloat(destLng);

        // Validate coordinates are valid numbers
        if (isNaN(destLat) || isNaN(destLng)) {
            console.error('❌ Invalid destination coordinates:', destLat, destLng);
            return;
        }

        // Store destination for potential recalculation on marker drag
        window.lastDestination = [destLat, destLng];

        // Use the stored userLocation
        if (userLocation && userLocation.length === 2) {
            console.log('🎯 Calculating route from:', originMode);
            drawRoute(userLocation[0], userLocation[1], destLat, destLng);
        } else {
            console.warn('⚠️ Invalid user location');
            showToastNotification('⚠️ No se pudo determinar tu origen');
        }
    }

    // Helper function to draw the route using Leaflet Routing Machine
    function drawRoute(startLat, startLng, destLat, destLng) {
        // Ensure coordinates are numbers, not strings
        startLat = parseFloat(startLat);
        startLng = parseFloat(startLng);
        destLat = parseFloat(destLat);
        destLng = parseFloat(destLng);

        // Verify map is ready
        if (!map || !map._renderer) {
            console.warn('⚠️ Map not fully initialized yet');
            return;
        }

        // Create route using Leaflet Routing Machine with strict visual configuration
        currentRoutingControl = L.Routing.control({
            waypoints: [
                L.latLng(startLat, startLng),
                L.latLng(destLat, destLng)
            ],
            router: L.Routing.osrmv1({
                serviceUrl: 'https://router.project-osrm.org/route/v1' // Demo service - add API key for production
            }),
            routeWhileDragging: false,
            showAlternatives: false, // Reduce OSRM server load
            addWaypoints: false, // Prevent adding intermediate waypoints
            show: false, // Hide the itinerary panel completely
            itinerary: { 
                containerClassName: 'hidden' // Additional safeguard to hide instructions
            },
            lineOptions: {
                styles: [
                    {
                        color: '#10b981', // emerald-500 - visible on dark/light backgrounds
                        opacity: 0.85,
                        weight: 5,
                        lineCap: 'round',
                        lineJoin: 'round',
                        dashArray: '5,5'
                    }
                ]
            },
            // Disable default Leaflet Routing markers (we have our own custom markers)
            createMarker: function(i, wp, nWps) {
                return null; // Return null to hide default A/B markers
            }
        }).addTo(map);

        // Fit map bounds to show entire route with user and destination visible
        currentRoutingControl.on('routesfound', function(e) {
            if (e.routes && e.routes.length > 0) {
                const route = e.routes[0];
                if (route.coordinates && route.coordinates.length > 0) {
                    const bounds = L.latLngBounds(route.coordinates);
                    // Fit bounds with padding to show both endpoints comfortably
                    map.fitBounds(bounds, { 
                        padding: [150, 150],
                        maxZoom: 15
                    });
                    console.log('✅ Route calculated and displayed with auto-fitted bounds');
                }
            }
        });

        currentRoutingControl.on('routingerror', function(e) {
            console.warn('⚠️ Routing error:', e);
        });
    }

    // ====================
    // ORIGIN MODE BUTTON HANDLERS
    // ====================
    const gpsBtn = document.getElementById('origin-gps-btn');
    const pinBtn = document.getElementById('origin-pin-btn');

    if (gpsBtn) {
        gpsBtn.addEventListener('click', function() {
            activateGPSMode();
        });
    }

    if (pinBtn) {
        pinBtn.addEventListener('click', function() {
            activatePinMode();
        });
    }

    // ====================
    // MAP CONTROLS
    // ====================
    const zoomInBtn = document.getElementById('zoom-in-btn');
    const zoomOutBtn = document.getElementById('zoom-out-btn');
    const locationBtn = document.getElementById('location-btn');
    const layersBtn = document.getElementById('layers-btn');

    // Zoom controls
    zoomInBtn.addEventListener('click', function() {
        map.zoomIn();
    });

    zoomOutBtn.addEventListener('click', function() {
        map.zoomOut();
    });

    // Location button - center map on user location (if available)
    locationBtn.addEventListener('click', function() {
        if (originMode === 'gps' && userLocation) {
            map.setView(userLocation, 15);
            console.log('📍 Centered on your location');
            showToastNotification('📍 Mapa centrado en tu ubicación');
        } else {
            showToastNotification('📍 Activa GPS primero');
        }
    });

    // Layers button - placeholder for future layer toggle functionality
    layersBtn.addEventListener('click', function() {
        console.log('Layers control clicked');
        // Future implementation for toggling different map layers
    });

    // ====================
    // MAP CLICK INTERACTION
    // ====================
    // Click interactions are handled by origin mode activation
    // (GPS mode and Pin mode set their own event listeners)

    // ====================
    // CARD CLICK HANDLERS - FlyTo + Route
    // ====================
    const turiCard = document.querySelector('.turia-card');
    const albufCard = document.querySelector('.albufera-card');
    const bioparcCard = document.querySelector('.bioparc-card');
    const dehesCard = document.querySelector('.dehesa-card');
    const birdwatchCard = document.querySelector('.birdwatch-card');

    // FlyTo functionality for cards (click anywhere on card)
    if (turiCard) {
        turiCard.addEventListener('click', function() {
            const lat = parseFloat(this.getAttribute('data-lat'));
            const lng = parseFloat(this.getAttribute('data-lng'));
            map.flyTo([lat, lng], 14, { duration: 2 });
            console.log('Flying to Turia Garden');
        });
    }

    if (albufCard) {
        albufCard.addEventListener('click', function() {
            const lat = parseFloat(this.getAttribute('data-lat'));
            const lng = parseFloat(this.getAttribute('data-lng'));
            map.flyTo([lat, lng], 14, { duration: 2 });
            console.log('Flying to Albufera');
        });
    }

    if (bioparcCard) {
        bioparcCard.addEventListener('click', function() {
            const lat = parseFloat(this.getAttribute('data-lat'));
            const lng = parseFloat(this.getAttribute('data-lng'));
            map.flyTo([lat, lng], 14, { duration: 2 });
            console.log('Flying to Bioparc Valencia');
        });
    }

    if (dehesCard) {
        dehesCard.addEventListener('click', function() {
            const lat = parseFloat(this.getAttribute('data-lat'));
            const lng = parseFloat(this.getAttribute('data-lng'));
            map.flyTo([lat, lng], 14, { duration: 2 });
            console.log('Flying to Dehesa del Saler');
        });
    }

    if (birdwatchCard) {
        birdwatchCard.addEventListener('click', function() {
            const lat = parseFloat(this.getAttribute('data-lat'));
            const lng = parseFloat(this.getAttribute('data-lng'));
            map.flyTo([lat, lng], 14, { duration: 2 });
            console.log('Flying to Bird Watching');
        });
    }

    // ====================
    // VIEW ON MAP BUTTON HANDLERS
    // ====================
    const viewMapButtons = document.querySelectorAll('.view-on-map-btn');

    viewMapButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card click event propagation
            
            // Get parent card to extract coordinates
            const card = this.closest('[data-lat][data-lng]');
            if (card) {
                // Parse coordinates as numbers
                const destLat = parseFloat(card.getAttribute('data-lat'));
                const destLng = parseFloat(card.getAttribute('data-lng'));
                
                // Validate coordinates before proceeding
                if (!isNaN(destLat) && !isNaN(destLng)) {
                    console.log('🗺️ View on Map clicked for destination:', destLat, destLng);
                    // Calculate and display route to destination
                    calculateRoute(destLat, destLng);
                } else {
                    console.error('❌ Invalid coordinates on card:', destLat, destLng);
                }
            } else {
                console.warn('⚠️ Could not find parent card with coordinates');
            }
        });
    });

    console.log('🗺️ Leaflet map initialized with routing capabilities');
});


