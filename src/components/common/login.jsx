import React from "react";
import Joi from "joi-browser";

import FormState from "./formstate";
import { login } from "../../services/authService";

class Login extends FormState {
  state = {
    data: {
      username: "malcolms65@gmail.com",
      password: "123456",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().max(255).email().label("Username"),
    password: Joi.string().required().min(6).label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await login(data.username, data.password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data.message;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <React.Fragment>
          <div className="CenterCardContainer">
            <div className="registrationContainer">
              <form
                id="myform"
                onSubmit={this.handleSubmit}
                style={{ width: "100%" }}
              >
                <div style={{ marginBottom: "20px" }}>
                  {this.renderInput(
                    "username",
                    "Email",
                    "pencil-alt",
                    "white",
                    "whitelabel"
                  )}
                  {this.renderInput(
                    "password",
                    "Password",
                    "pencil-alt",
                    "white",
                    "whitelabel",
                    "password"
                  )}
                </div>
                {this.renderButton("LOGIN", "smile", "Button Primary", false)}
              </form>
            </div>
          </div>
        </React.Fragment>
      </div>
    );
  }
}
export default Login;
