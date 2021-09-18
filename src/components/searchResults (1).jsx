import React, { useState, useEffect } from "react";
import ImageViewer from "./common/imageViewer";

const SearchResults = (props) => {
  const [keywords, setKeywords] = useState("none");

  useEffect(() => {
    const k = props.match.params.keywords;
    console.log("params...", k);
    setKeywords(k);
  }, [props.match.params.keywords]);

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <ImageViewer keywords={keywords} />
      </div>
    </React.Fragment>
  );
};
export default SearchResults;
