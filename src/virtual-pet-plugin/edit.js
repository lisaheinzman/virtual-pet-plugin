import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, RadioControl, TextControl } from "@wordpress/components";
import "./editor.scss";
import cat from "../../assets/cat.png";

export default function edit({ attributes, setAttributes }) {
  const { petName, browserTitle, colorScheme } = attributes;
  const blockProps = useBlockProps({
    className: colorScheme,
  });

  return (
    <>
      {/* Settings sidebar in editor */}
      <InspectorControls>
        <PanelBody title={"Pet Settings"} initialOpen={true}>
          <TextControl
            label={"Browser Title"}
            value={browserTitle}
            onChange={(newValue) => setAttributes({ browserTitle: newValue })}
          />
          <TextControl
            label={"Pet Name"}
            value={petName}
            onChange={(newValue) => setAttributes({ petName: newValue })}
          />
          <RadioControl
            label="Color Scheme"
            selected={colorScheme}
            options={[
              { label: "pink", value: "pink" },
              { label: "blue", value: "blue" },
              { label: "purple", value: "purple" },
              { label: "green", value: "green" },
            ]}
            onChange={(newValue) => setAttributes({ colorScheme: newValue })}
          />
        </PanelBody>
      </InspectorControls>
      {/* Block content preview in editor */}
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
            <img id="pet-image-edit" src={cat} alt="cat" />
          </div>
        </div>
      </div>
    </>
  );
}
