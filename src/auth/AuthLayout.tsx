import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import myImage from '../../public/assets/images/side-img.svg'
import { useUserContext } from '@/context/AuthProvider'

const AuthLayout = () => {

  const { isAuthenticated } = useUserContext();
  return (
      <>
          { isAuthenticated ? <Navigate to={'/'} /> : 
            <>
                <section className='flex xl:w-1/2 w-full justify-center items-center
                py-10 flex-col bg-black'>
                    <Outlet />
                </section>
                <img src={myImage} alt='My Image' 
                className='hidden xl:block h-screen object-cover bg-no-repeat w-1/2 ' />
            </>
          }
    </>
  )
}

export default AuthLayout