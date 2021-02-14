import { useContext } from "react";
import { AcquisitionAPIServices } from "../API/AcquisitionAPIServices";
import { MainContext } from "../MainContext";
import { useAcquisitionDemoServices} from "./useAcquisitionDemoServices";

export function useAcquisitionServices(){
  const acquisitionDemoServices = useAcquisitionDemoServices();
  const {isDemo} = useContext(MainContext);

  if (isDemo) return acquisitionDemoServices;
  return AcquisitionAPIServices;
}