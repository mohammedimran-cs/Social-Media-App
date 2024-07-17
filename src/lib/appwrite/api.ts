import { ID, ImageGravity, Models, Query } from 'appwrite'
import {INewPost, IUpdatePost, IUpdateUserProfile, NewUser} from '@/types'
import { account, appwriteConfig, avatars, databases, storage } from './config'


export  async function createUserAccount(user: NewUser){
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.firstName + ` ${user.secondName}`,
        )

        if(!newAccount){
            throw console.error('not creating user');
        }
        else {
            const avatarUrl = avatars.getInitials(user.firstName + ` ${user.secondName}`)

            const newUser = await saveUserToDB({
                accountId : newAccount.$id,
                firstName : user.firstName,
                secondName : user.secondName,
                email : user.email,
                imageUrl : avatarUrl + ''
            }
            );
            return newUser;

        }
    }
    catch(error)
    {
        console.log(error)
        return error
    }
}

export async function saveUserToDB(user : {
    accountId : string ,
    firstName : string,
    secondName : string,
    imageUrl : string,
    email : string,

}) {
    try
    {
            const newUser = await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.usersId,
                ID.unique(),
                user
            )
            return newUser;
    }
    catch(error){
        console.log(error)
    }
}

export async function signInAccount(user : {email: string ,password : string}) {
    try {
        const session = await account.createEmailPasswordSession(user.email,user.password);
        return session;
    }
    catch(error){
        console.log(error)
    }
}

export async function getAccount() {
    try {
      const currentAccount = await account.get();
      // console.log('in get account',currentAccount)
  
      return currentAccount;
    } catch (error) {
      console.log(error);
    }
  }


export async function getCurrentUser() {
    try {
      const currentAccount = await getAccount();
      // console.log('in acco.........')
  
      if (!currentAccount) {
        // console.log('in error')
        throw "is empty";
      }
  
      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.usersId,
        [Query.equal("accountId", currentAccount.$id)]
      );
  
      if (!currentUser) {
        console.log('in error')
        throw "is empty";
      }
  
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

export async function signOutAccount() {
  try {
    const session = account.deleteSession('current');
    return session;
  }
  catch(error) {
    console.log(error);
  }
}

export async function createPost(post: INewPost) {
  try {
    // Upload file to appwrite storage
    const uploadedFile = await uploadFile(post.file[0]);

    if (!uploadedFile) throw Error;

    // Get file url
    const fileUrl = getFilePreview(uploadedFile.$id);
    if (!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    // Convert tags into array
    let tags = post.tags?.replace(/ /g, "").split(",") || [];

    tags.map((data: string) => {
      return data.toLowerCase
    })

    // Create post
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        location: post.location,
        tags: tags,
      }
    );

    if (!newPost) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    return newPost;
  } catch (error) {
    console.log(error);
  }
}
// ============================== UPLOAD FILE
export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET FILE URL
export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      ImageGravity.Top,
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

export async function updatePost(post : IUpdatePost){

  const hasFileToUpdate = post.file.length > 0

  try 
  {
    let image = {imageUrl : post.imageUrl , imageId : post.imageId}

    if(hasFileToUpdate)
    {
    // Upload file to appwrite storage
      const uploadedFile = await uploadFile(post.file[0]);

      if (!uploadedFile) throw Error;

      // Get file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    // Convert tags into array
    const tags = post.tags?.replace(/ /g, "").split(",").map((data: string) => data.toLowerCase()) || [];

    // Create post
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsId,
      post.postId,
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        location: post.location,
        tags: tags,
      }
    );
    
    if (!updatedPost) {
      await deleteFile(image.imageId);
      throw Error;
    }

     // Safely delete old file after successful update
     if (hasFileToUpdate) {
      await deleteFile(post.imageId);

    return updatedPost;
  }
}
  catch(error) {
    console.log(error);
  }
}

// ============================== DELETE FILE
export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

// ============================== RECENT POST

export async function getRecentPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsId,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );

    if (!posts) throw Error;
    // console.log('in recent post ',posts)
    return posts;
  } catch (error) {
    console.log(error);
  }
}

//===============================GET ALL USERS
export async function getAllUsers(){
  try{
      const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersId,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    )
    return users;
  }
  catch(error){
      console.log(error)
  }

}

// ============================== LIKE POST

export async function likePost(postId : string ,likesArray : string[]) {
  try {
    const updatePost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsId,
      postId,
      {
        likes : likesArray
      }
    )
    return updatePost
  }
  catch(error) {
    console.log(error)
  }

}

// ============================== SAVE POST

export async function  savePost( userId : string , postId : string){
  
  try{
      const saveToDB = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.saveId,
      ID.unique(),
      {
        user : userId,
        post : postId
      }
    )
    return saveToDB
  }
  catch(error){
    console.log(error)
  }
}

// ============================== DELETE SAVED POST
export async function deleteSavedPost(savedRecordId: string) {
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.saveId,
      savedRecordId
    );

    if (!statusCode) throw Error;

    return { status: "Ok" };
  } 
  catch (error) {
    console.log(error);
  }
}

