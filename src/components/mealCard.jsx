import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { getRecipe } from "../services/recipeService";
import { getRecipeImages } from "../services/recipeImagesService";
import { AddShoppingItemsFromRecipe } from "../services/shoppingItemsService";
import PrepCookTimeCard from "./prepCookTimeCard";
import IngredientsCard from "./ingredientsCard";
import StarRatingViewer from "./starRatingViewer";
import Button from "../components/common/button";
import MethodCard from "./methodCard";
import ImageViewer from "./common/imageViewer";
import NavBack from "../components/common/navBack";
import RecipeSourceData from "./recipeSourceData";
import { setMealOFTheWeek } from "../services/recipeImagesService";
import RecipeImageSelector from "./recipeImageSelector";
import FullScreenImageViewer from "./common/fullScreenImageViewer";
import { getCurrentUser } from "../services/authService";

const MealCard = ({ onMealOfTheWeek, showMealOfTheWeek }) => {
  const [recipe, setRecipe] = useState({});
  const [images, setImages] = useState([]);
  const [columns, setColumns] = useState(1);
  const [padding, setPadding] = useState(0);
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [showFullScreenImage, setShowFullScreenImage] = useState(false);
  const [user, setUser] = useState({});

  let history = useHistory();

  const loadRecipes = async () => {
    const user = getCurrentUser();
    setUser(user);
    const recipeId = history.location.pathname.split("/").pop();
    const recipe = await getRecipe(recipeId);
    setRecipe(recipe);
    const images = await getRecipeImages(recipeId);
    if (images.length > 1) {
      setColumns(2);
      setPadding(5);
    }
    setImages(images);
  };

  useEffect(() => {
    loadRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showMealOfTheWeek]);

  const handleEdit = () => {
    history.push({ pathname: `/meal/edit/${recipe.id}` });
  };

  const handleAddShoppingItems = async () => {
    if (await AddShoppingItemsFromRecipe(recipe.id))
      history.push({ pathname: `/shopping_list` });
  };

  const handleSetMealOfTheWeek = async () => {
    console.info(images);
    if (images.length === 1) {
      console.info("//", images);
      await setMealOFTheWeek(images[0].image_id);
      toast.info("Meal of the week set!", {
        autoClose: 2000,
        position: "top-center",
      });
      onMealOfTheWeek();
    } else {
      setShowImageSelector(true);
    }
  };

  const handleMOTWImageSelected = (image) => {
    setShowImageSelector(false);
    setMealOFTheWeek(image.image_id);
    toast.info("Meal of the week set!");
    onMealOfTheWeek();
  };

  const handleImageSelect = (image) => {
    setShowFullScreenImage(true);
  };

  return (
    <React.Fragment>
      <FullScreenImageViewer
        images={images}
        showViewer={showFullScreenImage}
        onHandleClose={() => setShowFullScreenImage(false)}
      />
      <RecipeImageSelector
        showDialog={showImageSelector}
        images={images}
        onSelect={handleMOTWImageSelected}
        onCancel={() => setShowImageSelector(false)}
      />
      <div style={{ margin: "20px" }}>
        <NavBack />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          paddingTop: "0px",
        }}
      >
        <div className="MealCardContainer">
          <div className="MealCardHeader">{recipe.recipeTitle}</div>
          <div className="MealCard">
            <div>
              <div style={{ marginTop: "8px" }}>
                <ImageViewer
                  images={images}
                  showheader={false}
                  padding={padding}
                  numColumns={columns}
                  width={350}
                  onRecipeSelect={handleImageSelect}
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
              {user.role === "admin" && (
                <Button
                  title="MEAL OF THE WEEK"
                  icon="heart"
                  className="Button Primary"
                  onPress={handleSetMealOfTheWeek}
                />
              )}
              {user.AllowEdits && (
                <div>
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
                </div>
              )}
              <MethodCard
                text={recipe.method}
                heading="Method"
                className="Method"
              />
              <MethodCard
                text={recipe.comments}
                heading="Comments"
                className="Comments"
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default MealCard;
