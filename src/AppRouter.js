import React from 'react'
import {Route,Switch} from 'react-router-dom'
import { AddProjectForm } from './AddProjectForm'
import {ProjectList} from './ProjectList'
import {EditProjectForm} from './EditProjectForm'
import { ProjectLanding } from "./ProjectLanding";
import { SceneList } from './SceneList'
import { AddSceneForm } from './AddSceneForm'
import EditSceneForm from './EditSceneForm'
import { ItemList } from './ItemList'

export function AppRouter() {
  return (
      <Switch>

        <Route path='/project/:projectId/scene/add' component={AddSceneForm}/>
        <Route path='/project/:projectId/scene' component={SceneList}/>
        <Route path='/project/:projectId/scene/edit/:sceneId' component={EditSceneForm}/>

        <Route path='/project/:projectId/item' component={ItemList}/>
        <Route path='/project/add' component={AddProjectForm}/>
        <Route path='/project/edit/:projectId' component={EditProjectForm}/>
        <Route path='/project/:projectId' component={ProjectLanding}/>
        <Route path='/project' component={ProjectList}/>
        <Route path='/' component={ProjectList}/>

      </Switch>
  )
}
