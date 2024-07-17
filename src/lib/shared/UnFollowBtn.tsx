import { useEffect, useState } from 'react'
import { useUnFollowUser } from '../react-query/queriesAndMutation'
import Loader from './Loader'
import { Models } from 'appwrite'

type FollowBtnProps = {
    currentUser?: Models.Document | null,
    selectedUser?: Models.Document | null
}

const UnFollowBtn = ({currentUser , selectedUser} : FollowBtnProps) => {

    const {mutateAsync: unFollowUser , isPending} = useUnFollowUser();

    const handleClick = () => unFollowUser({currentUser: currentUser  , selectedUser: selectedUser})

    const [isUnFollowing , setIsUnFollowing] = useState<boolean>(false);

    useEffect(() => {
        const isFollowingUser = currentUser?.following.includes(selectedUser?.$id);
        setIsUnFollowing(isFollowingUser);
    },[currentUser])


  return (<>
            {isUnFollowing && <button className={`bg-dark-4 text-orange-300 rounded-md px-4 py-1 sm:px-7 sm:py-2  text-sm md:text-lg flex gap-2 items-center ${ isPending && 'pointer-events-none'}`} onClick={handleClick} >{isPending && <Loader/>}UnFollow</button>}
          </>
         )
}

export default UnFollowBtn