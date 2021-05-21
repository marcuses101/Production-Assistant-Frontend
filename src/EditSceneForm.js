import React, { useEffect, useState } from "react";
import { TextInput } from "./FormComponents/TextInput";
import { TextArea } from "./FormComponents/TextArea";
import { useSceneServices } from "./Hooks/useSceneServices";
import { useParamsSceneId } from "./Hooks/useParamsSceneId";
import { useHistory } from "react-router-dom";
import { useFormValidation } from "./Hooks/useFormValidation";
import { useToast } from "./Hooks/useToast";
import { toDateString } from "./utils";
import { useItemServices } from "./Hooks/useItemServices";
import { useParamsProjectId } from "./Hooks/useParamsProjectId";
import { ItemSelector } from "./ItemSelector";

export default function EditSceneForm() {
  const { goBack } = useHistory();
  const toast = useToast();
  const itemServices = useItemServices();
  const formValidation = useFormValidation();
  const sceneServices = useSceneServices();
  const sceneId = useParamsSceneId();
  const projectId = useParamsProjectId();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [date, setDate] = useState(toDateString());
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { name, description, date } = await sceneServices.getSceneById(
          sceneId
        );
        const [dbItems, dbSceneItems] = await Promise.all([
          itemServices.getProjectItems(projectId),
          itemServices.getSceneItems(sceneId),
        ]);
        const sceneItemIds = dbSceneItems.map(({id})=>id);
        console.log({dbItems})
        console.log({dbSceneItems})
        // add checked=true if item appears in scene;
        const items = dbItems.map((item) =>
          (sceneItemIds.includes(item.id))
            ? { ...item, checked: true, sceneItem: true }
            : {...item}
        );
        console.log(items);
        setName(name);
        setDescription(description);
        setItems(items);
        setDate(toDateString(date));
      } catch (error) {
        toast.error("server Error");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneId]);

  const validationArray = [
    {
      setError: setNameError,
      validate: () => name,
      message: "scene name is required",
    },
    {
      message: "description is required",
      setError: setDescriptionError,
      validate: () => description,
    },
  ];
  async function onSubmit(e) {
    e.preventDefault();
    if (!formValidation(validationArray)) return;
    try {
      await sceneServices.editScene({ name, description, id: sceneId, date });
      await Promise.all(items.reduce((promiseArray,item)=>{
        if (item.action === 'add') {
          promiseArray.push(sceneServices.addItemToScene({itemId:item.id,sceneId}))
        } else if (item.action === 'remove'){
          promiseArray.push(sceneServices.removeItemFromScene({itemId:item.id,sceneId}))
        }
          return promiseArray;
      },[]))
      toast.success('Scene Updated');
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
        item.action = (item.sceneItem && !checked)
          ? 'remove'
          : (!item.sceneItem && checked)
          ? 'add'
          : null;
        item.checked = checked;
      }
      return item;
    }))
  }
  return (
    <section className="EditSceneForm">
      <form onSubmit={onSubmit}>
        <h2>Edit Scene</h2>
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
        <ItemSelector handleCheck={handleCheck} items={items} />
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
