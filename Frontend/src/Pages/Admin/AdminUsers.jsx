import React, { useEffect, useState } from 'react'
import { getAllUsersAPI, deleteUserAPI } from '../../constants/apiURLS.js'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'


const AdminUsers = () => {
  const [users, setUsers] = useState([])

  const getAllUsers = async () => {
    try {
      const response = await fetch(getAllUsersAPI, {
        method: "GET",
        credentials: "include",
      })

      if (response.ok) {
        const data = await response.json();
        setUsers(data.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAllUsers();
  }, [])

  // deleting the user

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${deleteUserAPI}/${id}`, {
        method: "DELETE",
        credentials: "include"
      })

      const deletedUser = await response.json();

      if (response.ok) {
        // calling getALLUsers again, tu update users in UI
        getAllUsers();
        toast.success(`Successfully Deleted: ${deletedUser?.data?.username.split(" ")[0]}`)
      } else {
        toast.error(deletedUser.message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='w-full'>

      {users.length > 0 ? (<table className='w-full bg-gray-400 text-black rounded-md flex flex-col p-4'>
        <thead className='border-b-2 border-white'>
          <tr className='w-full flex justify-between gap-4'>
            <th className='text-left w-full'>Name</th>
            <th className='text-left w-full'>Email</th>
            <th className='text-left w-full'>Phone</th>
            <th className='text-left min-w-[120px]'>Update</th>
            <th className='text-left min-w-[120px]'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) =>
            <tr key={index} className='mt-2 w-full flex items-center justify-between gap-4 h-[40px] border-b-[1px] hover:rounded-md border-gray-300 hover:bg-gray-300'>
              <td className='w-full'>{user.username}</td>
              <td className='w-full'>{user.email}</td>
              <td className='w-full'>{user.phone}</td>
              <td className='min-w-[120px]'><Link to={`/admin/users/edit/${user._id}`} className='px-4 py-1 bg-yellow-400 rounded-md border-2 border-transparent text-white hover:border-yellow-400 hover:bg-transparent hover:text-black hover:font-semibold'>Edit</Link></td>
              <td className='min-w-[120px]'> <button onClick={() => deleteUser(user._id)} className='px-4 py-1 bg-red-600 rounded-md border-2 border-transparent text-white hover:border-red-600 hover:bg-transparent hover:text-black hover:font-semibold'>Delete</button> </td>
            </tr>
          )}
        </tbody>
      </table>) : (
        <div className='flex justify-center py-20'>
          <p className='text-2xl bg-gray-600 p-4 rounded-md'>No Users are Available</p>
        </div>
      )}

    </div>
  )
}

export default AdminUsers