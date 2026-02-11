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
        this.currentCategory = 'engine'; // Default

        this.categoryData = {
            'engine': {
                title: 'Engine & Components',
                icon: 'fa-engine',
                items: [
                    { name: 'Pistons', icon: 'fa-circle-notch' },
                    { name: 'Crankshaft', icon: 'fa-infinity' },
                    { name: 'Turbochargers', icon: 'fa-wind' },
                    { name: 'Spark Plugs', icon: 'fa-bolt' },
                    { name: 'Timing Belts', icon: 'fa-loop' },
                    { name: 'Gaskets', icon: 'fa-ring' }
                ]
            },
            'suspension': {
                title: 'Suspension & Steering',
                icon: 'fa-shuttle-space',
                items: [
                    { name: 'Shock Absorbers', icon: 'fa-angles-down' },
                    { name: 'Control Arms', icon: 'fa-hand-holding' },
                    { name: 'Steering Racks', icon: 'fa-gear' },
                    { name: 'Bushes', icon: 'fa-circle' }
                ]
            },
            'braking': {
                title: 'Braking Systems',
                icon: 'fa-stop-circle',
                items: [
                    { name: 'Brake Pads', icon: 'fa-pause' },
                    { name: 'Brake Discs', icon: 'fa-compact-disc' },
                    { name: 'Calipers', icon: 'fa-clapperboard' }
                ]
            },
            'service': {
                title: 'Service Parts',
                icon: 'fa-tools',
                items: [
                    { name: 'Oil Filters', icon: 'fa-oil-can' },
                    { name: 'Air Filters', icon: 'fa-wind' },
                    { name: 'Engine Oil', icon: 'fa-droplet' }
                ]
            }
        };

        this.init();
    }

    init() {
        if (!this.hub) return;

        // Hover events for Desktop
        if (window.innerWidth > 992) {
            this.hub.addEventListener('mouseenter', () => this.openDropdown());
            this.hub.addEventListener('mouseleave', () => this.closeDropdown());
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
                    <div class="mega-category-item ${this.currentCategory === key ? 'active' : ''}" data-cat="${key}">
                        <span>${this.categoryData[key].title}</span>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                `).join('')}
            </div>
            <div class="mega-main">
                <div class="mega-title">${this.categoryData[this.currentCategory].title}</div>
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
        });
    }
}

// Global initialization
window.addEventListener('load', () => {
    window.categoriesMenu = new CategoriesMenu();
});
