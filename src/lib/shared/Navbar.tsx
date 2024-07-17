import React, { useEffect } from 'react'
import Logo from '../../../public/assets/images/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import logout from '../../../public/assets/icons/logout.svg'
import profile_placeholder  from '../../../public/assets/icons/profile-placeholder.svg'
import { useUserContext } from '@/context/AuthProvider'
import { useSignOutAccount } from '../react-query/queriesAndMutation'

const Navbar = () => {
    const navigate = useNavigate();
    const {user} = useUserContext();
    const {mutateAsync : signOutAccount , isSuccess} = useSignOutAccount();

   useEffect(() => {
        if(isSuccess){
            navigate(0)
        }
    },[isSuccess])

  return (
    <section className='topbar'>
        <div className='flex justify-between items-center px-5'>
          <Link to={'/'}> <img src= {Logo} className='w-[150px] h-[50px]'/></Link>
           <div className='flex items-center gap-4'>
                <button onClick={() => signOutAccount()}>
                    <img src = {logout} />
                </button>
                <Link to={`/profile/${user.id}`}><img src = {user.imageUrl || profile_placeholder} className='rounded-full h-[30px] w-[30px]'/></Link>
           </div>
        </div>
    </section>
  )
}

export default Navbar