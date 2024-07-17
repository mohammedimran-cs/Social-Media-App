import { useEffect, useState } from 'react';
import saved from '../../public/assets/icons/saved.svg';
import GridPostList from '@/lib/shared/GridPostList';
import { useGetCurrentUser } from '@/lib/react-query/queriesAndMutation';
import Loader from '@/lib/shared/Loader';
import { useUserContext } from '@/context/AuthProvider';
import { Models } from 'appwrite';
import IconWithHeading from '@/lib/shared/IconWithHeading';

const Saved = () => {
  const { data: currentUser, isPending: SavedPostLoading } = useGetCurrentUser();
  const { user } = useUserContext();
  const [posts, setPosts] = useState<Models.Document[]>([]);

  useEffect(() => {
    if (currentUser && currentUser.save) {
      const tempArray = currentUser.save.map((record: Models.Document) => record.post);
      setPosts(tempArray);
    }
  }, [currentUser]);

  if (SavedPostLoading) {
    return (
      <div className='flex justify-center items-center w-full h-screen'>
        <Loader width={30} />
      </div>
    );
  }

  return (
      <>
      {currentUser?.save.length ? <div className='flex flex-1 flex-col overflow-y-scroll no-scrollbar'>
        <IconWithHeading image={saved} heading='All' />
        <div className='flex justify-center items-center'>
          <div className="w-[90%] flex md:gap-[5%] pb-5 items-center flex-col md:flex-row md:flex-wrap">
            <GridPostList post={posts} user={user} />
          </div>
        </div>
      </div> :<div className='w-full justify-center items-center flex text-xl h-[70vh] md:h-[100vh]'>No saved Posts...</div>}
      </>
  );
};

export default Saved;
