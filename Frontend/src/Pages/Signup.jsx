import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerAPI } from '../constants/apiURLS'
import { useGlobalAppContext } from '../context/AppContext'


import { toast } from 'react-toastify';

const Signup = () => {
  const {isLoggedIn, setIsLoggedIn, setUserDetails} = useGlobalAppContext();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
    password: ""
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(registerAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: 'include', // this is crucial for sending/receiving cookies
      })

      const actualResponse = await response.json();

      if (response.ok) {

        setIsLoggedIn(true);
        setUserDetails(actualResponse.data);

        setUserData({
          username: "",
          email: "",
          phone: "",
          password: ""
        })

        toast.success(actualResponse?.message);
        navigate("/");
      }else{
        toast.error(actualResponse?.errors ? actualResponse?.errors[0].message : actualResponse?.message || "unknown error")
      }

    } catch (error) {
      console.log(error);
    }

  }

  useEffect(()=>{
    if(isLoggedIn){
      navigate('/')
    }
    
  },[isLoggedIn])
  return (
    <section className='flex justify-between items-center'>
      <aside className='w-1/2'>
        <img src="/images/register.svg" alt="register_page_image" />
      </aside>
      <aside className='flex-1'>
        <h2 className='px-4 my-2 text-5xl font-poppins'><span className='border-b-4 border-blue-500'>Registration</span> Form</h2>
        <form action="" onSubmit={handleSubmit} className='w-full p-4 flex flex-col gap-3'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="_username" className=' cursor-pointer'>Full Name:</label>
            <input type="text" name='username' value={userData.username} onChange={handleChange} required id='_username' autoComplete='off' placeholder='Enter Your Name' className='bg-slate-500 p-2 rounded-md outline-none border-2 border-transparent focus:border-2 focus:border-blue-400' />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="_email" className=' cursor-pointer'>Email:</label>
            <input type="email" name='email' value={userData.email} onChange={handleChange} required id='_email' autoComplete='off' placeholder='Enter Your Email' className='bg-slate-500 p-2 rounded-md outline-none border-2 border-transparent focus:border-2 focus:border-blue-400' />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="_phone" className=' cursor-pointer'>Phone:</label>
            <input type="number" name='phone' value={userData.phone} onChange={handleChange} required id='_phone' autoComplete='off' placeholder='Enter Your Phone Number' className='bg-slate-500 p-2 rounded-md outline-none border-2 border-transparent focus:border-2 focus:border-blue-400' />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="_password" className=' cursor-pointer'>Password:</label>
            <input type="password" name='password' value={userData.password} onChange={handleChange} required id='_password' autoComplete='off' placeholder='Enter Your Password' className='bg-slate-500 p-2 rounded-md outline-none border-2 border-transparent focus:border-2 focus:border-blue-400' />
          </div>
          <div className='flex justify-end'>
            <button type="submit" className='border-2 border-blue-400 w-fit px-4 py-2 rounded-md hover:bg-blue-400'>Register</button>
          </div>
        </form>
      </aside>
    </section>
  )
}

export default Signup