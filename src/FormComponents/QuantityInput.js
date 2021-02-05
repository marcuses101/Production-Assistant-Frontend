import React from "react";
import "./QuantityInput.css";

export function QuantityInput({ value, label, id, setQuantity }) {
  function onChange(e) {
    setQuantity(e.target.value);
  }
  function increment() {
    setQuantity((value) => ++value);
  }
  function decrement() {
    setQuantity((value) => {
      if (value <= 1) return 1;
      return --value;
    });
  }
  function onBlur() {
    if (value < 1) setQuantity(1);
  }
  return (
    <div className="QuantityInput">
      <label htmlFor={id}>{label}</label>
      <button type="button" onClick={decrement} className="minus">
        −
      </button>
      <input
        type="number"
        value={value}
        name={id}
        id={id}
        min={1}
        onChange={onChange}
        onBlur={onBlur}
      />
      <button type="button" onClick={increment} className="plus">
        +
      </button>
    </div>
  );
}
