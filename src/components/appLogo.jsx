import React from "react";
import icon from "../icons/heart-small.png";

const AppLogo = () => {
  return (
    <div className="App-logo">
      <img src={icon} style={{ width: "100px" }} alt=""></img>

      <div>
        <span id="my">My</span>
        <span id="meal">Meal</span>
        <div id="ideas">IDEAS</div>
      </div>
    </div>
  );
};
export default AppLogo;
