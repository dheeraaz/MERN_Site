import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { IoReturnDownBackSharp } from "react-icons/io5";
import { editUserAPI, getUserByIdAPI } from '../../constants/apiURLS';
import { toast } from 'react-toastify';

const AdminEdit = () => {
    const { editId } = useParams();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        username: "",
        email: "",
        phone: "",
    })

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${editUserAPI}/${editId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
                credentials:"include"
            })

            const actualResponse = await response.json();

            if(response.ok){
                toast.success(actualResponse.message);
                navigate('/admin');
            }else{
                toast.error(actualResponse?.errors ? actualResponse?.errors[0]?.message : actualResponse?.message || "Error in updating user")
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        ;(async()=>{
            try {
                const response = await fetch(`${getUserByIdAPI}/${editId}`, {
                    method: "GET",
                    credentials: "include"
                } )

                const userData = await response.json();
                if(response.ok){
                    const obtainedData = {
                        username: userData.data.username,
                        email:userData.data.email,
                        phone: userData.data.phone
                    }
                    setUserData(obtainedData);
                }else{
                    toast.error(userData.message)
                }

                // console.log(userData)

            } catch (error) {
                console.error(error)
            }
        })()
    },[])

    return (
        <>
            <Link to='/admin' className = "text-blue-500 hover:animate-pulse"><IoReturnDownBackSharp size={25}/></Link>
            <div className='w-full bg-gray-400 text-black rounded-md flex flex-col p-4 max-w-[600px]'>
                <form action="" onSubmit={handleSubmit} className='w-full p-4 flex flex-col gap-3'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="_username" className=' cursor-pointer'>Full Name:</label>
                        <input type="text" name='username' value={userData.username} onChange={handleChange} required id='_username' autoComplete='off' placeholder='Enter Your Name' className='bg-gray-300 p-2 rounded-md outline-none border-2 border-transparent focus:border-2 focus:border-white' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="_email" className=' cursor-pointer'>Email:</label>
                        <input type="email" name='email' value={userData.email} onChange={handleChange} required id='_email' autoComplete='off' placeholder='Enter Your Email' className='bg-gray-300 p-2 rounded-md outline-none border-2 border-transparent focus:border-2 focus:border-white' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="_phone" className=' cursor-pointer'>Phone:</label>
                        <input type="number" name='phone' value={userData.phone} onChange={handleChange} required id='_phone' autoComplete='off' placeholder='Enter Your Phone Number' className='bg-gray-300 p-2 rounded-md outline-none border-2 border-transparent focus:border-2 focus:border-white' />
                    </div>
                    <div className='flex justify-end'>
                        <button type="submit" className='border-2 border-white w-fit px-4 py-2 rounded-md hover:bg-white text-white hover:text-black font-semibold'>Update</button>
                    </div>
                </form>
            </div>
        </>

    )
}

export default AdminEdit