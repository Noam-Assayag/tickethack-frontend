const bookingsList = document.querySelector(".bookingsList");
const emptyMessage = document.getElementById("emptyBookingsMessage");

async function loadBookings() {
  try {
    const res = await fetch("${BACKEND_URL}/bookings");
    const data = await res.json();

    const bookings = data.bookings;

    bookingsList.innerHTML = "";

    if (!bookings || bookings.length === 0) {
      emptyMessage.style.display = "flex";
      return;
    }

    emptyMessage.style.display = "none";

    bookings.forEach(b => {
      const div = document.createElement("div");
      div.classList.add("bookingItem");

      div.innerHTML = `
        <span>${b.departure} → ${b.arrival}</span>
        <span>${new Date(b.date).toLocaleString()}</span>
        <span>${b.price}€</span>
      `;

      bookingsList.appendChild(div);
    });

  } catch (err) {
    console.error(err);
  }
}

loadBookings();