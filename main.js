const container = document.querySelector(".container");
let dimension = 5

// grid 16x16
function createGrid(dimension) {
  for(let i = 0; i < (dimension * dimension); i++) {
    let box = document.createElement("div");
    box.classList.add("box");
    container.appendChild(box);
    }
}

// Changes color of boxes
function changeColor(e) {
  e.currentTarget.style.backgroundColor = "yellow";
}

// Erase function
function erase(e) {
  e.currentTarget.style.backgroundColor = "lightgrey";
}

// Removes all boxes inside of container
function removeAllChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// Add Change Color event listener to each box
function addEventListenerToChangeColor() {
  let boxes = document.querySelectorAll(".box");
  boxes.forEach(function(box) {
    box.addEventListener("mouseover", changeColor)
  });
}

// Add event listener to each box based on the flag
function addEventListenerToBoxes(useErase) {
  let boxes = document.querySelectorAll(".box");
  boxes.forEach(function(box) {
    box.removeEventListener("mouseover", useErase ? changeColor : erase); // Remove the other event listener
    box.addEventListener("mouseover", useErase ? erase : changeColor); // Add the correct event listener
  });
}

// Original Functionality
createGrid(dimension)
container.style.setProperty('--dimension', dimension);
addEventListenerToBoxes(false);

// Reset button
const reset = document.querySelector("#reset");
reset.addEventListener("click", () => document.location.reload());

// Resize Button
document.querySelector("#resize").addEventListener("click", function() {
  let person = prompt("Please enter a number of squares")
  removeAllChildren(container)
  dimension = person
  container.style.setProperty('--dimension', dimension);
  createGrid(person)
  addEventListenerToChangeColor()
})

// Erase Button
let useErase = false;
document.querySelector("#erase").addEventListener("click", () => {
  useErase = !useErase; // Toggle the flag
  addEventListenerToBoxes(useErase); // Update the event listeners based on the flag
});
