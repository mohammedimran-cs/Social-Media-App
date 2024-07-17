import IconWithHeading from '@/lib/shared/IconWithHeading'
import update from '../../public/assets/icons/edit.svg'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { userProfileValidation } from '@/lib/validation'
import { useGetCurrentUser, useUpdateUserProfile } from '@/lib/react-query/queriesAndMutation'
import { useEffect } from 'react'
import { Textarea } from '@/components/ui/textarea'
import UserImageUploader from '@/lib/shared/UserImageUploader'
import Loader from '@/lib/shared/Loader'
import { useNavigate } from 'react-router-dom'
import { IUpdateUserProfile } from '@/types'


const UpdateProfile = () => {

  const {data : currentUser , isPending} = useGetCurrentUser(); 
  const {mutateAsync: updateUser , isPending: updatingUser} = useUpdateUserProfile();
  const navigate = useNavigate();

 // 1. Define your form.
 const form = useForm<z.infer<typeof userProfileValidation>>({
  resolver: zodResolver(userProfileValidation),
  defaultValues: {
    firstName: currentUser?.firstName || '',
    secondName: currentUser?.secondName || '',
    // email: currentUser?.email || '',
    bio: currentUser?.bio || '',
    imageUrl: currentUser?.imageUrl || ''
  },
})

useEffect(() => {
  if (currentUser) {
    form.reset({
      firstName: currentUser.firstName || '',
      secondName: currentUser.secondName || '',
      // email: currentUser.email || '',
      bio: currentUser.bio || '',
      imageUrl: []
    });
  }
},[currentUser])

if(isPending){
  return (<div className='flex justify-center items-center w-full h-screen'>
    <Loader width={30}/>
   </div>)
}

// 2. Define a submit handler.
async function onSubmit(values: z.infer<typeof userProfileValidation>) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  const user: IUpdateUserProfile = {
    firstName: values.firstName,
    secondName: values.secondName,
    bio: values.bio || '',
    
    ImageId: currentUser?.ImageId || '',
    userId: currentUser?.$id || '',
    file: values.imageUrl,
    fileId: currentUser?.imageUrl
  }

  // console.log(user)

  await updateUser(user)
  // console.log(data)

  navigate(-1)
}

  return (
    <div className='flex flex-1 flex-col overflow-y-scroll'>
      <IconWithHeading image= {update} heading='Update Profile'/>
      <div className='mt-5'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex md:flex-row flex-col px-10 md:gap-3 lg:gap-0">
          <div className='w-[100%] md:w-[30%] flex justify-center mt-3'>
            <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <UserImageUploader onChange={field.onChange} mediaURl={currentUser?.imageUrl}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          <div className='w-[100%] md:w-[70%] space-y-5'>
          <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='shad-label'>First Name</FormLabel>
                  <FormControl>
                    <Input className='shad-input py-6' placeholder="firstName" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="secondName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='shad-label'>Second Name</FormLabel>
                  <FormControl>
                    <Input className='shad-input py-6' placeholder="secondName" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='shad-label'>firstName</FormLabel>
                  <FormControl>
                    <Input className='shad-input py-6' placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='shad-label'>About You</FormLabel>
                  <FormControl>
                    <Textarea className='shad-input' placeholder='Tell your self' {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3">
              <Button type="button" className="shad-button_dark border hover:border-dark-4 border-dark-1 py-5 md:text-md" onClick={() => navigate(-1)}>Cancel</Button>
              <Button type="submit" className="shad-button_primary md:text-md">{updatingUser && <Loader />}update</Button>
           </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default UpdateProfile