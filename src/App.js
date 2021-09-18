import "./App.css";
import { ToastContainer } from "react-toastify";
import { Route, Switch, withRouter } from "react-router-dom";
import Amplify from "aws-amplify";

import "./fontAwesome";
import React from "react";
import { Component } from "react";
import { login } from "./services/authService";
import SearchResults from "./components/searchResults";
import AppHeader from "./components/appHeader";
import SearchBox from "./components/common/searchBox";
import MealCard from "./components/mealCard";
import MealEditor from "./components/mealEditor";
import IngredientsEditor from "./components/ingredientsEditor";
import RecipeImageEditor from "./components/recipeImageEditor";
import ShoppingListCard from "./components/shoppingListCard";

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
  async componentDidMount() {
    await login("malcolms65@gmail.com", "123456");
    //const user = getCurrentUser();
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <div
          style={{
            backgroundColor: "red",
            width: "1000px",
            height: "10px",
            margin: "auto",
          }}
        ></div>
        <div className="App">
          <AppHeader />
          <SearchBox />
          <main className="container">
            {/* <Switch>
              <Route
                path="/search/:keywords"
                exact={true}
                component={SearchResults}
              />
              <Route
                path="/meal/view/:recipeId"
                component={MealCard}
                exact={true}
              />
              <Route
                path="/meal/edit/:recipeId"
                component={MealEditor}
                exact={true}
              />
              <Route path="/meal/add" component={MealEditor} exact={true} />
              <Route
                path="/image/editor/recipe/:recipeId"
                component={RecipeImageEditor}
                exact={true}
              />
              <Route
                path="/meal/ingredients/:recipeId"
                component={IngredientsEditor}
                exact={true}
              />
              <Route
                path="/shopping_list"
                component={ShoppingListCard}
                exact={true}
              />
              {/* <Route path="/login" component={LoginForm} />
              <Route path="/logout" component={Logout} />
              <ProtectedRoute path="/register" component={RegisterForm} />
              <ProtectedRoute path="/search" component={SearchContainer} />
              <Route path="/test" component={TestComp} /> 
            </Switch> */}
          </main>
          {/* <div id="footer">&copy; 2021</div> */}
          <footer>
            <p class="copyright">copyright © 2021</p>
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
