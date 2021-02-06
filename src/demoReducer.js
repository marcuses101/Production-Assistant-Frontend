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
};

export function demoReducer(state, { type, payload }) {
  switch (type) {
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
          id === project.id ? projectToUpdate : project
        ),
      };
    }

    case DEMO_ACTIONS.PROJECT_REMOVE: {
      const id = payload;
      return {
        ...state,
        projects: state.projects.filter((project) => project.id !== id),
      };
    }

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
          id === scene.id ? { ...scene, ...sceneToUpdate } : scene
        ),
      };
    }

    case DEMO_ACTIONS.SCENE_REMOVE: {
      const id = payload;
      return {
        ...state,
        scenes: state.scenes.filter((scene) => scene.id !== id),
      };
    }

    case DEMO_ACTIONS.SCENE_ADD_ITEM: {
      const { itemId, sceneId } = payload;
      return {
        ...state,
        scenes: state.scenes.map((scene) =>
          scene.id === sceneId
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
          scene.id === sceneId
            ? { ...scene, items: scene.items.filter((id) => id === itemId) }
            : scene
        ),
      };
    }

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
          item.id === id ? itemToUpdate : item
        ),
      };
    }

    case DEMO_ACTIONS.ITEM_REMOVE: {
      const id = payload;
      return {
        ...state,
        scenes: state.scenes.map((scene) => ({
          ...scene,
          items: scene.items.filter((item) => item.id !== id),
        })),
        items: state.items.filter((item) => item.id === id),
      };
    }
    default:
      return state;
  }
}
