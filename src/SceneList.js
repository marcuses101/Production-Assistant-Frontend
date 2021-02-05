import React from "react";
import { useScenes } from "./Hooks/useScenes";

export function SceneList() {
  const scenes = useScenes();
  const listItems = Object.values(scenes).map((scene) => (
    <li key={scene.id}>{scene.name}</li>
  ));
  return (
    <>
      <h1>Scene List</h1>
      <ul>{listItems}</ul>
    </>
  );
}
