import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  getAllShoppingItems,
  deleteShoppingItem,
  saveShoppingItem,
  deleteShoppingItemsByUser,
  clearPickedItems,
  updateMasterListPicked,
  findIngredientShoppingList,
} from "../services/shoppingItemsService";
import {
  getAllShoppingLists,
  deleteShoppingList,
} from "../services/shoppingListsService";

import { getCurrentUser } from "../services/authService";
import ShoppingListPanel from "./shoppingListPanel";
import Button from "./common/button";
import ShoppingListItemEditor from "./shoppingListItemEditor";
import ShoppingListNameEditor from "./shoppingListNameEditor";
import Select from "./common/select";
import icon from "../icons/heart-small.png";

const ShoppingListCard = () => {
  const [item, setItem] = useState(null);
  const [masterItems, setMasterItems] = useState([]);
  const [listItems, setListItems] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [user, setUser] = useState({});
  const [listNames, setListNames] = useState([]);
  const [selectedShoppingList, setSelectedShoppingList] = useState("");

  useEffect(() => {
    (async () => await loadItems(""))();
  }, []);

  const loadItems = async (shoplist) => {
    try {
      const user = await getCurrentUser();
      setUser(user);
      const names = await getAllShoppingLists(user.id, 0);
      console.info("names...", names);
      setListNames(names);

      if (shoplist === "") {
        shoplist = names[0].shopping_list_name;
        setSelectedShoppingList(shoplist);
      }

      const items = await getAllShoppingItems(user.id, shoplist, true);
      const masterItems = items.filter((item) => item.master_list === 1);
      setMasterItems(masterItems);
      const listItems = items.filter((item) => item.master_list === 0);
      setListItems(listItems);
      console.info("picked...", masterItems.filter((p) => p.picked).length);
    } catch (e) {
      console.log(e);
    }
  };

  const handleItemDelete = async (item) => {
    if (
      window.confirm(
        "Are you sure you wish to delete item '" + item.ingredientName + "'"
      )
    ) {
      await deleteShoppingItem(item.id);
      loadItems("");
    }
  };

  const handleItemEdit = (item) => {
    setItem(item);
    setShowDialog(true);
  };

  const handleItemPicked = async (item) => {
    item.picked = !item.picked;
    //await updateMasterListPicked(user.id);
    await saveShoppingItem(item);
    await loadItems(selectedShoppingList);
  };

  const handleMasterItemPicked = async (item) => {
    if (item.picked) {
      item.picked = false;
      await saveShoppingItem(item);
      await loadItems(selectedShoppingList);
      return;
    }

    item.picked = !item.picked;
    try {
      await saveShoppingItem(item);

      await createShoppingListItem(item);
      await loadItems(selectedShoppingList);
    } catch (e) {
      console.log(e);
    }
  };

  const createShoppingListItem = async (masterItem) => {
    const masterItems = await findIngredientShoppingList(
      user.id,
      1,
      masterItem.ingredientName,
      selectedShoppingList
    );
    if (masterItems.length > 0) {
      window.alert("Ths ingredient is already in your shopping list.");
      return;
    }

    let item = {};
    item.shopping_list_name = selectedShoppingList;
    item.ingredientName = masterItem.ingredientName;
    item.measure = masterItem.measure;
    item.qty = masterItem.qty;
    item.picked = false;
    item.shopping_list_date = new Date().toDateString();
    item.owner_id = user.id;
    item.cost = masterItem.cost;
    item.master_list = false;
    await saveShoppingItem(item);
  };

  const handleAddItem = () => {
    setItem(null);
    setShowDialog(true);
  };
  const handleClearItems = async () => {
    const user = getCurrentUser();
    await clearPickedItems(user.id, 1);
    await loadItems("");
  };

  const handleItemUpdated = async () => {
    await loadItems("");
    setShowDialog(false);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const handleShoppingListChange = async (event) => {
    console.info("list...", event.target.value);
    setSelectedShoppingList(event.target.value);
    await loadItems(event.target.value);
  };

  const handleDeleteShoppingList = async () => {
    await deleteShoppingItemsByUser(user.id, 0, selectedShoppingList);
    await deleteShoppingList(user.id, selectedShoppingList);
    await loadItems("");
  };

  const handleNameUpdated = async () => {
    await loadItems("");
  };

  const handleClearShoppingListItems = async () => {
    await deleteShoppingItemsByUser(user.id, 0, selectedShoppingList);
    await loadItems(selectedShoppingList);
  };

  return (
    <React.Fragment>
      <ShoppingListItemEditor
        item={item}
        showDialog={showDialog}
        onItemUpdated={handleItemUpdated}
        onDialogClose={handleDialogClose}
      />
      <ShoppingListNameEditor
        showDialog={showNameDialog}
        onDialogClose={() => setShowNameDialog(false)}
        onItemUpdated={handleNameUpdated}
      />

      <div>
        <div className="CenterCardContainer">
          <div className="MealCardContainer">
            <div className="IngredientsHeader">
              <img src={icon} style={{ width: "50px" }} alt=""></img>
              SHOPPING MANAGER
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div style={{ width: "49%", flexDirection: "column" }}>
                <h4>
                  <FontAwesomeIcon icon="clipboard-list" />
                  Master List
                </h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "10px",
                    gap: "10px",
                  }}
                >
                  <Button
                    title="Unpick Items"
                    className="Button Primary"
                    icon="window-close"
                    onPress={handleClearItems}
                  />
                  <Button
                    title="Add Item"
                    className="Button Primary"
                    icon="plus"
                    onPress={handleAddItem}
                  />
                </div>
                <ShoppingListPanel
                  items={masterItems}
                  listType="master"
                  onItemDelete={handleItemDelete}
                  onItemPicked={handleMasterItemPicked}
                  onItemEdit={handleItemEdit}
                />
              </div>
              <div style={{ width: "49%", flexDirection: "column" }}>
                <h4>
                  <FontAwesomeIcon icon="shopping-cart" />
                  Shopping List
                </h4>
                <Select
                  name="shoppingList"
                  options={listNames}
                  valueProperty="shopping_list_name"
                  textProperty="shopping_list_name"
                  value={selectedShoppingList}
                  label="Select list:"
                  icon="clipboard-list"
                  onChange={handleShoppingListChange}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: "10px",
                    marginBottom: "10px",
                    gap: "10px",
                  }}
                >
                  <Button
                    title="Delete List"
                    className="Button Primary"
                    icon="trash-alt"
                    onPress={() => {
                      if (
                        window.confirm(
                          "Are you sure you wish to delete " +
                            selectedShoppingList +
                            " shopping list?"
                        )
                      )
                        handleDeleteShoppingList();
                    }}
                  />
                  <Button
                    title="New List"
                    className="Button Primary"
                    icon="plus"
                    onPress={() => setShowNameDialog(true)}
                  />
                </div>
                <div style={{ width: "140px" }}>
                  <Button
                    title="Clear Items"
                    className="Button Primary"
                    icon="window-close"
                    onPress={() => {
                      if (
                        window.confirm(
                          "Are you sure you wish to clear items from " +
                            selectedShoppingList +
                            " shopping list?"
                        )
                      )
                        handleClearShoppingListItems();
                    }}
                  />
                </div>
                <ShoppingListPanel
                  items={listItems}
                  listType="list"
                  onItemDelete={handleItemDelete}
                  onItemPicked={handleItemPicked}
                  onItemEdit={handleItemEdit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default ShoppingListCard;
