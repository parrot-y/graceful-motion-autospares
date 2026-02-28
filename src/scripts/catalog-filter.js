/**
 * Catalog Filter Logic - Renovyte V2
 * Dynamically renders products from RenovyteProducts database
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const makeSelect = document.getElementById('filterMake');
    const modelSelect = document.getElementById('filterModel');
    const yearSelect = document.getElementById('filterYear');
    const engineSelect = document.getElementById('filterEngine');
    const categorySelect = document.getElementById('filterCategory');
    const findPartsBtn = document.getElementById('findPartsBtn');
    const resetBtn = document.getElementById('resetFiltersBtn');
    const productGrid = document.getElementById('productGrid');
    const mobileFilterTrigger = document.getElementById('mobileFilterTrigger');
    const catalogSidebar = document.querySelector('.catalog-sidebar');
    const filterBackdrop = document.getElementById('filterBackdrop');

    // Mobile Filter Logic
    mobileFilterTrigger?.addEventListener('click', () => {
        catalogSidebar?.classList.add('active');
        filterBackdrop?.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    });

    const closeFilterDrawer = () => {
        catalogSidebar?.classList.remove('active');
        filterBackdrop?.classList.remove('active');
        document.body.style.overflow = '';
    };

    filterBackdrop?.addEventListener('click', closeFilterDrawer);

    // Vehicle Data
    const carData = {
        'AUDI': { models: ['All Models', 'A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q2', 'Q3', 'Q5', 'Q7', 'Q8', 'TT', 'R8'] },
        'BMW': { models: ['All Models', '1 Series', '2 Series', '3 Series', '4 Series', '5 Series', '6 Series', '7 Series', '8 Series', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7', 'Z4', 'M3', 'M4', 'M5'] },
        'CADILLAC': { models: ['All Models', 'ATS', 'CTS', 'CT4', 'CT5', 'CT6', 'Escalade', 'XT4', 'XT5', 'XT6'] },
        'CHEVROLET': { models: ['All Models', 'Aveo', 'Captiva', 'Cruze', 'Malibu', 'Optra', 'Spark', 'Tahoe', 'Trailblazer', 'Trax'] },
        'DAIHATSU': { models: ['All Models', 'Boon', 'Hijet', 'Mira', 'Move', 'Rocky', 'Tanto', 'Terios', 'Thor'] },
        'DODGER': { models: ['All Models', 'Challenger', 'Charger', 'Durango', 'Journey', 'Ram'] },
        'FORD': { models: ['All Models', 'Everest', 'Explorer', 'F-150', 'Fiesta', 'Focus', 'Mustang', 'Ranger', 'Transit'] },
        'HINO': { models: ['All Models', '300 Series', '500 Series', '700 Series', 'Dutro', 'Profia', 'Ranger'] },
        'HONDA': { models: ['All Models', 'Accord', 'Civic', 'CR-V', 'Fit', 'HR-V', 'Insight', 'Jade', 'Odyssey', 'Pilot', 'Stream', 'Vezel'] },
        'HYUNDAI': { models: ['All Models', 'Accent', 'Creta', 'Elantra', 'Ioniq', 'Kona', 'Santa Fe', 'Sonata', 'Tucson', 'Venue'] },
        'INFINITY': { models: ['All Models', 'Q50', 'Q60', 'Q70', 'QX50', 'QX60', 'QX70', 'QX80'] },
        'ISUZU': { models: ['All Models', 'D-Max', 'DQR', 'Elf', 'Forward', 'Giga', 'Mu-X', 'NKR', 'NPR', 'Trooper'] },
        'JAGUAR': { models: ['All Models', 'E-Pace', 'F-Pace', 'F-Type', 'I-Pace', 'XE', 'XF', 'XJ'] },
        'JEEP': { models: ['All Models', 'Cherokee', 'Compass', 'Gladiator', 'Grand Cherokee', 'Renegade', 'Wrangler'] },
        'KIA': { models: ['All Models', 'Carnival', 'Cerato', 'Picanto', 'Rio', 'Seltos', 'Sorento', 'Soul', 'Sportage', 'Stinger'] },
        'LANDROVER': { models: ['All Models', 'Defender', 'Discovery', 'Discovery Sport', 'Evoque', 'Range Rover', 'Range Rover Sport', 'Range Rover Velar', 'Vogue'] },
        'LEXUS': { models: ['All Models', 'ES', 'GS', 'GX', 'IS', 'LS', 'LX', 'NX', 'RX', 'UX'] },
        'MAZDA': { models: ['All Models', 'Atenza', 'Axela', 'BT-50', 'CX-3', 'CX-30', 'CX-5', 'CX-8', 'CX-9', 'Demio', 'MX-5'] },
        'MERCEDES': { models: ['All Models', 'A-Class', 'B-Class', 'C-Class', 'CLA', 'CLS', 'E-Class', 'G-Wagon', 'GLA', 'GLB', 'GLC', 'GLE', 'GLS', 'S-Class', 'SL', 'V-Class'] },
        'MITSUBISHI': { models: ['All Models', 'ASX', 'Canter', 'Eclipse Cross', 'Fuso', 'L200', 'Lancer', 'Outlander', 'Pajero', 'Pajero Sport', 'Xpander'] },
        'NISSAN': { models: ['All Models', 'GT-R', 'Juke', 'March', 'Navara', 'Note', 'Patrol', 'Qashqai', 'Sylphy', 'Tiida', 'X-Trail'] },
        'OPEL': { models: ['All Models', 'Astra', 'Corsa', 'Crossland', 'Insignia', 'Mokka', 'Vivarro'] },
        'PEUGEOT': { models: ['All Models', '208', '308', '508', '2008', '3008', '5008'] },
        'RENAULT': { models: ['All Models', 'Captur', 'Duster', 'Koleos', 'Kwid', 'Megane', 'Zoe'] },
        'SCANIA': { models: ['All Models', 'G-Series', 'L-Series', 'P-Series', 'R-Series', 'S-Series'] },
        'SUBARU': { models: ['All Models', 'Exiga', 'Forester', 'Impreza', 'Legacy', 'Levorg', 'Outback', 'WRX', 'XV'] },
        'SUZUKI': { models: ['All Models', 'Alto', 'Every', 'Ignis', 'Jimny', 'Swift', 'SX4', 'Vitara'] },
        'TATA': { models: ['All Models', 'Ace', 'Prima', 'Telcoline', 'Xenon'] },
        'TOYOTA': { models: ['All Models', 'Allion', 'Camry', 'Corolla', 'Crown', 'Fielder', 'Fortuner', 'Harrier', 'Hilux', 'Land Cruiser', 'Land Cruiser Prado', 'Premio', 'Rav4', 'Rush', 'Supra', 'Vitz', 'Wish', 'Yaris'] },
        'VOLKSWAGEN': { models: ['All Models', 'Amarok', 'Caddy', 'Golf', 'Passat', 'Polo', 'Tiguan', 'Touareg', 'Transporter'] },
        'VOLVO': { models: ['All Models', 'S60', 'S90', 'V40', 'V60', 'XC40', 'XC60', 'XC90'] },
        'Universal': { models: ['All Models'] }
    };

    const engineSizes = ['Select Option', '600', '660', '800', '1.2', '1.3', '1.5L', '1.6', '1.8L', '2.0L', '2.2L', '2.4L', '2.5L', '2.5 Turbo', '2.7L', '3.0L', '4.7L', '5.6L'];

    // Slug to Category Name mapping — covers all URL forms used across the site
    const categoryMap = {
        'service': 'Service & Maintainance',
        'service-parts': 'Service & Maintainance',
        'tyres': 'Tire and Wheels',
        'tyres-wheels': 'Tire and Wheels',
        'tire-and-wheels': 'Tire and Wheels',
        'braking': 'Braking System',
        'braking-system': 'Braking System',
        'lighting': 'Car Lighting',
        'car-lighting': 'Car Lighting',
        'accessories': 'Car Accessories',
        'car-accessories': 'Car Accessories',
        'exterior': 'Car Accessories',
        'exterior-accessories': 'Car Accessories',
        'body': 'Body Parts',
        'body-parts': 'Body Parts',
        'engine': 'Engine & Components',
        'engine-components': 'Engine & Components',
        'suspension': 'Suspension & Bearings',
        'suspension-steering': 'Suspension & Bearings',
        'suspension-bearings': 'Suspension & Bearings'
    };

    // Check URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    let categoryParam = urlParams.get('category');
    const searchParam = urlParams.get('search');
    const subcategoryParam = urlParams.get('item');

    // Parse and apply URL category BEFORE initial render (prevent all-products flash)
    if (categoryParam) {
        const mappedName = categoryMap[categoryParam.toLowerCase()] || categoryParam;
        categoryParam = mappedName;
        categorySelect.value = mappedName;
        // Update breadcrumb to show selected category
        const breadcrumb = document.getElementById('catalogBreadcrumb');
        if (breadcrumb) breadcrumb.textContent = mappedName;
    }

    const resultsCountEl = document.getElementById('resultsCount');
    const sortBySelect = document.getElementById('sortBy');

    // Sort-by listener
    sortBySelect?.addEventListener('change', () => applyFilters(searchParam, subcategoryParam));

    initMakeDropdown();
    initYearAndEngineDropdowns();
    applyFilters(searchParam, subcategoryParam);

    // Live search wiring — catalog search input
    const catalogSearchInput = document.querySelector('.search-part-input');
    const catalogSearchBtn = document.querySelector('.search-btn-v3');

    if (catalogSearchInput) {
        catalogSearchInput.addEventListener('input', () => {
            applyFilters(catalogSearchInput.value.trim());
        });
        catalogSearchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') applyFilters(catalogSearchInput.value.trim());
        });
    }
    if (catalogSearchBtn) {
        catalogSearchBtn.addEventListener('click', () => {
            applyFilters(catalogSearchInput?.value.trim() || '');
        });
    }


    // --- Core Functions ---

    function sortProducts(products) {
        const sort = sortBySelect?.value || '';
        const cloned = [...products];
        if (sort === 'price-asc') {
            cloned.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        } else if (sort === 'price-desc') {
            cloned.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        } else if (sort === 'rating-desc') {
            cloned.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        } else if (sort === 'name-asc') {
            cloned.sort((a, b) => a.name.localeCompare(b.name));
        }
        return cloned;
    }

    function parsePrice(priceStr) {
        if (!priceStr) return 0;
        return parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
    }

    function renderProducts(products) {
        if (!productGrid) return;

        // Update result count
        if (resultsCountEl) {
            const cat = categorySelect?.value;
            const label = cat ? `in <strong>${cat}</strong>` : '';
            resultsCountEl.innerHTML = products.length === 0
                ? 'No products found'
                : `Showing <strong>${products.length}</strong> product${products.length !== 1 ? 's' : ''} ${label}`;
        }

        productGrid.innerHTML = '';

        if (products.length === 0) {
            productGrid.innerHTML = `
                <div class="no-results-state" style="grid-column: 1/-1; text-align: center; padding: 80px 20px;">
                    <div style="font-size: 3.5rem; margin-bottom: 16px;">🔍</div>
                    <h3 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 8px;">No Parts Found</h3>
                    <p style="color: var(--text-secondary); margin-bottom: 24px;">Try adjusting your filters or search terms.</p>
                    <a href="catalog.html" style="display: inline-block; background: var(--accent-primary); color: white; padding: 12px 28px; border-radius: 8px; font-weight: 700; text-decoration: none;">Browse All Products</a>
                </div>
            `;
            return;
        }

        const sorted = sortProducts(products);

        sorted.forEach((product, index) => {
            const stars = Math.round(product.rating || 4.5);
            const starsHtml = '★'.repeat(stars) + '☆'.repeat(5 - stars);
            const reviewCount = Math.floor(Math.random() * 180 + 20);
            const card = document.createElement('div');
            card.className = 'product-card';
            card.style.animationDelay = `${index * 40}ms`;
            card.innerHTML = `
                <div class="product-image-wrapper">
                    <span class="product-stock-badge">In Stock</span>
                    <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy" onerror="this.src='assets/images/hero/hero-1.webp'">
                    <div class="product-actions">
                        <a href="product-details.html?id=${product.id}" class="action-btn btn-view">
                            <i class="fas fa-eye"></i> View
                        </a>
                        <button class="action-btn btn-cart add-to-cart-btn" data-id="${product.id}">
                            <i class="fas fa-shopping-cart"></i> +Cart
                        </button>
                    </div>
                </div>
                <div class="product-details">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-rating-row">
                        <span class="product-stars">${starsHtml}</span>
                        <span class="product-review-count">(${reviewCount})</span>
                    </div>
                    <div class="product-price-row">
                        <span class="product-price">${product.price}</span>
                        <button class="product-wishlist-btn" data-id="${product.id}" title="Add to Wishlist">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
            `;
            productGrid.appendChild(card);
        });

        // Wishlist toggle
        productGrid.querySelectorAll('.product-wishlist-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const icon = btn.querySelector('i');
                const isWished = icon.classList.contains('fa-solid', 'fa-heart') || btn.classList.contains('active');
                if (isWished) {
                    icon.className = 'far fa-heart';
                    btn.classList.remove('active');
                } else {
                    icon.className = 'fas fa-heart';
                    btn.classList.add('active');
                    btn.style.color = '#e74c3c';
                }
            });
        });
    }

    function applyFilters(searchQuery = '', subcatOverride = null) {
        const actualSearchQuery = (typeof searchQuery === 'string') ? searchQuery : '';

        const filters = {
            category: categorySelect.value,
            make: makeSelect.value,
            model: modelSelect.value,
            year: yearSelect.value,
            engine: engineSelect.value
        };

        // Render active filter chips
        const activeFiltersEl = document.getElementById('activeFilters');
        const chipsEl = document.getElementById('activeFilterChips');
        if (chipsEl) {
            chipsEl.innerHTML = '';
            const activeList = [];
            if (filters.category) activeList.push({ label: filters.category, clear: () => { categorySelect.value = ''; applyFilters(); } });
            if (filters.make) activeList.push({ label: `Make: ${filters.make}`, clear: () => { makeSelect.value = ''; applyFilters(); } });
            if (filters.model) activeList.push({ label: `Model: ${filters.model}`, clear: () => { modelSelect.value = ''; applyFilters(); } });
            if (filters.year) activeList.push({ label: `Year: ${filters.year}`, clear: () => { yearSelect.value = ''; applyFilters(); } });
            if (filters.engine) activeList.push({ label: `Engine: ${filters.engine}`, clear: () => { engineSelect.value = ''; applyFilters(); } });

            if (activeFiltersEl) activeFiltersEl.style.display = activeList.length ? 'flex' : 'none';

            activeList.forEach(item => {
                const chip = document.createElement('span');
                chip.className = 'filter-chip';
                chip.innerHTML = `${item.label} <button class="chip-remove">✕</button>`;
                chip.querySelector('.chip-remove').addEventListener('click', item.clear);
                chipsEl.appendChild(chip);
            });
        }

        // Clear all handler
        document.getElementById('clearAllFilters')?.addEventListener('click', () => {
            categorySelect.value = ''; makeSelect.value = '';
            modelSelect.value = ''; yearSelect.value = ''; engineSelect.value = '';
            renderProducts(window.RenovyteProducts || []);
            if (activeFiltersEl) activeFiltersEl.style.display = 'none';
        });

        const activeSubcat = subcatOverride || subcategoryParam;

        const filtered = (window.RenovyteProducts || []).filter(p => {
            const matchCategory = !filters.category || p.category === filters.category;
            const matchMake = !filters.make || p.make === 'Universal' || p.make === filters.make;
            const matchModel = !filters.model || p.model === 'Universal' || p.model === filters.model;
            const matchYear = !filters.year || p.year === 'All Years' || p.year === filters.year;

            // Allow partial match for engine (e.g., "2000cc" matches "2000cc Turbo")
            const matchEngine = !filters.engine || p.engine === 'Universal' ||
                (p.engine && p.engine.toLowerCase().includes(filters.engine.toLowerCase()));

            let matchSearch = true;
            if (actualSearchQuery) {
                const q = actualSearchQuery.toLowerCase();
                matchSearch = p.name.toLowerCase().includes(q) ||
                    (p.description && p.description.toLowerCase().includes(q)) ||
                    (p.subcategory && p.subcategory.toLowerCase().includes(q)) ||
                    (p.id && p.id.toLowerCase().includes(q));
            }

            // Subcategory filter
            let matchSubcategory = true;
            if (activeSubcat) {
                const subQ = activeSubcat.toLowerCase().replace(/-/g, ' ');
                matchSubcategory = p.subcategory && p.subcategory.toLowerCase().includes(subQ);
            }

            return matchCategory && matchMake && matchModel && matchYear && matchEngine && matchSearch && matchSubcategory;
        });

        renderProducts(filtered);
    }

    // --- Dropdown Management ---

    function initMakeDropdown() {
        if (!makeSelect) return;
        const makes = Object.keys(carData).sort();
        populateDropdown(makeSelect, makes);
    }

    function initYearAndEngineDropdowns() {
        if (yearSelect) {
            const currentYear = new Date().getFullYear();
            const years = [];
            for (let y = currentYear; y >= 2000; y--) {
                years.push(y.toString());
            }
            populateDropdown(yearSelect, years);
        }

        if (engineSelect) {
            populateDropdown(engineSelect, engineSizes);
        }
    }

    makeSelect?.addEventListener('change', (e) => {
        const make = e.target.value;
        resetSelect(modelSelect, 'Select Model');
        if (make && carData[make]) {
            populateDropdown(modelSelect, carData[make].models);
            modelSelect.disabled = false;
            if (yearSelect) yearSelect.disabled = false;
            if (engineSelect) engineSelect.disabled = false;
        } else {
            modelSelect.disabled = true;
            if (yearSelect) yearSelect.disabled = true;
            if (engineSelect) engineSelect.disabled = true;
        }
    });

    findPartsBtn?.addEventListener('click', () => {
        applyFilters();
        closeFilterDrawer();
    });

    resetBtn?.addEventListener('click', () => {
        categorySelect.value = '';
        makeSelect.value = '';
        resetSelect(modelSelect, 'Select Model');
        if (yearSelect) yearSelect.value = '';
        if (engineSelect) engineSelect.value = '';
        modelSelect.disabled = true;
        if (yearSelect) yearSelect.disabled = true;
        if (engineSelect) engineSelect.disabled = true;
        renderProducts(window.RenovyteProducts || []);
        closeFilterDrawer();
    });

    // Helper functions
    function populateDropdown(select, items) {
        items.forEach(item => {
            const opt = document.createElement('option');
            opt.value = item;
            opt.textContent = item;
            select.appendChild(opt);
        });
    }

    function resetSelect(select, text) {
        select.innerHTML = `<option value="">${text}</option>`;
    }
});
