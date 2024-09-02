import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminHeader = () => {
  const navlinkCallback = ({ isActive }) => {
    return `px-8 py-2 rounded-md ${isActive ? 'bg-gray-500' : 'hover:bg-gray-400 '}`
  }
  return (
    <nav className='flex flex-col gap-8'>
      <NavLink to='/admin/users' className={navlinkCallback}>Users</NavLink>
      <NavLink to='/admin/contact' className={navlinkCallback}>Contact</NavLink>
    </nav>
  )
}

export default AdminHeader