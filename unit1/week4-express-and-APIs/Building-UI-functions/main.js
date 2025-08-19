// import Option from "./option.js";

let mainContent = document.querySelector(".main-content");
mainContent.innerHTML = "<h1>Hello</h1>";

function insertAboveAndBelow() {
  const aboveTag = document.createElement("div");
  aboveTag.innerHTML = "<h1>above</h1>";
  mainContent.prepend(aboveTag);
  const belowTag = document.createElement("div");
  belowTag.innerHTML = "<h1>below</h1>";
  mainContent.append(belowTag);
}
insertAboveAndBelow();

const favoriteFoods = ["pizza", "burgers", "chicken"];

const foodSelect = document.createElement("select");
foodSelect.setAttribute("name", "choose-food");
const disabledChoice = document.createElement("option");
disabledChoice.setAttribute("selected", "");
disabledChoice.setAttribute("disabled", "");
disabledChoice.textContent = "choose one...";
foodSelect.prepend(disabledChoice);

favoriteFoods.forEach((food, index) => {
  let thisFood = document.createElement("option");
  thisFood.value = food;
  thisFood.textContent = food.toUpperCase();
  foodSelect.append(thisFood);
});

mainContent.append(foodSelect);

// create a reusable function
const favoriteCars = ["Bugatti", "Ferrari", "BMW"];
function createOptionSelect(choiceArr, selectName) {
  const customSelect = document.createElement("select");
  customSelect.setAttribute("name", `${selectName}`);
  const disabledChoice = document.createElement("option");
  disabledChoice.setAttribute("selected", "");
  disabledChoice.setAttribute("disabled", "");
  disabledChoice.textContent = "choose one...";
  customSelect.prepend(disabledChoice);
  choiceArr.forEach((item, index) => {
    let thisItem = document.createElement("option");
    thisItem.value = item;
    thisItem.textContent = item;
    customSelect.append(thisItem);
  });
  return customSelect;
}
const carSelect = createOptionSelect(favoriteCars, "favorite-cars");
mainContent.append(carSelect);
