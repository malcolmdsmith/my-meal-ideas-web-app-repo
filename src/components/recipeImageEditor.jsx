import React from "react";
import { v4 as uuidv4 } from "uuid";
import Dots from "react-activity/dist/Dots";
import "react-activity/dist/Dots.css";

import { uploadImageS3 } from "../services/amplify";
import {
  getRecipeImagesNoCategory,
  saveRecipeImage,
  deleteRecipeImage,
} from "../services/recipeImagesService";
import { getRecipe } from "../services/recipeService";
import ImageViewer from "./common/imageViewer";
import Button from "./common/button";
import { Component } from "react";
import ImageCropper from "./common/imageCropper";

class RecipeImageEditor extends Component {
  state = {
    recipe: {},
    images: [],
    loading: false,
  };

  async componentDidMount() {
    await this.loadData();
  }

  loadData = async () => {
    const recipeId = this.props.match.params.recipeId;
    const recipe = await getRecipe(recipeId);
    this.setState({ recipe });
    this.loadImages(recipe);
  };

  loadImages = async (recipe) => {
    this.setState({ loading: true });
    const images = await getRecipeImagesNoCategory(recipe.id);
    this.setState({ images });
    this.setState({ loading: false });
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
    this.setState({ loading: true });
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
      mealOfTheWeek: false,
    };

    await saveRecipeImage(image);
    await this.loadImages(this.state.recipe);
  };

  handleImageSelect = (image) => {};

  handleDone = () => {
    this.props.history.push({ pathname: `/meal/view/${this.state.recipe.id}` });
  };

  render() {
    const { recipe, images, loading } = this.state;

    return (
      <div>
        <div className="CenterCardContainer">
          <div className="MealCardContainer">
            <div className="IngredientsHeader">PHOTOS EDITOR</div>
            <div className="MealCardHeader">{recipe.recipeTitle}</div>
            <div className="CenterCardContainer">
              <div className="LeftIngredientsPanel">
                <ImageCropper
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
                <h5>Photo List</h5>
                {loading ? (
                  <div
                    style={{
                      width: "100%",
                      height: "100px",
                      textAlign: "center",
                    }}
                  >
                    <Dots size={26} />
                    <div>Loading...</div>
                  </div>
                ) : (
                  <ImageViewer
                    images={images}
                    showheader={false}
                    widthFactor={0.3}
                    padding={20}
                    onRecipeSelect={this.handleImageSelect}
                    width={300}
                    numColumns={1}
                    onItemDelete={this.handleImageDelete}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeImageEditor;
