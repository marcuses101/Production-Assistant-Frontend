import React, {useState} from "react";
import { TextInput } from "./FormComponents/TextInput";
import {TextArea} from './FormComponents/TextArea'
import { formValidation } from "./utils/formValidation";

export function AddSceneForm() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);

  const validationArray = [
    {value:name,setError:setNameError,validate(){return this.value.length>5}},
    {value:description,setError:setDescriptionError,validate(){return this.value}}
  ]

  function onSubmit(e) {
    e.preventDefault();
    if(!formValidation(validationArray)) return
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
        <h1>Add Scene</h1>
        <TextInput
          label="Name:"
          value={name}
          error={nameError}
          id="name"
          onChange={onChange}
        />
        <TextArea
          label="Description:"
          value={description}
          id="description"
          error={descriptionError}
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
