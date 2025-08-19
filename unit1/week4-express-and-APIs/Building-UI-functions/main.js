import {
  favoriteCars as FC,
  favoriteFoods as FF,
} from "./utilities/custom-option-arrays.js";
import OptionSelect from "./components/OptionSelect.js";

let mainContent = document.querySelector(".main-content");
mainContent.innerHTML = "<h1>Hello</h1>";

// create a reusable function
const carSelect = OptionSelect(FC, "favorite-cars");
const foodSelect = OptionSelect(FF, "favorite-foods");
mainContent.append(carSelect);
mainContent.append(foodSelect);
