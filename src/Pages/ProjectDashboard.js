import React, { useState, useEffect } from "react";
import { BudgetChart } from "../DashboardComponents/BudgetChart";
import { useItemServices } from "../Hooks/useItemServices";
import { useSceneServices } from "../Hooks/useSceneServices";
import { ItemList } from "../DashboardComponents/ItemList";
import { SceneList } from "../DashboardComponents/SceneList";
import "./ProjectDashboard.css";
import { useAcquisitionServices } from "../Hooks/useAcquisitionServices";
import { SceneInfo } from "../DashboardComponents/SceneInfo";

export function ProjectDashboard({ project = {}, setProject }) {
  const [scenes, setScenes] = useState([]);
  const sceneServices = useSceneServices();
  const [items, setItems] = useState([]);
  const itemServices = useItemServices();
  const [acquisitions, setAcquisitions] = useState([]);
  const acquisitionServices = useAcquisitionServices();

  useEffect(() => {
    (async () => {
      if (project.id) {
        const [scenes, items, acquisitions] = await Promise.all([
          sceneServices.getProjectScenes(project.id),
          itemServices.getProjectItems(project.id),
          acquisitionServices.getProjectAcquisitions(project.id),
        ]);
        setScenes(scenes);
        setItems(items);
        setAcquisitions(acquisitions);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  return (
    <div className="ProjectDashboard">
      <SceneInfo scenes={scenes} items={items}/>
      <BudgetChart totalBudget={project.budget} acquisitions={acquisitions} />
      <SceneList scenes={scenes} projectId={project.id} />
      <ItemList items={items} projectId={project.id} />
    </div>
  );
}
