import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchButton = ({ title, icon, onPress }) => {
  const [touched, setTouched] = useState(false);

  const toggleTouched = () => {
    setTouched({ touched: !touched });
  };
  const handleMouseUp = () => {
    setTimeout(() => {
      setTouched(false);
    }, 80);
  };

  return (
    <div
      className={touched ? "Button Search touched" : "Button Search"}
      id="SearchButton"
      onMouseDown={toggleTouched}
      onMouseUp={handleMouseUp}
      onClick={onPress}
    >
      <FontAwesomeIcon icon={icon} />
      &nbsp;
      {title}
    </div>
  );
};
export default SearchButton;
