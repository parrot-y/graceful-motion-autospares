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
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.add-to-cart-btn, .add-cart-btn');
        if (!btn) return;

        e.preventDefault();

        // Check if we are on details page or a grid card
        const card = btn.closest('.product-card') || btn.closest('.deal-card');
        const detailPanel = btn.closest('.product-info-panel');

        let id = btn.getAttribute('data-id') || Date.now();
        let title = '';
        let priceText = '';
        let imgSrc = '';
        let quantity = 1;

        if (detailPanel) {
            title = detailPanel.querySelector('.product-display-title')?.innerText || 'Unknown Item';
            priceText = detailPanel.querySelector('.current-price')?.innerText || '0';
            imgSrc = document.querySelector('.product-main-image img')?.src || '';
            quantity = parseInt(document.getElementById('buyQty')?.value) || 1;
        } else if (card) {
            title = card.querySelector('.product-title, .deal-title')?.innerText || 'Unknown Item';
            priceText = card.querySelector('.product-price, .current-price')?.innerText || '0';
            imgSrc = card.querySelector('img')?.src || '';
        }

        const price = parseInt(priceText.replace(/[^0-9]/g, '')) || 0;

        addItemToCart({
            id,
            title,
            price,
            image: imgSrc,
            quantity
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

        // Checkout Modal
        const modal = document.createElement('div');
        modal.id = 'checkoutModal';
        modal.className = 'checkout-modal';
        modal.innerHTML = `
            <div class="checkout-modal-content">
                <div class="checkout-header">
                    <h3>Complete Your Order</h3>
                    <button class="close-modal"><i class="fas fa-times"></i></button>
                </div>
                <div class="checkout-body">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" id="customerName" placeholder="Your Name" required>
                    </div>
                    <div class="form-group">
                        <label>Delivery Location</label>
                        <textarea id="customerLocation" placeholder="e.g. Nairobi, Westlands, Delta Towers" rows="2" required></textarea>
                    </div>
                </div>
                <div class="checkout-footer">
                    <button class="btn-confirm-order"><i class="fab fa-whatsapp"></i> Send Order</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Add Styles
        const style = document.createElement('style');
        style.textContent = `
            .cart-drawer {
                position: fixed;
                top: 0; right: 0; width: 100%; height: 100%;
                z-index: 10000;
                pointer-events: none;
                visibility: hidden;
                transition: visibility 0.4s;
            }
            .cart-drawer.active { visibility: visible; pointer-events: all; }
            .cart-drawer-overlay {
                position: absolute;
                top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(255, 255, 255, 0.4);
                backdrop-filter: blur(10px);
                opacity: 0;
                transition: opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
            }
            .cart-drawer.active .cart-drawer-overlay { opacity: 1; }
            .cart-drawer-content {
                position: absolute;
                top: 0; right: 0; width: 100%; max-width: 450px; height: 100%;
                background: #FFFFFF;
                box-shadow: -20px 0 60px rgba(0, 0, 0, 0.1);
                transform: translateX(100%);
                transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
                display: flex; flex-direction: column;
            }
            .cart-drawer.active .cart-drawer-content { transform: translateX(0); }
            
            .cart-header {
                padding: 30px; border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                display: flex; justify-content: space-between; align-items: center;
            }
            .cart-header h3 { margin: 0; font-family: 'Outfit'; font-weight: 800; font-size: 1.5rem; color: #1c1c1e; }
            .close-cart { background: none; border: none; font-size: 1.5rem; color: #1c1c1e; cursor: pointer; opacity: 0.5; transition: opacity 0.2s; }
            .close-cart:hover { opacity: 1; }
            
            .cart-items-list { flex: 1; overflow-y: auto; padding: 30px; }
            .cart-item { display: flex; gap: 20px; margin-bottom: 25px; align-items: center; }
            .cart-item-img { width: 80px; height: 80px; object-fit: contain; background: #F4F4F7; border-radius: 12px; padding: 10px; }
            .cart-item-info { flex: 1; }
            .cart-item-title { font-weight: 700; font-size: 1rem; color: #1c1c1e; margin-bottom: 5px; }
            .cart-item-price { color: var(--accent-primary, #B8860B); font-weight: 800; font-size: 0.95rem; }
            .cart-item-remove { background: none; border: none; color: #ff3b30; font-size: 0.8rem; font-weight: 600; cursor: pointer; padding: 0; margin-top: 8px; opacity: 0.7; }
            .cart-item-remove:hover { opacity: 1; }
            
            .cart-footer { padding: 30px; background: #F9F9FB; border-top: 1px solid rgba(0, 0, 0, 0.05); }
            .cart-total { display: flex; justify-content: space-between; margin-bottom: 25px; font-size: 1.2rem; font-weight: 800; color: #1c1c1e; }
            .whatsapp-checkout-btn {
                width: 100%; padding: 18px;
                background: #1C1C1E; color: white;
                border: none; border-radius: 50px;
                font-weight: 800; cursor: pointer;
                transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
                display: flex; align-items: center; justify-content: center; gap: 12px;
                font-size: 1rem;
            }
            .whatsapp-checkout-btn:hover { background: #000; transform: translateY(-3px); box-shadow: 0 15px 30px rgba(0,0,0,0.1); }
            
            .empty-cart-msg { text-align: center; color: #8e8e93; margin-top: 50px; font-weight: 500; }

            .checkout-modal {
                position: fixed;
                top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(255, 255, 255, 0.4);
                backdrop-filter: blur(15px);
                -webkit-backdrop-filter: blur(15px);
                z-index: 20000;
                display: flex; justify-content: center; align-items: center;
                opacity: 0; pointer-events: none;
                transition: opacity 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
            }
            .checkout-modal.active { opacity: 1; pointer-events: all; }
            .checkout-modal-content {
                background: #FFFFFF;
                width: 90%; max-width: 420px;
                border: 1px solid rgba(0, 0, 0, 0.05);
                border-radius: 24px;
                box-shadow: 0 40px 100px rgba(0, 0, 0, 0.15);
                transform: translateY(30px) scale(0.95);
                transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                color: #1c1c1e;
                overflow: hidden;
            }
            .checkout-modal.active .checkout-modal-content { transform: translateY(0) scale(1); }
            .checkout-header {
                padding: 24px 30px; border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                display:flex; justify-content:space-between; align-items:center;
            }
            .checkout-header h3 { margin: 0; font-family: 'Outfit'; font-weight: 800; color: #1c1c1e; }
            .checkout-body { padding: 30px; }
            .form-group { margin-bottom: 20px; }
            .form-group label { display: block; margin-bottom: 10px; font-size: 0.85rem; font-weight: 700; color: #1c1c1e; text-transform: uppercase; letter-spacing: 0.5px; }
            .form-group input, .form-group textarea {
                width: 100%; padding: 14px 16px;
                background: #F4F4F7;
                border: 1px solid rgba(0, 0, 0, 0.05);
                border-radius: 12px; color: #1c1c1e;
                font-family: inherit; font-size: 0.95rem;
                transition: all 0.2s;
            }
            .form-group input:focus, .form-group textarea:focus {
                outline: none; background: #fff; border-color: #B8860B; box-shadow: 0 0 0 4px rgba(184, 134, 11, 0.1);
            }
            .checkout-footer { padding: 24px 30px; background: #F9F9FB; border-top: 1px solid rgba(0, 0, 0, 0.05); }
            .btn-confirm-order {
                width: 100%; padding: 16px;
                background: #1C1C1E; color: white;
                border: none; border-radius: 50px;
                font-weight: 800; cursor: pointer;
                transition: all 0.3s;
                display:flex; align-items:center; justify-content:center; gap:10px;
                font-size: 1rem;
            }
            .btn-confirm-order:hover { background: #000; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
            .close-modal { background:none; border:none; color:#1c1c1e; cursor:pointer; font-size:1.1rem; opacity: 0.5; transition: opacity 0.2s; }
            .close-modal:hover { opacity: 1; }
        `;
        document.head.appendChild(style);

        // Events
        drawer.querySelector('.close-cart').onclick = toggleCartDrawer;
        drawer.querySelector('.cart-drawer-overlay').onclick = toggleCartDrawer;
        drawer.querySelector('.whatsapp-checkout-btn').onclick = openCheckoutModal; // Changed handler

        // Modal Events
        modal.querySelector('.close-modal').onclick = closeCheckoutModal;
        modal.querySelector('.btn-confirm-order').onclick = finalizeCheckout;
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeCheckoutModal();
        });

        updateCartDrawer();
    }

    window.toggleCartDrawer = function () {
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

    // Expose for inline onclick handlers
    window.updateItemQty = function (index, change) {
        const item = cart[index];
        if (!item) return;

        item.quantity += change;

        if (item.quantity <= 0) {
            removeItem(index);
            return;
        }

        saveCart();
        updateCartBadges();
        updateCartDrawer();
    };

    function openCheckoutModal() {
        if (cart.length === 0) {
            showToast('Your basket is empty');
            return;
        }
        document.getElementById('checkoutModal').classList.add('active');
        toggleCartDrawer(); // Close drawer
    }

    function closeCheckoutModal() {
        document.getElementById('checkoutModal').classList.remove('active');
    }

    function finalizeCheckout() {
        const name = document.getElementById('customerName').value.trim();
        const location = document.getElementById('customerLocation').value.trim();

        if (!name || !location) {
            showToast('Please fill in all details');
            return;
        }

        // GRACEFUL MOTION WHATSAPP ORDER FORMATTER
        const businessNumber = "254723699157"; // Updated to user's contact number
        let total = 0;
        let itemsList = "";

        cart.forEach((item, i) => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            itemsList += `${i + 1}. *${item.title}*\n`;
            itemsList += `   Qty: ${item.quantity} | Total: KES ${itemTotal.toLocaleString()}\n\n`;
        });

        const invoiceId = `INV-${Math.floor(Math.random() * 9000) + 1000}`;
        const date = new Date().toLocaleDateString('en-GB');

        let message = `🚀 *NEW ORDER: ${invoiceId}*\n`;
        message += `📅 *Date:* ${date}\n`;
        message += `--------------------------------\n`;
        message += `👤 *Customer:* ${name}\n`;
        message += `📍 *Delivery:* ${location}\n`;
        message += `--------------------------------\n\n`;
        message += `*ORDERED ITEMS:*\n${itemsList}`;
        message += `--------------------------------\n`;
        message += `💰 *GRAND TOTAL: KES ${total.toLocaleString()}*\n`;
        message += `--------------------------------\n\n`;
        message += `_Please acknowledge this order to proceed with delivery. Thank you for shopping with Graceful Motion Autospares!_`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${businessNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
        closeCheckoutModal();

        // Optional: clear cart here? 
        // For now, keep it so user can reference it until they manually clear or pay.
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
