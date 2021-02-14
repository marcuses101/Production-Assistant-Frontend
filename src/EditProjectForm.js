import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { NumberInput } from "./FormComponents/NumberInput";
import { TextArea } from "./FormComponents/TextArea";
import { TextInput } from "./FormComponents/TextInput";
import { useFormValidation } from "./Hooks/useFormValidation";
import { useParamsProjectId } from "./Hooks/useParamsProjectId";
import { useProjectServices } from "./Hooks/useProjectServices";
import { useToast } from "./Hooks/useToast";

export function EditProjectForm({ project, editProject }) {
  const formValidation = useFormValidation();
  const { goBack } = useHistory();
  const toast = useToast();
  const projectServices = useProjectServices();
  const projectId = useParamsProjectId();
  const { push } = useHistory();
  const [name, setName] = useState(project?.name || "");
  const [nameError, setNameError] = useState(false);
  const [budget, setBudget] = useState(project?.budget || 0);
  const [budgetError, setBudgetError] = useState(false);
  const [description, setDescription] = useState(project.description || "");
  const [descriptionError, setDescriptionError] = useState(false);

  const validationArray = [
    {
      setError: setNameError,
      validate: () => name,
      message: "project name is required",
    },
    {
      setError: setBudgetError,
      validate: () => budget,
      message: "project budget is required",
    },
    {
      setError: setDescriptionError,
      validate: () => description,
      message: "project description is required",
    },
  ];

  async function onSubmit(e) {
    e.preventDefault();
    if (!formValidation(validationArray)) return;
    const editedProject = { name, description, budget, id: projectId };
    await projectServices.editProject(editedProject);
    toast.success(`${name} updated`);
    editProject(editedProject);
    push(`/project/${projectId}`);
  }
  function onChange(e) {
    const setters = {
      name: setName,
      budget: setBudget,
      description: setDescription,
    };
    setters[e.target.id](e.target.value);
  }

  return (
    <section className="EditProjectForm">
      <form onSubmit={onSubmit}>
        <h2>Edit Project</h2>
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
        <NumberInput
          label="Budget($)"
          value={budget}
          id="budget"
          error={budgetError}
          onChange={onChange}
        />
        <div className="flex-center">
          <button type="submit">Submit Changes</button>
          <button className="cancel" type="button" onClick={goBack}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
