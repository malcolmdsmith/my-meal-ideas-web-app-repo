import React from "react";
import FormState from "./common/formstate";
import Joi from "joi-browser";

import { getRecipe } from "../services/recipeService";
import {
  saveIngredient,
  getIngredientsByRecipe,
  deleteIngredient,
} from "../services/ingredientsService";
import Button from "./common/button";
import IngredientsListItem from "./ingredientsListItem";

class IngredientsEditor extends FormState {
  state = {
    data: {
      ingredientName: "",
      measure: "",
      qty: 1,
    },
    ingredients: [],
    errors: [],
    title: "",
    recipe: {},
  };

  schema = {
    ingredientName: Joi.string().label("Ingredient Name").required().max(50),
    measure: Joi.string().label("Measure").required().max(30),
    qty: Joi.number().label("Qty").required().min(1),
    recipeId: Joi.number().optional(),
  };
  async componentDidMount() {
    const recipeId = this.props.match.params.recipeId;
    const recipe = await getRecipe(recipeId);
    const ingredients = await getIngredientsByRecipe(recipeId);

    this.setState({ recipe, ingredients });
    document.getElementById("ingredientName").focus();
  }

  doSubmit = async () => {
    const { data: ingredient, recipe } = this.state;
    ingredient.recipeId = recipe.id;
    const result = await saveIngredient(ingredient);

    const ingredients = [...this.state.ingredients, result];
    this.setState({ ingredients: ingredients });
    this.handleClearForm();
    document.getElementById("ingredientName").focus();
  };

  handleDeleteIngredient = async (item) => {
    await deleteIngredient(item.id);
    const ingredients = await getIngredientsByRecipe(item.recipeId);

    this.setState({ ingredients });
  };

  handleClearForm = () => {
    document.getElementById("qty").value = "1";
    document.getElementById("measure").value = "";
    document.getElementById("ingredientName").value = "";
  };

  handleDone = () => {
    this.props.history.push({ pathname: `/meal/view/${this.state.recipe.id}` });
  };

  render() {
    const { recipe, ingredients } = this.state;
    return (
      <div className="CenterCardContainer">
        <div className="MealCardContainer">
          <div className="IngredientsHeader">INGREDIENTS</div>
          <div className="MealCardHeader">{recipe.recipeTitle}</div>
          <div className="CenterCardContainer">
            <form onSubmit={this.handleSubmit}>
              <div className="LeftIngredientsPanel">
                {this.renderInput(
                  "ingredientName",
                  "Ingredient Name",
                  "pencil-alt",
                  "#39395f",
                  "navyLabel"
                )}
                <div style={{ width: "50%" }}>
                  {this.renderInput(
                    "measure",
                    "Measure",
                    "pencil-alt",
                    "#39395f",
                    "navyLabel"
                  )}
                </div>
                <div style={{ width: "25%" }}>
                  {this.renderInput(
                    "qty",
                    "Qty",
                    "pencil-alt",
                    "#39395f",
                    "navyLabel"
                  )}
                </div>
                {this.renderButton("ADD", "smile", "Button Primary", true)}
                <Button
                  title="CLEAR"
                  icon="ban"
                  className="Button Primary"
                  onPress={this.handleClearForm}
                />
                <Button
                  title="DONE"
                  icon="smile"
                  className="Button Done"
                  onPress={this.handleDone}
                />
              </div>
            </form>
            <div className="RightIngredientsPanel">
              {ingredients.map((ingredient, index) => (
                <IngredientsListItem
                  key={index}
                  item={ingredient}
                  onItemDelete={this.handleDeleteIngredient}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default IngredientsEditor;
