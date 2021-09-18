import React from "react";
import { Markup } from "interweave";

const MethodCard = ({ text, heading }) => {
  const methodToList = (text) => {
    const lines = text.split("\n");
    let html = "<ol>";
    for (let line in lines) {
      if (lines[line] !== "") html += `<li>${lines[line]}</li>`;
    }
    html += "</ol>";

    return html;
  };

  return (
    <React.Fragment>
      {text === undefined || text === "" ? null : (
        <div className="Method">
          <div
            style={{
              fontSize: "10pt",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            {heading}
          </div>
          <div>
            <Markup content={methodToList(text)} />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
export default MethodCard;
