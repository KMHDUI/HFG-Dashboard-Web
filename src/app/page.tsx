'use client';
import Image from 'next/image'
import Link from 'next/link';
import Footer from '@/components/Footer/layout'
import logoutIcon from "@/assets/logout.svg";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Banner from "@/assets/banner.png"
import ImgBanner from '@/assets/image-1.png'
import Poster1 from '@/assets/1.png'
import Poster2 from '@/assets/2.png'
import Poster3 from '@/assets/3.png'
import Poster4 from '@/assets/4.png'

import { motion } from "framer-motion"


type SliderTyper = {
  image: any
}
export default function Home() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [animationTransition, setAnimation] = useState<boolean>(false)

  const gotToPrevious = () => {
    setAnimation(true)
    const isFirstIndex = currentIndex === 0
    const newIndex = isFirstIndex ? dataSlide.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
    
}

const goToNext = () => {
    setAnimation(false)
    const isLastIndex = currentIndex === dataSlide.length -1
    const newIndex = isLastIndex ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
}


  const notVerif = ()=> { 
    return (
      <div className='rounded-2xl border-[#ED6335] border-2 overflow-hidden	'>
        <p className='text-center p-2'>Anda saat ini belum dapat mendaftar kompetisi yang tersedia. Harap melakukan verifikasi sebagai peserta</p>
        
        <button className='w-full bg-[#ED6335] p-2 mt-4'>Verifikasi Akun</button>
      </div>
    )  }

  const choseFutsal = ()=> {
    return <div className='bg-[#CA2812] fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full'>
        helo
    </div>
  }


  const dataSlide:SliderTyper[] = [
    {   
        image: Poster1,
    },
    {   
      image: Poster2,
    },
    {   
      image: Poster3,
    },
    {   
      image: Poster4,
    },
   
]


  return (
    <main className="w-screen">
      <section className='w-full  bg-[#F8F5EF] px-10 md:px-20 py-28 '>

        <div className='w-full grid justify-items-center'><Image src={Banner} alt='banner' className='max-h-[300px] w-auto'></Image></div>
        <div className='w-full grid justify-items-center mt-20'>
          <iframe src="https://drive.google.com/file/d/1rAUifas0z8pgfQltgrU9L0PjoGXEPw1h/preview"  className=' md:min-w-[854px] md:min-h-[480px]' allow="autoplay"></iframe>

        </div>
        <Link href={'/dashboard'}>
          <p className='mt-16 p-5 bg-[#026C80] hover:bg-[#0692AC] text-white lg:max-w-[40%] mx-auto text-center font-semibold md:text-xl '>Register Competition</p>
        </Link>
        {/* <div className='text-center mt-5 md:mt-20'>
            <p className='font-semibold md:text-2xl'>Our Competition</p>
            <div className='flex flex-col md:flex-row justify-between xl:px-64 mt-2 md:mt-10 md:text-xl'>
                <p>Esai</p>
                <p>Futsal</p>
                <p>Fotografi</p>
                <p>Story Telling</p>
            </div>
        </div> */}
      </section>
      
      <section className='xl:px-64 bg-[#026C80]'>
      <div id="gallery" className="relative w-full h-full"> 
          <motion.div 
                            key={currentIndex}
                            initial={{x: animationTransition ? -100 : 100}}
                            animate={{x:0}}
                            exit={{x:animationTransition ? 100 : -100}}

                            className="content p-[27px]  
                                    relative
                                    z-1
                                    grid
                                    gap-5 md:gap-10
                                    pb-10 
                                    min-h-[700px] sm:min-h-[600px] md:min-h-[500px] lg:min-h-[350px]
                                    items-center
                                    lg:mx-8
                                    
                                    ">
                                  <Image  src={dataSlide[currentIndex].image} alt="dummy-data" className=" max-h-screen w-auto object-cover justify-self-center rounded-3xl"></Image>                                
              </motion.div>
          <button type="button" onClick={gotToPrevious} className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                  </svg>
                  <span className="sr-only">Previous</span>
              </span>
          </button>
          <button type="button" onClick={goToNext} className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <span className="sr-only">Next</span>
              </span>
          </button>
      </div>

      </section>
      <Footer/>
    </main>
  )
}
