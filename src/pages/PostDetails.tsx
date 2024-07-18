import { Link, useNavigate, useParams } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import Loader from '@/lib/shared/Loader';
import PostStats from '@/lib/shared/PostStats';
import profile from '../../public/assets/icons/profile-placeholder.svg';
import edit from '../../public/assets/icons/edit.svg';
import delete_icon from '../../public/assets/icons/delete.svg';
import { useUserContext } from '@/context/AuthProvider';
import { useGetPostById, usePostDeleteById } from '@/lib/react-query/queriesAndMutation';

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: post, isLoading: postIsLoading , isFetching } = useGetPostById(id || '');
  const { user } = useUserContext();
  const { mutateAsync: deletePostById, isPending: isDeleteing } = usePostDeleteById();

  const deletePost = () => {
    deletePostById({ postId: post ? post?.$id : '', fileId: post ? post?.imageId : '' });
    setTimeout(() => {
      navigate(-1);
    }, 1000);
  };

  if (postIsLoading || isFetching) {
    return (
      <div className='flex justify-center items-center flex-1 h-screen'>
        <Loader width={30} />
      </div>
    );
  }

  return (
    <div className='flex items-center flex-col flex-1 my-10'>
      <div className='w-[80%] gap-5 rounded-md flex flex-col lg:flex-row bg-dark-2'>
        <div className='lg:w-[35%] w-[100%]'>
            <>
              <img
                src={post?.imageUrl}
                className={`max-h-[300px] object-cover object-top w-full rounded-md rounded-r-none`}
              />
            </>
        </div>
        <div className='lg:w-[60%] w-[100%] flex flex-col gap-5 px-2 py-4'>
          <div className='flex justify-between'>
            <div className='flex items-center gap-4'>
              <Link to = {`/profile/${post?.creator.$id}`}><img
                src={post?.creator.imageUrl || profile}
                className='lg:w-[50px] lg:h-[50px] w-[35px] h-[35px] rounded-full'
                alt="Creator"
              />
              </Link>
              <div>
                <h2 className='text-md'>{`${post?.creator?.firstName} ${post?.creator?.secondName}`}</h2>
                <h2 className='text-sm'>{formatDistanceToNow(new Date(post?.$createdAt || ''), { addSuffix: true })}</h2>
              </div>
            </div>
            <div className='flex gap-4'>
              {user.id === post?.creator.$id && (
                <>
                  <Link to={`/update-post/${post.$id}`}>
                    <img src={edit} className='lg:w-[24px] w-[20px]' alt="Edit" />
                  </Link>
                  <div>
                    {isDeleteing ? <Loader /> : <img src={delete_icon} className='lg:w-[24px] w-[20px] cursor-pointer' onClick={deletePost} alt="Delete" />}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className='w-full h-[1px] bg-slate-900'></div>
          <div>
            <h2>{post?.caption}</h2>
            <ul className='flex gap-2 pt-2 flex-wrap'>
              {post?.tags.map((tag: string) => (
                <li key={tag} className='text-light-3 text-sm'># {tag}</li>
              ))}
            </ul>
          </div>
          <div className='h-full flex-col flex justify-end'>
            {post && <PostStats post={post} userId={user.id} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
