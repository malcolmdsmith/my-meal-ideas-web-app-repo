import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import {
  getAllShoppingItems,
  getTotalCost,
  deleteShoppingItem,
  saveShoppingItem,
  deleteAllShoppingItemsByUser,
} from "../services/shoppingListService";
import { splitArray } from "../utility/chunkify";

import { getCurrentUser } from "../services/authService";
import ShoppingListItem from "./shoppingListItem";
import Button from "./common/button";
import ShoppingListItemEditor from "./shoppingListItemEditor";

const ShoppingListCard = (props) => {
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [totalCost, setTotalCost] = useState("0.00");

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const allItems = await getAllShoppingItems(getCurrentUser());
      const chunks = splitArray(allItems, 24);
      setItems(chunks);

      const result = await getTotalCost(getCurrentUser());
      let total = 0;
      if (result[0].totalCost) total = result[0].totalCost;
      const totalformatted = parseFloat(total).toFixed(2).toLocaleString();
      setTotalCost(totalformatted);
    } catch (e) {
      console.log(e);
    }
  };

  const handleItemDelete = async (item) => {
    await deleteShoppingItem(item.id);
    loadItems();
  };

  const handleItemEdit = (item) => {
    setItem(item);
    setShowDialog(true);
  };

  const handleItemPicked = async (item) => {
    item.picked = !item.picked;
    await saveShoppingItem(item);
    loadItems();
  };

  const handleAddItem = () => {
    setItem(null);
    setShowDialog(true);
  };
  const handleClearItems = async () => {
    await deleteAllShoppingItemsByUser(getCurrentUser());
    await loadItems();
  };

  const handleItemUpdated = () => {
    loadItems();
    setShowDialog(false);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  return (
    <React.Fragment>
      <ShoppingListItemEditor
        item={item}
        showDialog={showDialog}
        onItemUpdated={handleItemUpdated}
        onDialogClose={handleDialogClose}
      />
      <div>
        <div>
          <div className="CenterCardContainer">
            <div className="MealCardContainer">
              <div className="IngredientsHeader">SHOPPING LIST</div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    fontSize: "14pt",
                    fontWeight: "bold",
                    backgroundColor: "white",
                    borderRadius: "15px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    marginBottom: "10px",
                    color: "#39395f",
                  }}
                >
                  Total Cost $ {totalCost}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "10px",
                    gap: "10px",
                  }}
                >
                  <Button
                    title="Clear Items"
                    className="Button Primary"
                    icon="trash-alt"
                    onPress={handleClearItems}
                  />
                  <Button
                    title="Add Item"
                    className="Button Primary"
                    icon="plus"
                    onPress={handleAddItem}
                  />
                </div>
              </div>
              <div className="ShoppingListContainer">
                {items.map((item, listidx) => (
                  <div key={listidx} className="ShoppingListColumn">
                    <Container fluid="sm">
                      {item.map((subitem, index) => (
                        <ShoppingListItem
                          item={subitem}
                          key={index}
                          onItemDelete={handleItemDelete}
                          onItemEdit={handleItemEdit}
                          onItemPicked={handleItemPicked}
                        />
                      ))}
                    </Container>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default ShoppingListCard;
