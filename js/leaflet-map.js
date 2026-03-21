// Leaflet Map Configuration for Valencia Sustainable Tourism
// with Real-Time Routing and Geolocation

document.addEventListener('DOMContentLoaded', function() {
    // ====================
    // GLOBAL VARIABLES
    // ====================
    let userLocation = null; // Store user's geolocation
    let currentRoute = null; // Store current active route
    let userMarker = null; // Store user location marker
    let userAccuracyCircle = null; // Store accuracy circle

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
    // GEOLOCATION FUNCTION
    // ====================
    function initializeUserLocation(callback) {
        map.locate({ setView: false, maxZoom: 16 });

        map.on('locationfound', function(e) {
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
                radius: e.accuracy,
                color: '#3b82f6',
                fillColor: '#3b82f6',
                fillOpacity: 0.1,
                weight: 1
            }).addTo(map);

            console.log('User location detected:', userLocation);

            if (callback) {
                callback();
            }
        });

        map.on('locationerror', function(e) {
            console.warn('❌ Geolocation denied or unavailable:', e.message);
            alert('Para trazar la ruta, necesitamos acceso a tu ubicación. Por favor, habilita el GPS en tu navegador.');
        });
    }

    // ====================
    // ROUTE CALCULATION FUNCTION
    // ====================
    function calculateRoute(destLat, destLng) {
        // If user hasn't shared location, request it first
        if (!userLocation) {
            console.log('📍 Requesting user location...');
            initializeUserLocation(function() {
                // After location is obtained, calculate the route
                drawRoute(userLocation[0], userLocation[1], destLat, destLng);
            });
        } else {
            // User location already available, draw route immediately
            drawRoute(userLocation[0], userLocation[1], destLat, destLng);
        }
    }

    // Helper function to draw the route using Leaflet Routing Machine
    function drawRoute(startLat, startLng, destLat, destLng) {
        // Remove previous route if it exists
        if (currentRoute) {
            map.removeControl(currentRoute);
        }

        // Create route using Leaflet Routing Machine
        currentRoute = L.Routing.control({
            waypoints: [
                L.latLng(startLat, startLng),
                L.latLng(destLat, destLng)
            ],
            router: L.Routing.osrmv1({
                serviceUrl: 'https://router.project-osrm.org/route/v1'
            }),
            routeWhileDragging: false,
            showAlternatives: false,
            lineOptions: {
                styles: [
                    {
                        color: '#0ea5e9', // primary color (cyan-500)
                        opacity: 0.8,
                        weight: 4,
                        lineCap: 'round',
                        lineJoin: 'round'
                    }
                ]
            },
            // Hide/minimize the instruction panel for minimal design impact
            createMarker: function(i, wp, nWps) {
                const icon = (i === 0) ? '📍' : '🎯';
                const marker = L.marker(wp.latLng, {
                    icon: L.divIcon({
                        html: `<div style="font-size: 20px; text-align: center;">${icon}</div>`,
                        iconSize: [24, 24],
                        className: 'waypoint-marker'
                    })
                });
                return marker;
            },
            // Keep the instruction summary panel invisible/minimal
            plan: L.Routing.Plan([], {
                createMarker: function(i, wp, nWps) {
                    const icon = (i === 0) ? 'my_location' : 'pin_drop';
                    return L.marker(wp.latLng, {
                        icon: L.icon({
                            iconUrl: '#',
                            className: 'hidden'
                        })
                    });
                }
            })
        }).addTo(map);

        // Fit map bounds to show entire route
        currentRoute.on('routesfound', function(e) {
            const route = e.routes[0];
            const bounds = L.latLngBounds(route.coordinates);
            map.fitBounds(bounds, { padding: [100, 100], duration: 1.5 });
            console.log('✅ Route calculated and displayed');
        });

        currentRoute.on('routingerror', function(e) {
            console.warn('⚠️ Routing error:', e.error);
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

    // Location button - now requests user's GPS location
    locationBtn.addEventListener('click', function() {
        if (!userLocation) {
            console.log('📍 Requesting user location...');
            initializeUserLocation();
        } else {
            // If location already available, center map on user
            map.setView(userLocation, 15);
            console.log('📍 Centered on your location');
        }
    });

    // Layers button - placeholder for future layer toggle functionality
    layersBtn.addEventListener('click', function() {
        console.log('Layers control clicked');
        // Future implementation for toggling different map layers
    });

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
            e.stopPropagation(); // Prevent card click event
            
            // Get parent card to extract coordinates
            const card = this.closest('[data-lat][data-lng]');
            if (card) {
                const destLat = parseFloat(card.getAttribute('data-lat'));
                const destLng = parseFloat(card.getAttribute('data-lng'));
                
                console.log('🗺️ View on Map clicked for destination:', destLat, destLng);
                
                // Calculate and display route to destination
                calculateRoute(destLat, destLng);
            }
        });
    });

    console.log('🗺️ Leaflet map initialized with routing capabilities');
});


