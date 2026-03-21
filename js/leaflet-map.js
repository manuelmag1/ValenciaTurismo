// Leaflet Map Configuration for Valencia Sustainable Tourism
document.addEventListener('DOMContentLoaded', function() {
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

    // Add markers for routes
    // Turia Green Belt - Bike Route (Primary cyan color)
    createCustomMarker(
        39.4720,
        -0.3680,
        'Turia Green Belt',
        'directions_bike',
        primaryColor,
        primaryRing
    );

    // Albufera Boat Route - Water Route (Blue)
    createCustomMarker(
        39.3515,
        -0.3300,
        'Albufera Boat Route',
        'directions_boat',
        blueColor,
        blueRing
    );

    // Map Controls - Zoom In/Out buttons
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

    // Location button - center map on Valencia
    locationBtn.addEventListener('click', function() {
        map.setView([39.4697, -0.3774], 13);
    });

    // Layers button - placeholder for future layer toggle functionality
    layersBtn.addEventListener('click', function() {
        console.log('Layers control clicked');
        // Future implementation for toggling different map layers
    });
});

