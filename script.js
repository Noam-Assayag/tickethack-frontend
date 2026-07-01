const searchBtn = document.querySelector(".search-btn");
const departure = document.querySelector(".departure");
const arrival = document.querySelector(".arrival");
const date = document.querySelector(".date");

const tripsList = document.querySelector(".tripsList");
const defaultMessage = document.getElementById("defaultMessage");
const noResult = document.getElementById("noResult");

/***********************
 * SEARCH BACKEND
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
    tripsList.style.display = "none";

    // NO RESULT
    if (!trips || trips.length === 0) {
      noResult.style.display = "flex";
      return;
    }

    // SHOW RESULTS
    tripsList.style.display = "flex";
    displayTrips(trips);

  } catch (error) {
    console.error("Fetch error:", error);
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
      <button class="book-btn" data-id="${trip._id}">
        Book
      </button>
    `;

    tripsList.appendChild(div);
  });

  addCartEvents();
}

/***********************
 * ADD TO CART
 ************************/
function addCartEvents() {
  const buttons = document.querySelectorAll(".book-btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", async () => {
      const tripId = btn.dataset.id;

      // 1. ajouter au panier
      await fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ tripId })
      });

      // 2. redirection
      window.location.href = "cart.html";
    });
  });
}

     /*<div id="noResult">
        <img src="images/notfound.png" alt="No result">
        <div class="separator"></div>
        <p>No trip found.</p>
    </div>*/


/********* AFFICHER LE RESULTAT *******
function displayTrips(trips) {
  tripsList.innerHTML = "";

  defaultMessage.style.display = "none";
  tripsList.style.display = "flex";

  if (trips.length === 0) {
    tripsList.innerHTML = "<p>No trips found</p>";
    return;
  }

  trips.forEach(trip => {
    const div = document.createElement("div");
    div.classList.add("trip");

    div.innerHTML = `
      <span>${trip.departure} → ${trip.arrival} | ${trip.date} | ${trip.price}€</span>
      <button class="book-btn" data-id="${trip._id}">Add</button>
    `;

    tripsList.appendChild(div);
  });
}*/



/*******************/
    
/* Quand on aura les résultats 
defaultMessage.style.display = "none";
tripsList.style.display = "block";
*/

/*Recherche avec résultat

<div class="tripsList">
    <span>Bruxelles > Paris</span>
    <span>09:05</span>
    <span>47€</span>
    <button>Book</button>
</div>
*/




/****************
Click sur search
***************

searchBtn.addEventListener("click", async () => {
    const departure = departureInput.value.trim();
    const arrival = arrivalInput.value.trim();
    const date = dateInput.value;

    if (!departure || !arrival || !date) {
        alert("Please fill all fields");
        return;
    }

    try {
        const res = await fetch(`http://localhost:3000/trips?departure=${departure}&arrival=${arrival}&date=${date}`);
        
        const data = await res.json();

        displayTrips(data);

    } catch (err) {
        console.error("Error fetching trips:", err);
    }
});*/


/***************************
Affichage des résultats
*****************************
function displayTrips(trips) {

    tripsList.innerHTML = "";

    defaultMessage.style.display = "none";
    tripsList.style.display = "block";

    if (trips.length === 0) {
        tripsList.innerHTML = "<p>No trips found</p>";
        return;
    }

    trips.forEach(trip => {
        const div = document.createElement("div");
        div.classList.add("trip");

        div.innerHTML = `
            <span>${trip.departure} → ${trip.arrival}</span>
            <span>${trip.schedule}</span>
            <span>${trip.price}€</span>
            <button class="book-btn">Book</button>
        `;

        const btn = div.querySelector(".book-btn");

        btn.addEventListener("click", () => addToCart(trip));

        tripsList.appendChild(div);
    });
}*/


/************************
 AJOUTER AU PANIER
**********************
function addToCart(trip) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(trip);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Trip added to cart !");
}*/