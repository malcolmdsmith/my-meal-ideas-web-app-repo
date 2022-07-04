import React from "react";

const ShoppingListTotalPanel = ({ total }) => {
  return (
    <div className="shoppingListTotalPanelContainer">
      <div className="shoppingListPanelTotalHeader">
        <span className="shoppingListPanelTotalHeaderText">TOTAL</span>
      </div>
      <div className="shoppingListPanelTotalBody">
        <span className="shoppingListPanelTotalText">$ {total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default ShoppingListTotalPanel;
