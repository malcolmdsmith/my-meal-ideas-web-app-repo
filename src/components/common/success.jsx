import React, { useEffect, useState } from "react";

import Button from "./button";

const Success = () => {
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const msgType = urlParams.get("msgType");
    setMsgType(msgType);

    switch (msgType) {
      case "profile":
        setMsg("Profile successfully updated, Thank You!");
        break;
      case "password":
        setMsg("Password changed successfully, Thank You!");
        break;
      case "registration":
        setMsg("Registration successful. Thank You!");
        break;
      default:
        break;
    }
  }, []);

  const handleSignIn = () => {
    window.location = "/login";
  };

  return (
    <React.Fragment>
      <div
        style={{
          marginTop: "40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>{msg}</div>
        {(msgType === "registration" ||
          msgType === "password" ||
          msgType === "profile") && (
          <div>
            <Button
              title="SIGN IN"
              icon="pencil-alt"
              className="Button Primary"
              onPress={handleSignIn}
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
export default Success;
