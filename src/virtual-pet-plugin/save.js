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
  const { petName, browserTitle, colorScheme } = attributes;
  const blockProps = useBlockProps.save({
    className: colorScheme,
  });

  return (
    <div {...blockProps}>
      <div id="page-container">
        <div id="header-container">
          <h1 id="header-title">{browserTitle}</h1>
          <div>
            <h1 id="close-button">X</h1>
          </div>
        </div>
        <h2 id="pet-name">{petName}</h2>
        <div id="center-container">
          <img id="pet-image" src={cat} alt="cat" />
          <div id="stats-container">
            <p id="stat-title">Pet Stats</p>
            <div class="progress-container">
              <img class="progress-icon" src={heart} alt="heart icon" />
              <div class="progress-bar" id="happy">
                <div class="progress-square filled"></div>
                <div class="progress-square filled"></div>
                <div class="progress-square filled"></div>
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
                <div class="progress-square filled"></div>
                <div class="progress-square filled"></div>
                <div class="progress-square filled"></div>
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
          <button data-type="happy" className="action-button">
            Pet
          </button>
          <button data-type="hunger" className="action-button">
            Treat
          </button>
        </div>
      </div>
    </div>
  );
}
