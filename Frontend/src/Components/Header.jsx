import React from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useGlobalAppContext } from '../context/AppContext'
import { LuLogOut } from "react-icons/lu";
import { logoutAPI } from '../constants/apiURLS';

import { toast } from 'react-toastify';

const Header = () => {
    const navigate = useNavigate()

    const navlinkCallback = ({ isActive }) => {
        return `hover:text-blue-400 ${isActive ? 'text-blue-400 border-b-2 border-blue-400' : 'text-white'}`
    }
    const { isLoggedIn, setIsLoggedIn, userDetails, setUserDetails } = useGlobalAppContext();

    const handleLogout = async () => {
        try {
            const respone = await fetch(logoutAPI, {
                method: "POST",
                credentials: "include",
            })

            if (respone.ok) {
                setIsLoggedIn(false);
                toast.success("User Logged Out Successfully")
                setUserDetails({});
                navigate('/login');

            }

        } catch (error) {
            console.error(error)
        }
    }


    return (
        <header className='flex justify-center'>
            <div className='container flex justify-between items-center py-2 border-b-[1px] border-[#a7aba8]'>
                <div>
                    <Link to='/' className='p-[2px] text-3xl bg-gradient-to-br from-blue-400 via-purple-500  to-pink-400 inline-block text-transparent bg-clip-text'>Logo.</Link>
                </div>
                <nav className='flex gap-4'>
                    <NavLink to='/' className={navlinkCallback}>Home</NavLink>
                    <NavLink to='/about' className={navlinkCallback}>About</NavLink>
                    <NavLink to='/services' className={navlinkCallback}>Services</NavLink>
                    <NavLink to='/contact' className={navlinkCallback}>Contact</NavLink>
                    {userDetails?.isAdmin &&
                        (<NavLink to='/admin/users' className={navlinkCallback}>Admin</NavLink>)
                    }

                    {isLoggedIn ? (<button onClick={handleLogout}><LuLogOut size={20} className='hover:text-blue-400' /></button>) :
                        (
                            <>
                                <NavLink to='/login' className={navlinkCallback}>Login</NavLink>
                                <NavLink to='/signup' className={navlinkCallback}>Signup</NavLink>
                            </>
                        )
                    }


                </nav>
            </div>
        </header>
    )
}

export default Header