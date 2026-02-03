
import './App.css'
import React from 'react'

import { RouterProvider } from "react-router-dom"
import router from './components/Routes'
import Snowfall from 'react-snowfall'

function App() {

  return (
    <>
    <Snowfall color="navy" 
    style={{
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    
  }}
/>
      <RouterProvider router={router} />





    </>
  )
}

export default App;
