import React, { useState, useEffect } from 'react'
import { Button } from '@/components/UI/button'
import { OverView, Users } from '../../components/Admin/DashboardCards'
import { Graph } from '../../components/Admin/DashboardCards'
import { axiosAdminUrl } from '../../utils/axiosFetch'



const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [userCount , setUserCount] = useState(0);
  
     const fetchUsers = async () => {
      try {
        const response = await axiosAdminUrl.get("/get-users", {
          withCredentials: true,
        });
        // const data = response.data.data;
        // const count=response.data.count;
        setUserCount(response.data.count);
        setUsers(response.data.data);
        console.log("response is : ",response.data.data)
        console.log("response is : ",response.data.count)
  
  
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    useEffect(() => {
      fetchUsers();
    }, [userCount,users]);
  return (
    <div className='align-elements'>
      <h1>This is Admin Dashboard</h1>
      <div className='flex flex-row gap-5'>
        <OverView title={"Total Users"} number={userCount}/>
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