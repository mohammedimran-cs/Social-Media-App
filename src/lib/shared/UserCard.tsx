import { Models } from 'appwrite'
import FollowBtn from './FollowBtn'
import { Link } from 'react-router-dom'
import { useGetUserById } from '../react-query/queriesAndMutation'
import { useEffect } from 'react'


type UserCardProps = {
    currentUser?: Models.Document | null,
    user?: Models.Document | null
    userId?: string //this userId used for single userProfile stats  refer to TabsForPosts.tsx(component)
}

const UserCard = ({user,currentUser,userId} : UserCardProps) => {

  //this is for Profile.tsx 
  const {data : singleUser , isPending : isUserLoading} = useGetUserById(userId);

  useEffect(() => {

  },[singleUser])

  if(userId){
    if(isUserLoading){
      return <div className='flex justify-center items-center w-full'>
        
      </div>
    }
    return <div className='w-[90%] sm:w-[45%] lg:w-[30%] mb-10 flex flex-col justify-center 
    items-center py-8 rounded-2xl border border-[#2E2D2D] bg-dark-3 space-y-5'>
            <Link to = {`/profile/${singleUser?.$id}`}><img src= {singleUser?.imageUrl} className='rounded-full w-[100px] h-[100px] object-cover'/></Link>
            <Link to = {`/profile/${singleUser?.$id}`}>
              <div className='w-full'>
                <h2 className='text-center'>{`${singleUser?.firstName} ${singleUser?.secondName}`}</h2>
                <h2 className='text-light-3 text-center'>{singleUser?.email}</h2>
              </div>
            </Link>
    </div>
  }

  // this is for people.tsx
  return (
        <div className='w-[90%] sm:w-[45%] lg:w-[30%] mb-10 flex flex-col justify-center 
        items-center py-8 rounded-2xl border border-[#2E2D2D] bg-dark-3 space-y-5'>
                <Link to = {`/profile/${user?.$id}`}><img src= {user?.imageUrl} width={80} className='rounded-full w-[100px] h-[100px] object-cover'/></Link>
                <Link to = {`/profile/${user?.$id}`}>
                  <div className='w-full'>
                    <h2 className='text-center'>{`${user?.firstName} ${user?.secondName}`}</h2>
                    <h2 className='text-light-3 text-center md:text-sm'>{user?.email}</h2>
                  </div>
                </Link>
                <FollowBtn currentUser={currentUser} selectedUser={user} />
        </div>
  )
}

export default UserCard