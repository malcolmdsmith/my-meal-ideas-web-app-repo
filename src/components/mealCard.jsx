import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getRecipe } from "../services/recipeService";
import { getRecipeImages } from "../services/recipeImagesService";
import { AddShoppingItemsFromRecipe } from "../services/shoppingListService";
import PrepCookTimeCard from "./prepCookTimeCard";
import IngredientsCard from "./ingredientsCard";
import StarRatingViewer from "./starRatingViewer";
import Button from "../components/common/button";
import MethodCard from "./methodCard";
import ImageViewer from "./common/imageViewer";
import NavBack from "../components/common/navBack";
import RecipeSourceData from "./recipeSourceData";

const MealCard = (props) => {
  const [recipe, setRecipe] = useState({});
  const [images, setImages] = useState([]);
  const [columns, setColumns] = useState(1);
  const [padding, setPadding] = useState(0);

  let history = useHistory();

  const loadRecipes = async () => {
    const recipeId = props.match.params.recipeId;
    const recipe = await getRecipe(recipeId);
    const images = await getRecipeImages(recipeId);
    setRecipe(recipe);
    setImages(images);
    if (images.length > 1) {
      setColumns(2);
      setPadding(10);
    }
  };

  useEffect(() => {
    loadRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.recipeId]);

  const handleEdit = () => {
    history.push({ pathname: `/meal/edit/${recipe.id}` });
  };

  const handleAddShoppingItems = async () => {
    if (await AddShoppingItemsFromRecipe(recipe.id))
      history.push({ pathname: `/shopping_list` });
  };

  return (
    <React.Fragment>
      <div style={{ margin: "20px" }}>
        <NavBack />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          paddingTop: "20px",
        }}
      >
        <div className="MealCardContainer">
          <div className="MealCardHeader">{recipe.recipeTitle}</div>
          <div className="MealCard">
            <div>
              <div style={{ marginTop: "8px", borderRadius: "25px" }}>
                <ImageViewer
                  images={images}
                  showheader={false}
                  padding={padding}
                  numColumns={columns}
                  width={350}
                />
              </div>
              <StarRatingViewer
                rating={recipe.rating}
                ratingClass="RatingCard"
              />
              <PrepCookTimeCard recipe={recipe} />
              <RecipeSourceData recipe={recipe} />
              <IngredientsCard recipe={recipe} />
            </div>
            <div className="RightMealCard">
              <Button
                title="EDIT"
                icon="edit"
                className="Button Primary"
                onPress={handleEdit}
              />
              <Button
                title="ADD TO SHOPPING LIST"
                icon="cart-plus"
                className="Button Primary"
                onPress={handleAddShoppingItems}
              />
              <MethodCard text={recipe.method} heading="Method" />
              <MethodCard text={recipe.comments} heading="Comments" />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default MealCard;
