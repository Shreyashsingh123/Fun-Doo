import React from 'react'
import Header from '../Components/Header'
import Sidebar from '../Components/SideBar'
import { DrawerProvider } from '../Components/Side-Bar-Context'
function FunDoo() {
  return (
    <>
    <DrawerProvider>
    <Header/>
    <Sidebar/>
    </DrawerProvider>
  
    </>
  )
}

export default FunDoo
