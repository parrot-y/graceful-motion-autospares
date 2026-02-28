/**
 * Categories Mega Menu V2 - Renovyte Style
 */

class CategoriesMenu {
    constructor() {
        this.hub = document.getElementById('headerCategories');
        this.btn = document.getElementById('categoriesBtn');
        this.dropdown = document.getElementById('categoriesDropdown');
        this.content = this.dropdown?.querySelector('.mega-menu-content');

        this.isOpen = false;
        this.currentCategory = 'service'; // Default

        this.categoryData = {
            'service': {
                title: 'Service & Maintenance',
                icon: 'fa-oil-can',
                items: [
                    { name: 'Air Filters', icon: 'fa-wind' },
                    { name: 'ATF Filters', icon: 'fa-filter' },
                    { name: 'Brake Fluids', icon: 'fa-droplet' },
                    { name: 'Cabin Filters', icon: 'fa-fan' },
                    { name: 'Coolants', icon: 'fa-snowflake' },
                    { name: 'Engine Oils', icon: 'fa-oil-can' },
                    { name: 'Fuel Filters', icon: 'fa-gas-pump' },
                    { name: 'Gear Oils', icon: 'fa-bottle-droplet' },
                    { name: 'Oil Filters', icon: 'fa-filter' }
                ]
            },
            'tyres': {
                title: 'Tire and Wheels',
                icon: 'fa-circle-notch',
                items: [
                    { name: 'Lock Nuts', icon: 'fa-lock' },
                    { name: 'Rims', icon: 'fa-car' },
                    { name: 'Tire and Wheels', icon: 'fa-circle-notch' }
                ]
            },
            'braking': {
                title: 'Braking System',
                icon: 'fa-stop-circle',
                items: [
                    { name: 'Brake Booster/ Master Cylinder', icon: 'fa-circle-dot' },
                    { name: 'Brake Disks', icon: 'fa-compact-disc' },
                    { name: 'Brake Fluids', icon: 'fa-droplet' },
                    { name: 'Brake Linings', icon: 'fa-layer-group' },
                    { name: 'Brake Pads', icon: 'fa-pause' },
                    { name: 'Brake Pedals', icon: 'fa-shoe-prints' },
                    { name: 'Brake Shoes', icon: 'fa-shoe-prints' },
                    { name: 'Brake Wheel Cylinder', icon: 'fa-circle-notch' },
                    { name: 'Drums', icon: 'fa-drum' },
                    { name: 'Wheel Disks', icon: 'fa-compact-disc' }
                ]
            },
            'lighting': {
                title: 'Car Lighting',
                icon: 'fa-lightbulb',
                items: [
                    { name: 'Bi - LED Projector Lens', icon: 'fa-bullseye' },
                    { name: 'Boot Lights', icon: 'fa-door-open' },
                    { name: 'Brake Lights', icon: 'fa-stop' },
                    { name: 'DRLs (Daytime Running lights)', icon: 'fa-sun' },
                    { name: 'Fog light Covers', icon: 'fa-mask' },
                    { name: 'Fog lights', icon: 'fa-cloud' },
                    { name: 'Hallogen Bulbs', icon: 'fa-lightbulb' },
                    { name: 'Headlight Lens', icon: 'fa-eye' },
                    { name: 'Headlights', icon: 'fa-car-rear' },
                    { name: 'Klax Car Bulbs', icon: 'fa-bolt' },
                    { name: 'LED Bulbs', icon: 'fa-lightbulb' },
                    { name: 'Side Marker Lamps', icon: 'fa-caret-right' },
                    { name: 'Tail light Lens', icon: 'fa-eye' },
                    { name: 'Tail lights', icon: 'fa-car-rear' },
                    { name: 'Xenon Bulbs', icon: 'fa-bolt-lightning' }
                ]
            },
            'accessories': {
                title: 'Car Accessories',
                icon: 'fa-spray-can',
                items: [
                    { name: 'Android Radios', icon: 'fa-radio' },
                    { name: 'Back Rest', icon: 'fa-chair' },
                    { name: 'Body Kit', icon: 'fa-car' },
                    { name: 'Bumper Clips', icon: 'fa-paperclip' },
                    { name: 'Bumper Lips', icon: 'fa-minus' },
                    { name: 'Camera Unit', icon: 'fa-camera' },
                    { name: 'Car Alarms', icon: 'fa-bell' },
                    { name: 'Car Amplifiers', icon: 'fa-volume-high' },
                    { name: 'Car Covers', icon: 'fa-umbrella' },
                    { name: 'Car GPRS Trackers', icon: 'fa-location-dot' },
                    { name: 'Car Start Jumpers', icon: 'fa-bolt' },
                    { name: 'Car Polish & Sprays', icon: 'fa-spray-can' },
                    { name: 'Car Stereo', icon: 'fa-music' },
                    { name: 'Console Unit', icon: 'fa-box' },
                    { name: 'Dashboard Clock', icon: 'fa-clock' },
                    { name: 'Dashboard Covers', icon: 'fa-blanket' },
                    { name: 'Dashboard Fans', icon: 'fa-fan' },
                    { name: 'Dashcams', icon: 'fa-video' },
                    { name: 'Diffusers', icon: 'fa-wind' },
                    { name: 'Door edge Protectors', icon: 'fa-shield' },
                    { name: 'Driving Camera', icon: 'fa-video' },
                    { name: 'Fenders', icon: 'fa-shield-halved' },
                    { name: 'Fire Stop', icon: 'fa-fire-extinguisher' },
                    { name: 'Floor Mats', icon: 'fa-rug' },
                    { name: 'Head Rest', icon: 'fa-chair' },
                    { name: 'Horns', icon: 'fa-bullhorn' },
                    { name: 'Keyless Receiver Unit', icon: 'fa-key' },
                    { name: 'License Plates', icon: 'fa-id-card' },
                    { name: 'Life Savers', icon: 'fa-kit-medical' },
                    { name: 'Lock Nuts', icon: 'fa-lock' },
                    { name: 'Pioneer/ JBL Door speakers', icon: 'fa-volume-low' },
                    { name: 'Roof Handles', icon: 'fa-grip-lines' },
                    { name: 'Rooftop Fin Aerial', icon: 'fa-antenna' },
                    { name: 'Seat Belts', icon: 'fa-user-shield' },
                    { name: 'Seat covers', icon: 'fa-chair' },
                    { name: 'Shark Fins', icon: 'fa-fish' },
                    { name: 'Steering Covers', icon: 'fa-circle-notch' },
                    { name: 'Underseat Subwoofers', icon: 'fa-volume-high' },
                    { name: 'Wheel Caps', icon: 'fa-bullseye' },
                    { name: 'Wheel Hub Covers', icon: 'fa-circle' },
                    { name: 'Windscreen Shade', icon: 'fa-sun' }
                ]
            },
            'body': {
                title: 'Body Parts',
                icon: 'fa-car-side',
                items: [
                    { name: 'Bonnets', icon: 'fa-angle-up' },
                    { name: 'Boot/ Tail Gates', icon: 'fa-door-open' },
                    { name: 'Bumpers', icon: 'fa-minus' },
                    { name: 'Bumper side skirting', icon: 'fa-grip-lines' },
                    { name: 'Bumper slides', icon: 'fa-sliders' },
                    { name: 'Car Horns', icon: 'fa-bullhorn' },
                    { name: 'Door Motors', icon: 'fa-gear' },
                    { name: 'Door Sensor Unit', icon: 'fa-microchip' },
                    { name: 'Drive shafts', icon: 'fa-gears' },
                    { name: 'Front Wings', icon: 'fa-shield-halved' },
                    { name: 'Grilles', icon: 'fa-bars' },
                    { name: 'Hoods', icon: 'fa-angle-up' },
                    { name: 'Ignition Switches', icon: 'fa-key' },
                    { name: 'Radiators', icon: 'fa-fan' },
                    { name: 'Rear Cuts', icon: 'fa-cut' },
                    { name: 'Rear Wings', icon: 'fa-shield-halved' },
                    { name: 'Roof Racks', icon: 'fa-grip-lines-vertical' },
                    { name: 'Roof Strips', icon: 'fa-minus' },
                    { name: 'Side Mirrors', icon: 'fa-magnifying-glass' },
                    { name: 'Side Panels', icon: 'fa-border-all' },
                    { name: 'Spoilers', icon: 'fa-wind' },
                    { name: 'Steering racks', icon: 'fa-left-right' },
                    { name: 'Steering Wheels', icon: 'fa-circle-notch' },
                    { name: 'Stone Guards', icon: 'fa-shield' }
                ]
            },
            'engine': {
                title: 'Engine & Components',
                icon: 'fa-gears',
                items: [
                    { name: 'ABS Pumps', icon: 'fa-pump-soap' },
                    { name: 'ABS Sensors', icon: 'fa-microchip' },
                    { name: 'AC Pump Belts', icon: 'fa-rotate' },
                    { name: 'Acceleration Sensors', icon: 'fa-gauge' },
                    { name: 'Air Flow Sensors', icon: 'fa-wind' },
                    { name: 'Alternators', icon: 'fa-bolt-lightning' },
                    { name: 'Camshaft Sensors', icon: 'fa-microchip' },
                    { name: 'Chain Belts', icon: 'fa-link' },
                    { name: 'Crank shafts', icon: 'fa-gears' },
                    { name: 'Cylinder Heads', icon: 'fa-car-rear' },
                    { name: 'ECU computers', icon: 'fa-microchip' },
                    { name: 'Engine Coolants', icon: 'fa-snowflake' },
                    { name: 'Engine Mountings', icon: 'fa-anchor' },
                    { name: 'Engine Oils', icon: 'fa-oil-can' },
                    { name: 'Engine Seals', icon: 'fa-circle' },
                    { name: 'Engine Sump Guards', icon: 'fa-shield' },
                    { name: 'Fan Belts', icon: 'fa-rotate' },
                    { name: 'Fuel Pumps', icon: 'fa-gas-pump' },
                    { name: 'Fuel Pump Control Computers', icon: 'fa-microchip' },
                    { name: 'Fuel Pump Sieves', icon: 'fa-filter' },
                    { name: 'Gearbox Mountings', icon: 'fa-anchor' },
                    { name: 'Ignition Coils', icon: 'fa-bolt' },
                    { name: 'Oxygen Sensors', icon: 'fa-wind' },
                    { name: 'Power Management Control Modules', icon: 'fa-microchip' },
                    { name: 'Power Steering pumps', icon: 'fa-pump-soap' },
                    { name: 'Power Steering Reservoirs', icon: 'fa-bottle-droplet' },
                    { name: 'Pressure sensors', icon: 'fa-gauge' },
                    { name: 'Radiators', icon: 'fa-fan' },
                    { name: 'Radiator Caps', icon: 'fa-hard-hat' },
                    { name: 'Shaft seals', icon: 'fa-circle' },
                    { name: 'Solenoid Valves', icon: 'fa-bolt' },
                    { name: 'Spark plugs', icon: 'fa-bolt' },
                    { name: 'Steering Columns', icon: 'fa-circle-notch' },
                    { name: 'Temperature Controls', icon: 'fa-thermometer' },
                    { name: 'Thermostats', icon: 'fa-thermometer' },
                    { name: 'Throttle Body', icon: 'fa-gears' },
                    { name: 'Timing Belts', icon: 'fa-rotate' },
                    { name: 'Transmission Computers', icon: 'fa-microchip' },
                    { name: 'Transmission oils', icon: 'fa-oil-can' },
                    { name: 'Valve Body', icon: 'fa-gears' }
                ]
            },
            'suspension': {
                title: 'Suspension & Bearings',
                icon: 'fa-gauge-high',
                items: [
                    { name: 'Arm Bushes', icon: 'fa-circle' },
                    { name: 'Ball Joints', icon: 'fa-circle-dot' },
                    { name: 'Bearings', icon: 'fa-spinner' },
                    { name: 'Clutches', icon: 'fa-compact-disc' },
                    { name: 'Coil Springs', icon: 'fa-infinity' },
                    { name: 'Control Arms', icon: 'fa-hand-back-fist' },
                    { name: 'CV Joints', icon: 'fa-joint' },
                    { name: 'Drive Shaft Boots', icon: 'fa-shoe-prints' },
                    { name: 'Engine Mountings', icon: 'fa-anchor' },
                    { name: 'Exhaust Bushes', icon: 'fa-circle' },
                    { name: 'Gear box Mountings', icon: 'fa-anchor' },
                    { name: 'Idler Arms', icon: 'fa-hand-back-fist' },
                    { name: 'Rack ends', icon: 'fa-left-right' },
                    { name: 'Seals', icon: 'fa-circle' },
                    { name: 'Shock Absorber Mountings', icon: 'fa-up-down' },
                    { name: 'Shock Absorbers', icon: 'fa-up-down' },
                    { name: 'Stabilizer Bushes', icon: 'fa-circle' },
                    { name: 'Stabilizer Links', icon: 'fa-link' },
                    { name: 'Steering Boots', icon: 'fa-shoe-prints' },
                    { name: 'Steering Knuckles', icon: 'fa-hand-back-fist' },
                    { name: 'Steering shaft Bushes', icon: 'fa-circle' },
                    { name: 'Suspension Bushes', icon: 'fa-circle' },
                    { name: 'Tie rod ends', icon: 'fa-arrows-left-right-to-line' },
                    { name: 'Wheel Hubs', icon: 'fa-circle' }
                ]
            }
        };

        this.init();
    }

