import React from "react";
import { useHistory } from "react-router-dom";
import cookbook from "../images/cookbook-design.jpeg";
import GetDate from "./common/getDate";
import AppHeaderButtons from "./appHeaderButtons";
import AppLogo from "./appLogo";
import MealOfTheDay from "./mealOfTheDay";

const AppHeader = () => {
  let history = useHistory();

  const handleNewRecipe = () => {
    history.push({ pathname: "/meal/add" });
  };

  const handleShoppingList = () => {
    history.push({ pathname: "/shopping_list" });
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
            ></img>
          </div>
          <MealOfTheDay />
          <div
            style={{
              marginLeft: "auto",
              alignSelf: "center",
              height: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-end",
              }}
            >
              <GetDate />
              <div style={{ marginTop: "28px" }}>
                <AppHeaderButtons
                  onNewRecipe={handleNewRecipe}
                  onShoppingList={handleShoppingList}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AppHeader;
