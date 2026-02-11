/**
 * Renovyte Animation Layer
 * Handles scroll-triggered reveals and micro-interactions
 */

class RenovyteAnimations {
    constructor() {
        this.revealConfigs = [
            { selector: '.category-card', animation: 'fadeInUp' },
            { selector: '.deal-card', animation: 'fadeInUp' },
            { selector: '.about-content', animation: 'fadeInLeft' },
            { selector: '.about-image-wrap', animation: 'fadeInRight' },
            { selector: '.section-title-v2', animation: 'fadeIn' }
        ];

        this.init();
    }

    init() {
        // Intersection Observer for reveals
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Setup elements
        this.revealConfigs.forEach(config => {
            document.querySelectorAll(config.selector).forEach((el, index) => {
                el.classList.add('reveal-element', `reveal-${config.animation}`);
                el.style.transitionDelay = `${index * 0.1}s`;
                observer.observe(el);
            });
        });

        this.parallaxHero();
    }

    parallaxHero() {
        const heroBg = document.querySelector('.hero-bg-image');
        if (!heroBg) return;

        window.addEventListener('scroll', () => {
            const scroll = window.pageYOffset;
            heroBg.style.transform = `scale(1.1) translateY(${scroll * 0.4}px)`;
        });
    }
}

// Initialize on Load
window.addEventListener('load', () => {
    new RenovyteAnimations();
});
