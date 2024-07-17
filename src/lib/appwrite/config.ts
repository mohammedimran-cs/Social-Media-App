import {Client,Account,Databases,Storage,Avatars} from 'appwrite'

export const appwriteConfig = {
    projectId : import.meta.env.VITE_APPWRITE_PROJECT_ID,
    URL : import.meta.env.VITE_APPWRITE_URl,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    postsId: import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
    usersId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
    saveId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID,
}

export const client = new Client();
client.setProject(appwriteConfig.projectId)
client.setEndpoint(appwriteConfig.URL)

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
