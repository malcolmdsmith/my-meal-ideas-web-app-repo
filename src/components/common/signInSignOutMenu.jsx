import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Button from "./button";
import { getCurrentUser } from "../../services/authService";
import { logout } from "../../services/authService";

const SignIn = () => {
  const [user, setUser] = useState({});

  let history = useHistory();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const usr = await getCurrentUser();
    setUser(usr);
  };

  const handleLogIn = () => {
    history.push("/login");
  };

  const handleRegister = () => {
    history.push("/register");
  };

  const handleProfile = () => {
    history.push("/profile");
  };

  const handleLogOut = async () => {
    await logout();
    await loadUser();
    history.push("/");
  };

  return (
    <div className="SignInContainer">
      {user.role === "guest" ? (
        <div className="AlignRow">
          <Button
            title="Sign In"
            icon=""
            className="SignInSignOut"
            onPress={handleLogIn}
          />
          &nbsp;|&nbsp;
          <Button
            title="Sign Up"
            icon=""
            className="SignInSignOut"
            onPress={handleRegister}
          />
        </div>
      ) : (
        <div className="AlignRow">
          <Button
            title={user.firstName + "  |  "}
            icon="user-circle"
            className="SignInSignOut"
            onPress={handleProfile}
          />
          <Button
            title="Sign Out"
            icon=""
            className="SignInSignOut"
            onPress={handleLogOut}
          />
          {user.role === "admin" ? (
            <Button
              title=" | Register User"
              icon=""
              className="SignInSignOut"
              onPress={handleRegister}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};
export default SignIn;
