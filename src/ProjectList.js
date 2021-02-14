import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useProjectServices} from './Hooks/useProjectServices'

export function ProjectList() {
  const [projects, setProjects] = useState([]);
  const projectServices = useProjectServices();

  useEffect(() => {
    (async () => {
      setProjects(await projectServices.getProjects());
    })();
  }, [projectServices]);

  const projectLinks = projects.map((project) => (
    <li key={project.id}>
      <Link to={`/project/${project.id}`}>{project.name}</Link>
    </li>
  ));
  return (
    <div>
      <h2>Project List</h2>
      <ul>{projectLinks}
      <li key='add'><Link to='/project/add'>+ Add Project</Link></li>
      </ul>
    </div>
  );
}
