import React from "react";

const ImageViewerHeader = ({ totalImages }) => {
  return (
    <div>
      <span style={{ color: "grey", fontSize: "10pt" }}>
        ({totalImages} meal ideas found).
      </span>
    </div>
  );
};
export default ImageViewerHeader;
