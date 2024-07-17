import React from 'react'
import FollowBtn from './FollowBtn'
import UnFollowBtn from './UnFollowBtn'
import { Models } from 'appwrite'

type FollowersAndUnfollowProps = {
    currentUser?: Models.Document | null,
    selectedUser?: Models.Document | null
}

const FollowersAndUnfollow = ({currentUser , selectedUser} : FollowersAndUnfollowProps) => {
  return (
    <div className='flex justify-center items-center gap-5 flex-wrap'>
        <FollowBtn currentUser={currentUser} selectedUser= {selectedUser}/>
        <UnFollowBtn currentUser={currentUser} selectedUser= {selectedUser}/>
    </div>  
  )
}

export default FollowersAndUnfollow