import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({ title, icon, onPress, className }) => {
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
      className={touched ? className + " touched" : className}
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
export default Button;
