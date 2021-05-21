import React, { useState, useEffect } from "react";
import { BudgetChart } from "./BudgetChart";
import { useItemServices } from "./Hooks/useItemServices";
import { useSceneServices } from "./Hooks/useSceneServices";
import { ItemList } from "./ItemList";
import { SceneList } from "./SceneList";
import "./ProjectDashboard.css";
import { useAcquisitionServices } from "./Hooks/useAcquisitionServices";

export function ProjectDashboard({ project = {}, setProject }) {
  const [scenes, setScenes] = useState([]);
  const sceneServices = useSceneServices();
  const [items, setItems] = useState([]);
  const itemServices = useItemServices();
  const [acquisitions, setAcquisitions] = useState([]);
  const acquisitionServices = useAcquisitionServices();

  useEffect(() => {
    (async () => {
      console.log(project.id)
      if (project.id) {
        const [scenes, items, acquisitions] = await Promise.all([
          sceneServices.getProjectScenes(project.id),
          itemServices.getProjectItems(project.id),
          acquisitionServices.getProjectAcquisitions(project.id),
        ]);
        console.log({scenes,items,acquisitions});
        setScenes(scenes);
        setItems(items);
        setAcquisitions(acquisitions);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  return (
    <div className="ProjectDashboard">
      <SceneList scenes={scenes} projectId={project.id} />
      <ItemList items={items} projectId={project.id} />
      <BudgetChart totalBudget={project.budget} acquisitions={acquisitions} />
    </div>
  );
}
