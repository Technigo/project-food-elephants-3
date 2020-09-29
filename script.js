const zomatoApiUrlCuisine =
  "https://developers.zomato.com/api/v2.1/search?entity_id=59&entity_type=city&cuisines=1&count=10&start=10";

const apiHeader = {
  headers: {
    "user-key": "f4409bfc8fdd4774e0e259204f26db78"
  }
};

fetch(zomatoApiUrlCuisine, apiHeader)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
     generateRestHTML(data);
  });

  const generateRestHTML = (data) => {
    const restaurantsElement = document.getElementById("restaurantList");
    data.restaurants.forEach((restaurantContainer, index) => {

        const restName = restaurantContainer.restaurant.name;
        const restAvgCost = restaurantContainer.restaurant.average_cost_for_two;
        const restAddress = restaurantContainer.restaurant.location.address;
        const restRating = restaurantContainer.restaurant.user_rating.aggregate_rating;
        const restThumb = restaurantContainer.restaurant.thumb;

        restaurantsElement.innerHTML +=  `<div class="restaurant-container">
                                            <img class="rest-image" src="${restThumb}">
                                            <h2 class="rest-name">${restName}</h2>
                                            <p class="rest-address">${restAddress}</p>
                                            <p class="rest-rating">Rating: ${restRating}</p>
                                        </div>`
    });
}