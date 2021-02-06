import { useContext } from "react";
import { MainContext } from "../MainContext";
import {ItemAPIServices} from '../API/ItemAPIServices'
import { useItemDemoServices } from "./useItemDemoServices";

export function useItemServices() {
  const {isDemo} = useContext(MainContext)
  const ItemDemoServices = useItemDemoServices();

  if (isDemo) return ItemDemoServices;

  return ItemAPIServices;
}
