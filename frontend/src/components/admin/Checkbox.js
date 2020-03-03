import React from "react";

const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
  <div className="form-check" key={label}>
    <label htmlFor={label}>
      <input
        type="checkbox"
        name={label}
        id={label}
        checked={isSelected}
        onChange={onCheckboxChange}
        className="form-check-input"
      />
      <span></span>
    </label>
  </div>
);

export default Checkbox;