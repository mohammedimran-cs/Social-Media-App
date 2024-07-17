import { z } from "zod"

export const signUpValidation = z.object({
    secondName: z.string().min(2,{message : 'name too short'}).max(50),
    firstName: z.string().min(2,{message : 'name too short'}).max(50),
    email: z.string().email(),
    password: z.string().min(8, {message : 'It must contain 8 character(s)'})
  })

  export const signInValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, {message : 'It must contain 8 character(s)'})
  })
  
  
  export const postValidation = z.object({
   caption : z.string().min(5).max(2200),
   file : z.custom<File[]>(),
   location : z.string().min(2).max(100),
   tags : z.string()
  })

  export const userProfileValidation = z.object({
    firstName: z.string().min(2,{message : 'firstName too short'}).max(50),
    secondName: z.string().min(2,{message : 'secondName too short'}).max(50),
    // email: z.string().email(),
    bio: z.string().max(2200, { message: 'It should contain 2200 character(s) only' }).optional(),
    imageUrl: z.custom<File[]>()
  })
  