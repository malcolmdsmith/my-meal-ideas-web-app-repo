import FormState from "./common/formstate";
import { Modal } from "react-bootstrap";
import Button from "./common/button";
import Joi from "joi-browser";

import { saveShoppingItem } from "../services/shoppingListService";
import { getCurrentUser } from "../services/authService";

class ShoppingListItemEditor extends FormState {
  state = {
    data: {
      id: 0,
      ingredientName: "",
      measure: "",
      qty: 1,
      cost: "0.00",
      shopping_list_date: new Date(),
      picked: false,
      username: getCurrentUser(),
      createdAt: "",
      updatedAt: "",
    },
    modalHeading: "Add/Edit Item",
    errors: [],
    item_id: 0,
  };

  schema = {
    id: Joi.number().optional(),
    ingredientName: Joi.string().label("Ingredient Name").required().max(50),
    measure: Joi.string().label("Measure").required().max(30),
    qty: Joi.number().label("Qty").required().min(1),
    cost: Joi.number().label("Cost Price").min(0),
    shopping_list_date: Joi.date().optional().allow(""),
    picked: Joi.bool().required(),
    createdAt: Joi.date().optional().allow(""),
    updatedAt: Joi.date().optional().allow(""),
    username: Joi.string().optional().allow(""),
  };

  componentDidMount() {
    let data;
    if (this.props.item) {
      data = { ...this.props.item };
      this.setState({ data });
    } else this.initializeData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.item !== this.props.item) {
      let data;
      if (this.props.item) {
        data = { ...this.props.item };
        this.setState({ data });
      } else this.initializeData();
    }
  }

  doSubmit = async () => {
    let { data } = this.state;

    await saveShoppingItem(data);
    this.initializeData();
  };

  initializeData = () => {
    const data = {
      ingredientName: "",
      measure: "",
      qty: 1,
      cost: "0.00",
      shopping_list_date: new Date(),
      picked: false,
      username: getCurrentUser(),
      createdAt: "",
      updatedAt: "",
    };
    this.setState({ data });
  };

  render() {
    const { modalHeading } = this.state;

    return (
      <div>
        <Modal show={this.props.showDialog} className="ShoppingDialog">
          <Modal.Header>
            <Modal.Title>{modalHeading}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div>
              <form onSubmit={this.handleSubmit}>
                <div>
                  {this.renderInput(
                    "ingredientName",
                    "Ingredient Name",
                    "pencil-alt",
                    "#39395f",
                    "navyLabel"
                  )}
                  <div style={{ width: "50%" }}>
                    {this.renderInput(
                      "measure",
                      "Measure",
                      "pencil-alt",
                      "#39395f",
                      "navyLabel"
                    )}
                  </div>
                  <div style={{ width: "25%", marginBottom: "10px" }}>
                    {this.renderInput(
                      "qty",
                      "Qty",
                      "pencil-alt",
                      "#39395f",
                      "navyLabel"
                    )}
                  </div>
                  <div style={{ width: "25%", marginBottom: "10px" }}>
                    {this.renderInput(
                      "cost",
                      "Cost Price",
                      "pencil-alt",
                      "#39395f",
                      "navyLabel"
                    )}
                  </div>
                  {this.renderButton("SAVE", "save", "Button Primary", true)}
                </div>
              </form>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button
              title="DONE"
              className="Button Primary"
              icon="smile"
              onPress={this.props.onItemUpdated}
            />
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ShoppingListItemEditor;
