import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";

import { uploadImageS3 } from "../services/amplify";
import {
  getRecipeImagesNoCategory,
  saveRecipeImage,
  deleteRecipeImage,
} from "../services/recipeImagesService";
import { getRecipe } from "../services/recipeService";
import ImageViewer from "./common/imageViewer";
import ImageEditor from "./common/imageEditor";
import Button from "./common/button";

const RecipeImageEditor = () => {
  const [recipe, setRecipe] = useState({});
  const [images, setImages] = useState([]);
  let params = useParams();
  const history = useHistory();

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    window.scrollTo(0, 120);
  }, []);

  const loadData = async () => {
    const recipeId = params.recipeId;
    const recipe = await getRecipe(recipeId);
    setRecipe(recipe);
    loadImages(recipe);
  };

  const loadImages = async (recipe) => {
    const images = await getRecipeImagesNoCategory(recipe.id);
    setImages(images);
  };

  const handleImageSelect = (image) => {};
  const handleImageDelete = async (image) => {
    await deleteRecipeImage(image);
    await loadImages(recipe);
  };
  const handleImageAdd = async (
    image_file,
    image_format,
    image_width,
    image_height
  ) => {
    const id = uuidv4();
    const key = `recipe/${id}.${image_format}`;
    await uploadImageS3(key, image_file);

    const image = {
      recipe_image: key,
      recipe_image_format: image_format,
      image_width: image_width,
      image_height: image_height,
      recipe_id: recipe.id,
      show_main_image: true,
      owner_id: 1,
    };

    await saveRecipeImage(image);
    await loadImages(recipe);
  };

  const handleDone = () => {
    history.push({ pathname: `/meal/view/${recipe.id}` });
  };

  return (
    <div>
      <div className="CenterCardContainer">
        <div className="MealCardContainer">
          <div className="IngredientsHeader">PHOTOS EDITOR</div>
          <div className="MealCardHeader">{recipe.recipeTitle}</div>
          <div className="CenterCardContainer">
            <div className="LeftIngredientsPanel">
              <ImageEditor
                onImageAdd={handleImageAdd}
                submitButtonName="ADD"
                submitButtonIcon="plus"
              />
              <Button
                title="DONE"
                icon="smile"
                className="Button Done"
                onPress={handleDone}
              />
            </div>
            <div className="RightIngredientsPanel">
              <ImageViewer
                images={images}
                showheader={false}
                widthFactor={0.3}
                padding={20}
                onRecipeSelect={handleImageSelect}
                width={280}
                numColumns={1}
                onItemDelete={handleImageDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RecipeImageEditor;
