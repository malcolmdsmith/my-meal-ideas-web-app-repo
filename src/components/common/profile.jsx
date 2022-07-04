import React from "react";
import FormState from "./formstate";
import Joi from "joi-browser";
import Button from "./button";
import { update, getUsersList, getUser } from "../../services/userService";
import { getCurrentUser, logout } from "../../services/authService";

class ProfileCard extends FormState {
  state = {
    data: {
      id: 0,
      firstName: "",
      lastName: "",
      username: "",
      role: "user",
    },
    errors: {},
    roles: [{ role: "user" }, { role: "admin" }],
    admin: false,
    users: [],
  };

  schema = {
    id: Joi.number().optional(),
    username: Joi.string().required().max(255).email().label("Username"),
    firstName: Joi.string().required().max(255).label("First Name"),
    lastName: Joi.string().required().max(255).label("Last Name"),
    role: Joi.string().required().max(20).label("Role").default("user"),
    password: Joi.string().required().min(6).label("Password"),
  };

  async componentDidMount() {
    const user = await getCurrentUser();
    if (user !== null) {
      this.setState({ admin: user.role === "admin" });
    }
    this.loadUserForm(user.id, user);
    const users = await getUsersList();
    this.setState({ users });
    document.getElementById("firstName").focus();
  }

  doSubmit = async () => {
    try {
      await update(this.state.data);
      logout();
      window.location = "/success?msgType=profile";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  handleUserChanged = async ({ currentTarget: input }) => {
    if (input.value === "") return;

    const user = await getUser(input.value);
    this.loadUserForm(input.value, user);
  };

  loadUserForm = (id, user) => {
    const data = {
      id: id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      role: user.role,
    };
    this.setState({ data });
  };

  handleChangePassword = () => {
    window.location = "/changePassword";
  };

  render() {
    return (
      <React.Fragment>
        <div className="CenterCardContainer">
          <div className="registrationContainer">
            {/* {admin && (
              <div>
                Select User
                <UsersList
                  users={users}
                  onUserChanged={this.handleUserChanged}
                />
              </div>
            )} */}
            <form
              id="myform"
              onSubmit={this.handleSubmit}
              style={{ width: "100%" }}
              autoComplete="off"
            >
              <div style={{ marginBottom: "20px" }}>
                <div style={{ width: "100%" }}>
                  {this.renderInput(
                    "firstName",
                    "First Name",
                    "pencil-alt",
                    "white",
                    "whitelabel"
                  )}
                  {this.renderInput(
                    "lastName",
                    "Last Name",
                    "pencil-alt",
                    "white",
                    "whitelabel"
                  )}
                  {/* {admin &&
                    this.renderSelect(
                      "role",
                      "Role",
                      roles,
                      "role",
                      "role",
                      "clipboard-list",
                      "white",
                      "whitelabel"
                    )} */}
                </div>
                {this.renderInput(
                  "username",
                  "Email",
                  "pencil-alt",
                  "white",
                  "whitelabel"
                )}
                {this.renderInput(
                  "password",
                  "Enter your password to update your profile changes.",
                  "pencil-alt",
                  "white",
                  "whitelabel",
                  "password"
                )}
              </div>
              <div style={{ width: "97%" }}>
                {this.renderButton("SUBMIT", "smile", "Button Primary", false)}
              </div>
              <Button
                title="CHANGE PASSWORD"
                icon="pencil-alt"
                className="Button Primary"
                onPress={this.handleChangePassword}
              />
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProfileCard;
