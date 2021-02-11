import React, { useEffect, useState } from "react";
import { TextInput } from "./FormComponents/TextInput";
import { TextArea } from "./FormComponents/TextArea";
import { useSceneServices } from "./Hooks/useSceneServices";
import { useParamsSceneId } from "./Hooks/useParamsSceneId";
import { useHistory } from "react-router-dom";
import { useFormValidation } from "./Hooks/useFormValidation";

export default function EditSceneForm() {
  const { goBack } = useHistory();
  const formValidation = useFormValidation();
  const sceneServices = useSceneServices();
  const sceneId = useParamsSceneId();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);

  useEffect(() => {
    (async () => {
      console.log(sceneId);
      const { name, description } = await sceneServices.getSceneById(sceneId);
      setName(name);
      setDescription(description);
    })();
  }, []);

  const validationArray = [
    {
      setError: setNameError,
      validate: () => name,
      message: "scene name is required",
    },
  ];
  async function onSubmit(e) {
    e.preventDefault();
    if (!formValidation(validationArray)) return;
    try {
      await sceneServices.editScene({ name, description, id: sceneId });
      goBack();
    } catch (error) {
      return;
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
    <section className="EditSceneForm">
      <form onSubmit={onSubmit}>
        <h2>Edit Scene</h2>
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
          <button type="button" className="cancel" onClick={goBack}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
