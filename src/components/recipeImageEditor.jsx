import React from "react";
import { v4 as uuidv4 } from "uuid";

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
import { Component } from "react";

class RecipeImageEditor extends Component {
  state = {
    recipe: {},
    images: [],
  };

  async componentDidMount() {
    await this.loadData();
  }

  loadData = async () => {
    console.log(this.props.match.params.recipeId);
    const recipeId = this.props.match.params.recipeId;
    const recipe = await getRecipe(recipeId);
    this.setState({ recipe });
    this.loadImages(recipe);
  };

  loadImages = async (recipe) => {
    const images = await getRecipeImagesNoCategory(recipe.id);
    this.setState({ images });
  };

  handleImageDelete = async (image) => {
    await deleteRecipeImage(image);
    await this.loadImages(this.state.recipe);
  };

  handleImageAdd = async (
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
      recipe_id: this.state.recipe.id,
      show_main_image: true,
      owner_id: 1,
    };

    await saveRecipeImage(image);
    await this.loadImages(this.state.recipe);
  };

  handleImageSelect = (image) => {};

  handleDone = () => {
    this.props.history.push({ pathname: `/meal/view/${this.state.recipe.id}` });
  };

  render() {
    const { recipe, images } = this.state;

    return (
      <div>
        <div className="CenterCardContainer">
          <div className="MealCardContainer">
            <div className="IngredientsHeader">PHOTOS EDITOR</div>
            <div className="MealCardHeader">{recipe.recipeTitle}</div>
            <div className="CenterCardContainer">
              <div className="LeftIngredientsPanel">
                <ImageEditor
                  onImageAdd={this.handleImageAdd}
                  submitButtonName="ADD"
                  submitButtonIcon="plus"
                />
                <Button
                  title="DONE"
                  icon="smile"
                  className="Button Done"
                  onPress={this.handleDone}
                />
              </div>
              <div className="RightIngredientsPanel">
                <ImageViewer
                  images={images}
                  showheader={false}
                  widthFactor={0.3}
                  padding={20}
                  onRecipeSelect={this.handleImageSelect}
                  width={280}
                  numColumns={1}
                  onItemDelete={this.handleImageDelete}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeImageEditor;
