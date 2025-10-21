import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, RadioControl, TextControl } from "@wordpress/components";
import "./editor.scss";

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
        <p>{petName}</p>
      </div>
    </>
  );
}
