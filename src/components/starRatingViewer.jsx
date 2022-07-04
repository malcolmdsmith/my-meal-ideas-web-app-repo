import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function StarRatingViewer({ rating, ratingClass }) {
  const getStars = () => {
    const stars = [];

    for (let i = 5; i >= 0; i--) {
      //console.info(i, rating, stars);
      if (i >= rating) {
        //stars.push("star-outline");
      } else {
        if (i + 0.5 === parseFloat(rating)) {
          stars.push("star-half-alt");
        } else {
          stars.push("star");
        }
      }
    }
    return stars;
  };

  return (
    <div className={ratingClass}>
      {getStars()
        .reverse()
        .map((star, index) => (
          <FontAwesomeIcon key={index} icon={star} size="sm" />
        ))}
    </div>
  );
}
