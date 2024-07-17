import { useGetAllUsers, useGetCurrentUser } from '@/lib/react-query/queriesAndMutation'
import { Models } from 'appwrite';
import people from '../../public/assets/icons/people.svg'
import Loader from '@/lib/shared/Loader';
import UserCard from '@/lib/shared/UserCard';
import IconWithHeading from '@/lib/shared/IconWithHeading';


const People = () => {

 const {data : allUsers , isLoading : usersLoading , isRefetching} = useGetAllUsers();
 const {data : currentUser , isLoading: currentUserLoading } = useGetCurrentUser();

 if(usersLoading || currentUserLoading || isRefetching){
  return (<div className='flex justify-center items-center w-full h-screen'>
          <Loader width={30}/>
         </div>)
 }

//  console.log(currentUser)

 //current user should not show in all users
 let filterUsers = allUsers?.documents.filter((user : Models.Document) => user.$id !== currentUser?.$id)

  return (
    <div className='flex flex-1 flex-col overflow-y-scroll no-scrollbar'>
      <IconWithHeading image={people} heading='All'/>
      <div className='flex w-full justify-center mt-5'>
        <div className='flex w-full pl-[8%] sm:pl-[0%] sm:w-[90%] flex-wrap sm:gap-[5%]'>
          {
            filterUsers?.map((user : Models.Document) => {

              return <UserCard key= {user?.$id} user={user} currentUser={currentUser} />
            })
          }
        </div>
      </div>
    </div>
  )

}

export default People