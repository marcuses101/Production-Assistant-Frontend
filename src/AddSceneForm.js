import React, { useState } from "react";
import { TextInput } from "./FormComponents/TextInput";
import { TextArea } from "./FormComponents/TextArea";
import { useFormValidation } from "./Hooks/useFormValidation";
import { useHistory } from "react-router-dom";
import { useSceneServices } from "./Hooks/useSceneServices";
import { useParamsProjectId } from "./Hooks/useParamsProjectId";

export function AddSceneForm() {
  const { goBack } = useHistory();
  const projectId = useParamsProjectId();
  const formValidation = useFormValidation();
  const sceneServices = useSceneServices();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);

  const validationArray = [
    {
      message: "name is required",
      setError: setNameError,
      validate() {
        return name;
      },
    },
    {
      message: "description is required",
      setError: setDescriptionError,
      validate() {
        return description;
      },
    },
  ];

 async function onSubmit(e) {
    e.preventDefault();
    if (!formValidation(validationArray)) return;
    try {
      await sceneServices.addScene({projectId,name,description})
      goBack();
    } catch (error) {
      return
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
          <button type="button" className="cancel" onClick={goBack}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
