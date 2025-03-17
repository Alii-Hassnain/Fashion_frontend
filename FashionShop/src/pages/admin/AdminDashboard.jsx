import React from 'react'
import { Button } from '@/components/UI/button'
import { OverView, Users } from '../../components/Admin/DashboardCards'
import { Graph } from '../../components/Admin/DashboardCards'



const AdminDashboard = () => {
  return (
    <div className='align-elements'>
      <h1>This is Admin Dashboard</h1>
      <div className='flex flex-row gap-5'>
        <OverView title={"Total Users"} number={"6"}/>
        <OverView title={"Total Orders Completed"} number={"15"}/>
        <OverView title={"Active Orders"} number={"6"}/>
        <OverView title={"Cancelled Order"} number={"2"}/>
        
      </div>
      <div className='flex flex-row gap-5 mt-5'>

      <Graph/>
      <Users/>
      </div>

      
    </div>
    
  )
}

export default AdminDashboard