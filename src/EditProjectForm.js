import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { NumberInput } from "./FormComponents/NumberInput";
import {TextArea} from "./FormComponents/TextArea";
import { TextInput } from "./FormComponents/TextInput";
import { useParamsProjectId } from "./Hooks/useParamsProjectId";
import { useProjectServices } from "./Hooks/useProjectServices";

export function EditProjectForm({editProject}) {
  const projectServices = useProjectServices();
  const projectId = useParamsProjectId();
  const {push} = useHistory();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [budget, setBudget] = useState('');
  const [budgetError, setBudgetError] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    const editedProject = {name,description,budget,id:projectId}
    await projectServices.editProject(editedProject)
    editProject(editedProject)
    push(`/project/${projectId}`)
  }
  function onChange(e) {
    const setters = {
      name: setName,
      budget: setBudget,
      description: setDescription,
    };
    setters[e.target.id](e.target.value);
  }

  useEffect(()=>{
    (async ()=>{
      const {name,description,budget} = await projectServices.getProjectById(projectId)
      setName(name);
      setDescription(description);
      setBudget(budget);
    })()
  },[projectId])

  return (
    <section className="EditProjectForm">
      <form onSubmit={onSubmit}>
        <h1>Edit Project</h1>
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
          <button type="submit">Submit Changes</button>
          <button className="cancel">Cancel</button>
        </div>
      </form>
    </section>
  );
}
