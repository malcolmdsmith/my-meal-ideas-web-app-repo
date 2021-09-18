import React from "react";

const RecipeSourceData = ({ recipe }) => {
  const loadRecipeSourceData = (source, data) => {
    let result;

    switch (source) {
      case "Cookbook":
      case "Takeaway":
        result = <span>{data}</span>;
        break;
      case "Web Link":
        result = <a href={data}>View Recipe in Browser</a>;
        break;
      default:
        result = null;
    }
    return result;
  };

  return (
    <React.Fragment>
      {loadRecipeSourceData(recipe.recipeSource, recipe.recipeSourceData) ===
      null ? null : (
        <div className="RecipeSourceData">
          {loadRecipeSourceData(recipe.recipeSource, recipe.recipeSourceData)}
        </div>
      )}
    </React.Fragment>
  );
};
export default RecipeSourceData;
