import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import { TextInput } from "../FormComponents/TextInput";
import { TextArea } from "../FormComponents/TextArea";
import { useFormValidation } from "../Hooks/useFormValidation";
import { useHistory } from "react-router-dom";
import { useSceneServices } from "../Hooks/useSceneServices";
import { useItemServices } from "../Hooks/useItemServices";
import { useParamsProjectId } from "../Hooks/useParamsProjectId";
import { toDateString } from "../utils";
import { useToast } from "../Hooks/useToast";
import { ItemSelector } from "../Components/ItemSelector";

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
      const dbItems = await itemServices.getProjectItems(projectId);
      // copy items to avoid weirdness
      const items = dbItems.map((item) => {
        return { ...item };
      });
      setItems(items);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!formValidation(validationArray)) return;
    try {
      const { id: sceneId } = await sceneServices.addScene({
        projectId,
        name,
        description,
        date,
      });
      await Promise.all(
        items.reduce((promiseArray, item) => {
          if (item.checked) {
            promiseArray.push(
              sceneServices.addItemToScene({ itemId: item.id, sceneId })
            );
          }
          return promiseArray;
        }, [])
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
    const {
      checked,
      dataset: { id },
    } = e.target;
    const itemId = parseInt(id);
    setItems((items) =>
      items.map((item) => {
        if (parseInt(item.id) === parseInt(itemId)) {
          item.checked = checked;
        }
        return item;
      })
    );
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
        <h3>Add items to scene</h3>
        {items.length > 0
          ? <ItemSelector items={items} handleCheck={handleCheck} />
          :<p>No items associated to this project. <Link to={`/project/${projectId}/item/add`}>Add Item</Link></p>}

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
