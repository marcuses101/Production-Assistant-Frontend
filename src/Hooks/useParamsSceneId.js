import { useParams } from "react-router-dom";

export function useParamsSceneId() {
  const { sceneId } = useParams();
  return sceneId;
}
