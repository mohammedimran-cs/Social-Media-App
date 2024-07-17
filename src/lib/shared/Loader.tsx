import loader from '../../../public/assets/icons/loader.svg';

type LoaderAttribute = {
  width? : number
}

const Loader = ({width} : LoaderAttribute) => {
  return (
    <img className={width ? `w-[${width}px]` : 'w-[20px]'} src= {loader}/>
  )
}

export default Loader