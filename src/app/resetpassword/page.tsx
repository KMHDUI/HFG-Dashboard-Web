import Image from 'next/image'
import Footer from '@/components/Footer/layout'
import LockIcon from "@/assets/Lock.svg";
import Input from '@/components/Input/layout';
import KeyIcon from "@/assets/Key.svg"
export default function ResetPassword() {
  return (
    <main className="w-screen bg-[#F1F1F1]">
        <div className='w-full h-screen flex justify-center items-center'>
            <form className='bg-white h-fit max-w-[350px] rounded-2xl overflow-hidden'>
                 <div className='p-4'>
                    <span className='flex gap-4'>
                        <Image src={KeyIcon} alt='icon-lock'/>
                        <div>
                            <p className='font-bold'>Create new Password</p>
                            <p>Enter new password for your account</p>
                        </div>
                    </span>
                    <div className='my-10 border-2'></div>                       
                        <p className='mt-4'>New password</p>
                        <Input typeInput="password" className={'mt-10'}/>

                        <p className='mt-4'>Re-enter new password</p>
                        <Input typeInput="password" className={'mt-10'}/>
                 </div>
                <button className='mt-10 bg-[#064C72] w-full p-3 text-white'>Submit</button>
            </form>
        </div>
        <Footer />
    </main>
  )
}
