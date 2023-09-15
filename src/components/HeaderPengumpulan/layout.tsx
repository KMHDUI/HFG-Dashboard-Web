import Image from 'next/image'
import Link from 'next/link';
import ImageCover from '@/assets/imagecover.png'
import {Philosopher } from 'next/font/google'

const philosopher = Philosopher({ 
    weight: ['400', '700'],
    style:['normal', 'italic'],
    subsets:['latin'],
    display:'swap'
      
    });

type InputType = {
  HeaderName:String,
  // className:String
}

export default function HeaderPengumpulan(props:InputType){
  return (
    <>
     <div className='w-screen'>
        <div className='overflow-hidden min-h-[300px] relative'>
            <div className='w-full h-full absolute z-0 overflow-hidden'>
                <Image src={ImageCover} alt='image-hfg' className='object-cover absolute z-0 h-auto w-full xl:h-auto xl:w-full	'/>
                <div className='absolute w-full h-full bg-[black] opacity-60 '></div>
            </div>
            <div className='absolute z-1 text-white w-full h-full flex items-center'>
                <h1 className={`${philosopher.className} text-5xl text-center flex-grow`}>{props.HeaderName}</h1>
            </div>
        </div>
     </div>
    </>
  )
}
