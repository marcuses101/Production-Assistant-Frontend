import { useParams } from "react-router-dom";

export function useParamsProjectId(){
  const {projectId} = useParams();
  return parseInt(projectId)
}