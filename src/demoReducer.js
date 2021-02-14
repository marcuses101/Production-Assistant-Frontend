export const DEMO_ACTIONS = {
  PROJECT_ADD: "PROJECT_ADD",
  PROJECT_EDIT: "PROJECT_EDIT",
  PROJECT_REMOVE: "PROJECT_REMOVE",

  SCENE_ADD: "SCENE_ADD",
  SCENE_EDIT: "SCENE_EDIT",
  SCENE_REMOVE: "SCENE_REMOVE",
  SCENE_ADD_ITEM: "SCENE_ADD_ITEM",
  SCENE_REMOVE_ITEM: "SCENE_REMOVE_ITEM",

  ITEM_ADD: "ITEM_ADD",
  ITEM_EDIT: "ITEM_EDIT",
  ITEM_REMOVE: "ITEM_REMOVE",

  ACQUISITION_ADD: 'ACQUISITION_ADD',
  ACQUISITION_REMOVE: 'ACQUISITION_REMOVE',
  ACQUISITION_EDIT: 'ACQUISITION EDIT'
};

export function demoReducer(state, { type, payload }) {
  switch (type) {

    //Project actions
    case DEMO_ACTIONS.PROJECT_ADD: {
      const newProject = payload;
      return { ...state, projects: [...state.projects, newProject] };
    }

    case DEMO_ACTIONS.PROJECT_EDIT: {
      const projectToUpdate = payload;
      const { id } = projectToUpdate;
      return {
        ...state,
        projects: state.projects.map((project) =>
          id.toString() === project.id.toString() ? projectToUpdate : project
        ),
      };
    }

    case DEMO_ACTIONS.PROJECT_REMOVE: {
      const id = payload;
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project.id.toString() !== id.toString()
        ),
      };
    }
    //scene actions
    case DEMO_ACTIONS.SCENE_ADD: {
      const newScene = payload;
      return { ...state, scenes: [...state.scenes, newScene] };
    }

    case DEMO_ACTIONS.SCENE_EDIT: {
      const sceneToUpdate = payload;
      const { id } = sceneToUpdate;
      return {
        ...state,
        scenes: state.scenes.map((scene) =>
          id.toString() === scene.id.toString()
            ? { ...scene, ...sceneToUpdate }
            : scene
        ),
      };
    }

    case DEMO_ACTIONS.SCENE_REMOVE: {
      const id = payload;
      return {
        ...state,
        scenes: state.scenes.filter(
          (scene) => scene.id.toString() !== id.toString()
        ),
      };
    }

    case DEMO_ACTIONS.SCENE_ADD_ITEM: {
      const { itemId, sceneId } = payload;
      return {
        ...state,
        scenes: state.scenes.map((scene) =>
          scene.id.toString() === sceneId.toString()
            ? { ...scene, items: [...scene.items, itemId] }
            : scene
        ),
      };
    }

    case DEMO_ACTIONS.SCENE_REMOVE_ITEM: {
      const { itemId, sceneId } = payload;
      return {
        ...state,
        scenes: state.scenes.map((scene) =>
          scene.id.toString() === sceneId.toString()
            ? { ...scene, items: scene.items.filter((id) => id === itemId) }
            : scene
        ),
      };
    }
    //item actions
    case DEMO_ACTIONS.ITEM_ADD: {
      const newItem = payload;
      return {
        ...state,
        items: [...state.items, newItem],
      };
    }

    case DEMO_ACTIONS.ITEM_EDIT: {
      const itemToUpdate = payload;
      const { id } = itemToUpdate;
      return {
        ...state,
        items: state.items.map((item) =>
          item.id.toString() === id.toString() ? itemToUpdate : item
        ),
      };
    }

    case DEMO_ACTIONS.ITEM_REMOVE: {
      const id = payload;
      return {
        ...state,
        scenes: state.scenes.map((scene) => ({
          ...scene,
          items: scene.items.filter(
            (item) => item.id.toString() !== id.toString()
          ),
        })),
        items: state.items.filter(
          (item) => item.id.toString() === id.toString()
        ),
      };
    }

    //acquisition actions
    case DEMO_ACTIONS.ACQUISITION_ADD: {
      return {
        ...state,
        acquisitions: [...state.acquisitions,payload]
      }
    }

    case DEMO_ACTIONS.ACQUISITION_REMOVE:{
      const idToRemove = payload
      return {
        ...state,
        acquisitions: state.acquisitions.filter(({id})=>id.toString()!==idToRemove.toString())
      }
    }

    case DEMO_ACTIONS.ACQUISITION_EDIT:{
      const {id} = payload
      return {
        ...state,
        acquisitions: state.acquisitions.map(acquisition=>acquisition.id.toString()===id.toString()?{...acquisition,...payload}:acquisition)
      }
    }
    default:
      return state;
  }
}
