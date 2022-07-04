import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ShoppingListItem = ({
  item,
  listType,
  onItemDelete,
  onItemEdit,
  onItemPicked,
}) => {
  return (
    <div className="shoppingListRowContainer">
      <div style={{ width: "20px" }} onClick={() => onItemDelete(item)}>
        <FontAwesomeIcon icon="trash-alt" color="blue" />
      </div>
      <div
        style={{ width: "25px" }}
        onClick={() => onItemPicked(item)}
        className={
          item.picked ? "shopping-item-picked" : "shopping-item-" + listType
        }
      >
        {item.qty}
      </div>
      <div
        style={{ width: "60px" }}
        onClick={() => onItemPicked(item)}
        className={
          item.picked ? "shopping-item-picked" : "shopping-item-" + listType
        }
      >
        {item.measure}
      </div>
      <div
        style={{ width: "130px" }}
        onClick={() => onItemPicked(item)}
        className={
          item.picked ? "shopping-item-picked" : "shopping-item-" + listType
        }
      >
        {item.ingredientName}
      </div>
      <div
        style={{ width: "40px" }}
        onClick={() => onItemPicked(item)}
        className={
          item.picked ? "shopping-item-picked" : "shopping-item-" + listType
        }
      >
        {item.cost}
      </div>
      <div style={{ width: "20px" }} onClick={() => onItemEdit(item)}>
        <FontAwesomeIcon icon="edit" color="blue" />
      </div>
    </div>
  );
};
export default ShoppingListItem;
