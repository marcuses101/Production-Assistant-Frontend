import {useContext} from 'react'
import {MainContext} from '../MainContext'

export function useScenes(){
  const {project:{scenes}} = useContext(MainContext);
  return scenes;
}