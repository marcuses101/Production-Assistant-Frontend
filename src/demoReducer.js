import {v4 as uuid} from 'uuid'

export const DEMO_ACTIONS= {
  PROJECT_ADD: 'PROJECT_ADD'
}


export function demoReducer(state,action){
  switch (action.type) {
    case DEMO_ACTIONS.PROJECT_ADD:{
      const newProject = action.payload;
      newProject.id = uuid();
      return {...state,
        projects: [...state.projects,newProject]
      }
    }
    default:
     return state;
  }
}