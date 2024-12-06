import React from 'react'
import { Outlet } from 'react-router-dom'
import { AdminHeader, AdminNavbar , AdminSidebar } from '../../components/Admin'

const AdminLayout = () => {
  return (
    <div>
      <AdminHeader />
      <AdminNavbar />
      <AdminSidebar />
      <main className='ml-64'>
        <Outlet /> 
      </main>
      <footer>Admin Footer</footer>
    </div>
  )
}

export default AdminLayout