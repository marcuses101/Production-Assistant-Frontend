import React, { useState, useEffect } from "react";
import { QuantityInput } from "../FormComponents/QuantityInput";
import { TextArea } from "../FormComponents/TextArea";
import { TextInput } from "../FormComponents/TextInput";
import { useFormValidation } from "../Hooks/useFormValidation";
import { useItemServices } from "../Hooks/useItemServices";
import { useToast } from "../Hooks/useToast";
import { useHistory, useParams } from "react-router-dom";

export function EditItemForm({ projectId }) {
  const toast = useToast();
  const { goBack } = useHistory();
  const { itemId } = useParams();
  const { push } = useHistory();
  const validateForm = useFormValidation();
  const itemServices = useItemServices();

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
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

 async function removeItem() {
    try {
      await itemServices.removeItem(itemId)
      goBack();
    } catch (error) {
      toast.error(error.message);
    }
  }

  function populateForm({
    name,
    description,
    quantity,
  }) {
    setName(name);
    setDescription(description);
    setQuantity(quantity);
  }

  useEffect(() => {
    (async () => {
      populateForm(await itemServices.getItemById(itemId));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    if (!validateForm(validationArray)) return;
    try {
      await itemServices.editItem({
        id: itemId,
        projectId,
        name,
        description,
        quantity,
      });
      toast({ message: `${name} updated`, type: "success" });
      goBack();
    } catch (error) {
      toast({ message: error.message, type: "error" });
    }
  }
  function onChange(e) {
    const setters = {
      name: setName,
      description: setDescription,
    };
    setters[e.target.id](e.target.value);
  }
  return (
    <section className="AddSceneForm">
      <form onSubmit={onSubmit}>
        <h2>Edit Item</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
          <button className='remove' type="button" onClick={removeItem}>
            Remove Item
          </button>
        </div>
      </form>
    </section>
  );
}
