import React from "react";
import FormState from "./common/formstate";
import Joi from "joi-browser";

import {
  getCategoryNames,
  deleteCategory,
} from "../services/categoriesService";
import { getSourceOptions, getRatings } from "../services/recipeService";
import { saveRecipe, getRecipe, deleteRecipe } from "../services/recipeService";
import { getCurrentUser } from "../services/authService";
import Button from "./common/button";
import CategoryEditorDialog from "./categoryEditorDialog";
import { isEmpty } from "../utility/isEmpty";
import { SendEmail } from "../utility/emailer";
import icon from "../icons/heart-small.png";

class MealEditor extends FormState {
  state = {
    recipeId: 0,
    data: {
      recipeTitle: "",
      category: "",
      recipeSource: "",
      recipeSourceData: "",
      method: "",
      comments: "",
      prepTime: "",
      cookTime: "",
      rating: "0",
      owner_id: 0,
    },
    errors: {},
    categories: [],
    sourceOptions: [],
    ratings: [],
    showCategoryDialog: false,
  };

  schema = {
    recipeTitle: Joi.string().label("Recipe Title").required().max(255),
    recipeSource: Joi.string().label("Recipe Source").required().max(100),
    recipeSourceData: Joi.string().label("Source Info").optional().allow(""),
    category: Joi.string().label("Category").required().max(30),
    method: Joi.string().label("Method").optional().allow(""),
    comments: Joi.string().label("Comments").optional().allow(""),
    prepTime: Joi.string().label("Prep-Time").optional().allow("").max(10),
    cookTime: Joi.string().label("Cook-Time").optional().allow("").max(10),
    rating: Joi.string().label("Rating").optional(),
    owner_id: Joi.number().optional().default(0),
  };

  async componentDidMount() {
    const categories = await getCategoryNames();
    const options = getSourceOptions();
    const ratings = getRatings();
    this.setState({
      categories,
      sourceOptions: options,
      ratings,
    });
    document.getElementById("recipeTitle").focus();
    if (isEmpty(this.props.match.params)) {
      this.clearForm();
      return;
    }

    const recipeId = this.props.match.params.recipeId;

    const recipe = await getRecipe(recipeId);
    if (recipe) {
      const data = {
        recipeTitle: recipe.recipeTitle,
        recipeSource: recipe.recipeSource,
        recipeSourceData: recipe.recipeSourceData,
        category: recipe.category,
        rating: recipe.rating,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        method: recipe.method,
        comments: recipe.comments,
        owner_id: recipe.owner_id,
      };

      this.setState({ data, recipeId });

      window.scrollTo(0, 0);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (isEmpty(this.props.match.params)) {
        this.clearForm();
        document.getElementById("recipeTitle").focus();
        return;
      }
    }
  }

  clearForm = () => {
    const data = {
      recipeTitle: "",
      category: "",
      recipeSource: "",
      recipeSourceData: "",
      method: "",
      comments: "",
      prepTime: "",
      cookTime: "",
      rating: "0",
      owner_id: 0,
    };
    this.setState({ recipeId: 0, data });
  };

  doSubmit = async () => {
    const { recipeId, data: recipe } = this.state;
    if (recipeId > 0) {
      recipe.id = recipeId;
    } else {
      const user = await getCurrentUser();
      recipe.owner_id = user.id;
    }
    const result = await saveRecipe(recipe);
    if (result.id) {
      if (recipeId === 0) {
        SendEmail(result.recipeTitle);
        this.props.history.push({
          pathname: `/meal/ingredients/${result.id}`,
        });
        return;
      }
    }
    this.props.history.push({ pathname: `/meal/view/${result.id}` });
  };

  handleShowPhotos = () => {
    const { recipeId } = this.state;
    this.props.history.push({ pathname: `/image/editor/recipe/${recipeId}` });
  };

  handleShowIngredients = () => {
    const { recipeId } = this.state;
    this.props.history.push({
      pathname: `/meal/ingredients/${recipeId}`,
    });
  };

  handleCancel = () => {
    this.props.history.push({
      pathname: `/`,
    });
  };

  handleDeleteRecipe = async () => {
    const { recipeId } = this.state;
    await deleteRecipe(recipeId);
    this.props.history.push({ pathname: `/` });
  };

