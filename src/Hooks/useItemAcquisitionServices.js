import { useContext } from "react";
import { ItemAcquisitionAPIServices } from "../API/ItemAcquisitionAPIServices";
import { useItemAcquisitionDemoServices } from "./useItemAcquisitionDemoServices";
import { MainContext } from "../MainContext";

export function useItemAcquisitionServices() {
  const ItemAcquisitionDemoServices = useItemAcquisitionDemoServices();
  const { isDemo } = useContext(MainContext);

  if (isDemo) return ItemAcquisitionDemoServices;
  return ItemAcquisitionAPIServices;
}
