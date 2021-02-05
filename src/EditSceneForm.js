import React, {useState} from "react";
import { TextInput } from "./FormComponents/TextInput";
import {TextArea} from './FormComponents/TextArea'

export default function EditSceneForm() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    console.log("submit fired");
  }
  function onChange(e) {
    console.log(e.target.value);
    const setters = {
      name: setName,
      description: setDescription,
    };
    setters[e.target.id](e.target.value);
  }
  return (
    <section className="EditSceneForm">
      <form onSubmit={onSubmit}>
        <h1>Edit Scene</h1>
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
          <button type="submit">Submit Changes</button>
          <button className="cancel">Cancel</button>
        </div>
      </form>
    </section>
  );
}
