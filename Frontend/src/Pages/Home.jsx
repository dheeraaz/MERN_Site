import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalAppContext } from '../context/AppContext';

const Home = () => {
  const navigate = useNavigate();
  const {userDetails} = useGlobalAppContext()
  
  return (
    <>
      <section className='grid grid-cols-2 items-center'>
        <aside className='flex flex-col'>
          <h3 className='text-lg text-gray-400 border-b-[1px] border-gray-400 w-fit'>we are best at what we offer!!!</h3>
          <h1 className='mt-3 text-5xl font-inter'>Welcome to Home Page of XYZ Company {userDetails?.username && <span className='text-blue-400'>,{userDetails?.username}</span>}</h1>
          <p className='mt-5 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae vel recusandae minima. Sint hic amet, architecto pariatur enim blanditiis magni. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nihil quam suscipit numquam nemo fugiat. Exercitationem atque tenetur facere odio fugit? Fugiat nulla quisquam voluptas reiciendis ea maxime, perspiciatis dolores tempora quae amet, distinctio accusantium, doloremque beatae ut culpa blanditiis.</p>

          <div className='flex gap-4 mt-3'>
            <button onClick={() => navigate('/contact')} className='bg-blue-500 rounded-md px-4 py-2 border-2 border-transparent hover:bg-transparent hover:border-blue-500'>Contact Us</button>
            <button onClick={() => navigate('about')} className='rounded-md px-4 py-2 border-2 border-blue-500 hover:bg-blue-500 hover:border-transparent'>Learn More</button>
          </div>
        </aside>
        <aside className=''>
          <img src="/images/home.svg" alt="" />
        </aside>
      </section>

      <section className='bg-white text-black flex justify-between rounded-md px-6 py-3 mb-10'>
        <div className='text-center border-r-[2px] border-gray-700 p-4 w-1/4'>
          <h4 className='text-4xl font-semibold'>50+</h4>
          <p className='text-base text-gray-600 font-medium'>Registered Companies</p>
        </div>
        <div className='text-center border-r-[2px] border-gray-700 p-4 w-1/4'>
          <h4 className='text-4xl font-semibold'>1000+</h4>
          <p className='text-base text-gray-600 font-medium'>Happy Clients</p>
        </div>
        <div className='text-center border-r-[2px] border-gray-700 p-4 w-1/4'>
          <h4 className='text-4xl font-semibold'>500+</h4>
          <p className='text-base text-gray-600 font-medium'>Experienced Developers</p>
        </div>
        <div className='text-center p-4 w-1/4'>
          <h4 className='text-4xl font-semibold'>24/7</h4>
          <p className='text-base text-gray-600 font-medium'>Services</p>
        </div>
      </section>
    </>
  )
}

export default Home