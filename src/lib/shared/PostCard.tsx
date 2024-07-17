import edit from '../../../public/assets/icons/edit.svg'
import { Models } from 'appwrite';
import { formatDistanceToNow } from 'date-fns';
import PostStats from './PostStats';
import { useUserContext } from '@/context/AuthProvider';
import { Link } from 'react-router-dom';

type PostCardProps = {
    post: Models.Document;
  };
  

const PostCard = ({post} : PostCardProps) => {
    const {user} = useUserContext();
  return (
    <div className='flex flex-col w-min[300px] mx-5 my-5 rounded-md pt-5 pb-12 px-5 gap-10 bg-dark-2'>
        <div className='flex justify-between w-full  items-center'>
            <div className='flex gap-4'>
                <Link to = {`profile/${post?.creator?.$id}`}><img src= {post?.creator?.imageUrl} className= 'h-[50px] w-[50px] object-cover rounded-full'/></Link>
                <div className='space-y-1'>
                    <h2 className='text-light-1'>{`${post?.creator?.firstName} ${post?.creator?.secondName }`}</h2>
                    <h2 className='text-light-3 text-sm'>{formatDistanceToNow(new Date(post?.$createdAt), { addSuffix: true })}</h2>
                </div>
            </div>
            {user.id === post?.creator?.$id && <Link to = {`/update-post/${post?.$id}`}><img src = {edit} className='w-[20px]'/></Link>}
        </div>
        <div className='space-y-2'>
            <h2 className='text-light-1'>{post?.caption}</h2>
            <ul className='flex gap-2 flex-wrap'>{post?.tags.map((tag : string) => {
                return (<li key={tag} className='text-light-3 text-sm'># {tag}</li>)
            })
            }
            </ul>
        </div>
        <div className='flex justify-center'>
            <Link to={`/post/${post?.$id}`}><div className='w-[250px] h-[300px] rounded-md lg:w-[500px] lg:h-[600px]'>
                <img src= {post?.imageUrl} className='object-cover w-full h-full rounded-md'/>
            </div></Link>
        </div>
        <div className='flex justify-center mt-[-20px]'>
            <div className='w-[250px]  rounded-md lg:w-[500px]'>
                <PostStats post = {post} userId = {user.id}/>
            </div>
        </div>
  </div>
  )
}

export default PostCard