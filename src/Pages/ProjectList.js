import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProjectServices } from "../Hooks/useProjectServices";
import {useUserServices} from '../Hooks/useUserServices'
export function ProjectList() {
  const [projects, setProjects] = useState([]);
  const projectServices = useProjectServices();
  const { logout } = useUserServices();

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
    <section className='ProjectList'>
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
    </section>
    </main>
  );
}
