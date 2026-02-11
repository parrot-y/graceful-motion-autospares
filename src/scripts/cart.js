document.addEventListener('DOMContentLoaded', () => {
    // Defines standard local storage key
    const CART_KEY = 'kas_cart';

    // UI Elements
    const cartBadges = document.querySelectorAll('.cart-badge');
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn, .add-cart-btn');

    // State
    let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

    // Initialize UI
    updateCartBadges();

    // Event Listeners
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            // Try to find product data from card
            const card = btn.closest('.product-card') || btn.closest('.deal-card');
            if (card) {
                const title = card.querySelector('.product-title, .deal-title')?.innerText || 'Unknown Item';
                const priceText = card.querySelector('.product-price, .current-price')?.innerText || '0';
                const imgSrc = card.querySelector('img')?.src || '';

                // Clean price
                const price = parseInt(priceText.replace(/[^0-9]/g, '')) || 0;

                addItemToCart({
                    id: Date.now(), // Simple unique ID
                    title,
                    price,
                    image: imgSrc,
                    quantity: 1
                });
            }
        });
    });

    // Methods
    function addItemToCart(item) {
        // Check if item exists (by title for now, ideally ID)
        const existing = cart.find(i => i.title === item.title);
        if (existing) {
            existing.quantity++;
        } else {
            cart.push(item);
        }

        saveCart();
        updateCartBadges();
        showToast(`Added to cart: ${item.title}`);

        // Simulate button feedback
        const btn = document.activeElement;
        if (btn && btn.classList.contains('add-to-cart-btn')) {
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Added';
            btn.classList.add('added');
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.classList.remove('added');
            }, 2000);
        }
    }

    function saveCart() {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }

    function updateCartBadges() {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartBadges.forEach(badge => {
            badge.innerText = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
            // Animation pop
            badge.style.transform = 'scale(1.2)';
            setTimeout(() => badge.style.transform = 'scale(1)', 200);
        });
    }

    function showToast(message) {
        // Create toast container if needed
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);

            // Add styles dynamically
            const style = document.createElement('style');
            style.textContent = `
                .toast-container {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 9999;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .toast {
                    background: #333;
                    color: white;
                    padding: 12px 24px;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    animation: slideIn 0.3s ease-out forwards;
                    min-width: 250px;
                }
                .toast.success {
                    background: #10B981; /* Green */
                }
                .toast i { font-size: 1.1rem; }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes fadeOut {
                    to { opacity: 0; transform: translateY(10px); }
                }
            `;
            document.head.appendChild(style);
        }

        const toast = document.createElement('div');
        toast.className = 'toast success'; // Default to success green
        toast.innerHTML = `<i class="fas fa-check-circle"></i> <span>${message}</span>`;

        container.appendChild(toast);

        // Remove after 3s
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.5s ease-out forwards';
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }
});
