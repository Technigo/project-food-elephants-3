const zomatoApiUrlCuisine =
  "https://developers.zomato.com/api/v2.1/search?entity_id=59&entity_type=city&cuisines=1&count=20&start=0";

const apiHeader = {
  headers: {
    "user-key": "f4409bfc8fdd4774e0e259204f26db78",
  },
};

let globalArray = null;

fetch(zomatoApiUrlCuisine, apiHeader)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    globalArray = data;
    generateRestHTML(data.restaurants);
  });

const filterPrice = (minPrice, maxPrice) => {
  const filteredArray = globalArray.restaurants.filter(
    (restaurant) =>
      restaurant.restaurant.average_cost_for_two >= minPrice &&
      restaurant.restaurant.average_cost_for_two <= maxPrice
  );
  generateRestHTML(filteredArray);
};

const hasOnlineDelivery = document.getElementById("onlineDelivery");
hasOnlineDelivery.onchange = () => {
  const filteredArray = globalArray.restaurants
  if (hasOnlineDelivery.checked) {
    filteredArray = globalArray.restaurants.filter(
    (restaurant) =>
      restaurant.restaurant.has_online_delivery === 1
  );
  }
  generateRestHTML(filteredArray);
}

const priceLower = document.getElementById("priceLower");
const outputLower = document.getElementById("lowerPriceValue");
outputLower.innerHTML = priceLower.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
priceLower.oninput = function() {
    outputLower.innerHTML = this.value;
    filterPrice(this.value, priceHigher.value);
    return this.value;
};

const priceHigher = document.getElementById("priceHigher");
const outputHigher = document.getElementById("higherPriceValue");
outputHigher.innerHTML = priceHigher.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
priceHigher.oninput = function()  {
    outputHigher.innerHTML = this.value;
    filterPrice(priceLower.value, this.value);
    return this.value;
};

const generateRestHTML = (data) => {
  const restaurantsElement = document.getElementById("restaurantList");
  restaurantsElement.innerHTML = "";
  data.forEach((restaurantContainer, index) => {
    const restName = restaurantContainer.restaurant.name;
    const restAvgCost = restaurantContainer.restaurant.average_cost_for_two;
    const restAddress = restaurantContainer.restaurant.location.address;
    const restRating =
      restaurantContainer.restaurant.user_rating.aggregate_rating;
    const restThumb = restaurantContainer.restaurant.thumb;

    restaurantsElement.innerHTML += `<div class="restaurant-container">
                                            <img class="rest-image" src="${restThumb}">
                                            <h2 class="rest-name">${restName}</h2>
                                            <p class="rest-address">${restAddress}</p>
                                            <p class="rest-rating">Rating: ${restRating}</p>
                                        </div>`;
  });
};
