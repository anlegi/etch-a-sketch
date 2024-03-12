const container = document.querySelector(".container");
let dimension = 5
const gridSizeInput = document.querySelector("#grid-size")
const gridSizeValueDisplay = document.querySelector("#grid-size-value")

// grid 16x16
function createGrid(dimension) {
  container.style.setProperty('--dimension', dimension); // Update the --dimension variable to the new dimension

  removeAllChildren(container); // Remove all existing children/grid squares

  for(let i = 0; i < (dimension * dimension); i++) {
    let box = document.createElement("div");
    box.classList.add("box");
    container.appendChild(box);
    }
  addEventListenerToChangeColor() // after reset you can draw again
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
    if (useErase) {
      box.removeEventListener("mouseover", darkenBox)
      box.style.filter = "";
    }
  });
}

// Original Functionality
createGrid(dimension)
container.style.setProperty('--dimension', dimension);
addEventListenerToBoxes(false);

// Reset button
// const reset = document.querySelector("#reset");
// reset.addEventListener("click", () => document.location.reload());

const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
    // Read the current value from the slider
    const currentSize = parseInt(gridSizeInput.value, 10);

    // Clear the existing grid
    removeAllChildren(container);

    // Update the CSS variable and the grid itself
    container.style.setProperty('--dimension', currentSize);
    createGrid(currentSize);

    // Update displayed value
    if (gridSizeValueDisplay) {
        gridSizeValueDisplay.textContent = currentSize;
    }
    addEventListenerToDarken()
});


// Resize Button
// document.querySelector("#resize").addEventListener("click", function() {
//   let person = prompt("Please enter a number of squares")
//   removeAllChildren(container)
//   dimension = person
//   container.style.setProperty('--dimension', dimension);
//   createGrid(person)
//   addEventListenerToChangeColor()
//   addEventListenerToDarken()
// })

// Erase Button
//TODO: fix color grading on erase, it doesn't color grade
let useErase = false;
document.querySelector("#erase").addEventListener("click", () => {
  useErase = !useErase; // Toggle the flag
  addEventListenerToBoxes(useErase); // Update the event listeners based on the flag
});

function erase(e) {
  e.currentTarget.style.backgroundColor = "lightgrey";
}

// Changes darkness of box

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


// Ads click event listener to rainbow button
document.querySelector("#randomColor").addEventListener("click", addEventListenerToRainbow);

// Adds rainbow color
function colorRainbow() {
  var color1 = Math.floor(Math.random() * 256);
  var color2 = Math.floor(Math.random() * 256);
  var color3 = Math.floor(Math.random() * 256);
  return 'rgb(' + color1 + ',' + color2 + ',' + color3 + ')';
}

// Adds eventlistener to box to random color (rainbow)
function addEventListenerToRainbow() {
  let boxes = document.querySelectorAll(".box");
  boxes.forEach(function(box) {
    box.addEventListener("mouseover", function() {
      box.style.backgroundColor = colorRainbow();
    });
  });
}


gridSizeInput.addEventListener("input", () => {
  const newSize = gridSizeInput.value;
  gridSizeValueDisplay.textContent = newSize
  removeAllChildren(container)
  createGrid(newSize)
  addEventListenerToChangeColor()
  addEventListenerToDarken()
});
