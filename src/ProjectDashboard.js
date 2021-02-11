import React, { useState, useEffect } from "react";
import { BudgetChart } from "./BudgetChart";
import { useItemServices } from "./Hooks/useItemServices";
import { useSceneServices } from "./Hooks/useSceneServices";
import { ItemList } from "./ItemList";
import { SceneList } from "./SceneList";
import './ProjectDashboard.css'

export function ProjectDashboard({ project, setProject }) {
  const [scenes, setScenes] = useState([]);
  const sceneServices = useSceneServices();
  const [items, setItems] = useState([]);
  const itemServices = useItemServices();

  useEffect(() => {
    (async () => {
      const [scenes, items] = await Promise.all([
        sceneServices.getProjectScenes(project.id),
        itemServices.getProjectItems(project.id),
      ]);
      setScenes(scenes);
      setItems(items);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  return (
    <div className='ProjectDashboard'>
      <SceneList scenes={scenes} projectId={project.id}/>
      <ItemList items={items} projectId={project.id}/>
      <BudgetChart totalBudget={project.budget} items={items} />
    </div>
  );
}
