import { Models } from 'appwrite'
import React from 'react'
import PostStats from './PostStats'
import { IUser } from '@/types'
import { Link } from 'react-router-dom'

type postData = {
    post: any,
    user: IUser
}

const SearchList = ({post,user} : postData) => {
  return (
    <div className='w-[100%] sm:w-[95%] flex md:gap-[5%] pb-5 overflow-y-scroll no-scrollbar items-center flex-col md:flex-row md:flex-wrap '>
      {post?.documents.map((data : any) => {
      return (
            <div key={data.$id} className='w-[80%] md:w-[100%] lg:w-[45%] xl:w-[30%] mt-8 space-y-5 rounded-md bg-dark-2 py-4 px-5'>
              <div className='flex gap-3 items-center mb-3'>
                    {data?.creator && <><Link to= {`/profile/${data?.creator?.$id}`}><img src= {data?.creator.imageUrl} className='w-[50px] h-[50px] object-cover rounded-full'/></Link>
                    <h2>{`${data?.creator.firstName} ${data?.creator.secondName}`}</h2></>}
                </div>
              <Link to= {`/post/${data.$id}`}><img src={data.imageUrl} className='h-[270px] md:h-[400px] lg:h-[270px] w-full object-cover object-top rounded-md'/></Link>
              <div>
                <PostStats post={data} userId={user.id}/>
              </div>
           </div>
      )
     })}
     </div>
  )
}

export default SearchList