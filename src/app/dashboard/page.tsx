'use client';
import Image from 'next/image'
import Footer from '@/components/Footer/layout'
import logoutIcon from "@/assets/logout.svg";
import Link from 'next/link';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

type responeseUser = {
    college: String,
    email: String,
    fullname:String,
    nickname:String,
    phone:String,
    status:String,
    is_verified:boolean
}

export default function Home() {

    let router = useRouter()
    const [data, setData] = useState<responeseUser>();
    const [competition, setCompetititon] = useState<String[]>();

    const notVerif = ()=> {
        return (
        <div className='rounded-2xl border-[#ED6335] border-2 overflow-hidden'>
            <p className='text-center p-2'>Anda saat ini belum dapat mendaftar kompetisi yang tersedia. Harap melakukan verifikasi sebagai peserta. Jika anda telah melakukan verifikasi, harap menunggu admin untuk verifikasi akun anda.</p>
            
            <Link href={'/dashboard/verifikasi'} >
                <button className='w-full bg-[#ED6335] p-2 mt-4' >Verifikasi Akun</button>
            </Link>
        </div>
        )  }

    const choseFutsal = ()=> {
        return <div className='bg-[#CA2812] fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full'>
            helo
        </div>
    }

    const handleLogOut = () => {
        deleteCookie('token')
        localStorage.clear()
        router.push('signin')
    }

    useEffect(() =>{
                let config = {
                    headers: {
                    'Authorization': 'Bearer ' + getCookie('token')
                    }
                }
            axios.get(`https://api-hfg-3s5y7jj3ma-as.a.run.app/api/v1/user/profile`, config)
            .then(
                (res) => {
                    setData(res.data.data)
                }
            )

              axios.get('https://api-hfg-3s5y7jj3ma-as.a.run.app/api/v1/competition').then(
                (response) => {
                  setCompetititon(response.data.data)
                  console.log(response.data.data)
                }
              )
            
    }, [])

  return (
    <div className="w-screen">
      {choseFutsal()}
      <div className='min-h-screen w-full bg-[#F1F1F1]'>
          <section className='p-5 px-16 flex justify-end'>
            <button onClick={handleLogOut} className='p-2 bg-[#CA2812] rounded-full p-2 px-4 flex gap-4'>
              <Image src={logoutIcon} alt='logouticon'/>
              <p className='text-white'>Log Out</p>
            </button>
          </section>

          <section className='flex flex-col md:grid md:grid-cols-2 gap-3 md:flex-row p-8 md:p-20'>
              <div className=''>
                <div className='text-4xl/10 font-semibold'>
                  <p>Hai, {data?.nickname}👋</p>
                  <p>Welcome To</p>
                  <p>Hindu For Generation</p>
                  <p>Dashboard</p>

                </div>
                <div className='mt-20 md:max-w-[50%] drop-shadow-lg	rounded-3xl bg-white p-6 overflow-auto md:overflow-none'>
                    <span className='grid grid-cols-2'>
                      <p>Nama</p>
                      <p>: {data?.fullname}</p>
                    </span>
                    <span className='grid grid-cols-2'>
                      <p>Alamat Email</p>
                      <p>:  {data?.email}</p>
                    </span>
                    <span className='grid grid-cols-2'>
                      <p>No Handphone</p>
                      <p>: {data?.phone}</p>
                    </span>
                    <span className='grid grid-cols-2'>
                      <p>Status Pendidikan</p>
                      <p>: {data?.status}</p>
                    </span>
                    <span className='grid grid-cols-2'>
                      <p>Asal Institusi</p>
                      <p>: {data?.college}</p>
                    </span>
                </div>
              </div>
              <div>
                  {data?.is_verified ? <></>: notVerif()}
                    <p className='mt-10 text-center'>Anda baru bisa mendaftar pada tanggal 15 September 2023</p>
              </div>
          </section>

          {/* <section className='bg-black w-full h-[200px]'>
                {competition?.map((data, ind) => {
                    return(<div id={`{ind}`} className='bg-white min-[10px] min-h-[10px]' >
                        <p></p>
                    </div>)
                })}
          </section> */}
      </div>
      <Footer/>
    </div>
  )
}
