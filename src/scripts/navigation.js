/**
 * Navigation - Mobile Menu & Scroll Effects
 */

class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.mobileToggle = document.getElementById('mobileMenuBtn');
        this.navLinks = document.getElementById('navLinks');
        this.links = document.querySelectorAll('.nav-link-v2');

        this.init();
    }

    init() {
        // Mobile menu toggle
        this.mobileToggle?.addEventListener('click', () => this.toggleMobileMenu());

        // Close mobile menu when link is clicked
        this.links.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.closeMobileMenu();
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 &&
                !this.navbar.contains(e.target) &&
                this.navLinks.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });

        // Add scroll effect to navbar
        this.handleScroll();
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });

        // Smooth scroll for anchor links
        this.initSmoothScroll();
    }

    toggleMobileMenu() {
        this.mobileToggle.classList.toggle('active');
        this.navLinks.classList.toggle('active');

        // Toggle icon
        const icon = this.mobileToggle.querySelector('i');
        if (this.navLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
            document.body.style.overflow = 'hidden';
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
            document.body.style.overflow = '';
        }
    }

    closeMobileMenu() {
        this.mobileToggle.classList.remove('active');
        this.navLinks.classList.remove('active');
        const icon = this.mobileToggle.querySelector('i');
        icon.classList.replace('fa-times', 'fa-bars');
        document.body.style.overflow = '';
    }

    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }

    initSmoothScroll() {
        this.links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);

                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - this.navbar.offsetHeight;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            }
        });
    }
}

// Initialize navigation when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new Navigation();
    });
} else {
    new Navigation();
}