export async function getPostById(postId : string){
  try {
    const postData =  await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsId,
      postId
    )
    // console.log('in get')
    return postData
  }
  catch(error){
    console.log(error)
  }
}

export async function getUserById(UserId : string | undefined){
  let userData;
  try {
    if(UserId){
     userData =  await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersId,
      UserId
    )
  }
    return userData
  }
  catch(error){
    console.log(error)
  }
}

export async function postDeleteById(postId : string , fileId : string){
  try{
     await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsId,
      postId
    )

    await storage.deleteFile(appwriteConfig.storageId, fileId);
    
    return {
      success : 'ok'
    }
  }
  catch(error){
    console.log(error)
  }
}

export async function searchPost(searchTerm: string) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsId,
      [Query.search('tags', searchTerm.toLowerCase())]
    );

    // console.log(posts)
    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function getInfinitePosts({ pageParam }: { pageParam: string }) {
  const queries: any[] = [Query.orderDesc("$updatedAt"), Query.limit(3)];

  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam));
  }

  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postsId,
      queries
    );

    // console.log('in posts', posts)

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}


export async function followUser({ currentUser, selectedUser }: { currentUser?: Models.Document | null, selectedUser?: Models.Document | null }) {
  if (!currentUser || !selectedUser) {
    throw new Error('Current user or selected user is missing');
  }

  try {
    // Safely clone the followers and following arrays
    const updatedFollowers = selectedUser.followers ? [...selectedUser.followers] : [];
    const updatedFollowing = currentUser.following ? [...currentUser.following] : [];

    // Add the IDs to the arrays if not already present
    if (!updatedFollowers.includes(currentUser.$id)) {
      updatedFollowers.push(currentUser.$id);
    }

    if (!updatedFollowing.includes(selectedUser.$id)) {
      updatedFollowing.push(selectedUser.$id);
    }

    // Update the selected user's followers
    const followed = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersId,
      selectedUser.$id,
      { followers: updatedFollowers }
    );

    // Check if the update was successful
    if (!followed) throw new Error('Failed to update followers');

    // Update the current user's following
    const following = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersId,
      currentUser.$id,
      { following: updatedFollowing }
    );

    // Check if the update was successful
    if (!following) throw new Error('Failed to update following');

    return { followed, following };
  } catch (error) {
    console.error('Error in followUser:', error);
    throw error;
  }
}

export async function unFollowUser({ currentUser, selectedUser }: { currentUser?: Models.Document | null, selectedUser?: Models.Document | null }) {
  if (!currentUser || !selectedUser) {
    throw new Error('Current user or selected user is missing');
  }

  try {
    // Safely clone the followers and following arrays
    let updatedFollowers = selectedUser.followers ? [...selectedUser.followers] : [];
    let updatedFollowing = currentUser.following ? [...currentUser.following] : [];

    if (updatedFollowers.includes(currentUser.$id)) {
      updatedFollowers = updatedFollowers.filter((userId : string) => userId !== currentUser.$id);
    }

    if (updatedFollowing.includes(selectedUser.$id)) {
      updatedFollowing = updatedFollowing.filter((userId : string) => userId !== selectedUser.$id);
    }

    // Update the selected user's followers
    const followed = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersId,
      selectedUser.$id,
      { followers: updatedFollowers }
    );

    // Check if the update was successful
    if (!followed) throw new Error('Failed to update followers');

    // Update the current user's following
    const following = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersId,
      currentUser.$id,
      { following: updatedFollowing }
    );

    // Check if the update was successful
    if (!following) throw new Error('Failed to update following');

    return { followed, following };
  } catch (error) {
    console.error('Error in followUser:', error);
    throw error;
  }
}

export async function updateUserProfile(user: IUpdateUserProfile){
  try{
    let file: any;
    let upload: any;
    // console.log(user.file)

    if(user.file[0])
      {
        // console.log('render inside the upload')
        const uploadedFile = await uploadFile(user.file[0])
        upload = uploadedFile
        // console.log('Image ID :',upload?.$id)
        if(!uploadedFile) throw Error

        const fileUrl = getFilePreview(uploadedFile.$id);
        file = fileUrl
        // console.log('reading fileurl....',fileUrl)
        if (!fileUrl) {
          await deleteFile(uploadedFile.$id);
          throw Error;
        }

        if(user.ImageId){
          // console.log('inside the imageId')
          await deleteFile(user.ImageId)
        }
      }

    let defaultImageUrl: string ='';
    if(!user.file[0]){
      defaultImageUrl = user.fileId
    }
    const updateProfile = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersId,
      user.userId,
      {
        firstName: user.firstName,
        secondName: user.secondName,
        // email: user.email,
        bio: user.bio,
        imageUrl: file || defaultImageUrl,
        ImageId: upload?.$id || ''
      }
    )

    // const updateEmailAuth = await account.updateEmail(user.email)
    return updateProfile;

  }
  catch(error){
    console.log(error)
  }
}
