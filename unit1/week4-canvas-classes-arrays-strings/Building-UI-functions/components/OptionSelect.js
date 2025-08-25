export default function OptionSelect(choiceArr, selectName) {
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
