// API URL
const apiURL = "https://www.themealdb.com/api/json/v1/1";

// Variable for ID's
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const result = document.getElementById("result");
const itemsText = document.getElementById("item-ingredient");

// fetch meals by name
async function fetchMeals(text) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`
  );
  const data = await response.json();
  console.log(data);
  displayItems(data);
}

const displayItems = (items) => {
  const menuItems = document.getElementById(`items`);

  for (let i = 0; i < items.meals.length; i++) {
    const item = items.meals[i];
    const menuItem = document.createElement(`div`);
    menuItem.className = `itemList`;

    const itemInfo = `
      <img src=${item.strMealThumb}>
      <h3 class ="meal-name">${item.strMeal}</h3>
      <button onclick="displayIngredients('${item.strIngredient1} ${item.strIngredient2}')">Details</button>
      `;
    menuItem.innerHTML = itemInfo;
    menuItems.appendChild(menuItem);
  }
};

const displayIngredients = (ingredient) => {
  const ingredientDiv = document.getElementById("item-ingredient");
};

// Meals button click event handler
result.addEventListener("click", (event) => {
  // console.log(event.target);
  const clickedElement = event.target;

  if (clickedElement.tagName == "BUTTON") {
    const artist = clickedElement.getAttribute("data-artist");
    const songTitle = clickedElement.getAttribute("data-song-title");

    fetchLyrics(artist, songTitle);
  }
});

const reloadPage = () => location.reload();

// Event listener
searchBtn.addEventListener("click", () => {
  const searchText = searchInput.value.trim();
  // console.log(searchText);
  if (searchText == "") {
    // if search input is empty show alert and clear innerHtml if exist
    result.innerHTML = "";
    itemsText.innerHTML = "";
    alertNotification("empty-input", "block");
    setTimeout(() => alertNotification("empty-input", "none"), 3000);
  } else {
    result.innerHTML = "";
    itemsText.innerHTML = "";
    fetchMeals(searchText);
  }
});

// Notification Alert
const alertNotification = (id, value) =>
  (document.getElementById(id).style.display = value);
