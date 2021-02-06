import React, { useState, useEffect } from "react";
import {useSceneServices} from './Hooks/useSceneServices'
import {useParamsProjectId} from './Hooks/useParamsProjectId'

export function SceneList() {
  const projectId = useParamsProjectId();
  const [scenes, setScenes] = useState([]);
  const sceneServices = useSceneServices();

  useEffect(()=>{
    (async ()=>{
     const scenes = await sceneServices.getProjectScenes(projectId);
     setScenes(scenes);
    })()
  },[projectId, sceneServices])
}
