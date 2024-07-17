import React, { useEffect, useState } from 'react'
import like from '../../../public/assets/icons/like.svg'
import save from '../../../public/assets/icons/save.svg'
import liked from '../../../public/assets/icons/liked.svg'
import saved from '../../../public/assets/icons/saved.svg'
import { Models } from 'appwrite'
import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from '../react-query/queriesAndMutation'
import Loader from './Loader'

type PostStateProps = {
     post: Models.Document, 
     userId: string,
}

const isChecked = (likesArray : string[] , userId : string) : boolean => {
    return likesArray?.includes(userId)
}

const PostStats = ({post , userId} : PostStateProps) => {

    const likesArray = post?.likes?.map((user : Models.Document) => user.$id)

    const [likes , setLikes] = useState<string[]>(likesArray || [])
    const [isSaved , setIsSaved] = useState(false);

    const {mutateAsync : likePost , isPending : isLikeLoading} = useLikePost();
    const {mutateAsync : savePost , isPending : isSaving} = useSavePost();
    const {mutateAsync : deletePost , isPending : isDeleting} = useDeleteSavedPost();
    const {data : currentUser} = useGetCurrentUser();
    const [saveLoading , setSaveLoading] = useState(false);

    const savedPostRecord = currentUser?.save.find(
        (record: Models.Document) => record.post?.$id === post?.$id
      );

      useEffect(() => {

        setIsSaved(!!savedPostRecord);

        const timer = setTimeout(() => {
          setSaveLoading(false);
        }, 3000);
    
        // Cleanup timer on unmount
        return () => clearTimeout(timer);
      }, [currentUser ,saveLoading])  

    const handleLikePost = (e : React.MouseEvent<HTMLImageElement>) => {

        e.stopPropagation();

        let newLikes = [...likes];
        let hasLiked = newLikes.includes(userId)

        if(hasLiked){
           newLikes = newLikes.filter((id) => id !== userId )
        }
        else {
            newLikes.push(userId)
        }
        setLikes(newLikes)
        likePost({postId : post.$id , likesArray : newLikes})
    }

    const handleSavePost = (e : React.MouseEvent<HTMLImageElement>) => {

        e.stopPropagation();

        setSaveLoading(true);

        if(savedPostRecord){
          setIsSaved(false)
         deletePost(savedPostRecord.$id)
      }
      else{
          setIsSaved(true)
          savePost({userId : userId , postId : post.$id})
      }
    }
  return (
    <div className='flex justify-between'>
        <div className='flex gap-2'>
           {isLikeLoading ? <Loader /> : <><img src = {(isChecked(likes , userId )) ? liked : like} onClick={handleLikePost} className='cursor-pointer'/>
            <p>{likes?.length}</p></>}
        </div>
        {isSaving || isDeleting || saveLoading? <Loader/> : <img src ={isSaved ? saved : save} onClick={handleSavePost} className= 'cursor-pointer'/>}
    </div>
  )
}

export default PostStats