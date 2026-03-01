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
        this.slides = config.slides || [
            { name: 'BODY PARTS', img: 'assets/images/products/isolated/hero_bumper.webp', alt: 'Premium Body Parts' },
            { name: 'BRAKING SYSTEM', img: 'assets/images/products/isolated/hero_brake.webp', alt: 'Performance Brakes' },
            { name: 'ENGINE SPARES', img: 'assets/images/products/isolated/hero_turbo.webp', alt: 'Turbocharger' },
            { name: 'CAR LIGHTING', img: 'assets/images/products/lighting/headlight-1.png', alt: 'Premium Lighting' },
            { name: 'SUSPENSION', img: 'assets/images/products/suspension-steering/shock-absorber-1.png', alt: 'Suspension Parts' },
            { name: 'TIRE AND WHEELS', img: 'assets/images/products/tyres-wheels/tyres-2.webp', alt: 'Sport Wheels' }
        ];
        this.interval = config.interval || 3500;
        this.current = 0;

        this.init();
    }

    init() {
        this.partNameEl = document.getElementById(this.nameId);
        this.partImgEl = document.getElementById(this.imgId);
        this.bannerInnerEl = document.getElementById(this.containerId);

        if (!this.partNameEl || !this.partImgEl || !this.bannerInnerEl) {
            console.warn(`ShuffleBanner: Elements not found for ${this.containerId}`);
            return;
        }

        // Initial setup
        this.update(0);

        // Start Loop
        setInterval(() => this.next(), this.interval);
    }

    update(index) {
        const slide = this.slides[index];

        // Fade out
        this.bannerInnerEl.classList.add('banner-fade-out');

        setTimeout(() => {
            this.partNameEl.textContent = slide.name;

            // Preload the image to prevent "black box" / flicker
            const tempImg = new Image();
            tempImg.onload = () => {
                this.partImgEl.src = slide.img;
                this.partImgEl.alt = slide.alt;

                // Fade in ONLY after image is ready
                requestAnimationFrame(() => {
                    this.bannerInnerEl.classList.remove('banner-fade-out');
                    this.bannerInnerEl.classList.add('banner-fade-in');
                });

                setTimeout(() => {
                    this.bannerInnerEl.classList.remove('banner-fade-in');
                }, 500);
            };

            tempImg.onerror = () => {
                // Fallback to avoid getting stuck
                this.partImgEl.src = slide.img;
                this.bannerInnerEl.classList.remove('banner-fade-out');
            };

            tempImg.src = slide.img;
        }, 350);
    }

    next() {
        this.current = (this.current + 1) % this.slides.length;
        this.update(this.current);
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
