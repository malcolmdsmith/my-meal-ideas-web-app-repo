import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { data } = this.props;

    const { error } = Joi.validate(data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
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
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    this.props.onInputChange(input);
  };

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderSelect(name, label, options, valueProperty, textProperty, icon) {
    const { errors } = this.state;
    const { data } = this.props;

    return (
      <Select
        className="form-lists"
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
        valueProperty={valueProperty}
        textProperty={textProperty}
        icon={icon}
      />
    );
  }

  renderInput(name, label, icon, type = "text", maxlength) {
    const { errors } = this.state;
    const { data } = this.props;

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
        maxlength={maxlength}
      />
    );
  }
}

export default Form;
