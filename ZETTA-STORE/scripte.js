
// ========== PRODUCT PAGE ==========
const buttons = document.querySelectorAll(".btn.btn-primary");
const cartCount = document.getElementById("cart-count");
const message = document.getElementById("message");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count on page load
if (cartCount) {
  cartCount.textContent = cart.length;
}

// Add to Cart logic
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const price = parseFloat(button.getAttribute("data-price"));

    const item = { name, price };
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));

    if (cartCount) {
      cartCount.textContent = cart.length;
    }

    // Show success message
    if (message) {
      message.style.display = "block";
      setTimeout(() => {
        message.style.display = "none";
      }, 2000);
    }
  });
});

// ========== CART PAGE ==========
function calculateTotal(cart) {
  let total = 0;
  cart.forEach(item => {
    total += item.price;
  });
  return total.toFixed(2);
}

const cartItemsEl = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");

if (cartItemsEl && totalPriceEl) {
  cartItemsEl.innerHTML = "";
  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
      <span>${item.name}</span>
      <span>$${item.price.toFixed(2)}</span>
      <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">Remove</button>
    `;
    cartItemsEl.appendChild(itemDiv);
  });

  totalPriceEl.textContent = calculateTotal(cart);
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload(); // Refresh to update UI and totals
}
