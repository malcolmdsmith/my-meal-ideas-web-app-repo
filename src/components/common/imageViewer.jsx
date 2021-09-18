import React, { useState, useEffect } from "react";

import ImageViewerItem from "./imageViewerItem";
import { getImageDimensions } from "./imageViewerDimensions";
import ImageViewerHeader from "./imageViewerHeader";

const ImageViewer = ({
  images,
  showheader,
  onRecipeSelect,
  numColumns,
  width,
  padding,
  onItemDelete,
}) => {
  const [viewerImages, setImages] = useState([]);

  useEffect(() => {
    const result = getImageDimensions(images, width, numColumns, padding);
    setImages(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  return (
    <React.Fragment>
      <div>
        {showheader && <ImageViewerHeader images={images} />}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: width - padding,
          }}
        >
          {viewerImages.map((image, index) => (
            <ImageViewerItem
              image={image}
              key={index}
              onPress={onRecipeSelect}
              showTitle={showheader}
              onItemDelete={onItemDelete}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};
export default ImageViewer;
