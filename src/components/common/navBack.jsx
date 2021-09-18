import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../common/button";

const NavBack = () => {
  const history = useHistory();
  const handleBackButton = () => {
    history.goBack();
  };

  return (
    <Button
      title="Back"
      icon="chevron-left"
      className="BackButton"
      onPress={handleBackButton}
    />
  );
};
export default NavBack;
