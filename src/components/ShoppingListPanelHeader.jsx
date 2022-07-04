import React from "react";

const ShoppingListPanelHeader = () => {
  return (
    <div className="shoppingListPanelHeader">
      <div style={{ width: "20px" }}></div>
      <div style={{ width: "30px" }}>Qty</div>
      <div style={{ width: "60px" }}>Measure</div>
      <div style={{ width: "131px" }}>IngredientName</div>
      <div style={{ width: "20px" }}>Cost</div>
    </div>
  );
};
export default ShoppingListPanelHeader;
