import React from 'react'
import { Outlet } from 'react-router-dom'
import { AdminHeader, AdminNavbar , AdminSidebar } from '../../components/Admin'

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
  {/* Top Navbar */}
  <div className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-white border-b border-gray-200 shadow-sm lg:ml-64">
    <AdminNavbar />
  </div>

  <div className="flex flex-1 pt-[64px]"> {/* Adds padding for fixed navbar */}
    {/* Sidebar */}
    <AdminSidebar />

    {/* Main Content */}
    <main className="flex-1 transition-all duration-300 ml-0 lg:ml-64 p-4">
      <Outlet />
    </main>
  </div>

  {/* Footer */}
  <footer className="text-center py-4 bg-gray-100 border-t">
    Admin Footer
  </footer>
</div>

  )
}

export default AdminLayout