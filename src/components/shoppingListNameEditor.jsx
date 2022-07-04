import React from "react";
import FormState from "./common/formstate";
import { Modal } from "react-bootstrap";
import Button from "./common/button";
import Joi from "joi-browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { saveShoppingList } from "../services/shoppingListsService";

class ShoppingListNameEditor extends FormState {
  state = {
    data: {
      shopping_list_name: "",
      owner_id: 0,
      master_list: 0,
    },
    errors: {},
  };

  schema = {
    id: Joi.number().optional(),
    shopping_list_name: Joi.string()
      .label("Shopping List Name")
      .required()
      .max(30),
    owner_id: Joi.number(),
    master_list: Joi.number(),
  };

  doSubmit = async () => {
    let { data } = this.state;

    await saveShoppingList(data);
    this.props.onItemUpdated();
  };

  render() {
    return (
      <div>
        <Modal show={this.props.showDialog} className="shoppingDialog">
          <Modal.Header>
            <Modal.Title>
              <FontAwesomeIcon icon="cart-plus" color="white" />
              &nbsp;&nbsp; Shopping List
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div>
              <form onSubmit={this.handleSubmit}>
                <div>
                  {this.renderInput(
                    "shopping_list_name",
                    "Shopping List Name",
                    "pencil-alt",
                    "#39395f",
                    "navyLabel"
                  )}
                  <div style={{ width: "50%", marginTop: "30px" }}>
                    {this.renderButton("SAVE", "save", "Button Primary", true)}
                  </div>
                </div>
              </form>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button
              title="DONE"
              className="Button Primary"
              icon="smile"
              onPress={this.props.onDialogClose}
            />
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ShoppingListNameEditor;
