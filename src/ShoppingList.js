import { useState, useEffect, Fragment } from "react";
import { useItemServices } from "./Hooks/useItemServices";
import { useParamsProjectId } from "./Hooks/useParamsProjectId";
import { useToast } from "./Hooks/useToast";
import { AddAcquisitionForm } from "./AddAcquisitionForm";
import "./ShoppingList.css";

export function ShoppingList() {
  const toast = useToast();
  const projectId = useParamsProjectId();
  const ItemServices = useItemServices();
  const [items, setItems] = useState([]);
  const [checkedItemIds, setCheckedItemIds] = useState([]);

  function handleCheck(e) {
    const {id} = e.target.dataset;
    const itemId = parseInt(id);
    setCheckedItemIds((arr) => {
      return arr.includes(itemId)
        ? arr.filter((id) => id !== itemId)
        : [...arr, parseInt(itemId)];
    });
  }
  const listItems = items.map(({ name, id, quantity, acquired }) => {
    const itemChecked = checkedItemIds.includes(id);
    return (
      <Fragment key={id}>
        <span>
          <input
            type="checkbox"
            checked={itemChecked}
            disabled={acquired}
            data-id={id}
            onChange={handleCheck}
          />
        </span>
        <span>{name}</span>
        <span>{quantity}</span>
        <span>{acquired ? "Yes" : "No"}</span>
      </Fragment>
    );
  });

  useEffect(() => {
    (async () => {
      try {
        const items = await ItemServices.getProjectItems(projectId);
        setItems(items);
      } catch (error) {
        toast.error(error.message);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);
  return (
    <>
      <section className="ShoppingList">
        <h2>Shopping list</h2>
        <div className="grid">
          <h3>Select</h3>
          <h3>Item Name</h3>
          <h3>Quantity</h3>
          <h3>Acquired</h3>
          {listItems}
        </div>
        {checkedItemIds.length > 0 && (
          <AddAcquisitionForm
            setCheckedItemIds={setCheckedItemIds}
            setItems={setItems}
            checkedItemIds={checkedItemIds}
          />
        )}
      </section>
    </>
  );
}
