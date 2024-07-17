import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from '@/components/ui/button'
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signUpValidation } from "@/lib/validation"

import { useToast } from "@/components/ui/use-toast"
import { Link, useNavigate } from "react-router-dom"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutation"
import { useUserContext } from "@/context/AuthProvider"
import Loader from "@/lib/shared/Loader"


const Signup = () => {

  const { toast } = useToast()
  const {mutateAsync : createUserAccount , isPending : isCreatingAccount} = useCreateUserAccount();
  const {mutateAsync : signInAccount , isPending : isSigningIn} = useSignInAccount();

  const {checkAuthUser , isLoading : isUserLoading} = useUserContext();
  const navigate = useNavigate();

    // 1. Define your form.
    const form = useForm<z.infer<typeof signUpValidation>>({
      resolver: zodResolver(signUpValidation),
      defaultValues: {
        firstName: '',
        secondName:'',
        email: '',
        password: ''
      },
    })
   
    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof signUpValidation>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      try {
        const newUser = await createUserAccount(values);
  
        if (!newUser) {
          toast({ title: "Sign up failed. Please try again.", });
          
          return;
        }
  
        const session = await signInAccount({
          email: values.email,
          password: values.password,
        });
  
        if (!session) {
          toast({ title: "Something went wrong. Please login your new account",});
          
          navigate("/sign-in");
          
          return;
        }
  
        const isLoggedIn = await checkAuthUser();
  
        if (isLoggedIn) {
          form.reset();
  
          navigate("/");
        } else {
          toast({ title: "Login failed. Please try again.", });
          
          return;
        }
      } catch (error) {
        console.log({ error });
      }
    };
  return (
    <Form {...form}>
      <div className="flex flex-col space-y-5 sm:w-[400px]">
        <h1 className= "md:text-2xl">create an Account</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel className="shad-form_label">FirstName</FormLabel>
                <FormMessage className="shad-form_message"/>
                </div>
              <FormControl>
                <Input className= "shad-input"  {...field} />
              </FormControl>
            </FormItem>
          )}
        />
           <FormField
          control={form.control}
          name="secondName"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel className="shad-form_label">SecondName</FormLabel>
                <FormMessage className="shad-form_message"/>
                </div>
              <FormControl>
                <Input className= " shad-input" {...field} />
              </FormControl>
              
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
             <div className="flex justify-between items-center">
                <FormLabel className=" shad-form_label">Email</FormLabel>
                <FormMessage className="shad-form_message"/>
                </div>
              <FormControl>
                <Input type="email" className= "shad-input" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormMessage className="shad-form_message"/>
                </div>
              <FormControl>
                <Input type='password' className= "shad-input"  {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="shad-button_primary w-full h-[30px] md:h-[40px]">
        {(isCreatingAccount || isSigningIn || isUserLoading) && <Loader />}sign up</Button>
         <h1 className="text-center">Already have an account ?<Link className = 'text-blue-400 ml-2' to={'/sign-in'}>sign in</Link></h1>
      </form>
      </div>
  </Form>
  )
}

export default Signup