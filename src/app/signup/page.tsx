import Image from 'next/image'
import Link from 'next/link';
import Cover from "@/assets/image-1.png"
import Footer from '@/components/Footer/layout'
import logoutIcon from "@/assets/logout.svg";
import Input from '@/components/Input/layout';
import Button from '@/components/Button/layout';
export default function SignUp() {
  return (
    <main className="w-screen">
      <section className='w-full min-h-screen md:grid md:grid-cols-2 md:p-8'>
          <section className='hidden md:block overflow-hidden relative h-full rounded-3xl'>
                <div>
                    <Image src={Cover} alt='cover' className='absolute z-0 md:scale-[3] lg:scale-[2]'/>
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
          <form className='flex flex-col gap-5 px-6 lg:px-28'>
            <h3 className='font-bold text-3xl my-6 '>Register Your Account</h3>
              <div>
                <p>Nama Lengkap</p>
                <Input typeInput='text' className='' />
              </div>
              <div>
                <p>Nama Panggilan</p>
                <Input typeInput='text' className='' />
              </div>
              <div>
                <p>Alamat Email</p>
                <Input typeInput='email' className='' />
              </div>
              <div>
                <p>Nomor Handphone</p>
                <Input typeInput='text' className='' />
              </div>

              <div className='grid lg:grid-cols-2 gap-5'>
                <div>
                  <p>Password</p>
                  <Input typeInput='password' className='' />
                </div>
                <div>
                  <p>Re-enter Password</p>
                  <Input typeInput='password' className='' />
                </div>
              </div>

              <div className='grid lg:grid-cols-2 gap-5'>
                <div>
                  <p>Status Pendidikan</p>
                  <Input typeInput='password' className='' />
                </div>
                <div>
                  <p>Asal Pendidikan</p>
                  <Input typeInput='password' className='' />
                </div>
              </div>
              <Button name='Sign Up' className='mt-14 mx-16 xl:mx-28' />
              <span className='flex gap-1 justify-center w-full text-[#064C72] mb-5'><p>Already have an account?</p><Link href={'/signin'} className='font-semibold'> Sign In</Link></span>
          </form>
      </section>
      <Footer/>
    </main>
  )
}
