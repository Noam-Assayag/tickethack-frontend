console.log("cart.js loaded");

const cartList = document.querySelector(".cartList");
const totalPriceEl = document.getElementById("totalPrice");
const purchaseBtn = document.getElementById("purchase-btn");
const emptyMessage = document.getElementById("emptyCartMessage");

if (!cartList || !totalPriceEl || !purchaseBtn) {
  console.error("Cart DOM missing");
} else {
  loadCart();

  purchaseBtn.addEventListener("click", async () => {
    await fetch("${BACKEND_URL}/cart/purchase", {
      method: "POST"
    });

    window.location.href = "bookings.html";
  });
}

async function loadCart() {
  try {
    const res = await fetch("${BACKEND_URL}/cart");
    const data = await res.json();

    const items = data.cart;

    console.log("CART:", items);

    cartList.innerHTML = "";
    let total = 0;

    if (!items || items.length === 0) {
      if (emptyMessage) emptyMessage.style.display = "flex";
      totalPriceEl.textContent = "0€";
      return;
    }

    if (emptyMessage) emptyMessage.style.display = "none";

    items.forEach(item => {
      total += item.price;

      const div = document.createElement("div");
      div.classList.add("cartItem");

      div.innerHTML = `
        <span>${item.departure} > ${item.arrival}</span>
        <span>${new Date(item.date).toLocaleString()}</span>
        <span>${item.price}€</span>
        <button class="delete-btn" data-id="${item._id}">x</button>
      `;

      cartList.appendChild(div);
    });

    totalPriceEl.textContent = total + "€";

    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        await fetch(`${BACKEND_URL}/cart/${btn.dataset.id}`, {
          method: "DELETE"
        });

        loadCart();
      });
    });

  } catch (err) {
    console.error("loadCart error:", err);
  }
}