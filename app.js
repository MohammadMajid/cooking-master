// API URL
const apiURL = "https://www.themealdb.com/api/json/v1/1";

// Variable for ID's
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const result = document.getElementById("result");
const itemsText = document.getElementById("item-ingredient");
const menuItems = document.getElementById("items");

// fetch meals by name
async function fetchMeals(text) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`
  );
  const data = await response.json();
  console.log(data);
  displayItems(data.meals);
}

const displayItems = (items) => {
  if (items != null || items != undefined) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const menuItem = document.createElement(`div`);
      menuItem.setAttribute("onclick", `handleItemDetails('${item.idMeal}')`);

      menuItem.className = `itemList`;

      const itemInfo = `
          <img src=${item.strMealThumb}>
          <h3 class ="meal-name">${item.strMeal}</h3>
          `;
      menuItem.innerHTML = itemInfo;
      menuItems.appendChild(menuItem);
    }
  } else {
    alertNotification("meals-not-found", "block");
    setTimeout(() => alertNotification("meals-not-found", "none"), 3000);
  }
};

const displayIngredients = (ingredient) => {
  const ingredientDiv = document.getElementById("item-ingredient");
};

const handleItemDetails = async (idMeal) => {
  console.log(idMeal);
  const detailsURL = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
  );
  const mealDetails = await detailsURL.json();
  const mealInfo = mealDetails.meals[0];

  const {
    strMealThumb,
    strMeal,
    strCategory,
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strIngredient8,
    strIngredient9,
    strIngredient10,
  } = mealInfo;
  const subset = {
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strIngredient6,
    strIngredient7,
    strIngredient8,
    strIngredient9,
    strIngredient10,
  };

  console.log(mealInfo);
  menuItems.innerHTML = "";

  menuItems.innerHTML = `
        <div class="single-result d-flex flex-wrap justify-content-center">
            <div id="item-details-info" class="box-full">
                <img src=${strMealThumb} alt="">
                <h3>${strMeal}</h3>
                <h4>${strCategory}</h4>
                <h5>INGREDIENT :</h5>    
            </div>
        </div>
         `;

  // For List Area
  var div = document.getElementById("item-details-info");
  var ul = document.createElement("ul");

  div.appendChild(ul);
  Object.values(subset).forEach((val) => {
    if (val != "" || val == null) {
      let li = document.createElement("li");
      ul.appendChild(li);
      li.append(val);
    }
  });
};

const reloadPage = () => location.reload();

// Event listener
searchBtn.addEventListener("click", () => {
  const searchText = searchInput.value.trim();
  // console.log(searchText);
  if (searchText == "") {
    // if search input is empty show alert and clear innerHtml if exist
    menuItems.innerHTML = "";
    itemsText.innerHTML = "";
    alertNotification("empty-input", "block");
    setTimeout(() => alertNotification("empty-input", "none"), 3000);
  } else {
    menuItems.innerHTML = "";
    itemsText.innerHTML = "";
    fetchMeals(searchText);
  }
});

// Notification Alert
const alertNotification = (id, value) =>
  (document.getElementById(id).style.display = value);
