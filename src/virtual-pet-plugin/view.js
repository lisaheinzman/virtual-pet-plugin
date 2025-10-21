import { useBlockProps, RichText } from "@wordpress/block-editor";
/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

//const { progress } = attributes;
let progress = {
  hunger: 0,
  happy: 0,
};

document.addEventListener("DOMContentLoaded", () => {
  // Find all action buttons on the page
  const actionButtons = document.querySelectorAll(".action-button");

  actionButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      // Capture data-type of button clicked
      const type = event.target.dataset.type;
      console.log("button");
      // function call to addProgress that passes the data-type of button clicked
      addProgress(type);
    });
  });
});

function addProgress(type) {
  const barType = document.getElementById(type);
  const square = barType.querySelectorAll(".progress-square");

  if (progress[type] < square.length) {
    square[progress[type]].classList.add("filled");
    progress[type]++;
  }
  /*
  if (progress[hunger] === square.length) {
    changeState(petStates.HAPPY);
  } else {
    changeState(petStates.NORMAL);
  }
    */
}

/* eslint-disable no-console */
console.log("Hello World! (from create-block-virtual-pet-plugin block)");
/* eslint-enable no-console */
