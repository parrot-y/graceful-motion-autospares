/**
 * Graceful Motion — Category Sidebar v3
 * A premium slide-in sidebar with accordion categories.
 * Works on both Desktop (categories button) and Mobile (hamburger).
 */

class CategorySidebar {
    constructor() {
        this.isOpen = false;
        this.activeCategory = null;

        this.categoryData = {
            service: {
                title: 'Service & Maintenance', icon: 'fa-oil-can', color: '#e67e22',
                items: [
                    'Air Filters', 'ATF Filters', 'Brake Fluids', 'Cabin Filters', 'Coolants',
                    'Engine Oils', 'Fuel Filters', 'Gear Oils', 'Oil Filters'
                ]
            },
            tyres: {
                title: 'Tire and Wheels', icon: 'fa-circle-notch', color: '#3498db',
                items: ['Lock Nuts', 'Rims', 'Tire and Wheels']
            },
            braking: {
                title: 'Braking System', icon: 'fa-stop-circle', color: '#e74c3c',
                items: [
                    'Brake Booster/ Master Cylinder', 'Brake Disks', 'Brake Fluids',
                    'Brake Linings', 'Brake Pads', 'Brake Pedals', 'Brake Shoes',
                    'Brake Wheel Cylinder', 'Drums', 'Wheel Disks'
                ]
            },
            lighting: {
                title: 'Car Lighting', icon: 'fa-lightbulb', color: '#f1c40f',
                items: [
                    'Bi - LED Projector Lens', 'Boot Lights', 'Brake Lights',
                    'DRLs (Daytime Running lights)', 'Fog light Covers', 'Fog lights',
                    'Hallogen Bulbs', 'Headlight Lens', 'Headlights', 'Klax Car Bulbs',
                    'LED Bulbs', 'Side Marker Lamps', 'Tail light Lens', 'Tail lights', 'Xenon Bulbs'
                ]
            },
            accessories: {
                title: 'Car Accessories', icon: 'fa-spray-can', color: '#9b59b6',
                items: [
                    'Android Radios', 'Back Rest', 'Body Kit', 'Bumper Clips', 'Bumper Lips',
                    'Camera Unit', 'Car Alarms', 'Car Amplifiers', 'Car Covers', 'Car GPRS Trackers',
                    'Car Start Jumpers', 'Car Polish & Sprays', 'Car Stereo', 'Console Unit',
                    'Dashboard Clock', 'Dashboard Covers', 'Dashboard Fans', 'Dashcams', 'Diffusers',
                    'Door edge Protectors', 'Driving Camera', 'Fenders', 'Fire Stop', 'Floor Mats',
                    'Head Rest', 'Horns', 'Keyless Receiver Unit', 'License Plates', 'Life Savers',
                    'Lock Nuts', 'Pioneer/ JBL Door speakers', 'Roof Handles', 'Rooftop Fin Aerial',
                    'Seat Belts', 'Seat covers', 'Shark Fins', 'Steering Covers',
                    'Underseat Subwoofers', 'Wheel Caps', 'Wheel Hub Covers', 'Windscreen Shade'
                ]
            },
            body: {
                title: 'Body Parts', icon: 'fa-car-side', color: '#2ecc71',
                items: [
                    'Bonnets', 'Boot/ Tail Gates', 'Bumpers', 'Bumper side skirting', 'Bumper slides',
                    'Car Horns', 'Door Motors', 'Door Sensor Unit', 'Drive shafts', 'Front Wings',
                    'Grilles', 'Hoods', 'Ignition Switches', 'Radiators', 'Rear Cuts',
                    'Rear Wings', 'Roof Racks', 'Roof Strips', 'Side Mirrors', 'Side Panels',
                    'Spoilers', 'Steering racks', 'Steering Wheels', 'Stone Guards'
                ]
            },
            engine: {
                title: 'Engine & Components', icon: 'fa-gears', color: '#1abc9c',
                items: [
                    'ABS Pumps', 'ABS Sensors', 'AC Pump Belts', 'Acceleration Sensors',
                    'Air Flow Sensors', 'Alternators', 'Camshaft Sensors', 'Chain Belts',
                    'Crank shafts', 'Cylinder Heads', 'ECU computers', 'Engine Coolants',
                    'Engine Mountings', 'Engine Oils', 'Engine Seals', 'Engine Sump Guards',
                    'Fan Belts', 'Fuel Pumps', 'Fuel Pump Control Computers', 'Fuel Pump Sieves',
                    'Gearbox Mountings', 'Ignition Coils', 'Oxygen Sensors',
                    'Power Management Control Modules', 'Power Steering pumps',
                    'Power Steering Reservoirs', 'Pressure sensors', 'Radiators', 'Radiator Caps',
                    'Shaft seals', 'Solenoid Valves', 'Spark plugs', 'Steering Columns',
                    'Temperature Controls', 'Thermostats', 'Throttle Body', 'Timing Belts',
                    'Transmission Computers', 'Transmission oils', 'Valve Body'
                ]
            },
            suspension: {
                title: 'Suspension & Bearings', icon: 'fa-gauge-high', color: '#e67e22',
                items: [
                    'Arm Bushes', 'Ball Joints', 'Bearings', 'Clutches', 'Coil Springs',
                    'Control Arms', 'CV Joints', 'Drive Shaft Boots', 'Engine Mountings',
                    'Exhaust Bushes', 'Gear box Mountings', 'Idler Arms', 'Rack ends', 'Seals',
                    'Shock Absorber Mountings', 'Shock Absorbers', 'Stabilizer Bushes',
                    'Stabilizer Links', 'Steering Boots', 'Steering Knuckles',
                    'Steering shaft Bushes', 'Suspension Bushes', 'Tie rod ends', 'Wheel Hubs'
                ]
            }
        };

        this._buildDOM();
        this._bindTriggers();
    }

