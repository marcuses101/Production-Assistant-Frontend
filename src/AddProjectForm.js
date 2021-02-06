import React, { useState } from "react";
import { NumberInput } from "./FormComponents/NumberInput";
import {TextArea} from "./FormComponents/TextArea";
import { TextInput } from "./FormComponents/TextInput";
import { useProjectServices } from "./Hooks/useProjectServices";
import {useHistory} from 'react-router-dom';
import { formValidation } from "./utils/formValidation";

export function AddProjectForm() {
  const projectServices = useProjectServices();
  const {push} = useHistory();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [budget, setBudget] = useState('');
  const [budgetError, setBudgetError] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);

  const validationArray = [
    {value:name,setError:setNameError,validate(){}}
  ]

async function onSubmit(e) {
    e.preventDefault();
    if (!formValidation(validationArray)) return
    try{
      await projectServices.addProject({name,description,budget})
      push('/')
    } catch (error) {
      console.error(error);
    }
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
