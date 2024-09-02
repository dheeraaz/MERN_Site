import React from 'react'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import AppLayout from './Layout/AppLayout.jsx'
import { About, Contact, Home, Login, Services, Signup, Error, AdminUsers, AdminContact, AdminEdit, AdminNavigation } from './Pages'
import AdminLayout from './Layout/AdminLayout.jsx'


const myRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<AppLayout />}>
      <Route path='' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='services' element={<Services />} />
      <Route path='contact' element={<Contact />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='admin' element={<AdminLayout />}>
        <Route path='' element={<AdminNavigation />} />
        <Route path='users' element={<AdminUsers />} />
        <Route path = 'users/edit/:editId' element={<AdminEdit/>}/>
        <Route path='contact' element={<AdminContact />} />
      </Route>
      <Route path='*' element={<Error />} />
    </Route>
  )
)

const App = () => {
  return <RouterProvider router={myRouter}></RouterProvider>
}

export default App