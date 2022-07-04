import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";

import ImageViewer from "./common/imageViewer";
import Button from "./common/button";

const RecipeImageSelector = ({ showDialog, images, onSelect, onCancel }) => {
  useEffect(() => {}, []);

  const handleImageSelect = (image) => {
    onSelect(image);
  };

  return (
    <div>
      <Modal show={showDialog} className="ShoppingDialog" animation={false}>
        <Modal.Header>
          <Modal.Title>SELECT IMAGE FOR MEAL OF THE WEEK</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ImageViewer
            images={images}
            showheader={false}
            widthFactor={0.3}
            padding={5}
            onRecipeSelect={handleImageSelect}
            width={350}
            numColumns={2}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            title="CANCEL"
            className="Button Primary"
            icon="window-close"
            onPress={onCancel}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default RecipeImageSelector;
