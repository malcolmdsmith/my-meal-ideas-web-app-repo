import React from "react";

const ImageViewerHeader = ({ images }) => {
  return (
    <div>
      <span style={{ color: "grey", fontSize: "10pt" }}>
        ({images.length} meal ideas found).
      </span>
    </div>
  );
};
export default ImageViewerHeader;
