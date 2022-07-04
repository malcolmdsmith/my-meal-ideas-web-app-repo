import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import cookbook from "../images/cookbook-design.jpeg";

import GetDate from "./common/getDate";
import AppHeaderButtons from "./appHeaderButtons";
import AppLogo from "./appLogo";
import MealOfTheDay from "./mealOfTheDay";
import { Test } from "../services/recipeService";
import { toast } from "react-toastify";
import { getCurrentUser } from "../services/authService";

const AppHeader = ({ mealOfTheWeekImage, onMealOfTheWeekSelect }) => {
  const [user, setUser] = useState({});
  let history = useHistory();

  useEffect(() => {
    loadUser();
  }, [mealOfTheWeekImage]);

  const loadUser = async () => {
    const usr = await getCurrentUser();
    setUser(usr);
  };

  const handleNewRecipe = async () => {
    history.push({ pathname: "/meal/add" });
  };

  const handleTestConnection = async () => {
    try {
      toast.info(await Test());
    } catch (e) {
      toast.error("ERROR: Cannot connect to server API!!!");
    }
  };

  const handleShoppingList = () => {
    history.push({ pathname: "/shopping_list" });
  };

  const handleMealOfTheWeekSelect = (image) => {
    //return;
    //history.push({ pathname: `/meal/view/${meal.recipe_id}` });
    //console.info("recipe_id...", image.recipe_id);
    onMealOfTheWeekSelect(image.recipe_id);
  };

  return (
    <React.Fragment>
      <div className="App-header">
        <div
          style={{
            width: "956px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <div style={{}}>
            <AppLogo />
          </div>
          <div style={{ marginLeft: "10px" }}>
            <img
              src={cookbook}
              style={{ width: "220px" }}
              alt="cookbook.jpg"
              onClick={handleTestConnection}
            ></img>
          </div>
          <MealOfTheDay
            image={mealOfTheWeekImage}
            onSelect={handleMealOfTheWeekSelect}
          />

          <div
            style={{
              alignSelf: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <GetDate />
              <div style={{ marginTop: "28px" }}>
                {user.AllowEdits && (
                  <AppHeaderButtons
                    onNewRecipe={handleNewRecipe}
                    onShoppingList={handleShoppingList}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AppHeader;
