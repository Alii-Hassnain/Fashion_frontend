import React from 'react'
import Landing from './Landing'
import { Navbar,Header } from '../components'
import { Outlet } from 'react-router-dom'

const HomeLayout = () => {
  return (
    <div>
      <Header/>
      <Navbar/>
      <div className='align-elements'>
        {/* here the landing will come automaticaly because of the outlet function */}
        <Outlet/> 
      </div>
    </div>


    
  )
}

export default HomeLayout