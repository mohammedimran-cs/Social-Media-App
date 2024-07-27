type IconWithHeadingProps = {
    image: string,
    heading: string
}

const IconWithHeading = ({image , heading}: IconWithHeadingProps) => {
  return (
    <div className='flex gap-3 items-center pl-5 mt-4 h-10'>
        <img src= {image} width={23}/>
        <h1 className='text-lg font-bold'>{heading}</h1>
    </div>
  )
}

export default IconWithHeading