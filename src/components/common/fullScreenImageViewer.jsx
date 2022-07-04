import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FullScreenImageViewer = ({ images, showViewer, onHandleClose }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (showViewer) handleClick();
  }, [showViewer]);
  const handleClick = () => {
    window.scrollTo(0, 0);
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  };
  const handleClose = () => {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    onHandleClose();
  };

  const getHeight = () => {
    let height = 0; //window.innerHeight;
    let width = getWidth();
    height = (images[index].image_height / images[index].image_width) * width;
    if (height > window.innerHeight) height = window.innerHeight;
    return height;
  };
  const getWidth = () => {
    //const height = getHeight();
    let width = 760;
    if (images[index].image_width < width) width = images[index].image_width;
    return width;
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    var modal = document.getElementById("myModal");
    if (event.target === modal) {
      handleClose();
    }
  };

  const handleBackward = () => {
    if (index > 0) {
      let idx = index - 1;
      setIndex(idx);
    } else {
      let idx = images.length - 1;
      setIndex(idx);
    }
  };

  const handleForward = () => {
    if (index < images.length - 1) {
      let idx = index + 1;
      setIndex(idx);
    } else {
      setIndex(0);
    }
  };

  return (
    <React.Fragment>
      <div id="myModal" className="fullscreen-modal">
        <div className="fullscreen-modal-content">
          <span className="close" onClick={handleClose}>
            &times;
          </span>
          <div onClick={handleBackward}>
            <FontAwesomeIcon icon="angle-left" color="lightgray" />
          </div>
          {images[index] && (
            <img
              src={images[index].imageUrl}
              alt=""
              style={{ width: getWidth(), height: getHeight(), margin: "20px" }}
            />
          )}
          <div onClick={handleForward}>
            <FontAwesomeIcon icon="angle-right" color="lightgray" />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default FullScreenImageViewer;
