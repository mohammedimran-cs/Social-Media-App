import { useEffect, useState } from 'react'
import { useFollowUser } from '../react-query/queriesAndMutation'
import Loader from './Loader'
import { Models } from 'appwrite'

type FollowBtnProps = {
    currentUser?: Models.Document | null,
    selectedUser?: Models.Document | null,
}

const FollowBtn = ({currentUser , selectedUser} : FollowBtnProps) => {

    const {mutateAsync: followUser , isPending} = useFollowUser();

    const handleClick = () => followUser({currentUser: currentUser  , selectedUser: selectedUser})

    const [isFollowing , setIsFollowing] = useState<boolean>(false);

    useEffect(() => {
        const isFollowingUser = currentUser?.following.includes(selectedUser?.$id);
            setIsFollowing(isFollowingUser);
    },[currentUser])


  return (<>
           {isFollowing ? (<h2 className='text-sm md:text-lg'>Following</h2>) : (<button className={`bg-primary-500 rounded-md px-4 py-1 sm:px-7 sm:py-2  text-sm md:text-lg flex gap-2 items-center ${(isPending) && 'pointer-events-none'}`} onClick={handleClick} >{isPending && <Loader/>}Follow</button>)}
          </>
         )
}

export default FollowBtn