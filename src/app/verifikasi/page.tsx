'use client'
import Image from 'next/image'
import Link from 'next/link';
import Footer from '@/components/Footer/layout'
import logoutIcon from "@/assets/logout.svg";
import Cover from "@/assets/image-1.png"
import ImageBack from "@/assets/back.svg"
import { Select, Option,   Input} from "@material-tailwind/react";
import type { InputProps } from "@material-tailwind/react";

export default function Verifikasi() {
  return (
    <main className="w-screen">
        <section className='min-h-screen w-full flex'>
            <section className='overflow-hidden relative h-screen'>
                <div className=''>
                    <Image className='absolute z-0 scale-[4] top-1' src={Cover} alt='cover'></Image>
                    <div className='absolute w-full h-full bg-black opacity-30'></div>
                </div>
                <Link className='p-16 relative z-1 text-white flex gap-5' href={"/"}>
                    <Image  src={ImageBack} alt='back-icon' className='h-[16px] w-auto self-center'/>
                    <p >Dashboard</p>
                </Link>
            </section>
            <form className='flex flex-col gap-3 p-20'>
                <span className='grid grid-cols-2'>
                    <p>Nama Lengkap</p>
                    <p>: I Made Urip Subagyo</p>
                </span>
                <span className='grid grid-cols-2'>
                    <p>Nomor Handphone</p>
                    <p>: I Made Urip Subagyo</p>
                </span>
                <span className='grid grid-cols-2'>
                    <p>Alamat Email</p>
                    <p>: I Made Urip Subagyo</p>
                </span>
                <span className='grid grid-cols-2'>
                    <p>Status Pendidikan</p>
                    <p>: I Made Urip Subagyo</p>
                </span>
                <span className='grid grid-cols-2'>
                    <p>Asal Pendidikan</p>
                    <p>: I Made Urip Subagyo</p>
                </span>
                <span className='grid grid-cols-2'>
                    <p>Jurusan</p>
                </span>
                <span className='grid grid-cols-2'>
                    <p>Jurusan</p>
                    <p>Angkatan</p>
                </span>
                <span className='grid grid-cols-2'>
                    <div>
                        <p>Tanggal Lahir</p>
                        <div className="w-72">
                            <Select label="Select Version">
                                <Option>Material Tailwind HTML</Option>
                                <Option>Material Tailwind React</Option>
                                <Option>Material Tailwind Vue</Option>
                                <Option>Material Tailwind Angular</Option>
                                <Option>Material Tailwind Svelte</Option>
                            </Select>
                         </div>
                    </div>
                    <div>
                        <p>Nomor Kartu Tanda Mahasiswa/Pelajar</p>
                    </div>
                </span>
                <span className='flex justify-between w-full'>
                    <div>
                        <p>Uploud Foto KTM/Kartu Pelajar/SIM</p>
                        <div className='w-full bg-black text-white p-16 text-center'>DROP ZONE ARE</div>
                    </div>
                    <div>
                        <p>Uploud Screenshoot Akun terdaftar di Aplikasi HaloBelanja</p>
                        <div className='w-full bg-black text-white p-16 text-center'>DROP ZONE ARE</div>
                    </div>
                </span>

                <span>
                    <div>
                        <p>Link drive foto KTM *(Opsional)</p>
                    </div>
                    <div>
                        <p>Link drive SS Aplikasi HaloBelanja*(Opsional)</p>
                    </div>
                </span>

                <button>Submit</button>
            </form>
        </section>
      <Footer/>
    </main>
  )
}
