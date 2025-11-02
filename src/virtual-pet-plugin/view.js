import { useBlockProps, RichText } from "@wordpress/block-editor";
import catPet from "../../assets/cat-sparkle.gif";
import catEat from "../../assets/cat-eat.gif";
import catNormal from "../../assets/cat.png";
import catSleep from "../../assets/cat-sleep.gif";

// Object that defines all possible states of the virtual pet
const petStates = {
  NORMAL: "normal", // default state
  HAPPY: "happy", // when progress = 10/10
  SAD: "hunger", // when progress = 0/10
  SLEEPY: "sleeping", // when time since last interaction is more than 30 seconds
  BLINK: "blinking",
  PET: "petted", // when cat is being pet
  EAT: "eating", // when cat is given treat
};

// Object that defines the two types of progress
const progress = {
  hunger: 3,
  happy: 3,
};

// Stores the pet's image into petImage so it can be modified
const petImage = document.getElementById("pet-image");

// Sets the pet's image to match the paramater state
function displayPetState(state) {
  switch (state) {
    case petStates.NORMAL:
      petImage.src = catNormal;
      break;
    case petStates.PET:
      petImage.src = catPet;
      break;
    case petStates.EAT:
      petImage.src = catEat;
      break;
    case petStates.SLEEPY:
      petImage.src = catSleep;
      break;
  }
}

/*
 * Changes button attribute disabled to "true"
 * Button attributes changed to "false" after timeout is finished
 */
function disableButtons() {
  const buttons = document.querySelectorAll(".action-button");
  console.log(buttons);
  buttons.forEach((button) => (button.disabled = true));
  setTimeout(function () {
    buttons.forEach((button) => (button.disabled = false));
  }, 2000);
}

/*
 * Changes state of the pet with the cooresponding button pressed
 * Disables all action buttons to prevent overlapping animations
 */
function animateEvent(barID) {
  if (barID === "hunger") {
    displayPetState(petStates.EAT);
  }
  if (barID === "happy") {
    displayPetState(petStates.PET);
  }
}

/*
 * Adds 1 to cooresponding progress type
 * Adds the 'filled' class to the cooresponding progress square
 * Checks to see if progress container is full to change pet state to HAPPY
 */
function addProgress(type) {
  const barType = document.getElementById(type);
  const square = barType.querySelectorAll(".progress-square");

  if (progress[type] < square.length) {
    square[progress[type]].classList.add("filled");
    progress[type]++;
  }
  if (progress[type] === square.length) {
    displayPetState(petStates.HAPPY);
  } else {
    displayPetState(petStates.NORMAL);
  }
}

/*
 * Subtracts 1 from cooresponding progress type
 * Removes the 'filled' class to the cooresponding progress square
 * TO ADD: Checks to see if progress container is empty to change pet state to SAD
 */
function decayProgress(barId) {
  console.log(progress);
  const barType = document.getElementById(barId);
  const square = barType.querySelectorAll(".progress-square");
  if (progress[barId] > 0) {
    progress[barId]--;
    console.log(square[progress[barId]]);
    square[progress[barId]].classList.remove("filled");
  }
}

clearInterval();

const intervals = {};
// delays the decay of progress
intervals["happy"] = setInterval(() => decayProgress("happy"), 30000);
intervals["hunger"] = setInterval(() => decayProgress("hunger"), 20000);
intervals["fallAsleep"] = setTimeout(
  () => displayPetState(petStates.SLEEPY),
  20000
);

/*
 * Handles a button interaction by calling functions that:
 * - Animate the corresponding event
 * - Add progress to the corresponding progress bar after brief pause for the animation
 * - Reset the decay timer (delays the decay of progress) of the
 * - Resets the sleep timer
 * - Disable all buttons during animation
 */
function handlePetClick(barID) {
  console.log(barID);
  // stop the countown of decay progress to corresponding event
  clearInterval(intervals[barID]);
  clearTimeout(intervals["fallAsleep"]);
  animateEvent(barID);
  setTimeout(() => addProgress(barID), 2000);
  disableButtons();
  // starts the countown of decay progress to corresponding event
  intervals[barID] = setInterval(() => decayProgress(barID), 20000);
  intervals["fallAsleep"] = setTimeout(
    () => displayPetState(petStates.SLEEPY),
    20000
  );
}

/*
 * Function exlusive to WordPress version because HTML in save.js becomes static, resulting in unresponsive buttons
 * Finds all action buttons on the page
 * Captures data-type of button clicked in 'type'
 * Calls handler function that
 */
document.addEventListener("DOMContentLoaded", () => {
  const actionButtons = document.querySelectorAll(".action-button");
  actionButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const type = event.target.dataset.type;
      console.log("button");
      // function call to addProgress that passes the data-type of button clicked
      handlePetClick(type);
    });
  });
});

/* eslint-disable no-console */
console.log("Hello World! (from create-block-virtual-pet-plugin block)");
/* eslint-enable no-console */
