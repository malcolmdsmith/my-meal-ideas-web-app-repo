import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TextArea = ({
  name,
  label,
  error,
  icon,
  iconColor,
  className,
  rows,
  cols,
  ...rest
}) => {
  return (
    <div className="form-group">
      <label className={className} htmlFor={name}>
        {icon && <FontAwesomeIcon icon={icon} color={iconColor} />}&nbsp;{label}
      </label>
      <textarea
        {...rest}
        name={name}
        id={name}
        className="form-control"
        autoComplete="off"
        rows={rows}
        cols={cols}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default TextArea;
