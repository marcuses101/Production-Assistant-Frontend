import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { EditProjectForm } from "../Pages/EditProjectForm";
import { AddItemForm } from "../Pages/AddItemForm";
import { EditItemForm } from "../Pages/EditItemForm";
import { ProjectDashboard } from "../Pages/ProjectDashboard";
import { AddSceneForm } from "../Pages/AddSceneForm";
import {EditSceneForm} from "../Pages/EditSceneForm";
import { Sidenav } from "./Sidenav";
import { useProjectServices } from "../Hooks/useProjectServices";
import { useParamsProjectId } from "../Hooks/useParamsProjectId";
import { ShoppingList } from "../Pages/ShoppingList";
import { NavButton } from './NavButton'
import "./ProjectRouter.css";

export function ProjectRouter() {
  const {push} = useHistory()
  const { path } = useRouteMatch();
  const projectId = useParamsProjectId();
  const projectServices = useProjectServices();
  const [project, setProject] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const project = await projectServices.getProjectById(parseInt(projectId))
        setProject(project);
      } catch (error) {
        push('/')
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  function handleNav(e){
   const sidenav = e.target.closest('.Sidenav');
   const root = document.getElementById('root');
   if (!sidenav && root.classList.contains('open')){
    e.stopPropagation()
   }
   if (sidenav && !['A', 'BUTTON'].includes(e.target.tagName)) {
    return root.classList.replace("closed",'open');
   }
    return root.classList.replace('open', 'closed');
  }

  return (
    <div className="ProjectRouter" onClick={handleNav}>
      <NavButton/>
      <Sidenav />
      <main className="Project">
        <h1>{project?.name}</h1>
        <Switch>
          <Route path={`${path}/scene/add`} component={AddSceneForm} />
          <Route
            path="/project/:projectId/scene/edit/:sceneId"
            component={EditSceneForm}
          />
          <Route path="/project/:projectId/item/add">
            <AddItemForm projectId={project?.id} />
          </Route>
          <Route path="/project/:projectId/item/:itemId/edit">
            <EditItemForm projectId={projectId} />
          </Route>
          <Route path="/project/:projectId/item" >
            <ShoppingList projectId={projectId}/>
          </Route>
          <Route path="/project/:projectId/edit">
            <EditProjectForm
              project={project}
              editProject={(project) =>
                setProject((state) => ({ ...state, ...project }))
              }
            />
          </Route>
          <Route path="/project/:projectId">
            <ProjectDashboard project={project} setProject={setProject} />
          </Route>
        </Switch>
      </main>
    </div>
  );
}
