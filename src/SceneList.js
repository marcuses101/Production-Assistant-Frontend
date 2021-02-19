import React from "react";
import { Link } from "react-router-dom";

export function SceneList({ projectId, scenes = [] }) {
  const sceneItems = scenes?.map((scene) => (
    <li key={scene.id}>
      <Link to={`/project/${projectId}/scene/edit/${scene.id}`}>
        {scene.name}
      </Link>
    </li>
  ));

  return (
    <section className="SceneList">
      <h2>Scene List</h2>
      <ul>
        {sceneItems}
        <li key="add">
          <Link to={`/project/${projectId}/scene/add`}>+ Add Scene</Link>
        </li>
      </ul>
    </section>
  );
}
