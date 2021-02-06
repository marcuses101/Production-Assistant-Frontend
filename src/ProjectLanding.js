import React, { useState, useEffect } from "react";
import { useParamsProjectId } from "./Hooks/useParamsProjectId";
import { useProjectServices } from "./Hooks/useProjectServices";

export function ProjectLanding() {
  const projectId = useParamsProjectId();
  const [project, setProject] = useState({
    id: null,
    name: "",
    description: "",
    budget: 0,
  });

  const projectServices = useProjectServices();

  useEffect(() => {
    (async () => {
      console.log("test");
      const project = await projectServices.getProjectById(projectId);
      setProject(project);
    })();
  }, [projectServices]);
  return (
    <div>
      <h1>{project?.name}</h1>
    </div>
  );
}
