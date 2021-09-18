import React from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchButton from "./searchButton";
import SignIn from "./signIn";

const SearchBox = () => {
  let history = useHistory();

  const handleSearchPress = () => {
    let keywords = document.getElementById("search").value;
    if (keywords === "") keywords = "none";
    history.push({ pathname: `/search/${keywords}` });
  };

  const handleClearSearchKeywords = () => {
    let keywords = document.getElementById("search");
    keywords.value = "";
    history.push({ pathname: `/search/none` });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchPress();
    }
  };

  return (
    <div className="SearchContainer">
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "white",
            borderRadius: "25px",
            height: "32px",
          }}
        >
          <input
            id="search"
            className="SearchInput"
            placeholder="search keywords..."
            autoComplete="true"
            onKeyPress={handleKeyPress}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100px",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon
              icon="window-close"
              onClick={handleClearSearchKeywords}
            />
            <div style={{ marginLeft: "15px", width: "90px" }}>
              <SearchButton
                title=""
                icon="search"
                onPress={handleSearchPress}
              />
            </div>
          </div>
        </div>
      </div>
      <SignIn />
    </div>
  );
};
export default SearchBox;
