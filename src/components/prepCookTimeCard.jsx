import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PrepCookTimeCard = ({ recipe }) => {
  return (
    <div className="PrepCookTime">
      <FontAwesomeIcon icon="hourglass-half" />
      &nbsp;Prep-time: {recipe.prepTime}&nbsp;&nbsp;&nbsp;
      <FontAwesomeIcon icon="hourglass-half" />
      &nbsp;Cook-time:&nbsp;{recipe.cookTime}
    </div>
  );
};
export default PrepCookTimeCard;
