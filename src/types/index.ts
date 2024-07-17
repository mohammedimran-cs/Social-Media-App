export type NewUser = {
    firstName : string,
    secondName : string,
    email : string,
    password : string
}

export type IUser = {
    id : string,
    firstName : string,
    secondName : string,
    email : string,
    imageUrl : string,
    bio : string
}

export type IContextType = {
    user : IUser,
    isLoading : boolean,
    isAuthenticated : boolean,
    setUser : React.Dispatch<React.SetStateAction<IUser>>,
    setAuthenticated : React.Dispatch<React.SetStateAction<boolean>>,
    checkAuthUser : () => Promise<boolean>
}

export type ILinks = {
    label : string,
    imageURL : string,
    link : string,
}

export type INewPost = {
    userId: string;
    caption: string;
    file: File[];
    location?: string;
    tags?: string;
  };

  export type IUpdatePost = {
    userId: string;
    caption: string;
    file: File[];
    location?: string;
    tags?: string;
    imageId : string,
    imageUrl : URL,
    postId : string
  }

  export type IUpdateUserProfile = {
    firstName: string,
    secondName: string,
    file: File[],
    // email: string,
    bio: string,
    ImageId: string,
    userId: string,
    fileId: string
  }
