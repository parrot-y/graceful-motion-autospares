document.addEventListener('DOMContentLoaded', () => {
    // Defines standard local storage key
    const CART_KEY = 'kas_cart';

    // UI Elements
    const cartBadges = document.querySelectorAll('.cart-badge');
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn, .add-cart-btn');
    const cartIconBtn = document.querySelector('.nav-icon-btn-v2[aria-label="Cart"]');

    // State
    let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

    // Initialize UI
    updateCartBadges();
    createCartDrawer(); // Initialize the drawer UI

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

    if (cartIconBtn) {
        cartIconBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleCartDrawer();
        });
    }

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
        updateCartDrawer();
        showToast(`Added to cart: ${item.title}`);

        // Simulate button feedback
        const btn = document.activeElement;
        if (btn && (btn.classList.contains('add-to-cart-btn') || btn.classList.contains('add-cart-btn'))) {
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

    function createCartDrawer() {
        // Create Drawer Structure
        const drawer = document.createElement('div');
        drawer.id = 'cartDrawer';
        drawer.className = 'cart-drawer';
        drawer.innerHTML = `
            <div class="cart-drawer-overlay"></div>
            <div class="cart-drawer-content">
                <div class="cart-header">
                    <h3>Your Basket</h3>
                    <button class="close-cart"><i class="fas fa-times"></i></button>
                </div>
                <div class="cart-items-list">
                    <!-- Items will be injected here -->
                </div>
                <div class="cart-footer">
                    <div class="cart-total">
                        <span>Total:</span>
                        <span class="total-amount">KSh 0</span>
                    </div>
                    <button class="whatsapp-checkout-btn">
                        <i class="fab fa-whatsapp"></i> Checkout via WhatsApp
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(drawer);

        // Add Styles
        const style = document.createElement('style');
        style.textContent = `
            .cart-drawer {
                position: fixed;
                top: 0;
                right: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                visibility: hidden;
                pointer-events: none;
            }
            .cart-drawer.active {
                visibility: visible;
                pointer-events: all;
            }
            .cart-drawer-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                backdrop-filter: blur(5px);
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            .cart-drawer.active .cart-drawer-overlay {
                opacity: 1;
            }
            .cart-drawer-content {
                position: absolute;
                top: 0;
                right: -400px;
                width: 400px;
                max-width: 100%;
                height: 100%;
                background: var(--bg-surface, #141414);
                box-shadow: -10px 0 30px rgba(0,0,0,0.5);
                display: flex;
                flex-direction: column;
                transition: right 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                color: white;
            }
            .cart-drawer.active .cart-drawer-content {
                right: 0;
            }
            .cart-header {
                padding: 24px;
                border-bottom: 1px solid rgba(255,255,255,0.05);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .cart-header h3 { font-family: var(--font-display); font-size: 1.25rem; }
            .close-cart { background: none; border: none; color: white; font-size: 1.25rem; cursor: pointer; }
            .cart-items-list {
                flex: 1;
                overflow-y: auto;
                padding: 24px;
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            .cart-item {
                display: flex;
                gap: 16px;
                align-items: center;
                background: rgba(255,255,255,0.02);
                padding: 12px;
                border-radius: 8px;
            }
            .cart-item-img { width: 60px; height: 60px; object-fit: cover; border-radius: 4px; }
            .cart-item-info { flex: 1; }
            .cart-item-title { font-weight: 700; font-size: 0.9rem; margin-bottom: 4px; }
            .cart-item-price { color: var(--accent-primary, #FFD700); font-weight: 800; font-size: 0.85rem; }
            .cart-item-remove { background: none; border: none; color: #ff4444; font-size: 0.8rem; cursor: pointer; padding: 0; margin-top: 4px; }
            .cart-footer {
                padding: 24px;
                border-top: 1px solid rgba(255,255,255,0.05);
                background: rgba(255,255,255,0.02);
            }
            .cart-total {
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
                font-size: 1.1rem;
                font-weight: 700;
            }
            .total-amount { color: var(--accent-primary, #FFD700); }
            .whatsapp-checkout-btn {
                width: 100%;
                background: #25D366;
                color: white;
                border: none;
                padding: 16px;
                border-radius: 8px;
                font-weight: 800;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 12px;
                cursor: pointer;
                transition: transform 0.2s ease, background 0.2s ease;
            }
            .whatsapp-checkout-btn:hover { background: #128C7E; transform: scale(1.02); }
        `;
        document.head.appendChild(style);

        // Events
        drawer.querySelector('.close-cart').onclick = toggleCartDrawer;
        drawer.querySelector('.cart-drawer-overlay').onclick = toggleCartDrawer;
        drawer.querySelector('.whatsapp-checkout-btn').onclick = handleCheckout;

        updateCartDrawer();
    }

    function toggleCartDrawer() {
        const drawer = document.getElementById('cartDrawer');
        drawer.classList.toggle('active');
        document.body.style.overflow = drawer.classList.contains('active') ? 'hidden' : '';
    }

    function updateCartDrawer() {
        const list = document.querySelector('.cart-items-list');
        const totalEl = document.querySelector('.total-amount');
        if (!list || !totalEl) return;

        if (cart.length === 0) {
            list.innerHTML = '<div class="empty-cart-msg">Your basket is empty</div>';
            totalEl.innerText = 'KSh 0';
            return;
        }

        let total = 0;
        list.innerHTML = cart.map((item, index) => {
            total += item.price * item.quantity;
            return `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.title}" class="cart-item-img">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-price">${item.quantity} x KSh ${item.price.toLocaleString()}</div>
                        <button class="cart-item-remove" data-index="${index}">Remove</button>
                    </div>
                </div>
            `;
        }).join('');

        totalEl.innerText = `KSh ${total.toLocaleString()}`;

        // Re-bind remove buttons
        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.onclick = (e) => {
                const index = e.target.getAttribute('data-index');
                removeItem(index);
            };
        });
    }

    function removeItem(index) {
        cart.splice(index, 1);
        saveCart();
        updateCartBadges();
        updateCartDrawer();
    }

    function handleCheckout() {
        if (cart.length === 0) {
            showToast('Your basket is empty');
            return;
        }

        // GRACEFUL MOTION WHATSAPP ORDER FORMATTER
        const businessNumber = "25412345678"; // Replace with actual business number
        let message = `*NEW ORDER - GRACEFUL MOTION*\n\n`;

        let total = 0;
        cart.forEach((item, i) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            message += `${i + 1}. *${item.title}*\n`;
            message += `   Qty: ${item.quantity}\n`;
            message += `   Price: KSh ${item.price.toLocaleString()}\n\n`;
        });

        message += `------------------\n`;
        message += `*TOTAL: KSh ${total.toLocaleString()}*\n\n`;
        message += `Please confirm availability for these parts. Thank you!`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${businessNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');

        // Optional: clear cart after checkout
        // cart = [];
        // saveCart();
        // updateCartBadges();
        // updateCartDrawer();
        // toggleCartDrawer();
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
