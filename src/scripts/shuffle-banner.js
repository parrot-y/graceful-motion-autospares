/**
 * ShuffleBanner.js
 * Reusable logic for the animated "shuffling" part banners.
 * Can be used in the header and as a full-width section.
 */

class ShuffleBanner {
    constructor(config) {
        this.containerId = config.containerId;
        this.nameId = config.nameId;
        this.imgId = config.imgId;

        // Each slide has: displayName, category for text lookup, prefix, and a curated banner image
        this.slideConfigs = [
            {
                displayName: 'BODY PARTS',
                dataCategory: 'Body Parts',
                prefix: 'GET THE BEST',
                bannerImg: 'assets/images/products/isolated/hero_bumper.png'
            },
            {
                displayName: 'BRAKING SYSTEM',
                dataCategory: 'Braking System',
                prefix: 'RELIABLE',
                bannerImg: 'assets/images/products/isolated/hero_brake.png'
            },
            {
                displayName: 'ENGINE SPARES',
                dataCategory: 'Engine & Components',
                prefix: 'POWERFUL',
                bannerImg: 'assets/images/products/isolated/hero_turbo.png'
            },
            {
                displayName: 'CAR LIGHTING',
                dataCategory: 'Car Lighting',
                prefix: 'BRIGHT',
                bannerImg: 'assets/images/featured/projector-lens.png'
            },
            {
                displayName: 'SUSPENSION',
                dataCategory: 'Suspension & Bearings',
                prefix: 'SMOOTH',
                bannerImg: 'assets/images/featured/stabilizer-link.png'
            },
            {
                displayName: 'SERVICE KITS',
                dataCategory: 'Service & Maintenance',
                prefix: 'PREMIUM',
                bannerImg: 'assets/images/featured/cv-boot.png'
            }
        ];

        this.interval = config.interval || 4000;
        this.currentSlideIndex = 0;
        this.lastProductIds = {}; // Record last used product ID per category to avoid immediate repeat

        this.init();
    }

    init() {
        this.partNameEl = document.getElementById(this.nameId);
        this.partImgEl = document.getElementById(this.imgId);
        this.bannerInnerEl = document.getElementById(this.containerId);
        this.prefixEl = this.bannerInnerEl ? this.bannerInnerEl.querySelector('.banner-prefix') : null;

        if (!this.partNameEl || !this.partImgEl || !this.bannerInnerEl) {
            console.warn(`ShuffleBanner: Elements not found for ${this.containerId}`);
            return;
        }

        // Wait for product data to be available
        if (window.RenovyteProducts && window.RenovyteProducts.length > 0) {
            this.start();
        } else {
            document.addEventListener('RenovyteDataLoaded', () => this.start());
        }
    }

    start() {
        this.update(0);
        setInterval(() => this.next(), this.interval);
    }

    getRandomProductForCategory(categoryName) {
        const filteredProducts = window.RenovyteProducts.filter(p => p.category === categoryName);
        if (filteredProducts.length === 0) return null;

        const lastId = this.lastProductIds[categoryName];
        let available = filteredProducts;

        // Try to pick a different one if possible
        if (filteredProducts.length > 1 && lastId) {
            available = filteredProducts.filter(p => p.id !== lastId);
        }

        const selected = available[Math.floor(Math.random() * available.length)];
        this.lastProductIds[categoryName] = selected.id;
        return selected;
    }

    update(index) {
        const config = this.slideConfigs[index];

        // Use curated banner image if defined, else fall back to a random product image
        let imgSrc = config.bannerImg || null;
        let imgAlt = config.displayName;

        if (!imgSrc) {
            const product = this.getRandomProductForCategory(config.dataCategory);
            if (!product) {
                this.next();
                return;
            }
            imgSrc = product.image;
            imgAlt = product.name;
        }

        // Fade out
        this.bannerInnerEl.classList.add('banner-fade-out');

        setTimeout(() => {
            if (this.prefixEl) this.prefixEl.textContent = config.prefix;
            this.partNameEl.textContent = config.displayName;

            // Preload then swap
            const tempImg = new Image();
            tempImg.onload = () => {
                this.partImgEl.src = imgSrc;
                this.partImgEl.alt = imgAlt;

                requestAnimationFrame(() => {
                    this.bannerInnerEl.classList.remove('banner-fade-out');
                    this.bannerInnerEl.classList.add('banner-fade-in');
                });

                setTimeout(() => {
                    this.bannerInnerEl.classList.remove('banner-fade-in');
                }, 500);
            };

            tempImg.onerror = () => {
                this.partImgEl.src = imgSrc;
                this.bannerInnerEl.classList.remove('banner-fade-out');
            };

            tempImg.src = imgSrc;
        }, 350);
    }

    next() {
        this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slideConfigs.length;
        this.update(this.currentSlideIndex);
    }
}

// Re-implementing simplified global init to match previous header-banner.js behavior but more robust
window.initShuffleBanners = () => {
    // Header Banner
    new ShuffleBanner({
        containerId: 'headerBannerInner',
        nameId: 'bannerPartName',
        imgId: 'bannerPartImg'
    });

    // Wide Homepage Banner (if exists)
    const wideBanner = document.getElementById('wideBannerInner');
    if (wideBanner) {
        new ShuffleBanner({
            containerId: 'wideBannerInner',
            nameId: 'widePartName',
            imgId: 'widePartImg'
        });
    }
};

document.addEventListener('DOMContentLoaded', window.initShuffleBanners);
