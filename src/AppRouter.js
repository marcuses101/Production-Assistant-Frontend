import React from 'react'
import {Route,Switch} from 'react-router-dom'
import { AddProjectForm } from './AddProjectForm'
import {ProjectList} from './ProjectList'
import { ProjectRouter } from './ProjectRouter'

export function AppRouter() {
  return (
      <Switch>
        <Route path='/project/add' component={AddProjectForm}/>
        <Route path='/project/:projectId' component={ProjectRouter}/>
        <Route path='/project' component={ProjectList}/>
        <Route path='/' component={ProjectList}/>
      </Switch>
  )
}
