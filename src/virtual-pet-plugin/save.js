/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from "@wordpress/block-editor";
import turkeyLeg from "../../assets/turkey-leg.png";
import heart from "../../assets/heart-icon.png";
import cat from "../../assets/cat.png";

export default function save({ attributes }) {
  const blockProps = useBlockProps.save();

  return (
    <div {...blockProps}>
      {/* Output the text stored in the content attribute */}
      <div id="page-container">
        <div id="header-container">
          <h1 id="header-title">MySite.com</h1>
          <div>
            <h1 id="close-button">X</h1>
          </div>
        </div>
        <h2>Pet Name</h2>
        <div id="center-container">
          <img id="pet-image" src={cat} alt="cat" />
          <div id="skills-container">
            <p id="skill-title">Pet Stats</p>
            <div class="progress-container">
              <img class="progress-icon" src={heart} alt="heart icon" />
              <div class="progress-bar" id="happy">
                <div class="progress-square"></div>
                <div class="progress-square"></div>
                <div class="progress-square"></div>
                <div class="progress-square"></div>
                <div class="progress-square"></div>
                <div class="progress-square"></div>
                <div class="progress-square"></div>
                <div class="progress-square"></div>
                <div class="progress-square"></div>
                <div class="progress-square"></div>
              </div>
            </div>
            <div class="progress-container">
              <img class="progress-icon" src={turkeyLeg} alt="turkey leg" />
              <div class="progress-bar" id="hunger">
                <div class="progress-square"></div>
                <div class="progress-square"></div>
                <div class="progress-square"></div>
                <div class="progress-square"></div>
                <div class="progress-square"></div>
                <div class="progress-square"></div>
                <div class="progress-square"></div>
                <div class="progress-square"></div>
                <div class="progress-square"></div>
                <div class="progress-square"></div>
              </div>
            </div>
          </div>
        </div>
        <div id="button-container">
          <button
            type="button"
            onclick="handlePetClick('happy')"
            class="action-button"
          >
            Pet
          </button>
          <button
            type="button"
            onclick="handlePetClick('hunger')"
            class="action-button"
          >
            Treat
          </button>
        </div>
      </div>
    </div>
  );
}
