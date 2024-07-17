import { useGetCurrentUser, useGetUserById } from '@/lib/react-query/queriesAndMutation';
import FollowersAndUnfollow from '@/lib/shared/FollowersAndUnfollow';
import Loader from '@/lib/shared/Loader';
import ProfileStats from '@/lib/shared/ProfileStats';
import { Models } from 'appwrite';
import { Link, useParams } from 'react-router-dom';
import edit from '../../public/assets/icons/edit.svg'
import TabsForPosts from '@/lib/shared/TabsForPosts';
import profile from '../../public/assets/icons/profile-placeholder.svg'
import { useEffect } from 'react';


const Profile = () => {

  const {id} = useParams();

  // console.log('render in id' ,id)

  const {data : user , isPending : isUserLoading , isRefetching} = useGetUserById(id);
  const {data : currentUser , isPending} = useGetCurrentUser();

  useEffect(() => {

  },[currentUser])

  if(isUserLoading || isPending ){
    return (<div className='flex justify-center items-center w-full h-screen'>
      <Loader width={30}/>
     </div>)
  }

  const userPosts: Models.Document[] = user?.posts;
  const userFollowers: Models.Document[] = user?.followers;
  const userFollowing: Models.Document[] = user?.following;

  const profileStatsData : Models.Document[][] = [];
  profileStatsData.push(userPosts);
  profileStatsData.push(userFollowers);
  profileStatsData.push(userFollowing);

  return (
    <div className='flex flex-1 flex-col sm:px-10 px-2 mt-5 md:mt-10 overflow-y-scroll no-scrollbar mb-3'>
      <div className='flex flex-col items-center md:items-start md:flex-row w-full gap-5'>
        <div className='mt-2'>
            <img src={user?.imageUrl} className='w-[90px] h-[90px] lg:h-[120px] lg:w-[120px] rounded-full object-cover'/>
        </div>
        <div className='flex flex-col md:w-[80%] w-full'>
            <div className='flex flex-col md:flex-row min-h-[70px] md:items-center flex-wrap lg:flex-nowrap  gap-6'>
              <div>
                <h2 className='text-sm md:text-lg text-center md:text-left'>{`${user?.firstName} ${user?.secondName}`}</h2>
                <h2 className='text-light-3 md:text-lg text-sm text-center md:text-left'>{user?.email}</h2>
              </div>
             {currentUser?.$id !== id ? <FollowersAndUnfollow currentUser={currentUser} selectedUser={user} />
               : <div className='flex justify-center items-center'><Link to={`/update-profile/${currentUser?.$id}`}><button className='rounded-md px-4 py-2 sm:px-7 bg-dark-4 text-sm md:text-lg flex gap-2 items-center'><img src= {edit} width={20}/>Profile</button></Link></div> }
            </div>
            <ProfileStats data = {profileStatsData}/>
            <div className='w-full text-center md:text-start'>
              <p className='md:max-w-[800px] mt-5 px-5 md:px-0'>{user?.bio}</p>
            </div>
        </div>
      </div>
      <TabsForPosts data = {profileStatsData}/>
    </div>
  )
}

export default Profile