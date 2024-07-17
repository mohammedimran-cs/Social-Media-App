import React from 'react'
import AddPost from '../../public/assets/icons/add-post.svg' 
import PostForm from '@/components/forms/PostForm'
import { Models } from 'appwrite'
//import IconWithHeading from '@/lib/shared/IconWithHeading'

type CreateProp = {
  icon? : string,
  heading? : string,
  post? : Models.Document,
  isLoading?: boolean
}

const CreatePost = ({icon , heading , post , isLoading} : CreateProp) => {
  return (
    <div className='flex flex-1'>
      <div className='flex flex-1 flex-col gap-10 max-w-5xl px-5 py-7 overflow-y-scroll'>
        <div className='flex gap-3 '>
          <img src= {icon || AddPost} className='w-[30px]'/>
          <p className='h3-bold'>{heading || 'Create Post'}</p>
        </div>
        {/* <IconWithHeading image={icon || AddPost} heading= {heading || 'Create Post'} /> */}
        <PostForm post = {post} isLoading = {isLoading} />
      </div>
    </div>
  )
}

export default CreatePost