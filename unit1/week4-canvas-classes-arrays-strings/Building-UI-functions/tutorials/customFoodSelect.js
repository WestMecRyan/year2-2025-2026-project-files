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