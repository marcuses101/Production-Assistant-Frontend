import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProjectServices } from "./Hooks/useProjectServices";
import { useLoginActions } from "./Hooks/useLoginActions";

export function ProjectList() {
  const [projects, setProjects] = useState([]);
  const projectServices = useProjectServices();
  const { logout } = useLoginActions();

  useEffect(() => {
    (async () => {
      setProjects(await projectServices.getProjects());
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const projectLinks = projects.map((project) => (
    <li key={project.id}>
      <Link to={`/project/${project.id}`}>{project.name}</Link>
    </li>
  ));
  return (
    <main style={{margin:'1rem'}}>
      <h2>Project List</h2>
      <ul>
        {projectLinks}
        <li key="add">
          <Link to="/project/add">+ Add Project</Link>
        </li>
        <li>
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
    </main>
  );
}
