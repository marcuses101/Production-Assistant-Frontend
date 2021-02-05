import React from "react";
import "./NumberInput.css";

export function NumberInput({ id, label, value, onChange, error }) {
  return (
    <div
      className={`NumberInput ${error && "error"} ${
        (value === 0 || value) && "value"
      }`}
    >
      <label htmlFor={id}>{label}</label>
      <input
        type="number"
        name={id}
        id={id}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
