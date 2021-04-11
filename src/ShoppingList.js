import { useState, useEffect, Fragment } from "react";
import { useItemAcquisitionServices } from "./Hooks/useItemAcquisitionServices";
import { useItemServices } from "./Hooks/useItemServices";
import { useParamsProjectId } from "./Hooks/useParamsProjectId";
import { useToast } from "./Hooks/useToast";
import "./ShoppingList.css";

export function ShoppingList() {
  const toast = useToast();
  const [itemAcquisitions, setItemAcquisitions] = useState([]);
  const projectId = useParamsProjectId();
  const ItemAcquisitionServices = useItemAcquisitionServices();
  const ItemServices = useItemServices();
  const [items, setItems] = useState([]);

  const acquiredItemIds = itemAcquisitions.map(({ item_id }) => item_id);
  const unacquiredItems = items.filter(
    ({ id }) => !acquiredItemIds.includes(id)
  );
  const listItems = unacquiredItems.map(
    ({ name, source, highEstimate, lowEstimate, id, quantity }) => (
      <Fragment key={id}>
        <span>{name}</span>
        <span>{quantity}</span>
        <span>{source ?? ''}</span>
        <span>{lowEstimate}</span>
        <span>{highEstimate}</span>
      </Fragment>
    )
  );

  console.log(unacquiredItems);
  useEffect(() => {
    (async () => {
      try {
        const [items, itemAcquisitions] = await Promise.all([
          ItemServices.getProjectItems(projectId),
          ItemAcquisitionServices.getProjectEntries(projectId),
        ]);
        setItems(items);
        setItemAcquisitions(itemAcquisitions);
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, [projectId]);
  return (
    <section className="ShoppingList">
      <h2>Shopping list</h2>
      <div className="grid">
        <h3>Item Name</h3>
        <h3>Quantity</h3>
        <h3>Source</h3>
        <h3>Low Est($)</h3>
        <h3>High Est($)</h3>
        {listItems}
      </div>
    </section>
  );
}
