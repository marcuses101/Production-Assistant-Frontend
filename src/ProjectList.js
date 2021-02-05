import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetProjects } from "./Hooks/useGetProjects";

export function ProjectList() {
  const [projects, setProjects] = useState([]);
  const getProjects = useGetProjects();

  useEffect(() => {
    (async () => {
      setProjects(await getProjects());
    })();
  }, [getProjects]);

  const projectLinks = projects.map((project) => (
    <li key={project.id}>
      <Link to={`/project/${project.id}`}>{project.name}</Link>
    </li>
  ));
  return (
    <div>
      <h1>Project List</h1>
      <ul>{projectLinks}</ul>
    </div>
  );
}
