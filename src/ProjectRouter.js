import React, { useEffect, useState } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { EditProjectForm } from "./EditProjectForm";
import { AddItemForm } from "./AddItemForm";
import { EditItemForm } from "./EditItemForm";
import { ProjectDashboard } from "./ProjectDashboard";
import { AddSceneForm } from "./AddSceneForm";
import EditSceneForm from "./EditSceneForm";
import { ItemList } from "./ItemList";
import { Sidenav } from "./Sidenav";
import "./ProjectRouter.css";
import { useProjectServices } from "./Hooks/useProjectServices";
import { useParamsProjectId } from "./Hooks/useParamsProjectId";
import { ShoppingList } from "./ShoppingList";

export function ProjectRouter() {
  const { path } = useRouteMatch();
  const projectId = useParamsProjectId();
  const projectServices = useProjectServices();
  const [project, setProject] = useState({});

  useEffect(() => {
    (async () => {
      console.log("getProject");
      setProject(await projectServices.getProjectById(projectId));
    })();
  }, [projectId]);

  return (
    <div className="ProjectRouter">
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
              editProject={(project) =>
                setProject((state) => ({ ...state, ...project }))
              }
            />
          </Route>
          <Route path="/project/:projectId" component={ProjectDashboard}>
            <ProjectDashboard project={project} setProject={setProject} />
          </Route>
        </Switch>
      </main>
    </div>
  );
}
