import React, { useState } from "react";
import StarRatingViewer from "../starRatingViewer";
import Button from "./button";

const ImageViewerItem = ({
  image,
  padding,
  onPress,
  showTitle,
  onItemDelete,
}) => {
  const [touched, setTouched] = useState(false);

  const toggleTouched = () => {
    setTouched({ touched: !touched });
  };
  const handleMouseUp = () => {
    setTimeout(() => {
      setTouched(false);
    }, 80);
  };

  return (
    <React.Fragment>
      {onItemDelete && (
        <div style={{ marginLeft: "20px" }}>
          <Button
            title="Delete"
            icon="trash-alt"
            className="Trash"
            onPress={() => onItemDelete(image)}
          />
        </div>
      )}
      <div
        //id="ImageViewerItem"
        className={touched ? "ImageViewerItem touched" : "ImageViewerItem"}
        onMouseDown={toggleTouched}
        onMouseUp={handleMouseUp}
        onClick={() => onPress(image)}
      >
        <img
          src={image.imageUrl}
          alt=""
          style={{
            width: image.actualWidth,
            height: image.actualHeight,
            borderTop: "solid 2px #416a59",
            borderLeft: "solid 2px #416a59",
            borderRight: "solid 2px #416a59",
            borderTopLeftRadius: showTitle ? "4px" : "25px",
            borderTopRightRadius: showTitle ? "4px" : "25px",
            borderBottomLeftRadius: showTitle ? "0px" : "25px",
            borderBottomRightRadius: showTitle ? "0px" : "25px",
            marginTop: "2px",
            marginLeft: "2px",
            marginRight: "2px",
          }}
        />
        {showTitle && (
          <div
            style={{
              width: image.actualWidth,
              height: "75px",
              backgroundColor: "#73A24E",
              color: "#fff",
              textAlign: "center",
              marginLeft: "2px",
              marginRight: "2px",
              marginBottom: "2px",
              marginTop: "0px",
              borderLeft: "solid 2px #416a59",
              borderRight: "solid 2px #416a59",
              borderBottom: "solid 2px #416a59",
              borderBottomLeftRadius: "4px",
              borderBottomRightRadius: "4px",
            }}
          >
            <span
              style={{ fontSize: "10pt", fontWeight: "bold", color: "#fff" }}
            >
              {image.recipeTitle}
            </span>
            <StarRatingViewer rating={image.rating} ratingClass="Rating" />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
export default ImageViewerItem;
