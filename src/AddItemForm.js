import React, { useState } from "react";
import { QuantityInput } from "./FormComponents/QuantityInput";
import { TextArea } from "./FormComponents/TextArea";
import { TextInput } from "./FormComponents/TextInput";
import { useFormValidation } from "./Hooks/useFormValidation";
import { useItemServices } from "./Hooks/useItemServices";
import { useToast } from "./Hooks/useToast";
import { useHistory } from "react-router-dom";

export function AddItemForm({ projectId }) {
  const toast = useToast();
  const { push } = useHistory();
  const validateForm = useFormValidation();
  const itemServices = useItemServices();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [source, setSource] = useState("");
  const validationArray = [
    {
      message: "Name is required",
      setError: setNameError,
      validate: () => name,
    },
    {
      message: "Description is required",
      setError: setDescriptionError,
      validate: () => description,
    },
  ];
  function reset() {
    setName("");
    setQuantity(1);
    setDescription("");
  }
  async function onSubmit(e) {
    e.preventDefault();
    if (!validateForm(validationArray)) return;
    try {
      await itemServices.addItem({
        projectId,
        name,
        description,
        quantity,
      });
      toast({ message: `${name} added`, type: "success" });
      reset();
    } catch (error) {
      toast({ message: "server error", type: "error" });
    }
  }
  function onChange(e) {
    const setters = {
      name: setName,
      description: setDescription,
      source: setSource,
    };
    setters[e.target.id](e.target.value);
  }
  return (
    <section className="AddSceneForm">
      <form onSubmit={onSubmit}>
        <h2>Add Item</h2>
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
        <div className="flex-center">
          <button type="submit">Submit</button>
          <button
            type="button"
            className="cancel"
            onClick={() => push(`/project/${projectId}`)}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
