export default function createTVui(parentDiv, tvInstance) {
  let tvContainer = document.createElement("div");
  tvContainer.setAttribute("id", `tv-${tvInstance.id}`);
  let tvScreen = document.createElement("img");
  tvScreen.setAttribute("id", `tv-${tvInstance.id}-screen`);
  tvScreen.setAttribute("class", "animal-screen");
  let tvPowerBtn = document.createElement("button");
  tvPowerBtn.setAttribute("type", "button");
  tvPowerBtn.setAttribute("class", "tv-power");
  tvPowerBtn.setAttribute("id", `tv-${tvInstance.id}-power`);
  tvPowerBtn.textContent = "power";
  tvContainer.appendChild(tvScreen);
  tvContainer.appendChild(tvPowerBtn);
  parentDiv.appendChild(tvContainer);
}
