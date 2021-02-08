import React from "react";
import "./TextInput.css";

export function PasswordInput({ id, label, max, value, error, onChange }) {
  return (
    <>
      <div className={`TextInput ${value?'value':''} ${error?'error':''}`}>
        <label htmlFor={id}>
          {label}
        </label>
        <input
          autoComplete="off"
          maxLength={max || ""}
          id={id}
          type="password"
          value={value}
          onChange={onChange}
        />
        {error && <i className="fas fa-exclamation-triangle error-icon"></i>}
      </div>
    </>
  );
}
