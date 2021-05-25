import { useState } from "react";
import { useAcquisitionServices } from "./Hooks/useAcquisitionServices";
import { useItemServices } from "./Hooks/useItemServices";
import { useParamsProjectId } from "./Hooks/useParamsProjectId";
import { NumberInput } from "./FormComponents/NumberInput";
import { useToast } from "./Hooks/useToast";
import "./AddAcquisitionForm.css";
export function AddAcquisitionForm({ checkedItemIds,setCheckedItemIds, setItems, cancel , setAcquiredFilter}) {
  const toast = useToast();
  const projectId = useParamsProjectId();
  const [total, setTotal] = useState(0);
  const acquisitionServices = useAcquisitionServices();
  const [acquisitionType, setAcquisitionType] = useState("purchase");
  const itemServices = useItemServices();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { id: acquisitionId } = await acquisitionServices.addAcquisition({
        total: parseInt(total) || 0,
        acquisitionType,
        projectId,
      });
      await Promise.all(
        checkedItemIds.map((itemId) => {
          return itemServices.editItem({
            id: itemId,
            acquisitionId,
            acquired: true,
          });
        })
      );
      setItems((items) =>
        items.map((item) =>
          checkedItemIds.includes(item.id)
            ? { ...item, acquired: true, acquisitionId }
            : item
        )
      );
      setCheckedItemIds([]);
      setTotal(0);
      setAcquiredFilter();
      toast.success("Acquisition logged");
    } catch (error) {}
  }
  function handleSelect(e) {
    setAcquisitionType(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Acquisition</h2>
      <label htmlFor="acquisitionType">Acquisition Type: </label>
      <br />
      <select
        name="acquisitionType"
        id="acquisitionType"
        value={acquisitionType}
        onChange={handleSelect}
      >
        <option value="purchase">Purchase</option>
        <option value="rental">Rental</option>
        <option value="construction">Construction</option>
      </select>
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
      <input type="submit" value="Submit" />
      <button type="button" className="cancel" onClick={cancel}>
        Cancel
      </button>
    </form>
  );
}
