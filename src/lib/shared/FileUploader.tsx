import { useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import file_upload from '../../../public/assets/icons/file-upload.svg'
import { Button } from '@/components/ui/button';

type FileUploaderProps = {
    fieldChange : (FILES : File[]) => void,
    mediaUrl : string,
}

const FileUploader = ({fieldChange , mediaUrl} : FileUploaderProps) => {

    const [fileUrl , setFileUrl] = useState<File[]>([]);
    const [file, setFile] = useState<File[]>([]);
    const [media , setMedia] =  useState<string>(mediaUrl)

    const onDrop = useCallback((acceptedFiles :FileWithPath[]) => {
        // Do something with the files
        setFile(acceptedFiles)
        fieldChange(acceptedFiles)

        setMedia('')
        // console.log(mediaUrl)

        setFileUrl(acceptedFiles)

      }, [file])
      const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
          "image/*": [".png", ".jpeg", ".jpg"],
        },
      });
      
      return (
        <div {...getRootProps()} className='bg-dark-4 rounded-md flex flex-col justify-center items-center cursor-pointer'>
          <input {...getInputProps()} className=''/>
          {media ?  ( <div className='pt-10 pb-20 w-[200px] h-[400px]'>
                  <img src={media} className='w-full h-full rounded-md object-cover' />
                  <p className='pt-5 text-center'>replace the photo click here</p>
              </div>)
               :
            fileUrl?.length > 0 ?
              <div className='pt-10 pb-20 w-[200px] h-[400px]'>
                  <img src={URL.createObjectURL(fileUrl[0])} className='w-full h-full rounded-md object-cover' />
                  <p className='pt-5 text-center'>replace the photo click here</p>
              </div>

               : (
              <div  className='file_uploader-box'>
                <img src={file_upload} className='w-[100px]' alt='Upload Icon' />
                <p className='text-light-2 mt-4 mb-1'>drop photo here</p>
                <p className='text-light-4 mb-5'>svg, png, jpg</p>
                <Button className='text-light-4 bg-white'>Select from computer</Button>
              </div>
            )
          }
        </div>
      );
    }

export default FileUploader