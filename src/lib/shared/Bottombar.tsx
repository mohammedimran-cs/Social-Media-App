import { BottomLinks } from '@/constants'
import { ILinks } from '@/types'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Bottombar = () => {
  const {pathname} = useLocation();
  return (
    <div className='bottom-bar'>
      <ul className='flex justify-between w-full'>
        {
          BottomLinks.map((links : ILinks) => {

            const isActive = pathname === links.link;
            return (
              <Link to={links.link} key={links.label}>
                <li className={`flex flex-col justify-center items-center gap-3 px-5 py-2 rounded-md group hover:bg-primary-500 transition ${isActive && ' bg-primary-500'}`}>
                  <img src= {links.imageURL} className= {`${isActive && 'invert-white'} group-hover:invert-white w-[15px] sm:w-[20px]`}/>
                  <p className='text-[12px] sm:text-sm'>{links.label}</p>
                </li>
              </Link>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Bottombar