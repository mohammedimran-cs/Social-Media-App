import React, { useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import logo from '../../../public/assets/images/logo.svg'
import logout from '../../../public/assets/icons/logout.svg'
import profile_placeholder from '../../../public/assets/icons/profile-placeholder.svg'
import { useUserContext } from '@/context/AuthProvider'
import { useGetCurrentUser, useSignOutAccount } from '../react-query/queriesAndMutation'
import { SidebarLinks } from '@/constants'
import { ILinks } from '@/types'

const Sidebar = () => {
  const navigate = useNavigate();
  const {data: user ,isPending} = useGetCurrentUser();
  const {mutateAsync : signOutAccount , isSuccess} = useSignOutAccount();
  const {pathname} = useLocation();

 useEffect(() => {
      if(isSuccess){
          navigate(0)
      }
  },[isSuccess,user])

  return (
    <div className='leftsidebar'>
      <div className='flex flex-col gap-6'>
          <Link to='/'>
              <img src= {logo} width = {170} height={36}/>
          </Link>
          {(!isPending) && <div className='flex items-center gap-3'>
            <Link to={`/profile/${user?.$id}`}><img src= { user?.imageUrl || profile_placeholder } className='rounded-full h-[45px] w-[45px] object-cover' /></Link>
            <div>
              <p className='body-bold'>{user?.firstName + ' ' + user?.secondName}</p>
              <p className='text-light-3'>{user?.email}</p>
            </div>
          </div>}
          <ul className='space-y-6 pt-4'>
           {SidebarLinks.map((links : ILinks) => {
             const isActive = pathname === links.link;
          return (
           <li key={links.label} className={`leftsidebar-link group  ${isActive && 'bg-primary-500 '}`}>
              <NavLink to = {links.link} className= 'flex gap-5 py-2 px-2 items-center'>
                <img src= {links.imageURL} className={`w-[20px] h-[20px] group-hover:invert-white ${isActive && 'invert-white'}`}/>
                <p>{links.label}</p>
              </NavLink>
           </li>
           )}
           )}
          </ul>
      </div>
      <div className='flex pl-2'>
        <button className='flex gap-4' onClick={() => signOutAccount()}>
          <img src= {logout}/>
          <p>Logout</p>
          </button>
      </div>
    </div>
  )
}

export default Sidebar