    /* ── Build the sidebar DOM ── */
    _buildDOM() {
        // Overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'csb-overlay';
        this.overlay.setAttribute('aria-hidden', 'true');

        // Sidebar panel
        this.panel = document.createElement('aside');
        this.panel.className = 'csb-panel';
        this.panel.setAttribute('role', 'navigation');
        this.panel.setAttribute('aria-label', 'Product Categories');
        this.panel.innerHTML = this._template();

        document.body.appendChild(this.overlay);
        document.body.appendChild(this.panel);

        // Floating WhatsApp Button
        if (!document.querySelector('.fab-whatsapp')) {
            const fab = document.createElement('a');
            fab.className = 'fab-whatsapp';
            fab.href = 'https://wa.me/254723699157';
            fab.target = '_blank';
            fab.rel = 'noopener noreferrer';
            fab.setAttribute('aria-label', 'Chat on WhatsApp');
            fab.title = 'Chat on WhatsApp';
            fab.innerHTML = '<i class="fab fa-whatsapp"></i>';
            document.body.appendChild(fab);
        }

        // Wire close button
        this.panel.querySelector('.csb-close').addEventListener('click', () => this.close());

        // Wire search
        const searchInput = this.panel.querySelector('.csb-search-input');
        searchInput?.addEventListener('input', (e) => this._filterCategories(e.target.value));

        // Wire overlay click
        this.overlay.addEventListener('click', () => this.close());

        // Wire category items
        this.panel.querySelectorAll('.csb-cat-item').forEach(item => {
            item.addEventListener('click', () => {
                const key = item.dataset.key;
                this._toggleAccordion(key);
            });
        });

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) this.close();
        });
    }

    _template() {
        return `
        <div class="csb-header">
            <div class="csb-header-logo">
                <img src="assets/images/logo.png" alt="Graceful Motion" onerror="this.style.display='none'">
                <div class="csb-brand-text">
                    <span class="csb-brand-name">GRACEFUL MOTION</span>
                    <span class="csb-brand-sub">Autospares</span>
                </div>
            </div>
            <button class="csb-close" aria-label="Close menu">
                <i class="fas fa-times"></i>
            </button>
        </div>

        <div class="csb-search-wrap">
            <i class="fas fa-search csb-search-icon"></i>
            <input type="text" class="csb-search-input" placeholder="Search parts, accessories…" autocomplete="off">
        </div>

        <nav class="csb-body">
            <p class="csb-section-label">ALL CATEGORIES</p>
            <ul class="csb-cat-list">
                ${Object.entries(this.categoryData).map(([key, cat]) => `
                <li class="csb-cat-item" data-key="${key}">
                    <div class="csb-cat-row">
                        <span class="csb-cat-icon-wrap" style="background:${cat.color}22;color:${cat.color}">
                            <i class="fas ${cat.icon}"></i>
                        </span>
                        <span class="csb-cat-label">${cat.title}</span>
                        <span class="csb-cat-count">${cat.items.length}</span>
                        <i class="fas fa-chevron-right csb-chevron"></i>
                    </div>
                    <ul class="csb-sub-list" data-key="${key}" aria-hidden="true">
                        <li class="csb-sub-header">
                            <a href="catalog.html?category=${key}" class="csb-view-all">
                                View all in ${cat.title} <i class="fas fa-arrow-right"></i>
                            </a>
                        </li>
                        ${cat.items.map(item => `
                        <li class="csb-sub-item">
                            <a href="catalog.html?category=${key}&item=${encodeURIComponent(item)}" class="csb-sub-link">
                                <i class="fas fa-angle-right"></i>
                                ${item}
                            </a>
                        </li>`).join('')}
                    </ul>
                </li>`).join('')}
            </ul>
        </nav>

        <div class="csb-footer">
            <a href="tel:+254723699157" class="csb-footer-link">
                <i class="fas fa-phone"></i> Call Us
            </a>
            <a href="https://wa.me/254723699157" class="csb-footer-link csb-whatsapp">
                <i class="fab fa-whatsapp"></i> WhatsApp
            </a>
        </div>`;
    }

    _toggleAccordion(key) {
        const item = this.panel.querySelector(`.csb-cat-item[data-key="${key}"]`);
        const subList = this.panel.querySelector(`.csb-sub-list[data-key="${key}"]`);
        const isActive = item.classList.contains('active');

        // Close all
        this.panel.querySelectorAll('.csb-cat-item.active').forEach(el => {
            el.classList.remove('active');
        });
        this.panel.querySelectorAll('.csb-sub-list.open').forEach(el => {
            el.classList.remove('open');
            el.style.maxHeight = '0';
            el.setAttribute('aria-hidden', 'true');
        });

        // Open clicked (if wasn't active)
        if (!isActive) {
            item.classList.add('active');
            subList.classList.add('open');
            subList.style.maxHeight = subList.scrollHeight + 'px';
            subList.setAttribute('aria-hidden', 'false');
            // Scroll item into view
            setTimeout(() => {
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 200);
        }
    }

    _filterCategories(query) {
        const q = query.toLowerCase().trim();
        this.panel.querySelectorAll('.csb-cat-item').forEach(item => {
            const key = item.dataset.key;
            const cat = this.categoryData[key];
            const catMatch = cat.title.toLowerCase().includes(q);
            const subMatches = cat.items.filter(i => i.toLowerCase().includes(q));

            if (!q || catMatch || subMatches.length) {
                item.style.display = '';
                // If sub matches, expand
                if (q && !catMatch && subMatches.length) {
                    this._toggleAccordion(key);
                    // Highlight matching subs
                    item.querySelectorAll('.csb-sub-link').forEach(link => {
                        const show = link.textContent.toLowerCase().includes(q);
                        link.closest('.csb-sub-item').style.display = show ? '' : 'none';
                    });
                } else {
                    item.querySelectorAll('.csb-sub-item').forEach(si => si.style.display = '');
                }
            } else {
                item.style.display = 'none';
            }
        });
    }

    open() {
        this.isOpen = true;
        this.panel.classList.add('open');
        this.overlay.classList.add('visible');
        document.body.style.overflow = 'hidden';
        // Focus search
        setTimeout(() => {
            this.panel.querySelector('.csb-search-input')?.focus();
        }, 300);
    }

    close() {
        this.isOpen = false;
        this.panel.classList.remove('open');
        this.overlay.classList.remove('visible');
        document.body.style.overflow = '';
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    _bindTriggers() {
        // Desktop: categories button
        document.getElementById('categoriesBtn')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });

        // Mobile: hamburger
        document.getElementById('mobileMenuBtn')?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.categorySidebar = new CategorySidebar();
});
