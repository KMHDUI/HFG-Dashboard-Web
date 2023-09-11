'use client';
import Image from 'next/image'
import Link from 'next/link';
import Footer from '@/components/Footer/layout'
import logoutIcon from "@/assets/logout.svg";
import Cover from "@/assets/image-1.png"
import Input from '@/components/Input/layout';
import Button from '@/components/Button/layout';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import axios from 'axios';


export default function SignIn() {
    const [email, setEmail] = useState<String>();
    const [password, setPassword] = useState<String>();
    const [invalid, setInvalid] =useState<boolean>(false)
    let router = useRouter();

    const handleSignIn = async () => {

        await axios.post('https://api-hfg-3s5y7jj3ma-as.a.run.app/api/v1/user/login',{
            email: email,
            password: password
        }).then(
            (response) => {
                if(response.status == 200){
                    setCookie('token', response.data.token,{maxAge:60*60*6})
                    localStorage.setItem("token", response.data.token)
                } else{
                    setInvalid(true)
                }                
            }

        ).catch(
            (err) => {
                setInvalid(true)
            }
        )
        router.push('/dashboard')
    }

  return (
    <main className="w-screen h-screen grid md:grid-cols-2 p-10 gap-20">
        <section className='hidden md:block overflow-hidden relative h-full rounded-3xl'>
            <div>
                <Image src={Cover} alt='cover' className='absolute z-0 md:scale-[2] lg:scale-[1.5] xl:scale-[1]'/>
                <div className='absolute w-full h-full bg-black opacity-20'></div>
            </div>

            <h3 className='relative z-1 font-bold text-4xl text-white p-20'>Hi, Welcome Back👋</h3>

            <div className='absolute bottom-3 w-full p-8 text-white text-center'>
                <span className='flex justify-between'>
                    <Link href="/">Home</Link>
                    <Link href="/">About Us</Link>
                    <Link href="/">Competition</Link>
                    <Link href="/">Contact Us</Link>

                </span>
                <p className='mt-2'>©2023 Hindu For Generation 17</p>
            </div>
        </section>
        <section className='flex justify-center flex-col lg:p-8 xl:p-20'>
            <h3 className='text-4xl font-bold'>Sign In</h3>
            <p className='mt-2'>Log In Your Account Hindu For Generation 17</p>
            <form className=' mt-28 lg:max-w-[80%]' onSubmit={handleSignIn} method='POST' >
                <div className='mt-10'>
                    <p>Email</p>
                    <Input typeInput="email" className="mt-2" onChange={setEmail}/>
                </div>
                <div className='mt-6'>
                    <p>Password</p>
                    <Input typeInput="password" className="mt-2" onChange={setPassword}/>
                    <Link href={'/forgotpassword'}><p className='text-[#064C72] text-end mt-2 font-semibold'>Lupa Password?</p></Link>
                </div>
                {invalid ? <p className='text-[#E9331A] text-center'>Invalid username or password</p> : <></>}
                <div className=''>
                    <Button name='Submit' className='mt-20 w-full'
                            onClickFunction={handleSignIn}
                     />
                    <span className='flex gap-1 justify-center w-full mt-2 text-[#064C72]'><p>Already have an account?</p><Link href={'/signup'} className='font-bold'>Sign Up</Link></span>
                </div>
            </form>
        </section>
    </main>
  )
}
