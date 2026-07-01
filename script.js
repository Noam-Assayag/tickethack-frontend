const searchBtn = document.querySelector(".search-btn");
const departure = document.querySelector(".departure");
const arrival = document.querySelector(".arrival");
const date = document.querySelector(".date");

const tripsList = document.querySelector(".tripsList");
const defaultMessage = document.getElementById("defaultMessage");
const noResult = document.getElementById("noResult");

searchBtn.addEventListener("click", async () => {
  const departureValue = departure.value.trim();
  const arrivalValue = arrival.value.trim();
  const dateValue = date.value;

  const url = `http://localhost:3000/trips/search?departure=${departureValue}&arrival=${arrivalValue}&date=${dateValue}`;

  const response = await fetch(url);
  const data = await response.json();

  const trips = data.trips;
  console.log("BACKEND RESPONSE:", data);
console.log("TRIPS:", data.trips);

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
});

// Affiche les résultats
function displayTrips(trips) {
  trips.forEach(trip => {
    const div = document.createElement("div");
    div.classList.add("trip");

    div.innerHTML = `
      <div>
        <strong>${trip.departure}</strong> → <strong>${trip.arrival}</strong>
      </div>
      <div>${trip.date}</div>
      <div>${trip.price}€</div>
      <button class="book-btn">Book</button>
    `;

    tripsList.appendChild(div);
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