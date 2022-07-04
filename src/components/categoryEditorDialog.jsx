import React from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import { uploadImageS3 } from "../services/amplify";
import FormState from "./common/formstate";
import { Modal } from "react-bootstrap";
import Button from "./common/button";
import Joi from "joi-browser";
import ImageEditor from "./common/imageEditor";
import { saveCategory } from "../services/categoriesService";

class CategoryEditorDialog extends FormState {
  state = {
    data: {
      category_name: "",
    },
    errors: {},
    image_file: {},
    image_format: "",
    image_width: 0,
    image_height: 0,
  };

  schema = {
    category_name: Joi.string().max(30).required().label("Category Name"),
  };

  handleImagePicked = (image_file, image_format, image_width, image_height) => {
    this.setState(
      { image_file, image_format, image_width, image_height },
      () => {
        document.getElementById("submitButton").click();
      }
    );
  };

  doSubmit = async () => {
    let { image_file, image_format, data, image_width, image_height } =
      this.state;
    if (!image_file) {
      toast.error("You must add a photo for the category!");
      return;
    }

    const id = uuidv4();
    const key = `${data.category_name}/${id}.${image_format}`;
    await uploadImageS3(key, image_file);

    const category = {
      category_name: data.category_name.toString().toUpperCase(),
      category_image: key,
      category_image_format: image_format,
      image_width: image_width,
      image_height: image_height,
    };

    await saveCategory(category);
    const def = { category_name: "" };
    this.setState({ data: def });
  };

  render() {
    return (
      <div>
        <Modal
          show={this.props.showCategoryDialog}
          className="ShoppingDialog"
          animation={false}
          size="xxl"
        >
          <Modal.Header>
            <Modal.Title>ADD CATEGORY</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <form id="categoryForm" onSubmit={this.handleSubmit}>
                <div
                  style={{
                    width: "55%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "",
                    marginLeft: "20px",
                  }}
                >
                  {this.renderInput(
                    "category_name",
                    "Category Name",
                    "pencil-alt",
                    "#39395f",
                    "navyLabel"
                  )}
                  <ImageEditor
                    submitButtonName="Save"
                    submitButtonIcon="save"
                    clearForm={this.state.clearForm}
                    onImageAdd={this.handleImagePicked}
                  />
                  <input
                    type="submit"
                    style={{ display: "none" }}
                    id="submitButton"
                  />
                </div>
              </form>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button
              title="DONE"
              className="Button Primary"
              icon="smile"
              onPress={this.props.onCategoryUpdated}
            />
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default CategoryEditorDialog;
