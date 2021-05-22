import React, {useEffect, useState} from "react";
import { getNumberOfDays, toDateString } from "../utils";
import {Link} from 'react-router-dom';
import {useParamsProjectId} from '../Hooks/useParamsProjectId'
import { useItemServices } from "../Hooks/useItemServices";

export function SceneInfo({ scenes = []}) {
  const today = toDateString();
  const projectId = useParamsProjectId();
  const itemServices = useItemServices();
  const [sceneItems, setSceneItems] = useState([])

  // Find the next scene to film
  const nextScene = scenes.reduce((closestScene, currentScene) => {
    const daysUntilClosestScene = getNumberOfDays(today, closestScene.date);
    const daysUntilCurrentScene = getNumberOfDays(today, currentScene.date);
    if (isNaN(daysUntilClosestScene)) {
      return currentScene;
    }
    if (daysUntilCurrentScene < 0) return closestScene;
    return daysUntilClosestScene < daysUntilCurrentScene
      ? closestScene
      : currentScene;
  }, {});
  const daysUntil = getNumberOfDays(today, nextScene.date);

  useEffect(()=>{
    (async()=>{
      try{
        const sceneItems = await itemServices.getSceneItems(nextScene.id);
        setSceneItems(sceneItems);

      }catch(e){
        console.log(e);
        setSceneItems([]);
      }
    })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[scenes, nextScene.id])
  const allItemsAcquired = sceneItems?.every(({acquired})=>acquired);
  const numberItemsUnAcquired = sceneItems?.reduce((numberUnAcquired,item)=>!item.acquired?++numberUnAcquired:numberUnAcquired,0);
  const itemSection = (sceneItems.length === 0)
    ? <>No items associated with this scene. <Link to={`/project/${projectId}/item/add`} className='reset'>Add Item?</Link></>
    : (allItemsAcquired)
    ? <>All items <strong>acquired</strong>. Ready to film!</>
    : <><strong>{numberItemsUnAcquired}</strong> items left to acquired. Go to <Link className='reset' to={`/project/${projectId}/item`}>Shopping List</Link>?</>;

  return (
    <section className="SceneInfo">
      <h2>Upcoming Scene Info</h2>
      <p>
        <Link className="reset" to={`/project/${projectId}/scene/edit/${nextScene.id}`}>{nextScene.name}</Link> shoots
        {daysUntil===0? <strong> today</strong>:<> in <strong>{daysUntil}</strong> days</>}
      </p>
      <p>
        {itemSection}
      </p>
    </section>
  );
}
