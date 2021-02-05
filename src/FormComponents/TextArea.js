import React from "react";
import "./TextArea.css";

export function TextArea({ value, label, onChange, error, id }) {
  return (
    <div className={`TextArea ${value?'value':''} ${error ? "error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      {error && <i className="fas fa-exclamation-triangle error-icon"></i>}
      <textarea
        name={id}
        id={id}
        cols="30"
        rows="10"
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
