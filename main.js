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

// Changes boxes to random color (rainbow)
function colorRainbow(e) {
  e.currentTarget.style.backgroundColor = 
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
  addEventListenerToDarken()
})

// Erase Button TODOOOOOOOOOO
let useErase = false;
document.querySelector("#erase").addEventListener("click", () => {
  useErase = !useErase; // Toggle the flag
  addEventListenerToBoxes(useErase); // Update the event listeners based on the flag
});


// Changes darkness of box

// let box = document.querySelector(".box");
const darkenBox = (event) => {
  let box = event.target;
  let currentBrightness = box.dataset.brightness || 110;
  currentBrightness = parseInt(currentBrightness) - 10;
  console.log(currentBrightness)
  if (currentBrightness >= 0) {
      box.style.filter = `brightness(${currentBrightness}%)`;
      box.dataset.brightness = currentBrightness;
  }
};

function addEventListenerToDarken() {
  let boxes = document.querySelectorAll(".box");
  boxes.forEach(function(box) {
    box.addEventListener("mouseover", darkenBox)
  });
}

addEventListenerToDarken()


// Adds rainbow color

document.querySelector("#randomColor").addEventListener("click", () => {
  colorRainbow();
})

function colorRainbow() {
  var color1 = Math.floor(Math.random() * 256);
  var color2 = Math.floor(Math.random() * 256);
  var color3 = Math.floor(Math.random() * 256);
  let box = document.querySelector(".box");
  box = 'rgb(' + color1 + ',' + color2 + ',' + color3 + ')';
}
