import React from 'react'
import Header from '../Components/Header'
import Sidebar from '../Components/SideBar'
import { DrawerProvider } from '../Components/Side-Bar-Context'
// import Poper from '../Components/Poper'
import Notes from '../Components/Notes'
import {Outlet} from 'react-router-dom';
function FunDoo() {
  return (
    <>
    <DrawerProvider>
    <Header/>
    <Sidebar/>
   <Outlet/>
    
    </DrawerProvider>
  
    </>
  )
}

export default FunDoo
