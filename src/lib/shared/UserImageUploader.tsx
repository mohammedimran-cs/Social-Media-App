import { useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import profile from '../../../public/assets/icons/profile-placeholder.svg'

type UserImageUploaderProp = {
    onChange: (file : File[]) => void,
    mediaURl?: string
}

const UserImageUploader = ({onChange,mediaURl}: UserImageUploaderProp) => {

    // const [file , setFile] = useState<File[]>([])
    const [fileURL, setFileURL] = useState<string>()

   const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    // Do something with the files
    onChange(acceptedFiles)
    // setFile(acceptedFiles)
    setFileURL(URL.createObjectURL(acceptedFiles[0]))
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className='flex justify-center'>
      <input {...getInputProps()} />
      <div className='cursor-pointer'>
        {
        fileURL? <img src= {fileURL} className='h-[150px] w-[150px] md:h-[200px] md:w-[200px] rounded-full object-cover'/>: mediaURl ? <img src= {mediaURl} className='h-[150px] w-[150px] lg:h-[200px] lg:w-[200px] rounded-full object-cover'/>
         : <><img src= {profile} className='h-[150px] w-[150px] md:h-[200px] md:w-[200px] rounded-full object-cover'/></>
        }
        <div className='text-center mt-3 text-light-3'>
            upload Photo
        </div>
      </div>
    </div>
  )
}

export default UserImageUploader