import { useEffect, useState } from 'react';
import search_img from '../../public/assets/icons/search.svg';
import filter from '../../public/assets/icons/filter.svg';
import { useUserContext } from '@/context/AuthProvider';
import GridPostList from '@/lib/shared/GridPostList';
import { useGetPosts, useSearchPost } from '@/lib/react-query/queriesAndMutation';
import { useInView } from "react-intersection-observer";
import Loader from '@/lib/shared/Loader';
import SearchList from '@/lib/shared/SearchList';
import useDebounce from '@/hooks/useDebounce';

const Explore = () => {
  const [search, setSearch] = useState('');
  const { user } = useUserContext();
  const debouncerValue = useDebounce(search,1000)
  const { data: searchPost } = useSearchPost(debouncerValue); 
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

  const { ref, inView } = useInView();

  // console.log(posts)

  const searchResult = search !== '';
  const shouldNotShowPost = posts?.pages?.every((item: any) => item.documents.length === 0);

  useEffect(() => {
    if (inView && !searchResult) {
      fetchNextPage();
    }
  }, [inView, searchResult]);

  return (
    <div className='flex flex-col flex-1 items-center gap-5'>
      <div className="flex w-[80%] sm:w-[95%] mt-6 md:mt-5 px-2 py-2 gap-2 rounded bg-white">
        <img src={search_img} className='w-5' />
        <input
          className="w-full border-none bg-transparent text-gray-400 outline-none focus:outline-none"
          type="search"
          value={search}
          name="search"
          placeholder="Search By Tags..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className='flex w-[80%] sm:w-[95%] justify-between'>
        <h2 className='text-lg'>Popular Today</h2>
        <div className='flex gap-3 bg-dark-4 px-4 py-2 rounded-md'>
          <h2>Filter</h2>
          <img src={filter} />
        </div>
      </div>
      
      {
        searchResult ? (
          <SearchList post={searchPost} user={user} />
        ) : shouldNotShowPost ? (
          <div>End of Post</div>
        ) : (
          <div className='w-[100%] sm:w-[95%] flex md:gap-[5%] pb-5 overflow-y-scroll no-scrollbar items-center flex-col md:flex-row md:flex-wrap '>
            {posts?.pages.map((item: any, index: number) => (
              <GridPostList key={`page-${index}`} post={item.documents} user={user} />
            ))}
            {/* Loader to detect when the bottom of the container is reached */}
            {(hasNextPage && !search) && (
              <div ref={ref} className="flex justify-center items-center w-full">
                <Loader />
              </div>
            )}
          </div>
        )
      }
    </div>
  );
}

export default Explore;
