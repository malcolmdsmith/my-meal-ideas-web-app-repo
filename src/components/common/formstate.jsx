import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import TextArea from "./textarea";

class FormState extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false, allowUnknown: true };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateConfirmPassword = ({ name, value }) => {
    const obj = { [name]: value, password: this.state.data.password };
    const schema = {
      [name]: this.schema[name],
      password: this.schema["password"],
    };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    //    console.info(errors);
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    let errors = { ...this.state.errors };
    let errorMessage = "";
    if (input.name === "confirm_password")
      errorMessage = this.validateConfirmPassword(input);
    else errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else {
      delete errors[input.name];
    }

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderButton(label, icon, className, disable_button = true) {
    let disable = false;
    if (disable_button) disable = this.validate();

    return (
      <button disabled={disable} className={className}>
        <FontAwesomeIcon icon={icon} color="white" />
        &nbsp; {label}
      </button>
    );
  }

  renderSelect(
    name,
    label,
    options,
    valueProperty,
    textProperty,
    icon,
    iconColor,
    className
  ) {
    const { data, errors } = this.state;

    return (
      <Select
        //       className="form-lists"
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
        valueProperty={valueProperty}
        textProperty={textProperty}
        icon={icon}
        iconColor={iconColor}
        className={className}
      />
    );
  }

  renderInput(name, label, icon, iconColor, className, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        id={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        icon={icon}
        iconColor={iconColor}
        className={className}
      />
    );
  }

  renderTextarea(name, label, icon, iconColor, className, rows, cols) {
    const { data, errors } = this.state;

    return (
      <TextArea
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        icon={icon}
        iconColor={iconColor}
        className={className}
        rows={rows}
        cols={cols}
      />
    );
  }
}

export default FormState;
