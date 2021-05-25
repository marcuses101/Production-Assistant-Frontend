import { useState, useEffect } from "react";
import { useItemServices } from "./Hooks/useItemServices";
import { useParamsProjectId } from "./Hooks/useParamsProjectId";
import { useToast } from "./Hooks/useToast";
import { AddAcquisitionForm } from "./AddAcquisitionForm";
import "./ShoppingList.css";
import { Link } from "react-router-dom";

export function ShoppingList() {
  const toast = useToast();
  const projectId = useParamsProjectId();
  const ItemServices = useItemServices();
  const [items, setItems] = useState([]);
  const [checkedItemIds, setCheckedItemIds] = useState([]);
  const [acquiredFilter, setAcquiredFilter] = useState();

  function handleClick(id) {
    const itemId = parseInt(id);
    setCheckedItemIds((arr) => {
      const itemPreviouslyChecked = arr.includes(itemId);
      const newArray = itemPreviouslyChecked
        ? arr.filter((id) => id !== itemId)
        : [...arr, parseInt(itemId)];
      if (newArray.length === 0) {
        setAcquiredFilter();
      } else {
        const { acquired } = items.find(({ id }) => id === itemId);
        setAcquiredFilter(acquired);
      }
      return newArray;
    });
  }
  function cancel() {
    setCheckedItemIds([]);
    setAcquiredFilter();
  }
  async function unAcquire() {
    try {
      // set checked items acquired values to false
      await Promise.all(
        checkedItemIds.map((id) => {
          const item = items.find((item) => item.id === id);
          return ItemServices.editItem({ ...item, acquired: false });
        })
      );
      // reflect change locally
      setItems((items) =>
        items.map((item) =>
          checkedItemIds.includes(item.id) ? { ...item, acquired: false } : item
        )
      );
      //uncheck all items. clear filter
      setAcquiredFilter();
      setCheckedItemIds([]);
    } catch (error) {
      toast.error(error);
    }
  }

  // if item filter items based on whether checked item's acquired property
  const listItems = items
    .filter((item) => {
      if (acquiredFilter === undefined) return true;
      return item.acquired === acquiredFilter;
    })
    .map(({ name, id, quantity, acquired }) => {
      const itemChecked = checkedItemIds.includes(id);
      return (
        <li key={id} onClick={() => handleClick(id)}>
          <div className="checkbox">{itemChecked ? <h2>✓</h2> : ""}</div>
          <div className="grid">
            <span>
              <strong>Item Name:</strong>
              <p>{name}</p>
            </span>
            <span>
              <strong>Quantity: </strong>
              <p>{quantity}</p>
            </span>
            <span>
              <strong>Acquired: </strong>
              <p>{acquired ? "Yes" : "No"}</p>
            </span>
          </div>
        </li>
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

  // Display message to add items if no items in project.
  if (items.length === 0) {
    return (
      <section className="ShoppingList">
        <h2>Shopping list</h2>
        <p>
          No items set on this project.{" "}
          <Link to={`/project/${projectId}/item/add`}>Add item</Link>?
        </p>
      </section>
    );
  }
  return (
    <>
      <section className="ShoppingList">
        <h2>Shopping list</h2>
        <ul>{listItems}</ul>
      </section>
      {acquiredFilter === false && (
        <section>
          <AddAcquisitionForm
            setCheckedItemIds={setCheckedItemIds}
            setItems={setItems}
            setAcquiredFilter={setAcquiredFilter}
            checkedItemIds={checkedItemIds}
            cancel={cancel}
          />
        </section>
      )}
      {acquiredFilter === true && (
        <section>
          <h3>Set acquired to false?</h3>
          <div
            style={{
              margin: "1rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button type="submit" onClick={unAcquire}>
              Yes
            </button>
            <button onClick={cancel}>Cancel</button>
          </div>
        </section>
      )}
    </>
  );
}
