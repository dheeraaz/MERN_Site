import React from 'react'
import { Footer, Header } from '../Components'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
    return (
        <>
            <div className='min-h-screen flex flex-col text-white'>
                <Header />
                <main className='flex-1 container'>
                    <Outlet />
                </main>
                    <Footer />
            </div>
        </>
    )
}

export default AppLayout