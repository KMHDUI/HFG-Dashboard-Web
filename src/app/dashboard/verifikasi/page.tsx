'use client'
import Image from 'next/image'
import Link from 'next/link';
import Footer from '@/components/Footer/layout'
import logoutIcon from "@/assets/logout.svg";
import Cover from "@/assets/image-1.png"
import ImageBack from "@/assets/back.svg"
import InputCustom from "@/components/Input/layout";
import Button from '@/components/Button/layout';
import DropInput from '@/components/DropInput/layout';
import { Select, Option,   Input} from "@material-tailwind/react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

type responeseUser = {
    college: String,
    email: String,
    fullname:String,
    nickname:String,
    phone:String,
    status:String,
}

export default function Verifikasi() {

    const [data, setData] = useState<responeseUser>();
    const [jurusan, setJurusan] = useState<String>();
    const [angkatan,setAngkatan] = useState<Number>();
    const [tanggalLahir, setTanggalLahir] = useState<String>();
    const [KTM, setKTM] = useState<String>();

    let router = useRouter();


    useEffect(() =>{
        let config = {
            headers: {
            'Authorization': 'Bearer ' + getCookie('token')
            }
        }
    axios.get(`https://api-hfg-3s5y7jj3ma-as.a.run.app/api/v1/user/profile`, config)
    .then(
        (res) => {
            console.log(res.data.data)
            setData(res.data.data)
        }
    )
}, [])




    const handleVerifikasi = async () =>{
        console.log(jurusan, angkatan,tanggalLahir,KTM)
        let config = {
            headers: {
            'Authorization': 'Bearer ' + getCookie('token')
            }
        }

        axios.patch('https://api-hfg-3s5y7jj3ma-as.a.run.app/api/v1/user/verification', {
            major: jurusan,
            batch: angkatan,
            bod: tanggalLahir,
            sn:KTM,
            snUrl: "https://example.com/sn-image.jpg",
            haloBelanjaUrl: "https://example.com/halo-belanja-image.jpg"
        }, 
        {
            headers:{
                'Authorization': 'Bearer ' + getCookie('token')                
            }
        }).then(
            (ress) => {
                console.log("success")
                router.push('/dashboard')
        }
        ).catch(
            (ee) => {
                console.log('ERRR')
                console.log(ee)
            }
        )

    }

  return (
    <div className="w-screen">
        <section className='w-full
                flex flex-col md:flex-row
                '>
            <section className='relative overflow-hidden'>
                <div className='h-full w-auto absolute z-0'>
                    <Image className='object-cover w-full h-auto md:h-full md:w-auto' src={Cover} alt='cover'></Image>
                    <div className='absolute w-full h-full bg-black opacity-30'></div>
                </div>
                <Link className='p-16 relative z-1 text-white flex gap-5' href={"/"}>
                    <Image  src={ImageBack} alt='back-icon' className='h-[16px] w-auto self-center'/>
                    <p >Dashboard</p>
                </Link>
            </section>
            
            <form className='flex flex-col gap-3 p-10 md:p-20 w-full'>
                <h1 className='font-bold text-3xl my-2 text-center'>Form Verifikasi</h1>
                <div className='flex flex-col gap-4 '>
                    <span className='grid grid-cols-3'>
                        <p className=''>Nama Lengkap</p>
                        <span className='flex gap-2 col-span-2'><p>:</p><p>{data?.fullname}</p></span>
                    </span>
                    <span className='grid grid-cols-3'>
                        <p>Nomor Handphone</p>
                        <span className='flex gap-2 col-span-2'><p>:</p><p>{data?.phone}</p></span>
                    </span>
                    <span className='grid grid-cols-3'>
                        <p>Alamat Email</p>
                        <span className='flex gap-2 col-span-2'><p>:</p><p>{data?.email}</p></span>
                    </span>
                    <span className='grid grid-cols-3'>
                        <p>Status Pendidikan</p>
                        <span className='flex gap-2 col-span-2'><p>:</p><p>{data?.status}</p></span>
                    </span>
                    <span className='grid grid-cols-3'>
                        <p>Asal Pendidikan</p>
                        <span className='flex gap-2 col-span-2'><p>:</p><p>{data?.college}</p></span>
                    </span>
                    <span className='grid grid-cols-3 items-center'>
                        <p>Jurusan</p>
                        <span className='flex gap-2 items-center col-span-2'><p>:</p><InputCustom typeInput='text' className='' onChange={setJurusan} /></span>
                    </span>
                    <span className='grid grid-cols-3 items-center'>
                        <p>Angkatan</p>
                        <span className='flex gap-2 items-center col-span-2'><p>:</p><InputCustom typeInput='number' className='' onChange={setAngkatan} /></span>
                    </span>
                    <span className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                        <div className='grid content-between h-full'>
                            <p>Tanggal Lahir</p>
                            <InputCustom typeInput='text' className='' onChange={setTanggalLahir}/> 
                        </div>
                        <div className='content-between'>
                            <p>Nomor Kartu Tanda Mahasiswa/Pelajar</p>
                            <InputCustom typeInput='number' className='' onChange={setKTM}/> 
                        </div>
                    </span>
                </div>
                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-10 mt-10'>
                    <div>
                        <div className='mt-4'>
                            <p>Uploud File KTM</p>
                            <DropInput></DropInput>
                        </div>
                        {/* <div className='mt-4'>
                            <p>Link drive foto KTM *(Opsional)</p>
                            <InputCustom typeInput='text' className='' />
                        </div> */}
                    </div>

                    <div>
                            <div className='mt-4'>
                                <p>Uploud File KTM</p>
                                <DropInput></DropInput>
                            </div>
                            {/* <div className='mt-4'>
                                <p>Link drive foto KTM *(Opsional)</p>
                                <InputCustom typeInput='text' className='' />
                            </div> */}
                    </div>
                </div>
                <Button name='Submit' className='mx-0 md:mx-28 mt-6' onClickFunction={handleVerifikasi} />
            </form>
        </section>
        <Footer/>
    </div>
  )
}
