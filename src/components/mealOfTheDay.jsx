import React from "react";
import photo from "../images/chicken-laksa-84056-1.jpeg";

const MealOfTheDay = () => {
  return (
    <div style={{ marginLeft: "10px" }}>
      <img
        src={photo}
        alt="mealOfTheDay.jpg"
        style={{ width: "200px", height: "130px" }}
      />
      <span
        style={{
          color: "#fff",
          position: "relative",
          left: "-170px",
          top: "-20px",
          fontSize: "12pt",
          fontWeight: "bold",
          width: "30px",
        }}
      >
        Meal of the Week
      </span>
    </div>
  );
};
export default MealOfTheDay;
