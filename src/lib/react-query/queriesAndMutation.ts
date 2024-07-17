import { INewPost, IUpdatePost, IUpdateUserProfile, NewUser } from '@/types'
import {useQuery,useMutation,useQueryClient,useInfiniteQuery} from '@tanstack/react-query'
import { createPost, createUserAccount, deleteSavedPost, followUser, getAllUsers, getCurrentUser, getInfinitePosts, getPostById, getRecentPosts, getUserById, likePost, postDeleteById, savePost, searchPost, signInAccount, signOutAccount, unFollowUser, updatePost, updateUserProfile } from '../appwrite/api'
import { QUERY_KEYS } from './querykeys'
import { Models } from 'appwrite'



export const useCreateUserAccount = () => {
    return useMutation(
        {
            mutationFn : (user : NewUser) => {
                return createUserAccount(user)
            }
        }
    )
}

export const useSignInAccount = () => {
    return useMutation(
        {
            mutationFn : (user : {email: string ,password : string}) => {
                return signInAccount(user)
            }
        }
    )
}

export const useSignOutAccount = () => {
    return useMutation({
        mutationFn : () => signOutAccount()
    })
}

export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (post: INewPost) => createPost(post),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
      },
    });
  };

  export const useLikePost = () => {
    const queryClient = useQueryClient();
    return useMutation(
        {
            mutationFn : ({postId , likesArray} : {postId : string ,likesArray : string[]}) => {
               return likePost(postId , likesArray)
            },

            onSuccess : () => {
                queryClient.invalidateQueries({
                  queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
                });

                queryClient.invalidateQueries({
                  queryKey: [QUERY_KEYS.GET_USER_BY_ID]
                });
            }
        }
    )
  }

  export const useGetRecentPost = () => {
    // console.log('in getRecentPost')
    return useQuery(
        {
            queryKey : [QUERY_KEYS.GET_RECENT_POSTS],
            queryFn : getRecentPosts,
            gcTime: 0
        }
        
    )
  }

  export const useSavePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ userId, postId }: { userId: string; postId: string }) =>
        savePost(userId, postId),
      onSuccess: () => {
        // console.log('save post............')
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_POSTS],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        });
      },
    });
  };

  export const useDeleteSavedPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (savedRecordId: string) => deleteSavedPost(savedRecordId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_POSTS],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.GET_CURRENT_USER],
        });
      },
    });
  };
  
  export const useGetCurrentUser = () => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      queryFn: getCurrentUser,
    });
  };

  export const useGetPostById = (postId : string) => {
    return useQuery(
      {
        queryKey : [QUERY_KEYS.GET_POST_BY_ID,postId],
        enabled : !!postId,
        queryFn : () => {
          return getPostById(postId)
        }
      }
    )
  }

  export const useGetUserById = (UserId : string | undefined) => {
    return useQuery(
      {
        queryKey : [QUERY_KEYS.GET_USER_BY_ID,UserId],
        enabled : !!UserId,
        queryFn : () => {
          return getUserById(UserId)
        }
      }
    )
  }

  export const useUpatePost = () => {
    const queryClient = useQueryClient();
    return useMutation(
      {
        mutationFn : (post : IUpdatePost) => {
          return updatePost(post)
        },
        onSuccess : () => {
          queryClient.invalidateQueries({
            queryKey : [QUERY_KEYS.GET_RECENT_POSTS]
          })
          queryClient.invalidateQueries({
            queryKey : [QUERY_KEYS.GET_POST_BY_ID]
          })
        }
      }
    )
  }

  export const usePostDeleteById = () => {
    const queryClient = useQueryClient();
    return useMutation(
      {
        mutationFn : ({postId,fileId} : {postId : string , fileId : string}) => {
          return postDeleteById(postId,fileId)
        },
       onSuccess : () => {
        queryClient.invalidateQueries({
          queryKey : [QUERY_KEYS.GET_RECENT_POSTS]
        })
       }
      }
    )
  }

  export const useSearchPost = (searchTerm : string) => {
    return useQuery(
      {
        queryKey: [QUERY_KEYS.GET_POSTS,searchTerm],
        queryFn: () => searchPost(searchTerm),
        enabled: !!searchTerm,
      }
    )
  }

  export const useGetPosts = () => {
    return useInfiniteQuery({
      queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
      queryFn: getInfinitePosts,
      initialPageParam: 0,
      getNextPageParam: (lastPage: any) => {
        // If there's no data, there are no more pages.
        if (!lastPage || !lastPage.documents || lastPage.documents.length === 0) {
          return null;
        }
          // Use the $id of the last document as the cursor.
      const lastId = lastPage.documents[lastPage?.documents.length - 1].$id;
      return lastId;
      }
    })
  }

  export const useGetAllUsers = () => {
    return useQuery({
      queryKey: [QUERY_KEYS.GET_ALL_USERS],
      queryFn: getAllUsers
    })
  }

  export const useFollowUser = () => {
    const queryClient = useQueryClient();
    return useMutation(
      {
        mutationFn: ({currentUser,selectedUser} : {currentUser? :Models.Document | null , selectedUser? : Models.Document | null}) => {
          return followUser({currentUser: currentUser , selectedUser: selectedUser})
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_CURRENT_USER],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_USER_BY_ID],
          });
        }
      }
    )
  }

  export const useUnFollowUser = () => {
    const queryClient = useQueryClient();
    return useMutation(
      {
        mutationFn: ({currentUser,selectedUser} : {currentUser? :Models.Document | null , selectedUser? : Models.Document | null}) => {
          return unFollowUser({currentUser: currentUser , selectedUser: selectedUser})
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_CURRENT_USER],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_USER_BY_ID],
          });
        }
      }
    )
  }

  export const useUpdateUserProfile = () => {
    const queryClient = useQueryClient();
    return useMutation(
      {
        mutationFn: (user : IUpdateUserProfile) => {
          return updateUserProfile(user)
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_CURRENT_USER],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.GET_USER_BY_ID],
          });
        }
      }
    )
  }