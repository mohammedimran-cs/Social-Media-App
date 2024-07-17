

import Bottombar from '@/lib/shared/Bottombar'
import Navbar from '@/lib/shared/Navbar'
import Sidebar from '@/lib/shared/Sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='w-full md:flex'>
      <Navbar />
      <Sidebar />
      <section className='h-full flex flex-1'>
        <Outlet />
      </section>
      <Bottombar />
    </div>
  )
}

export default RootLayout