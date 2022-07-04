import React, { useEffect } from "react";

const MealOfTheDay = ({ onSelect, image }) => {
  useEffect(() => {}, [image]);
  return (
    <div style={{ marginLeft: "10px", position: "relative" }}>
      <img
        src={image.imageUrl}
        alt="mealOfTheDay.jpg"
        style={{ width: "200px", height: "130px" }}
        onClick={() => onSelect(image)}
      />
      <span
        style={{
          color: "#fff",
          position: "absolute",
          left: "35px",
          top: "40px",
          fontSize: "12pt",
          fontWeight: "bold",
          width: "140px",
        }}
      >
        Meal of the Week
      </span>
    </div>
  );
};
export default MealOfTheDay;
