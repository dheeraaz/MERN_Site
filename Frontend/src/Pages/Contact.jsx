import React, { useEffect, useState } from 'react'
import { useGlobalAppContext } from '../context/AppContext'
import { contactAPI } from '../constants/apiURLS';

import { toast } from 'react-toastify';


const Contact = () => {
  const { userDetails } = useGlobalAppContext();
  const [contact, setContact] = useState({
    username: userDetails?.username || "",
    email: userDetails?.email || "",
    message: ""
  })

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(contactAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
        credentials: "include"
      })

      const actualResponse = await response.json();

      if (response.ok) {
        toast.success(actualResponse.message);
        setContact({ ...contact, message: "" })
      } else {
        toast.error(actualResponse?.errors ? actualResponse?.errors[0].message : actualResponse?.message || "unknown error")
      }
    } catch (error) {
      console.error(error)
    }

  }

  useEffect(() => {
    setContact({
      username: userDetails?.username || "",
      email: userDetails?.email || "",
      message: contact.message
    });
  }, [userDetails]);

  return (
    <>
      <section className='flex justify-between items-center'>
        <aside className='w-1/2'>
          <img src="/images/contact.svg" alt="contact_page_image" />
        </aside>
        <aside className='flex-1'>
          <h2 className='px-4 my-2 text-5xl font-poppins'><span className='border-b-4 border-blue-500'>Contact</span> Us</h2>
          <form action="" onSubmit={handleSubmit} className='w-full p-4 flex flex-col gap-3'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="_username" className=' cursor-pointer'>Full Name:</label>
              <input type="text" name='username' value={contact.username} onChange={handleChange} required id='_username' autoComplete='off' placeholder='Enter Your Name' className='bg-slate-500 p-2 rounded-md outline-none border-2 border-transparent focus:border-2 focus:border-blue-400' />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="_email" className=' cursor-pointer'>Email:</label>
              <input type="email" name='email' value={contact.email} onChange={handleChange} required id='_email' autoComplete='off' placeholder='Enter Your Email' className='bg-slate-500 p-2 rounded-md outline-none border-2 border-transparent focus:border-2 focus:border-blue-400' />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="_message" className=' cursor-pointer'>Message:</label>
              <textarea name="message" value={contact.message} onChange={handleChange} required id="_message" placeholder='Write Your Message Here' className='bg-slate-500 h-40 p-2 rounded-md outline-none border-2 border-transparent focus:border-2 focus:border-blue-400'></textarea>
            </div>
            <div className='flex justify-end'>
              <button type="submit" className='border-2 border-blue-400 w-fit px-4 py-2 rounded-md hover:bg-blue-400'>Message</button>
            </div>
          </form>
        </aside>
      </section>

      <section className='w-full h-80 rounded-md mb-8'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.623852422059!2d85.32131857481478!3d27.698018325904002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a5a17cf095%3A0xae7d89f50454f655!2sSingha%20Durbar!5e0!3m2!1sen!2snp!4v1724396703574!5m2!1sen!2snp" className=' border-none w-full h-full rounded-md' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </section>
    </>

  )

}

export default Contact