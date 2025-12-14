import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import "./HeaderCss.css"
import { GlobalState } from '../App'

const MainLayout = () => {
  const { count } = useContext(GlobalState);
  
  return (
    <>
      <div className='HeaderComponent'>
        <Header style={{padding:"20px 20px"}}/>
      </div>
      <Outlet/>
      <Footer />
    </>
  )
}

export default MainLayout