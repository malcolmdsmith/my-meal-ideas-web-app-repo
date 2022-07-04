import React from "react";
import FormState from "./formstate";
import Joi from "joi-browser";
import Button from "./button";
import { updatePassword } from "../../services/userService";
import { getCurrentUser, logout } from "../../services/authService";

class ChangePassword extends FormState {
  state = {
    data: {
      password: "",
      confirm_password: "",
    },
    user: {},
    errors: {},
    admin: false,
  };

  schema = {
    id: Joi.number().optional(),
    password: Joi.string().required().min(6).label("New Password"),
    confirm_password: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .label("Confirm New Password")
      .options({
        language: {
          any: {
            allowOnly: "!!Passwords do not match",
          },
        },
      }),
  };

  componentDidMount() {
    const user = getCurrentUser();
    if (user !== null) {
      this.setState({ admin: user.role === "admin" });
    }
    this.setState({ user });
    document.getElementById("password").focus();
  }

  doSubmit = async () => {
    try {
      console.info(this.state.data);
      const { user } = this.state;
      await updatePassword(user.id, this.state.data);
      logout();
      window.location = "/success?msgType=password";
    } catch (ex) {
      // if (ex.response && ex.response.status === 400) {
      //   const errors = { ...this.state.errors };
      //   errors.username = ex.response.data;
      //   console.info(errors);
      //this.setState({ errors });
      //}
    }
  };

  handleClear = () => {
    const data = {
      password: "",
      confirm_password: "",
    };
    this.setState({ data });
  };

  render() {
    return (
      <React.Fragment>
        <div className="CenterCardContainer">
          <div className="registrationContainer">
            <form
              id="myform"
              onSubmit={this.handleSubmit}
              style={{ width: "100%" }}
              autoComplete="off"
            >
              <div style={{ marginBottom: "20px" }}>
                {this.renderInput(
                  "password",
                  "New Password",
                  "pencil-alt",
                  "white",
                  "whitelabel",
                  "password"
                )}
                {this.renderInput(
                  "confirm_password",
                  "Confirm New Password",
                  "pencil-alt",
                  "white",
                  "whitelabel",
                  "password"
                )}
              </div>
              <div style={{ width: "98%" }}>
                {this.renderButton("SUBMIT", "smile", "Button Primary", false)}
              </div>
              <Button
                title="CLEAR"
                icon="ban"
                className="Button Primary"
                onPress={this.handleClear}
              />
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ChangePassword;
