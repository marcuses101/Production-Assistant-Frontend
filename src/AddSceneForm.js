import React, { useState, useEffect } from "react";
import { TextInput } from "./FormComponents/TextInput";
import { TextArea } from "./FormComponents/TextArea";
import { useFormValidation } from "./Hooks/useFormValidation";
import { useHistory } from "react-router-dom";
import { useSceneServices } from "./Hooks/useSceneServices";
import { useItemServices } from "./Hooks/useItemServices";
import { useParamsProjectId } from "./Hooks/useParamsProjectId";
import { toDateString } from "./utils";
import { useToast } from "./Hooks/useToast";
import { ItemSelector } from "./ItemSelector";

export function AddSceneForm() {
  const { goBack } = useHistory();
  const toast = useToast();
  const projectId = useParamsProjectId();
  const formValidation = useFormValidation();
  const sceneServices = useSceneServices();
  const itemServices = useItemServices();
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [date, setDate] = useState(toDateString());
  const validationArray = [
    {
      message: "name is required",
      setError: setNameError,
      validate: () => name,
    },
    {
      message: "description is required",
      setError: setDescriptionError,
      validate: () => description,
    },
  ];
  useEffect(() => {
    (async () => {
      const items = await itemServices.getProjectItems(projectId);
      setItems(items);
      console.log(items);
    })();
  }, [projectId]);

  async function onSubmit(e) {
    e.preventDefault();
    console.log({ items });
    const checkedIds = items.reduce(
      (arr, { checked, id }) => (checked ? [...arr, id] : arr),
      []
    );
    if (!formValidation(validationArray)) return;
    try {
      const { id: sceneId } = await sceneServices.addScene({
        projectId,
        name,
        description,
        date,
      });
      console.log({ sceneId });
      await Promise.all(
        checkedIds.map(
          async (itemId) =>
            await sceneServices.addItemToScene({ itemId, sceneId })
        )
      );
      toast.success(`${name} scene added!`);
      goBack();
    } catch (error) {
      return;
    }
  }
  function onChange(e) {
    const setters = {
      name: setName,
      description: setDescription,
      date: setDate,
    };
    setters[e.target.id](e.target.value);
  }

  function handleCheck(e) {
    const {checked, dataset:{id}} = e.target;
    const itemId = parseInt(id)
    setItems(items=>items.map(item=>{
      if (parseInt(item.id) === parseInt(itemId)) {
        item.checked = checked;
      }
      return item;
    }))
  }
  return (
    <section className="AddSceneForm">
      <form onSubmit={onSubmit}>
        <h2>Add Scene</h2>
        <label htmlFor="date">Filming date:</label>
        <input
          type="date"
          value={date}
          name="date"
          id="date"
          onChange={onChange}
        />
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
        <ItemSelector items={items} handleCheck={handleCheck} />
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
