import { useEffect, useState } from "react";
import { useAcquisitionServices } from "./Hooks/useAcquisitionServices";
import { useItemServices } from "./Hooks/useItemServices";
import { useParamsProjectId } from "./Hooks/useParamsProjectId";
import { NumberInput } from "./FormComponents/NumberInput";
import { useHistory } from "react-router-dom";
import { useToast } from "./Hooks/useToast";
import './AddAcquisitionForm.css'
export function AddAcquisitionForm() {
  const { goBack } = useHistory();
  const toast = useToast();
  const projectId = useParamsProjectId();
  const [acquisitions, setAcquisitions] = useState([]);
  const [total, setTotal] = useState(0);
  const acquisitionServices = useAcquisitionServices();
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const itemServices = useItemServices();

  const itemOptions = items
    // remove items that have already been acquired or selected
    .filter(
      ({ id }) =>
        !selectedItems.some((selected) => selected.id === id) &&
        !acquisitions.some(({ items }) => items.includes(id))
    )
    .map((item) => {
      return (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      );
    });

  function handleSelect(e) {
    const item = items.find(
      ({ id }) => id.toString() === e.target.value.toString()
    );
    setSelectedItems((selectedItems) => [...selectedItems, item]);
  }
  function removeItem(itemId) {
    setSelectedItems((selectedItems) =>
      selectedItems.filter(({ id }) => id.toString() !== itemId.toString())
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedItems.length)
      return toast({ message: "Select minimum one item", type: "error" });
    try {
      const newAcquisition = await acquisitionServices.addAcquisition({
        total: parseInt(total) || 0,
        items: selectedItems.map(({ id }) => id),
        projectId,
      });
      setAcquisitions((acquisitions) => [...acquisitions, newAcquisition]);
      setSelectedItems([]);
      setTotal(0)
    } catch (error) {}
  }

  useEffect(() => {
    (async () => {
      const [items, acquisitions] = await Promise.all([
        itemServices.getProjectItems(projectId),
        acquisitionServices.getProjectAcquisitions(projectId),
      ]);
      setItems(items);
      setAcquisitions(acquisitions);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return (
    <section className="AddAcquisitionForm">
      <form onSubmit={handleSubmit}>
        <h2>Add Acquisition</h2>
        <div
          onBlur={() => {
            if (isNaN(total)) return setTotal(0);
          }}
        >
          <NumberInput
            label="Total cost ($):"
            value={total ?? 0}
            onChange={(e) => setTotal(e.target.value)}
          />
        </div>
        {itemOptions.length ? (
          <select value="Add item" onChange={handleSelect}>
            <option key="add" value="Add item">
              Add Item
            </option>
            {itemOptions}
          </select>
        ) : (
          <select disabled>
            <option key="add" value="Add item">
              Add Item
            </option>
          </select>
        )}
        <ul className="selectedItems">
          {selectedItems.map((item) => (
            <li key={item.id}>
              {item.name}
              <button onClick={() => removeItem(item.id)} type="button">
                remove
              </button>
            </li>
          ))}
        </ul>
        <input type="submit" value="Submit" />
        <button type="button" className="cancel" onClick={goBack}>
          Cancel
        </button>
      </form>
    </section>
  );
}
