export const PROJECT_ACTIONS = {
  LOAD_PROJECT: "load_project",
  ADD_SCENE: "add_scene",
  EDIT_SCENE: "edit_scene",
  REMOVE_SCENE: 'remove_scene'
};

export function projectReducer(state, action) {
  switch (action.type) {
    case PROJECT_ACTIONS.ADD_SCENE: {
      const scene = action.payload;
      return { ...state, scenes: { ...state.scenes, [scene.id]: { ...scene } } };
    };
    case PROJECT_ACTIONS.EDIT_SCENE:{
      const scene = action.payload;
      return { ...state, scenes: { ...state.scenes, [scene.id]: { ...scene } } };
    }
    case PROJECT_ACTIONS.REMOVE_SCENE:{
      const id = action.payload
      const newScenes = {...state.scenes};
      delete newScenes[id];
      return {...state,scenes:newScenes};
    }
    default:
      return state;
  }
}
