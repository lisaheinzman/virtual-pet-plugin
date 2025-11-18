//TESTING UPDATE
const petStates = {
  NORMAL: "normal",
  HAPPY: "happy",
  SLEEPY: "sleeping",
  BLINK: "blinking",
  PET: "petted",
  EAT: "eating",
  //sad - when health or hunger is = 0
};

const petImage = document.getElementById("pet-image");

function displayPetState(state) {
  switch (state) {
    case petStates.NORMAL:
      petImage.src = "assets/cat.png";
      break;
    case petStates.HAPPY:
      petImage.src = "assets/cat-sparkle.gif";
      break;
    case petStates.BLINK:
      petImage.src = "assets/cat-blink.gif";
      break;
    case petStates.PET:
      petImage.src = "assets/cat-sparkle.gif";
      break;
    case petStates.EAT:
      petImage.src = "assets/cat-eat.gif";
      break;
  }
}
let currentState = petStates.NORMAL;

function changeState(newState) {
  currentState = newState;
  displayPetState(currentState);
}

let progress = {
  hunger: 0,
  happy: 0,
};

function disableButtons() {
  const buttons = document.querySelectorAll(".action-button");
  console.log(buttons);
  buttons.forEach((button) => (button.disabled = true));
  setTimeout(function () {
    buttons.forEach((button) => (button.disabled = false));
  }, 2000);
}

function animateEvent(barID) {
  if (barID === "hunger") {
    changeState(petStates.EAT);
    disableButtons();
  }
  if (barID === "happy") {
    changeState(petStates.PET);
    disableButtons();
  }
}

function addProgress(barId) {
  const barType = document.getElementById(barId);
  const square = barType.querySelectorAll(".progress-square");

  if (progress[barId] < square.length) {
    square[progress[barId]].classList.add("filled");
    progress[barId]++;
  }
  if (progress[barId] === square.length) {
    changeState(petStates.HAPPY);
  } else {
    changeState(petStates.NORMAL);
  }
}

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

//setInterval(() => changeState(petStates.BLINK), 4000);
clearInterval();
const intervals = {};
intervals["happy"] = setInterval(() => decayProgress("happy"), 20000);
intervals["hunger"] = setInterval(() => decayProgress("hunger"), 20000);

function handlePetClick(barID) {
  clearInterval(intervals[barID]);
  setTimeout(() => addProgress(barID), 2000);
  animateEvent(barID);
  intervals[barID] = setInterval(() => decayProgress(barID), 20000);
}
