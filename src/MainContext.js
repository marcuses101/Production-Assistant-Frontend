import {createContext} from 'react'

export const MainContext = createContext({
  isDemo:false,
  demoData:{},
  demoDispatch(){},
  setIsDemo(){},
  setIsLoggedIn(){}
})