    init() {
        if (!this.hub) return;

        // Hover events for Desktop — with close delay so mouse can move to menu
        if (window.innerWidth > 992) {
            let closeTimer = null;

            const startCloseTimer = () => {
                closeTimer = setTimeout(() => this.closeDropdown(), 180);
            };

            const cancelCloseTimer = () => {
                if (closeTimer) clearTimeout(closeTimer);
            };

            this.hub.addEventListener('mouseenter', () => {
                cancelCloseTimer();
                this.openDropdown();
            });
            this.hub.addEventListener('mouseleave', startCloseTimer);

            // Also attach to the dropdown so moving into it cancels the close
            this.dropdown?.addEventListener('mouseenter', cancelCloseTimer);
            this.dropdown?.addEventListener('mouseleave', startCloseTimer);
        }

        // Click for Mobile / Button click
        this.btn?.addEventListener('click', (e) => {
            e.stopPropagation();
            if (window.innerWidth <= 992) {
                this.toggleDropdown();
            } else {
                window.location.href = 'catalog.html';
            }
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.hub.contains(e.target)) {
                this.closeDropdown();
            }
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeDropdown();
        });
    }

    toggleDropdown() {
        this.isOpen ? this.closeDropdown() : this.openDropdown();
    }

    openDropdown() {
        this.isOpen = true;
        this.dropdown.classList.add('active');
        this.btn.classList.add('active');
        this.renderMegaMenu();
    }

    closeDropdown() {
        this.isOpen = false;
        this.dropdown.classList.remove('active');
        this.btn.classList.remove('active');
    }

    renderMegaMenu() {
        if (!this.content) return;

        this.content.innerHTML = `
            <div class="mega-sidebar">
                ${Object.keys(this.categoryData).map(key => `
                    <div class="mega-category-item ${this.currentCategory === key ? 'active' : ''}" data-cat="${key}" style="cursor:pointer;">
                        <span>${this.categoryData[key].title}</span>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                `).join('')}
            </div>
            <div class="mega-main">
                <a href="catalog.html?category=${this.currentCategory}" class="mega-title" style="text-decoration:none;color:inherit;display:block;">${this.categoryData[this.currentCategory].title} →</a>
                <div class="mega-grid">
                    ${this.categoryData[this.currentCategory].items.map(item => `
                        <a href="catalog.html?category=${this.currentCategory}&item=${encodeURIComponent(item.name)}" class="mega-subcategory-link">
                            <i class="fas ${item.icon}"></i>
                            <span>${item.name}</span>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;

        // Add listeners to sidebar items
        this.content.querySelectorAll('.mega-category-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.currentCategory = item.dataset.cat;
                this.renderMegaMenu();
            });
            // Click navigates directly to that category
            item.addEventListener('click', () => {
                window.location.href = `catalog.html?category=${item.dataset.cat}`;
            });
        });
    }
}

// Global initialization
window.addEventListener('load', () => {
    window.categoriesMenu = new CategoriesMenu();
});
