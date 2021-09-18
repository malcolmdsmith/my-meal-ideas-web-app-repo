import React from "react";
import Button from "./common/button";

const AppHeaderButtons = ({ onNewRecipe, onShoppingList }) => {
  return (
    <div style={{ width: 170 }}>
      <Button
        title="NEW RECIPE"
        icon="plus"
        className="Button Primary"
        onPress={onNewRecipe}
      />
      <Button
        title="SHOPPING LIST"
        icon="cart-plus"
        className="Button Primary"
        onPress={onShoppingList}
      />
    </div>
  );
};
export default AppHeaderButtons;
