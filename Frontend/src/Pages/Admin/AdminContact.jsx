import React, { useEffect, useState } from 'react'
import { getAllContactsAPI, deleteContactAPI } from '../../constants/apiURLS.js'
import { toast } from 'react-toastify'


const AdminContact = () => {
  const [contacts, setContacts] = useState([])

  const getAllContacts = async () => {
    try {
      const response = await fetch(getAllContactsAPI, {
        method: "GET",
        credentials: "include",
      })

      if (response.ok) {
        const data = await response.json();
        setContacts(data.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAllContacts();
  }, [])

  // deleting the user

  const deleteContact = async (id) => {
    try {
      const response = await fetch(`${deleteContactAPI}/${id}`, {
        method: "DELETE",
        credentials: "include"
      })

      const deletedContact = await response.json();

      if(response.ok){
        // calling getALLcontacts again, tu update contacts in UI
        getAllContacts();
        toast.success(`Successfully Deleted Message`)
      }else{
        toast.error(deletedContact.message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='w-full'>
      {contacts.length > 0 ? (<table className='w-full bg-gray-400 text-black rounded-md flex flex-col p-4'>
        <thead className='border-b-2 border-white'>
          <tr className='w-full flex justify-between gap-4'>
            <th className='text-left w-full'>Name</th>
            <th className='text-left w-full'>Email</th>
            <th className='text-left w-full max-w-[400px]'>Message</th>
            <th className='text-left min-w-[120px]'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) =>
            <tr key={index} className='mt-2 w-full flex items-center justify-between gap-4 max-h-[48px] border-b-[1px] hover:rounded-md border-gray-300 hover:bg-gray-300'>
              <td className='w-full'>{contact.username}</td>
              <td className='w-full'>{contact.email}</td>
              <td className='w-full max-w-[400px] max-h-[36px] overflow-y-scroll _scrollbar'>{contact.message}</td>
              <td className='min-w-[120px]'> <button onClick={() => deleteContact(contact._id)} className='px-4 py-1 bg-red-600 rounded-md border-2 border-transparent text-white hover:border-red-600 hover:bg-transparent hover:text-black hover:font-semibold'>Delete</button> </td>
            </tr>
          )}
        </tbody>
      </table>):(
        <div className='flex justify-center py-20'>
          <p className='text-2xl bg-gray-600 p-4 rounded-md'>No Messages are Available</p>
        </div>
      )}
    </div>
  )
}

export default AdminContact