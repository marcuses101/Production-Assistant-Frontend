import React, { useState,useEffect } from "react";
import { QuantityInput } from "./FormComponents/QuantityInput";
import { NumberInput } from "./FormComponents/NumberInput";
import { TextArea } from "./FormComponents/TextArea";
import { TextInput } from "./FormComponents/TextInput";
import { useFormValidation } from "./Hooks/useFormValidation";
import { useItemServices } from "./Hooks/useItemServices";
import { useToast } from "./Hooks/useToast";
import { useHistory, useParams } from "react-router-dom";

export function EditItemForm({ projectId }) {
  const toast = useToast();
  const {itemId} = useParams();
  const {push} = useHistory();
  const validateForm = useFormValidation();
  const itemServices = useItemServices();

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [lowEstimate, setLowEstimate] = useState(0);
  const [highEstimate, setHighEstimate] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  console.log(projectId);
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

  function populateForm({name,description,lowEstimate,highEstimate,quantity}){
    setName(name);
    setDescription(description);
    setLowEstimate(lowEstimate);
    setHighEstimate(highEstimate);
    setQuantity(quantity)
  }

  useEffect(()=>{
    (async ()=>{
      populateForm(await itemServices.getItemById(itemId))
    })()
  },[])

  async function onSubmit(e) {
    e.preventDefault();
    if (!validateForm(validationArray)) return;
    try {
      await itemServices.editItem({
        projectId,
        name,
        description,
        highEstimate,
        lowEstimate,
        quantity
      });
      toast({message:`${name} updated`, type:'success'})
    } catch (error) {
      toast({ message: "server error", type: 'error' });
    }
  }
  function onChange(e) {
    const setters = {
      name: setName,
      description: setDescription,
      lowEstimate: (value)=>setLowEstimate(parseInt(value)),
      highEstimate: (value)=>setHighEstimate(parseInt(value)),
    };
    setters[e.target.id](e.target.value);
  }
  return (
    <section className="AddSceneForm">
      <form onSubmit={onSubmit}>
        <h1>Edit Item</h1>
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
          <button type='button' className="cancel" onClick={()=>push(`/project/${projectId}`)}>Cancel</button>
        </div>
      </form>
    </section>
  );
}
