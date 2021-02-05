import {createContext} from 'react'

export const MainContext = createContext({
  isDemo:null,
  demoData:{},
  demoDispatch(){}
})