  handleAddCategory = () => {
    this.setState({ showCategoryDialog: true });
  };

  handleCategoryUpdated = async () => {
    this.setState({ showCategoryDialog: false });
    const categories = await getCategoryNames();
    this.setState({ categories });
  };

  handleDeleteCategory = async () => {
    const { category } = this.state.data;
    if (category === "") return;

    if (
      !window.confirm(
        "Are you sure you wish to delete category '" + category + "'?"
      )
    )
      return;

    await deleteCategory(category);
    const categories = await getCategoryNames();
    this.setState({ categories });
  };

  render() {
    const { categories, sourceOptions, ratings, recipeId, showCategoryDialog } =
      this.state;

    return (
      <React.Fragment>
        <CategoryEditorDialog
          showCategoryDialog={showCategoryDialog}
          onCategoryUpdated={this.handleCategoryUpdated}
        />
        <div className="CenterCardContainer">
          <div className="MealCardContainer">
            <div className="IngredientsHeader">
              <img src={icon} style={{ width: "50px" }} alt=""></img>
              {recipeId === 0 ? "ADD RECIPE" : "EDIT RECIPE"}
            </div>
            <form id="myform" onSubmit={this.handleSubmit}>
              {this.renderInput(
                "recipeTitle",
                "Title",
                "pencil-alt",
                "white",
                "whitelabel"
              )}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                }}
              >
                {this.renderSelect(
                  "category",
                  "Category",
                  categories,
                  "category_name",
                  "category_name",
                  "clipboard-list",
                  "white",
                  "whitelabel"
                )}
                <Button
                  title="ADD CATEGORY"
                  icon="plus"
                  className="Button Primary"
                  onPress={this.handleAddCategory}
                />
                <Button
                  title="DELETE CATEGORY"
                  icon="trash-alt"
                  className="Button Primary"
                  onPress={this.handleDeleteCategory}
                />
              </div>
              <div style={{ width: "20%" }}>
                {this.renderSelect(
                  "rating",
                  "Rating",
                  ratings,
                  "rating",
                  "rating",
                  "clipboard-list",
                  "white",
                  "whitelabel"
                )}
              </div>
              <div style={{ width: "50%" }}>
                {this.renderSelect(
                  "recipeSource",
                  "Source",
                  sourceOptions,
                  "optionName",
                  "optionName",
                  "clipboard-list",
                  "white",
                  "whitelabel"
                )}
              </div>
              {this.renderInput(
                "recipeSourceData",
                "Source Info",
                "pencil-alt",
                "white",
                "whitelabel"
              )}
              <div style={{ width: "25%" }}>
                {this.renderInput(
                  "prepTime",
                  "Prep-Time",
                  "hourglass-half",
                  "white",
                  "whitelabel"
                )}
                {this.renderInput(
                  "cookTime",
                  "Cook-Time",
                  "hourglass-half",
                  "white",
                  "whitelabel"
                )}
              </div>
              {this.renderTextarea(
                "method",
                "Method",
                "pencil-alt",
                "white",
                "whitelabel",
                8,
                60
              )}
              {this.renderTextarea(
                "comments",
                "Comments",
                "pencil-alt",
                "white",
                "whitelabel",
                3,
                60
              )}
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "10px",
                }}
              >
                {recipeId > 0 && (
                  <Button
                    title="INGREDIENTS"
                    icon="clipboard-list"
                    className="Button Primary"
                    onPress={this.handleShowIngredients}
                  />
                )}
                {recipeId > 0 && (
                  <Button
                    title="PHOTOS"
                    icon="camera"
                    className="Button Primary"
                    onPress={this.handleShowPhotos}
                  />
                )}
                {recipeId > 0 && (
                  <Button
                    title="DELETE"
                    icon="trash-alt"
                    className="Button Primary"
                    onPress={this.handleDeleteRecipe}
                  />
                )}
                <div style={{ width: "97%" }}>
                  {this.renderButton("DONE", "smile", "Button Done", false)}
                </div>
                <Button
                  title="CANCEL"
                  icon="ban"
                  className="Button Cancel"
                  onPress={this.handleCancel}
                />
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MealEditor;
