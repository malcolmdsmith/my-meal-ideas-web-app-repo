import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IngredientsListItem = ({ item, onItemDelete }) => {
  return (
    <div>
      <FontAwesomeIcon
        icon="trash-alt"
        color="#3a3aca"
        onClick={() => {
          if (
            window.confirm("Are you sure you wish to delete this ingredient?")
          )
            onItemDelete(item);
        }}
      />
      &nbsp;&nbsp;
      {item.qty + " x " + item.measure + "  " + item.ingredientName}
    </div>
  );
};
export default IngredientsListItem;
