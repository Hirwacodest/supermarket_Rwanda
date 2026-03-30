// cart.js

// Initialize cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
}

// Function to add product to cart
function addToCart(button) {
  const productEl = button.parentElement;
  const name = productEl.getAttribute('data-name');
  const price = parseInt(productEl.getAttribute('data-price'));
  
  // Check if item already exists
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  saveCart();
  alert(`${name} added to cart!`);
}

// Function to remove item from cart
function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  saveCart();
}

// Function to increase quantity
function increaseQty(name) {
  const item = cart.find(i => i.name === name);
  if (item) {
    item.qty += 1;
    saveCart();
  }
}

// Function to decrease quantity
function decreaseQty(name) {
  const item = cart.find(i => i.name === name);
  if (item && item.qty > 1) {
    item.qty -= 1;
    saveCart();
  } else if (item && item.qty === 1) {
    removeFromCart(name);
  }
}

// Update mini cart display
function updateCartDisplay() {
  const cartItemsEl = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');
  const checkoutLink = document.getElementById('checkout-link');

  if (!cartItemsEl || !cartTotalEl) return;

  cartItemsEl.innerHTML = '';

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;

    const itemEl = document.createElement('div');
    itemEl.classList.add('cart-item');
    itemEl.innerHTML = `
      <span>${item.name} (${item.qty}) - ${item.price * item.qty} RWF</span>
      <button onclick="increaseQty('${item.name}')">+</button>
      <button onclick="decreaseQty('${item.name}')">-</button>
      <button onclick="removeFromCart('${item.name}')">Remove</button>
    `;
    cartItemsEl.appendChild(itemEl);
  });

  cartTotalEl.textContent = `Total: ${total} RWF`;

  if (checkoutLink) {
    if (cart.length === 0) {
      checkoutLink.href = "#";
      checkoutLink.style.pointerEvents = "none";
      checkoutLink.style.opacity = "0.5";
    } else {
      const itemsText = cart.map(i => `${i.name} x${i.qty} (${i.price*i.qty} RWF)`).join('%0A');
      const url = `https://wa.me/250795878935?text=Hello Supermarket!%0AHere is my order:%0A${itemsText}%0ATotal: ${total} RWF`;
      checkoutLink.href = url;
      checkoutLink.style.pointerEvents = "auto";
      checkoutLink.style.opacity = "1";
    }
  }
}

// Run on page load
document.addEventListener('DOMContentLoaded', updateCartDisplay);