import React from "react";

import Button from "./button";

const PaginationPanel = ({
  onFirst,
  onPrevious,
  onNext,
  onLast,
  totalPages,
  currentPage,
}) => {
  return (
    <div className="PaginationContainer">
      <Button
        title=""
        icon="step-backward"
        className="Button Primary Pagination"
        onPress={onFirst}
      />
      <Button
        title=""
        icon="backward"
        className="Button Primary Pagination"
        onPress={onPrevious}
      />
      <Button
        title=""
        icon="forward"
        className="Button Primary Pagination"
        onPress={onNext}
      />
      <Button
        title=""
        icon="step-forward"
        className="Button Primary Pagination"
        onPress={onLast}
      />
      <span style={{ marginBottom: "5px", marginLeft: "5px" }}>
        {"(Page " + currentPage + " of " + totalPages + ")"}
      </span>
    </div>
  );
};
export default PaginationPanel;
