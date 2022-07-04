import React from "react";

import ShoppingListItem from "./shoppingListItem";
import ShoppingListPanelHeader from "./ShoppingListPanelHeader";
import ShoppingListTotalPanel from "./shoppingListTotalPanel";

const ShoppingListPanel = ({
  items,
  listType,
  onItemDelete,
  onItemEdit,
  onItemPicked,
}) => {
  return (
    <div className="shoppingListPanelContainer">
      <ShoppingListTotalPanel
        total={items.length > 0 ? items[0].totalCost : 0}
      />
      <ShoppingListPanelHeader />
      <div className="shoppingListContainer">
        {items.length === 0 && <div className="emptyList">[Empty List]</div>}
        {items.map((item, index) => (
          <ShoppingListItem
            item={item}
            listType={listType}
            key={index}
            onItemDelete={onItemDelete}
            onItemEdit={onItemEdit}
            onItemPicked={onItemPicked}
          />
        ))}
      </div>
    </div>
  );
};
export default ShoppingListPanel;
