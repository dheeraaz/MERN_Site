import React from 'react';
import { useGlobalAppContext } from '../context/AppContext';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { AdminHeader } from '../Components';

const AdminLayout = () => {
  const { userDetails, loading } = useGlobalAppContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userDetails?.isAdmin) {
    return <Navigate to='/' />
  }

  return (
    <section className='flex mt-4'>
      <aside className='border-r-2 border-white h-fit pr-4'>
        <AdminHeader />
      </aside>
      <aside className='flex-1 ml-2 h-full'>
        <Outlet />
      </aside>
    </section>
  )

};

export default AdminLayout;
