
import CreatePost from './CreatePost';
import edit from '../../public/assets/icons/edit.svg';
import { useParams } from 'react-router-dom';
import { useGetPostById } from '@/lib/react-query/queriesAndMutation';

const EditPost = () => {
  
  const {id} = useParams();

  const { data: postData, isLoading } = useGetPostById(id || '');

  return (
    <CreatePost icon={edit} heading={'Edit'} post={postData} isLoading={isLoading} />
  );
};

export default EditPost;
