import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";
import { PanelBody, TextControl } from "@wordpress/components";
import "./editor.scss";

export default function edit({ attributes, setAttributes }) {
  const blockProps = useBlockProps();
  const { petName, browserTitle } = attributes;

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
        </PanelBody>
      </InspectorControls>
      {/* Block content preview in editor */}
      <div {...blockProps}>
        <p>{petName}</p>
      </div>
    </>
  );
}
