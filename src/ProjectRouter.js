import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { EditProjectForm } from "./EditProjectForm";
import { AddItemForm } from "./AddItemForm";
import { EditItemForm } from "./EditItemForm";
import { ProjectDashboard } from "./ProjectDashboard";
import { AddSceneForm } from "./AddSceneForm";
import EditSceneForm from "./EditSceneForm";
import {AddAcquisitionForm} from './AddAcquisitionForm'
import { Sidenav } from "./Sidenav";
import "./ProjectRouter.css";
import { useProjectServices } from "./Hooks/useProjectServices";
import { useParamsProjectId } from "./Hooks/useParamsProjectId";
import { ShoppingList } from "./ShoppingList";
import { NavButton } from './NavButton'

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
          <Route path={`${path}/acquisition/add`} component={AddAcquisitionForm}/>
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
