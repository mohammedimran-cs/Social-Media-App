"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import FileUploader from "@/lib/shared/FileUploader";
import { postValidation } from "@/lib/validation";
import { Models } from "appwrite";
import { useCreatePost, useUpatePost } from "@/lib/react-query/queriesAndMutation";
import { toast } from "../ui/use-toast";
import { useUserContext } from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";
import Loader from "@/lib/shared/Loader";

type postFormProps = {
  post?: Models.Document,
  isLoading?: boolean
}

const PostForm = ({ post, isLoading }: postFormProps) => {
  // Query
  const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();
  const {mutateAsync : updatePost , isPending : isUpdating } = useUpatePost();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [isFormLoading, setIsFormLoading] = useState(true);

  // Define your form.
  const form = useForm<z.infer<typeof postValidation>>({
    resolver: zodResolver(postValidation),
    defaultValues: {
      caption: post?.caption || "",
      file: [],
      location: post?.location || "",
      tags: post?.tags.join(",") || "",
    },
  });

  // Update default values on post change
  useEffect(() => {
    setIsFormLoading(true);
    if (post) {
      form.reset({
        caption: post.caption,
        file: [],
        location: post.location,
        // tags: post.tags.map((tag: string) => 
        //   tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase() + ' '
        // ).join(","),
        tags: post.tags.join(',')
      });
    }

    // Delay rendering by 2 seconds
    const timer = setTimeout(() => {
      setIsFormLoading(false);
    }, 2000);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, [post, form]);

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof postValidation>) {
    if(post){
      let update = {
        ...values,
        imageUrl : post.imageUrl,
        imageId : post.imageId,
        userId: user.id,
        postId : post.$id
      }
      await updatePost(update)
      navigate(`/post/${post.$id}`)
    }
    else{
    const newPost = await createPost({
      ...values,
      userId: user.id,
    });

    if (!newPost) {
      toast({
        title: `Post failed. Please try again.`,
      });
    }
  }
    if(!post){
      navigate("/");
    }
  }

  if (isLoading || isFormLoading) {
    return (<div className="flex justify-center items-center h-screen">
              <Loader width={30}/>
           </div>)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-label">Caption</FormLabel>
              <FormControl>
                <Textarea className="shad-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-label">Add Photo</FormLabel>
              <FormControl>
                <FileUploader fieldChange={field.onChange} mediaUrl={post?.imageUrl} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-label">Add Location</FormLabel>
              <FormControl>
                <Input className="shad-input" type="text" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-label">Add Tags (separated by comma ' , ')</FormLabel>
              <FormControl>
                <Input className="shad-input" type="text" placeholder="java , php , python" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-3">
          <Button type="button" className="shad-button_dark md:text-md border hover:border-dark-4 border-dark-1 py-5" onClick={() => navigate(-1)}>Cancel</Button>
          <Button type="submit" className="shad-button_primary md:text-md">{(isLoadingCreate || isUpdating) && <Loader />}{post ? 'update' : 'submit'}</Button>
        </div>
      </form>
    </Form>
  );
}

export default PostForm;
