import FormState from "./common/formstate";
import { Modal } from "react-bootstrap";
import Button from "./common/button";
import Joi from "joi-browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { saveShoppingItem } from "../services/shoppingItemsService";
import { getCurrentUser } from "../services/authService";

class ShoppingListItemEditor extends FormState {
  state = {
    data: {
      id: 0,
      ingredientName: "",
      measure: "each",
      qty: 1,
      cost: "0.00",
      shopping_list_date: new Date(),
      picked: 0,
      master_list: 1,
      shopping_list_name: "master",
      owner_id: 0,
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
    shopping_list_name: Joi.string()
      .label("Shopping List Name")
      .required()
      .max(30),
    measure: Joi.string().label("Measure").required().max(30),
    qty: Joi.number().label("Qty").required().min(1),
    cost: Joi.number().label("Cost Price").min(0),
    shopping_list_date: Joi.date().optional().allow(""),
    picked: Joi.number().required(),
    master_list: Joi.number().required(),
    createdAt: Joi.date().optional().allow(""),
    updatedAt: Joi.date().optional().allow(""),
    owner_id: Joi.number().optional(),
  };

  componentDidMount() {
    let data;
    if (this.props.item) {
      data = { ...this.props.item };
      console.info("data...", data);
      this.setState({ data });
    } else this.initializeData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.item !== this.props.item) {
      let data;
      if (this.props.item) {
        data = { ...this.props.item };
        console.info("data...", data);
        this.setState({ data });
      } else this.initializeData();
    }
  }

  doSubmit = async () => {
    let { data } = this.state;
    console.info("data...", data);
    await saveShoppingItem(data);
    this.initializeData();
  };

  initializeData = () => {
    const user = getCurrentUser();

    const data = {
      ingredientName: "",
      measure: "each",
      qty: 1,
      cost: "0.00",
      shopping_list_date: new Date(),
      picked: 0,
      master_list: 1,
      shopping_list_name: "master",
      owner_id: user.id,
      createdAt: "",
      updatedAt: "",
    };
    this.setState({ data });
  };

  render() {
    const { modalHeading } = this.state;

    return (
      <div>
        <Modal show={this.props.showDialog} className="shoppingDialog">
          <Modal.Header>
            <Modal.Title>
              <FontAwesomeIcon icon="cart-plus" color="white" />
              &nbsp;&nbsp;
              {modalHeading}
            </Modal.Title>
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
                  <div style={{ width: "50%" }}>
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
              onPress={this.props.onItemUpdated}
            />
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ShoppingListItemEditor;
