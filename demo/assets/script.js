// Object that defines all possible states of the virtual pet
const petStates = {
  NORMAL: "normal", // default state
  HAPPY: "happy", // when progress = 10/10
  SAD: "sad", // when progress = 0/10
  SLEEPY: "sleeping", // when time since last interaction is more than 30 seconds
  BLINK: "blinking",
  PET: "petted", // when cat is being pet
  EAT: "eating", // when cat is given treat
  SADIDLE: "sadidle",
  HAPPYIDLE: "happyidle",
};

let currentState = petStates.NORMAL;

// Object that defines the two types of progress
let progress = {
  hunger: 3,
  happy: 3,
};

// Stores the pet's image into petImage so it can be modified
const petImage = document.getElementById("pet-image");

function displayPetState(state) {
  switch (state) {
    case petStates.NORMAL:
      petImage.src = "assets/cat.png";
      break;
    case petStates.PET:
      petImage.src = "assets/cat-sparkle.gif";
      break;
    case petStates.EAT:
      petImage.src = "assets/cat-eat.gif";
      break;
    case petStates.SLEEPY:
      petImage.src = "assets/cat-sleep.gif";
      break;
    case petStates.SAD:
      petImage.src = "assets/cat-sad.gif";
      break;
    case petStates.SADIDLE:
      petImage.src = "assets/cat-sad-idle.gif";
      break;
    case petStates.HAPPY:
      petImage.src = "assets/cat-happy.gif";
      break;
    case petStates.HAPPYIDLE:
      petImage.src = "assets/cat-happy-transition.gif";
      break;
    case petStates.BLINK:
      petImage.src = "assets/cat-blink.gif";
      break;
  }
}

/*
 * Disables all action buttons to prevent overlapping animations
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
 */
function animateEvent(type) {
  if (type === "hunger") {
    displayPetState(petStates.EAT);
  }
  if (type === "happy") {
    displayPetState(petStates.PET);
  }
  if (type === "sleep") {
    intervals["fallAsleep"] = setTimeout(
      () => displayPetState(petStates.SLEEPY),
      5000
    );
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
    setTimeout(() => displayPetState(petStates.HAPPYIDLE), 600);
    setTimeout(() => displayPetState(petStates.NORMAL), 10000);
    console.log("Triggering HAPPY IDLE");
  } else {
    displayPetState(petStates.NORMAL);
  }
}

/*
 * Subtracts 1 from cooresponding progress type
 * Removes the 'filled' class to the cooresponding progress square
 * Checks to see if progress container is empty to change pet state to SAD
 */
function decayProgress(type) {
  console.log(progress);
  const barType = document.getElementById(type);
  const square = barType.querySelectorAll(".progress-square");
  if (progress[type] > 0) {
    progress[type]--;
    console.log(square[progress[type]]);
    square[progress[type]].classList.remove("filled");
    if (progress[type] === 0) {
      displayPetState(petStates.SAD);
      setTimeout(() => displayPetState(petStates.SADIDLE), 600);
      console.log("Triggering SAD IDLE");
      //maybe should also reset sleep timer
    }
  }
}

//setInterval(() => changeState(petStates.BLINK), 4000);
clearInterval();
const intervals = {};
intervals["happy"] = setInterval(() => decayProgress("happy"), 20000);
intervals["hunger"] = setInterval(() => decayProgress("hunger"), 7000);
intervals["fallAsleep"] = setInterval(
  () => displayPetState(petStates.SLEEPY),
  60000
);
/*
 * Handles a button interaction by calling functions that:
 * - Animate the corresponding event
 * - Add progress to the corresponding progress bar after brief pause for the animation
 * - Reset the decay timer (delays the decay of progress) of the
 * - Resets the sleep timer
 * - Disable all buttons during animation
 */
function handlePetClick(type) {
  // stop the countown of decay progress to corresponding event
  clearInterval(intervals[type]);
  clearTimeout(intervals["fallAsleep"]);
  animateEvent(type);
  setTimeout(() => addProgress(type), 2000);
  disableButtons();
  intervals[type] = setInterval(() => decayProgress(type), 20000);
  intervals["fallAsleep"] = setTimeout(
    () => displayPetState(petStates.SLEEPY),
    60000
  );
}
