import Image from 'next/image'
import Link from 'next/link';
import Footer from '@/components/Footer/layout'
import logoutIcon from "@/assets/logout.svg";
import Cover from "@/assets/image-1.png"
import Input from '@/components/Input/layout';
import Button from '@/components/Button/layout';
export default function SignIn() {

  return (
    <main className="w-screen h-screen grid grid-cols-2 p-10 gap-20">
        <section className='overflow-hidden relative h-full rounded-3xl'>
            <div>
                <Image src={Cover} alt='cover' className='absolute z-0'/>
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
        <section className='p-20'>
            <h3 className='text-4xl font-bold'>Sign In</h3>
            <p className='mt-2'>Log In Your Account Hindu For Generation 17</p>
            <form className='max-w-[80%] mt-28'>
                <div className='mt-10 mr-28'>
                    <p>Email</p>
                    <Input typeInput="email" className="mt-2"/>
                </div>
                <div className='mt-6 mr-28'>
                    <p>Password</p>
                    <Input typeInput="password" className="mt-2"/>
                    <Link href={'/forgotpassword'}><p className='text-[#064C72] text-end mt-2'>Lupa Password?</p></Link>
                </div>
                <div className='mr-28'>
                    <Button name='Submit' className='mt-20 w-full'/>
                    <span className='flex gap-1 justify-center w-full mt-2'><p>Already have an account?</p><Link href={'/signin'}>Sign Up</Link></span>
                </div>
            </form>
        </section>
    </main>
  )
}
