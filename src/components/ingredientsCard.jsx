import React, { useState, useEffect } from "react";
import { getIngredientsByRecipe } from "../services/ingredientsService";

const IngredientsCard = ({ recipe }) => {
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    loadIngredients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe.id]);

  const loadIngredients = async () => {
    const ings = await getIngredientsByRecipe(recipe.id);
    setIngredients(ings);
  };

  return (
    <React.Fragment>
      <div className="Ingredients">
        <div
          style={{
            fontSize: "10pt",
            fontWeight: "bold",
            marginBottom: "5px",
          }}
        >
          Ingredients
        </div>
        <ul>
          {ingredients.map((item, index) => (
            <li key={index}>
              {item.qty + "  x  " + item.measure + "   " + item.ingredientName}
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};
export default IngredientsCard;
