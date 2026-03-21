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
    
    /**
     * Resets all origin mode states and cleans up the map
     * Ensures only one mode can be active at a time
     */
    function resetOriginMode() {
        console.log('🔄 Resetting origin mode states');
        
        // Stop GPS location tracking if active
        if (gpsLocationRequest !== null) {
            try {
                map.stopLocate();
                gpsLocationRequest = null;
                console.log('✅ GPS location tracking stopped');
            } catch (e) {
                console.warn('⚠️ Error stopping GPS:', e);
            }
        }
        
        // Remove all origin markers from map
        if (userMarker !== null) {
            try {
                map.removeLayer(userMarker);
                userMarker = null;
                console.log('✅ User GPS marker removed');
            } catch (e) {
                console.warn('⚠️ Error removing user marker:', e);
            }
        }
        
        if (userAccuracyCircle !== null) {
            try {
                map.removeLayer(userAccuracyCircle);
                userAccuracyCircle = null;
                console.log('✅ Accuracy circle removed');
            } catch (e) {
                console.warn('⚠️ Error removing accuracy circle:', e);
            }
        }
        
        if (manualOriginMarker !== null) {
            try {
                map.removeLayer(manualOriginMarker);
                manualOriginMarker = null;
                console.log('✅ Manual origin marker removed');
            } catch (e) {
                console.warn('⚠️ Error removing manual marker:', e);
            }
        }
        
        // Remove all map click listeners
        try {
            map.off('click');
            console.log('✅ Map click listeners removed');
        } catch (e) {
            console.warn('⚠️ Error removing click listeners:', e);
        }
        
        // Re-enable map dragging (in case it was disabled)
        try {
            map.dragging.enable();
            console.log('✅ Map dragging re-enabled');
        } catch (e) {
            console.warn('⚠️ Error enabling dragging:', e);
        }
        
        // Restore cursor to default
        const mapElement = document.querySelector('#map');
        if (mapElement) {
            mapElement.style.cursor = 'grab';
        }
        
        // Reset origin mode variable
        originMode = null;
        
        // Reset user location is NOT done here - only reset when switching modes
        // This preserves location if user switches between GPS and Pin
        
        console.log('🔄 Origin mode reset complete');
    }
    
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
        
        // First, reset all previous mode states
        resetOriginMode();
        
        // Update button states to GPS active
        const gpsBtns = document.querySelectorAll('#origin-gps-btn');
        const pinBtns = document.querySelectorAll('#origin-pin-btn');
        
        gpsBtns.forEach(btn => {
            btn.classList.add('bg-blue-500', 'dark:bg-blue-600', 'text-white');
            btn.classList.remove('bg-slate-100', 'dark:bg-slate-700', 'text-slate-700', 'dark:text-slate-300');
        });
        
        pinBtns.forEach(btn => {
            btn.classList.remove('bg-red-500', 'dark:bg-red-600', 'text-white');
            btn.classList.add('bg-slate-100', 'dark:bg-slate-700', 'text-slate-700', 'dark:text-slate-300');
        });
        
        // Set mode to GPS
        originMode = 'gps';
        updateOriginStatus('gps', '📍 Solicitando ubicación...');
        showToastNotification('📍 Activando GPS...');
        
        // Request GPS location with setView enabled
        if (map) {
            initializeUserLocation(function() {
                updateOriginStatus('gps', '✅ GPS activado - Listo');
                showToastNotification('✅ Tu ubicación ha sido establecida');
                console.log('✅ GPS mode activated successfully with location:', userLocation);
            });
        } else {
            console.error('❌ Map not initialized');
            showToastNotification('❌ Error: Mapa no disponible');
        }
    }

    function activatePinMode() {
        console.log('🎯 Activating Pin mode');
        
        // First, reset all previous mode states
        resetOriginMode();
        
        // Update button states to Pin active
        const gpsBtns = document.querySelectorAll('#origin-gps-btn');
        const pinBtns = document.querySelectorAll('#origin-pin-btn');
        
        gpsBtns.forEach(btn => {
            btn.classList.remove('bg-blue-500', 'dark:bg-blue-600', 'text-white');
            btn.classList.add('bg-slate-100', 'dark:bg-slate-700', 'text-slate-700', 'dark:text-slate-300');
        });
        
        pinBtns.forEach(btn => {
            btn.classList.add('bg-red-500', 'dark:bg-red-600', 'text-white');
            btn.classList.remove('bg-slate-100', 'dark:bg-slate-700', 'text-slate-700', 'dark:text-slate-300');
        });
        
        // Set mode to Pin
        originMode = 'pin';
        updateOriginStatus('pin', '🎯 Haz clic en el mapa para marcar inicio');
        showToastNotification('🎯 Modo de marcador activado');
        
        // Disable map dragging while in pin mode
        if (map) {
            try {
                map.dragging.disable();
                const mapElement = document.querySelector('#map');
                if (mapElement) {
                    mapElement.style.cursor = 'crosshair';
                }
                console.log('✅ Map dragging disabled, cursor changed to crosshair');
            } catch (e) {
                console.warn('⚠️ Error disabling dragging:', e);
            }
            
            // Enable map click listener for ONE click only
            map.once('click', function(event) {
                console.log('📍 Map clicked for pin placement at:', event.latlng);
                if (event.latlng) {
                    setManualOrigin(event.latlng);
                    
                    // Re-enable map dragging and restore cursor
                    try {
                        map.dragging.enable();
                        const mapElement = document.querySelector('#map');
                        if (mapElement) {
                            mapElement.style.cursor = 'grab';
                        }
                        console.log('✅ Map dragging re-enabled after pin placement');
                    } catch (e) {
                        console.warn('⚠️ Error re-enabling dragging:', e);
                    }
                }
            });
        } else {
            console.error('❌ Map not initialized');
            showToastNotification('❌ Error: Mapa no disponible');
        }
    }

    // ====================
    // GEOLOCATION FUNCTION
    // ====================
    function initializeUserLocation(callback) {
        // Validate map is ready
        if (!map) {
            console.error('❌ Map not initialized yet');
            showToastNotification('❌ Error: Mapa no disponible');
            return;
        }
        
        // Only request location if not already obtained in GPS mode
        if (userLocation && originMode === 'gps') {
            console.log('📍 User location already available:', userLocation);
            if (callback && typeof callback === 'function') callback();
            return;
        }

        console.log('📍 Requesting GPS location from device...');
        
        // Create handlers with proper event binding
        const handleLocationFound = function(e) {
            // Validate geolocation data
            if (!e.latlng || typeof e.latlng.lat !== 'number' || typeof e.latlng.lng !== 'number') {
                console.error('❌ Invalid geolocation data:', e);
                return;
            }

            // Only process if still in GPS mode
            if (originMode !== 'gps') {
                console.warn('⚠️ Location found but GPS mode was deactivated');
                return;
            }

            userLocation = [e.latlng.lat, e.latlng.lng];
            console.log('✅ User location obtained:', userLocation);

            // Remove previous markers if any
            if (userMarker) {
                try {
                    map.removeLayer(userMarker);
                } catch (e) {
                    console.warn('⚠️ Error removing previous marker:', e);
                }
            }
            if (userAccuracyCircle) {
                try {
                    map.removeLayer(userAccuracyCircle);
                } catch (e) {
                    console.warn('⚠️ Error removing previous circle:', e);
                }
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

            try {
                userMarker = L.marker([e.latlng.lat, e.latlng.lng], {
                    icon: userIcon,
                    title: 'Tu ubicación'
                }).addTo(map);

                // Add accuracy circle
                userAccuracyCircle = L.circle([e.latlng.lat, e.latlng.lng], {
                    radius: e.accuracy || 50,
                    color: '#3b82f6',
                    fillColor: '#3b82f6',
                    fillOpacity: 0.1,
                    weight: 1
                }).addTo(map);
                
                console.log('✅ GPS marker and accuracy circle added to map');
            } catch (e) {
                console.error('❌ Error adding markers to map:', e);
            }

            // Remove listeners to prevent duplicate processing
            map.off('locationfound', handleLocationFound);
            map.off('locationerror', handleLocationError);

            if (callback && typeof callback === 'function') {
                callback();
            }
        };
        
        const handleLocationError = function(e) {
            console.warn('❌ Geolocation error:', e.message);
            updateOriginStatus('gps', '❌ Permiso denegado');
            showToastNotification('❌ Permiso denegado o no disponible');
            originMode = null;
            
            // Remove listeners
            map.off('locationfound', handleLocationFound);
            map.off('locationerror', handleLocationError);
        };

        // Attach event handlers
        map.on('locationfound', handleLocationFound);
        map.on('locationerror', handleLocationError);
        
        // Request location with proper timeout
        try {
            gpsLocationRequest = map.locate({ setView: true, maxZoom: 16, timeout: 10000 });
            console.log('📍 GPS location request initiated');
        } catch (e) {
            console.error('❌ Error initiating GPS request:', e);
            showToastNotification('❌ Error al solicitar ubicación');
        }
    }

    // ====================
    // ROUTE CALCULATION FUNCTION
    // ====================
    function calculateRoute(destLat, destLng) {
        // Validate origin mode is selected
        if (!originMode) {
            console.warn('⚠️ No origin mode selected');
            showToastNotification('🚨 Por favor, selecciona primero tu punto de partida (GPS o Pin)');
            return;
        }
        
        // Validate user location exists
        if (!userLocation || !Array.isArray(userLocation) || userLocation.length !== 2) {
            console.warn('⚠️ Invalid user location');
            showToastNotification('🚨 Por favor, selecciona primero tu punto de partida (GPS o Pin)');
            return;
        }

        // Validate destination coordinates
        destLat = parseFloat(destLat);
        destLng = parseFloat(destLng);
        
        if (isNaN(destLat) || isNaN(destLng)) {
            console.error('❌ Invalid destination coordinates:', destLat, destLng);
            showToastNotification('❌ Coordenadas de destino inválidas');
            return;
        }
        
        // Validate coordinates are within reasonable bounds (approximately the Earth)
        if (Math.abs(destLat) > 90 || Math.abs(destLng) > 180) {
            console.error('❌ Coordinates out of bounds:', destLat, destLng);
            showToastNotification('❌ Coordenadas fuera de rango');
            return;
        }

        console.log('🎯 Calculating route from', originMode, 'origin:', userLocation, 'to destination:', [destLat, destLng]);
        
        // Store destination for potential recalculation on marker drag
        window.lastDestination = [destLat, destLng];
        
        // Clean up any existing route first
        removeExistingRoute();

        // Draw the route
        drawRoute(userLocation[0], userLocation[1], destLat, destLng);
    }

    // Helper function to draw the route using Leaflet Routing Machine
    function drawRoute(startLat, startLng, destLat, destLng) {
        // Validate map is ready
        if (!map || !map._renderer) {
            console.warn('⚠️ Map not fully initialized yet');
            showToastNotification('⚠️ Mapa no está completamente cargado');
            return;
        }
        
        // Validate origin location exists
        if (!userLocation || !Array.isArray(userLocation)) {
            console.warn('⚠️ No valid origin location');
            showToastNotification('⚠️ Por favor, selecciona primero un punto de inicio (GPS o Pin)');
            return;
        }
        
        // Ensure coordinates are numbers, not strings
        startLat = parseFloat(startLat);
        startLng = parseFloat(startLng);
        destLat = parseFloat(destLat);
        destLng = parseFloat(destLng);
        
        // Validate all coordinates are numbers
        if (isNaN(startLat) || isNaN(startLng) || isNaN(destLat) || isNaN(destLng)) {
            console.error('❌ Invalid route coordinates');
            showToastNotification('❌ Coordenadas de ruta inválidas');
            return;
        }
        
        // Validate coordinates are within geographical bounds
        if (Math.abs(startLat) > 90 || Math.abs(startLng) > 180 || 
            Math.abs(destLat) > 90 || Math.abs(destLng) > 180) {
            console.error('❌ Route coordinates out of bounds');
            showToastNotification('❌ Coordenadas fuera de rango válido');
            return;
        }
        
        // Prevent if start and destination are the same
        if (Math.abs(startLat - destLat) < 0.001 && Math.abs(startLng - destLng) < 0.001) {
            console.warn('⚠️ Start and destination are the same');
            showToastNotification('⚠️ El origen y destino no pueden ser el mismo');\n            return;
        }

        // Create route using Leaflet Routing Machine with strict visual configuration
        try {
            currentRoutingControl = L.Routing.control({
                waypoints: [
                    L.latLng(startLat, startLng),
                    L.latLng(destLat, destLng)
                ],
                router: L.Routing.osrmv1({
                    serviceUrl: 'https://router.project-osrm.org/route/v1'
                }),
                routeWhileDragging: false,
                showAlternatives: false,
                addWaypoints: false,
                show: false,
                itinerary: { 
                    containerClassName: 'hidden'
                },
                lineOptions: {
                    styles: [
                        {
                            color: '#10b981', // emerald-500
                            opacity: 0.85,
                            weight: 5,
                            lineCap: 'round',
                            lineJoin: 'round',
                            dashArray: '5,5'
                        }
                    ]
                },
                createMarker: function(i, wp, nWps) {
                    return null; // Hide default A/B markers
                }
            }).addTo(map);

            // Handle route found event
            currentRoutingControl.on('routesfound', function(e) {
                if (e.routes && e.routes.length > 0) {
                    const route = e.routes[0];
                    if (route.coordinates && route.coordinates.length > 0) {
                        const bounds = L.latLngBounds(route.coordinates);
                        // Fit bounds to show entire route
                        map.fitBounds(bounds, { 
                            padding: [150, 150],
                            maxZoom: 15
                        });
                        console.log('✅ Route calculated and displayed');
                        showToastNotification('✅ Ruta calculada y mostrada en el mapa');
                    }
                }
            });

            // Handle routing errors
            currentRoutingControl.on('routingerror', function(e) {
                console.warn('⚠️ Routing error:', e);
                showToastNotification('⚠️ No se pudo calcular la ruta');
            });
            
            console.log('✅ Route control created and added to map');
        } catch (e) {
            console.error('❌ Error creating route control:', e);
            showToastNotification('❌ Error al calcular la ruta');
        }
    }

    // ====================
    // ORIGIN MODE BUTTON HANDLERS
    // ====================
    // These are wrapped in DOMContentLoaded to ensure DOM is ready
    const initializeOriginModeButtons = function() {
        const gpsBtn = document.getElementById('origin-gps-btn');
        const pinBtn = document.getElementById('origin-pin-btn');

        if (gpsBtn) {
            gpsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('🔵 GPS button clicked');
                activateGPSMode();
            });
            console.log('✅ GPS button handler attached');
        } else {
            console.warn('⚠️ GPS button not found in DOM');
        }

        if (pinBtn) {
            pinBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('🔴 Pin button clicked');
                activatePinMode();
            });
            console.log('✅ Pin button handler attached');
        } else {
            console.warn('⚠️ Pin button not found in DOM');
        }
    };
    
    // Initialize button handlers
    initializeOriginModeButtons();

    // ====================
    // MAP CONTROLS
    // ====================
    const initializeMapControls = function() {
        const zoomInBtn = document.getElementById('zoom-in-btn');
        const zoomOutBtn = document.getElementById('zoom-out-btn');
        const locationBtn = document.getElementById('location-btn');
        const layersBtn = document.getElementById('layers-btn');

        // Zoom controls
        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (map) map.zoomIn();
            });
        }

        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (map) map.zoomOut();
            });
        }

        // Location button - center map on user location (only in GPS mode)
        if (locationBtn) {
            locationBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (!map) {
                    console.warn('⚠️ Map not initialized');
                    return;
                }
                
                if (originMode === 'gps' && userLocation && userLocation.length === 2) {
                    try {
                        map.setView(userLocation, 15);
                        console.log('📍 Map centered on user location:', userLocation);
                        showToastNotification('📍 Mapa centrado en tu ubicación');
                    } catch (e) {
                        console.error('❌ Error centering map:', e);
                    }
                } else if (originMode === 'pin' && userLocation) {
                    // In pin mode, just center on the placed pin
                    try {
                        map.setView(userLocation, 15);
                        console.log('📍 Map centered on pin marker:', userLocation);
                        showToastNotification('📍 Mapa centrado en tu marcador');
                    } catch (e) {
                        console.error('❌ Error centering map:', e);
                    }
                } else {
                    console.warn('⚠️ No origin location available');
                    showToastNotification('⚠️ Primero selecciona tu punto de partida');
                }
            });
        }

        // Layers button - placeholder for future layer toggle functionality
        if (layersBtn) {
            layersBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Layers control clicked');
                // Future implementation for toggling different map layers
            });
        }
        
        console.log('✅ Map control handlers initialized');
    };
    
    // Initialize map controls
    initializeMapControls();

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


