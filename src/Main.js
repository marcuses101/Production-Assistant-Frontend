import React from 'react'
import { AppRouter } from './AppRouter'
import { LoginRouter } from './LoginRouter'

export  function Main({isLoggedIn,isProjectLoaded,...props}) {

  if (!isLoggedIn) return <LoginRouter/>

  return (
    <AppRouter/>
  )
}
