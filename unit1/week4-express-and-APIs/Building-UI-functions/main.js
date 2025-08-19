// import Option from "./option.js";

let mainContent = document.querySelector(".main-content");
mainContent.innerHTML = "<h1>Hello</h1>";
const aboveTag = document.createElement("div");
aboveTag.innerHTML = "<h1>above</h1>";
mainContent.prepend(aboveTag);
// create an element to hold the below tag
// and replace the append
mainContent.append("<h1>below</h1>");
