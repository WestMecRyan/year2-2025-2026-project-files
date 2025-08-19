export default function insertAboveAndBelow() {
  const aboveTag = document.createElement("div");
  aboveTag.innerHTML = "<h1>above</h1>";
  mainContent.prepend(aboveTag);
  const belowTag = document.createElement("div");
  belowTag.innerHTML = "<h1>below</h1>";
  mainContent.append(belowTag);
}