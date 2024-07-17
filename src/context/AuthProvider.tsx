import { getCurrentUser } from '@/lib/appwrite/api'
import { IContextType, IUser } from '@/types'
import { useContext , createContext , useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const INITIAL_USER = {
    id : '',
    firstName : '',
    secondName : '',
    email : '',
    imageUrl : '',
    bio : ''
}

const INITIAL_STATE = {
    user : INITIAL_USER,
    isLoading : false,
    isAuthenticated : false,
    setUser : () => {},
    setAuthenticated : () => {},
    checkAuthUser : async () => false as boolean
}


const authContext = createContext<IContextType>(INITIAL_STATE)

const AuthProvider = ({children} : { children : React.ReactNode }) => {

  const [user ,setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading , setIsLoading] = useState(false);
  const [isAuthenticated , setAuthenticated] = useState(false);

  const navigate = useNavigate();

  const checkAuthUser = async () => {
    try {
        const currentAccount = await getCurrentUser();
        setIsLoading(true);
        if(currentAccount){
          // console.log('in currentAccount')
            setUser({
                id : currentAccount.$id,
                firstName : currentAccount.firstName,
                secondName : currentAccount.secondName,
                email : currentAccount.email,
                bio : currentAccount.bio,
                imageUrl : currentAccount.imageUrl
            })

            setAuthenticated(true)
            return true;
        }
        return false;
    }
    catch(error) {
        console.log(error)
        return false;
    }
    finally{
        setIsLoading(false);
    }
  }

  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    if (
      cookieFallback === "[]" ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
      navigate("/sign-in");
    }

    checkAuthUser();

  }, []);

  return (
   <authContext.Provider value = {{
     user,
     isLoading,
     isAuthenticated,
     setUser,
     setAuthenticated,
     checkAuthUser
      }}>
    {children}
   </authContext.Provider>
  )
}

export default AuthProvider

export const useUserContext = () => useContext(authContext);