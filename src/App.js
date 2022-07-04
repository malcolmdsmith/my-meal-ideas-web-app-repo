import "./App.css";
import { toast, ToastContainer } from "react-toastify";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Amplify from "aws-amplify";

import "./fontAwesome";
import React from "react";
import { Component } from "react";
import SearchResults from "./components/searchResults";
import AppHeader from "./components/appHeader";
import SearchBox from "./components/common/searchBox";
import MealCard from "./components/mealCard";
import MealEditor from "./components/mealEditor";
import IngredientsEditor from "./components/ingredientsEditor";
import RecipeImageEditor from "./components/recipeImageEditor";
import ShoppingListCard from "./components/shoppingListCard";
import { getMealOfTheWeek } from "./services/recipeImagesService";
import Registration from "./components/common/registration";
import Success from "./components/common/success";
import Login from "./components/common/login";
import ProfileCard from "./components/common/profile";
import ChangePassword from "./components/common/changePassword";
import ProtectedRoute from "./components/common/protectedRoute";
import { checkUserLoggedIn } from "./services/httpService";

Amplify.configure({
  Auth: {
    identityPoolId: "ap-southeast-2:d09840fc-8d21-41ef-a6d9-f76803f52fb7", //REQUIRED - Amazon Cognito Identity Pool ID
    region: "ap-southeast-2", // REQUIRED - Amazon Cognito Region
    // userPoolId: "ap-southeast-2:d09840fc-8d21-41ef-a6d9-f76803f52fb7", //OPTIONAL - Amazon Cognito User Pool ID
    //userPoolWebClientId: 'XX-XXXX-X_abcd1234', //OPTIONAL - Amazon Cognito Web Client ID
  },
  Storage: {
    AWSS3: {
      bucket: "mds-myrecipes-images", //REQUIRED -  Amazon S3 bucket name
      region: "ap-southeast-2", //OPTIONAL -  Amazon service region
    },
  },
});

class App extends Component {
  state = {
    image: {},
  };

  async componentDidMount() {
    checkUserLoggedIn();
    this.loadMealOfTheWeek();
    //await login("malcolms65@gmail.com", "123456");
    //const user = getCurrentUser();
  }

  handleMealOfTheWeekSelect = (image) => {
    console.info("handleSelect...", image);
    //this.props.history.push({ pathname: `/meal/view/${image.recipe_id}` });
    this.props.history.push({ pathname: `/meal-of-the-week/139` });
  };

  handleSetMealOfTheWeek = async () => {
    await this.loadMealOfTheWeek();
  };

  loadMealOfTheWeek = async () => {
    try {
      const meal = await getMealOfTheWeek();
      this.setState({ image: meal[0] });
    } catch (e) {
      toast.warn(e);
    }
  };

  render() {
    const { image } = this.state;
    console.info("image...", image);
    return (
      <React.Fragment>
        <ToastContainer
          autoClose={4000}
          closeOnClick
          theme="colored"
          position="bottom-center"
        />
        <div className="app-header-stripe" />
        <div className="App">
          <AppHeader
            mealOfTheWeekImage={image}
            onMealOfTheWeekSelect={this.handleMealOfTheWeekSelect}
          />
          <SearchBox />
          <main className="container">
            <Switch>
              <Route exact path="/">
                <Redirect to="/search/none" component={SearchResults} />
              </Route>
              <Route
                path="/search/:keywords"
                exact={true}
                component={SearchResults}
              />
              <Route path="/meal/view/:recipeId">
                <MealCard
                  onMealOfTheWeek={this.handleSetMealOfTheWeek}
                  showMealOfTheWeek={false}
                />
              </Route>
              <Route path="/meal-of-the-week/:recipeId">
                <MealCard showMealOfTheWeek={true} />
              </Route>
              <ProtectedRoute
                path="/meal/edit/:recipeId"
                component={MealEditor}
                exact={true}
              />
              <ProtectedRoute
                path="/meal/add"
                component={MealEditor}
                exact={true}
              />
              <ProtectedRoute
                path="/image/editor/recipe/:recipeId"
                component={RecipeImageEditor}
                exact={true}
              />
              <ProtectedRoute
                path="/meal/ingredients/:recipeId"
                component={IngredientsEditor}
                exact={true}
              />
              <Route
                path="/shopping_list"
                component={ShoppingListCard}
                exact={true}
              />
              <Route path="/register" component={Registration} />
              <Route path="/success" component={Success} />
              <Route path="/login" component={Login} />
              <ProtectedRoute path="/profile" component={ProfileCard} />
              <ProtectedRoute
                path="/changePassword"
                component={ChangePassword}
              />
            </Switch>
          </main>
          <footer>
            <p className="copyright">copyright © 2021</p>
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
