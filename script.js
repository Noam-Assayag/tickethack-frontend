const searchBtn = document.querySelector(".search-btn");
const departure = document.querySelector(".departure");
const arrival = document.querySelector(".arrival");
const date = document.querySelector(".date");

const tripsList = document.querySelector(".tripsList");
const defaultMessage = document.getElementById("defaultMessage");
const noResult = document.getElementById("noResult");

/***********************
 * SEARCH TRIPS
 ************************/
searchBtn.addEventListener("click", async () => {
  const departureValue = departure.value.trim();
  const arrivalValue = arrival.value.trim();
  const dateValue = date.value;

  const url = `http://localhost:3000/trips/search?departure=${departureValue}&arrival=${arrivalValue}&date=${dateValue}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const trips = data.trips;

    // RESET UI
    defaultMessage.style.display = "none";
    noResult.style.display = "none";
    tripsList.innerHTML = "";

    // NO RESULTS
    if (!trips || trips.length === 0) {
      noResult.style.display = "flex";
      tripsList.style.display = "none";
      return;
    }

    // SHOW RESULTS
    tripsList.style.display = "flex";
    displayTrips(trips);

  } catch (error) {
    console.error("Search error:", error);
  }
});


/***********************
 * DISPLAY TRIPS
 ************************/
function displayTrips(trips) {
  tripsList.innerHTML = "";

  trips.forEach(trip => {
    const div = document.createElement("div");
    div.classList.add("trip");

    div.innerHTML = `
      <div>
        <strong>${trip.departure}</strong> → <strong>${trip.arrival}</strong>
      </div>
      <div>${new Date(trip.date).toLocaleDateString()}</div>
      <div>${trip.price}€</div>
      <button class="book-btn"
        data-id="${trip._id}"
        data-departure="${trip.departure}"
        data-arrival="${trip.arrival}"
        data-date="${trip.date}"
        data-price="${trip.price}">
        Book
      </button>
    `;

    tripsList.appendChild(div);
  });

  attachBookEvents();
}


/***********************
 * BOOK BUTTONS (CART)
 ************************/
function attachBookEvents() {
  const buttons = document.querySelectorAll(".book-btn");

  buttons.forEach(btn => {
    btn.onclick = async () => {
      try {
        await fetch("http://localhost:3000/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            tripId: btn.dataset.id,
            departure: btn.dataset.departure,
            arrival: btn.dataset.arrival,
            date: btn.dataset.date,
            price: btn.dataset.price
          })
        });

        // redirection panier
        window.location.href = "cart.html";

      } catch (error) {
        console.error("Cart error:", error);
      }
    };
  });
}