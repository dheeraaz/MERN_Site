import React from 'react'
import { useNavigate } from 'react-router-dom'

const About = () => {
  const navigate = useNavigate();
  return (
    <section className='grid grid-cols-2 items-center'>
    <aside className='flex flex-col'>
      <h3 className='text-lg text-gray-400 border-b-[1px] border-gray-400 w-fit'>Welcome, </h3>
      <h1 className='mt-3 text-5xl font-inter'>Why Choose Us?</h1>
      <p className='mt-5 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae vel recusandae minima. Sint hic amet, architecto pariatur enim blanditiis magni. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nihil quam suscipit numquam nemo fugiat. Exercitationem atque tenetur facere odio fugit? Fugiat nulla quisquam voluptas reiciendis ea maxime, perspiciatis dolores tempora quae amet, distinctio accusantium, doloremque beatae ut culpa blanditiis.</p>
      <p className='mt-5 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae vel recusandae minima. Sint hic amet, architecto pariatur enim blanditiis magni. Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nihil quam suscipit numquam nemo fugiat. Exercitationem atque tenetur facere odio fugit? Fugiat nulla quisquam.</p>

      <div className='flex gap-4 mt-3'>
        <button onClick={() => navigate('/contact')} className='bg-blue-500 rounded-md px-4 py-2 border-2 border-transparent hover:bg-transparent hover:border-blue-500'>Contact Us</button>
      </div>
    </aside>
    <aside className=''>
      <img src="/images/about.svg" alt="" />
    </aside>
  </section>
  )
}

export default About