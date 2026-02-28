/**
 * Renovyte Animation Layer
 * Handles scroll-triggered reveals and micro-interactions
 */

class RenovyteAnimations {
    constructor() {
        this.init();
    }

    init() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;

                    // Apply delay if specified, or auto-delay for children of a grid
                    const delay = el.dataset.delay || 0;
                    if (delay) {
                        el.style.transitionDelay = `${delay}ms`;
                    }

                    el.classList.add('reveal-active');
                    revealObserver.unobserve(el);
                }
            });
        }, observerOptions);

        // Apply automatic staggering to grid items that are reveal elements
        document.querySelectorAll('.featured-grid, .categories-grid').forEach(grid => {
            const items = grid.querySelectorAll('.reveal-element, .category-card');
            items.forEach((item, index) => {
                if (!item.dataset.delay) {
                    item.dataset.delay = index * 100;
                }
                revealObserver.observe(item);
            });
        });

        // Target remaining individual reveal elements
        document.querySelectorAll('.reveal-element').forEach(el => {
            revealObserver.observe(el);
        });

        this.parallaxHero();
    }

    parallaxHero() {
        const heroSlides = document.querySelectorAll('.hero-bg-slide');
        if (!heroSlides.length) return;

        window.addEventListener('scroll', () => {
            const scroll = window.pageYOffset;
            heroSlides.forEach(slide => {
                if (slide.classList.contains('active')) {
                    slide.style.backgroundPositionY = `${scroll * 0.4}px`;
                }
            });
        }, { passive: true });
    }
}

// Initialize on Load
window.addEventListener('load', () => {
    new RenovyteAnimations();
});
