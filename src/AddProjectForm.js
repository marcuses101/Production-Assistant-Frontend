import React, { useState } from "react";
import { NumberInput } from "./FormComponents/NumberInput";
import {TextArea} from "./FormComponents/TextArea";
import { TextInput } from "./FormComponents/TextInput";

export function AddProjectForm() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [budget, setBudget] = useState('');
  const [budgetError, setBudgetError] = useState(false);
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
      budget: setBudget,
      description: setDescription,
    };
    setters[e.target.id](e.target.value);
  }
  return (
    <section className='AddProjectForm'>
      <form onSubmit={onSubmit}>
        <h1>Add Project</h1>
        <TextInput
          label="Name:"
          value={name}
          error={nameError}
          id='name'
          onChange={onChange}
        />
        <TextArea
          label="Description:"
          value={description}
          id="description"
          error={descriptionError}
          onChange={onChange}
        />
        <NumberInput
          label="Budget($)"
          value={budget}
          id='budget'
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
