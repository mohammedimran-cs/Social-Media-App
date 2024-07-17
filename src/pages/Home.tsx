import { useGetRecentPost } from '@/lib/react-query/queriesAndMutation';
import PostCard from '@/lib/shared/PostCard';
import Loader from '@/lib/shared/Loader';
import IconWithHeading from '@/lib/shared/IconWithHeading';
import home from '../../public/assets/icons/home.svg'

const Home = () => {
  
  const { data: posts, isLoading} = useGetRecentPost();
  // console.log('render in home.........................')

  return (
    <div className='flex flex-col flex-1 relative overflow-y-scroll mb-18'>
      <IconWithHeading image={home} heading='Feed' />
      { !posts && isLoading ? (
        <div className='absolute left-[45%] md:top-[40%] top-[30%]'>
          <Loader width={40} />
        </div>
      ) : (
        posts?.documents.map(post => (
          <PostCard key={post.$id} post={post} />
        ))
      )}
    </div>
  );
}

export default Home;
