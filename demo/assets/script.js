let progress = {
  hungerBar: 0,
  happyBar: 0,
};

function addProgress(barId) {
  const barType = document.getElementById(barId);
  const square = barType.querySelectorAll(".progress-square");

  if (progress[barId] < square.length) {
    square[progress[barId]].classList.add("filled");
    progress[barId]++;
  }
}
