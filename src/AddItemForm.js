import React, { useState } from "react";
import { QuantityInput } from "./FormComponents/QuantityInput";
import { NumberInput } from "./FormComponents/NumberInput";
import { TextArea } from "./FormComponents/TextArea";
import { TextInput } from "./FormComponents/TextInput";

export function AddItemForm() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [lowEstimate, setLowEstimate] = useState(0);
  const [highEstimate, setHighEstimate] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
  }
  function onChange(e) {
    const setters = {
      name: setName,
      description: setDescription,
      lowEstimate: setLowEstimate,
      highEstimate: setHighEstimate,
    };
    setters[e.target.id](e.target.value);
  }
  return (
    <section className="AddSceneForm">
      <form onSubmit={onSubmit}>
        <h1>Add Item</h1>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <TextInput
            label="Name:"
            value={name}
            error={nameError}
            id="name"
            onChange={onChange}
          />
          <QuantityInput
            label="Quantity:"
            value={quantity}
            id="quantity"
            setQuantity={setQuantity}
          />
        </div>
        <TextArea
          label="Description:"
          value={description}
          id="description"
          error={descriptionError}
          onChange={onChange}
        />
        <NumberInput
          label="Low item estimate ($)"
          value={lowEstimate}
          id="lowEstimate"
          onChange={onChange}
        />
        <NumberInput
          label="High item estimate ($)"
          value={highEstimate}
          id="highEstimate"
          onChange={onChange}
        />
        <div className="flex-center">
          <button type="submit">Submit</button>
          <button className="cancel">Cancel</button>
        </div>
      </form>
    </section>
  );
}
