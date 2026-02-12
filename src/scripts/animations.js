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
        // Generic Reveal Logic for any element with .reveal-element
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

        // Trigger Hero Elements Immediately on Load
        document.querySelectorAll('.hero-section .reveal-element').forEach((el, index) => {
            // Add a small staggered delay for hero items specifically
            setTimeout(() => {
                el.classList.add('reveal-active');
            }, 100 + (index * 200));
        });

        // Observe remaining elements
        document.querySelectorAll('.reveal-element:not(.hero-section *)').forEach(el => {
            observer.observe(el);
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
