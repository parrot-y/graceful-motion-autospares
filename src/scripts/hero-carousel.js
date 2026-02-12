/**
 * Hero Section Product Carousel
 * Rotates through featured products with smooth transitions.
 */

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('heroProductCarousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-indicators-vertical .dot');
    let currentIndex = 0;
    let intervalId;
    const intervalTime = 5000; // 5 seconds

    function showSlide(index) {
        // Remove active class from all
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current
        slides[index].classList.add('active');
        dots[index].classList.add('active');

        currentIndex = index;
    }

    function nextSlide() {
        let index = currentIndex + 1;
        if (index >= slides.length) {
            index = 0;
        }
        showSlide(index);
    }

    // Start Auto Play
    function startAutoPlay() {
        intervalId = setInterval(nextSlide, intervalTime);
    }

    function stopAutoPlay() {
        clearInterval(intervalId);
    }

    // Event Listeners for Dots
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            stopAutoPlay();
            const index = parseInt(dot.getAttribute('data-slide'));
            showSlide(index);
            startAutoPlay();
        });
    });

    // Pause on hover (optional)
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // Initialize
    startAutoPlay();
});
