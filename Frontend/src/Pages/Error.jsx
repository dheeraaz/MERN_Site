import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {
    const navigate = useNavigate();
    return (
        <section className='flex flex-col justify-center items-center mt-28'>
            <h1 className=' font-poppins font-bold text-[160px] bg-gradient-to-r from-purple-500 via-red-400  to-orange-500 inline-block text-transparent bg-clip-text'>404</h1>
            <p className='font-semibold font-inter text-lg'>SORRY! PAGE NOT FOUND</p>
            <p>Oops! It seems like the page you're trying to access doesn't exist. If you believe there's an issue, feel free to report it. and we'll look into it.</p>
            <div className='flex gap-4 mt-3'>
                <button onClick={() => navigate('/')} className='rounded-full px-4 py-2 border-2 border-blue-500 hover:bg-blue-500 hover:border-transparent'>Return Home</button>
                <a href= "mailto: ktyrionlannister321@email.com" target='_blank' className='rounded-full px-4 py-2 border-2 border-blue-500 hover:bg-blue-500 hover:border-transparent'>Report Problem</a>
            </div>
        </section>
    )
}

export default Error