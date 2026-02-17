/* ================================
   Dynamic Promo Banner - Shuffling Effect
   ================================ */

document.addEventListener('DOMContentLoaded', () => {
    const promoContainer = document.querySelector('.promo-container');

    // Check if promo banner exists
    if (!promoContainer) return;

    // Elements to update
    const promoTextSmallLeft = promoContainer.querySelector('.promo-left .promo-text-small');
    const promoBadge = promoContainer.querySelector('.promo-badge');
    const promoImage = promoContainer.querySelector('.promo-car-image');
    const promoTextSmallRight = promoContainer.querySelector('.promo-right .promo-text-small');
    const promoScript = promoContainer.querySelector('.promo-script');

    // Promo Items Data
    const promoItems = [
        {
            leftText: "Get the best",
            badge: "Facelift KITS",
            image: "assets/images/hero/hero-1.webp",
            rightText: "Smooth Motion",
            script: "Specials"
        },
        {
            leftText: "Upgrade to",
            badge: "Premium OIL",
            image: "assets/images/hero/hero-2.webp", // Assuming hero-2 is engine/oil related
            rightText: "for your engine",
            script: "Performance"
        },
        {
            leftText: "Secure your",
            badge: "Brake PADS",
            image: "assets/images/hero/hero-3.webp", // Assuming hero-3 is diff part
            rightText: "safety first",
            script: "Reliability"
        },
        {
            leftText: "Ride smooth",
            badge: "Suspension",
            image: "assets/images/hero/hero-1.webp", // Cycle back or use new image
            rightText: "on every road",
            script: "Comfort"
        }
    ];

    let currentIndex = 0;

    // Function to update banner content
    function updateBanner() {
        // 1. Fade Out
        promoContainer.classList.add('fade-out');

        setTimeout(() => {
            // 2. Update Content
            currentIndex = (currentIndex + 1) % promoItems.length;
            const item = promoItems[currentIndex];

            promoTextSmallLeft.textContent = item.leftText;
            promoBadge.textContent = item.badge;
            promoImage.src = item.image;
            promoImage.alt = item.badge; // Update alt text for accessibility
            promoTextSmallRight.textContent = item.rightText;
            promoScript.textContent = item.script;

            // 3. Fade In
            promoContainer.classList.remove('fade-out');
        }, 500); // Wait for fade out transition
    }

    // Start Interval (Change every 4.5 seconds)
    setInterval(updateBanner, 4500);
});
