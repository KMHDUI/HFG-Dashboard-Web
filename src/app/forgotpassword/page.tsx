'use client'
import Image from 'next/image'
import Link from 'next/link';
import Footer from '@/components/Footer/layout'
import logoutIcon from "@/assets/logout.svg";
import Cover from "@/assets/image-1.png";
import LockIcon from "@/assets/Lock.svg";
import Input from '@/components/Input/layout';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
export default function ForgotPassword() {

    const [email, setEmail] = useState()
    let router = useRouter();

    const handleForgotPassword = async () => {
                await axios.post('https://api-hfg-3s5y7jj3ma-as.a.run.app/api/v1/user/forgot-password', {
                    email:email
                }).then(
                    (res) =>{
                        console.log(res)
                    }
                ).catch((err)=> {
                        console.log(err)
                })
        router.push('/signin')
    }
  return (
    <main className="w-screen bg-[#F1F1F1]">
        <div className='w-full h-screen flex justify-center items-center'>
            <form className='bg-white h-fit max-w-[350px] rounded-2xl overflow-hidden'>
                 <div className='p-4'>
                    <span className='flex'>
                        <Image src={LockIcon} alt='icon-lock'/>
                        <div>
                            <p className='font-bold'>Can’t Log in?</p>
                            <p>Reset your password to access your account</p>
                        </div>
                    </span>
                    <div className='my-10 border-2'></div>   
                     <p className='text-[#A6A3A3]'>Fill in your e-mail address and we will send you instructions on how to reset your password via e-mail.</p>                
                    <Input typeInput="email" className={'mt-10'} onChange={setEmail}/>
                 </div>
                <button className='mt-10 bg-[#064C72] w-full p-3 text-white' onClick={handleForgotPassword}>Submit</button>
            </form>
        </div>
        <Footer />
    </main>
  )
}
