import React from 'react';
import CreatePost from './CreatePost';
import edit from '../../public/assets/icons/edit.svg';
import { useParams } from 'react-router-dom';
import { useGetPostById } from '@/lib/react-query/queriesAndMutation';
import Loader from '@/lib/shared/Loader'; // Assuming you have a Loader component for showing loading state

const EditPost = () => {
  
  const {id} = useParams();

  const { data: postData, isLoading } = useGetPostById(id || '');

  return (
    <CreatePost icon={edit} heading={'Edit'} post={postData} isLoading={isLoading} />
  );
};

export default EditPost;
