import React from "react";
import { Markup } from "interweave";

const MethodCard = ({ text, heading, className }) => {
  const methodToList = (text) => {
    if (text === null || text === undefined) return "";
    if (heading === "Comments")
      return text === "" || text === null ? "Nil." : text;
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
      <div className={className}>
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
    </React.Fragment>
  );
};
export default MethodCard;
