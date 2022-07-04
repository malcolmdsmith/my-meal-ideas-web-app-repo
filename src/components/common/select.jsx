import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Select = ({
  name,
  label,
  options,
  error,
  valueProperty,
  textProperty,
  icon,
  iconColor,
  className,
  value = "",
  ...rest
}) => {
  return (
    <div className="form-group">
      <label className={className} htmlFor={name}>
        <FontAwesomeIcon icon={icon} color={iconColor} />
        &nbsp;{label}
      </label>
      <select
        name={name}
        id={name}
        {...rest}
        className="form-control"
        value={value}
      >
        <option value="" />
        {options.map((option) => (
          <option key={option[valueProperty]} value={option[valueProperty]}>
            {option[textProperty]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
