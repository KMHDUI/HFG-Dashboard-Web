'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Cover from "@/assets/image-1.png";
import Footer from '@/components/Footer/layout';
import logoutIcon from "@/assets/logout.svg";
import Input from '@/components/Input/layout';
import Button from '@/components/Button/layout';
import axios from 'axios';
import IconSuccess from '@/assets/success-signup.svg'
import IconFailed from '@/assets/failed-message.svg'
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';



export default function SignUp() {
  const [namaLengkap, setNamaLengkap] = useState<String>();
  const [namaPanggilan, setNamaPanggilan] = useState<String>();
  const [email, setEmail] = useState<String>();
  const [nomohandphone, setNomorHandphone] = useState<String>();
  const [password1, setPassword1] = useState<String>();
  const [password2, setPassword2] = useState<String>();
  const [statusPendidikan, setStatusPendidikan] = useState<String>();
  const [asalPendidikan, setAsalPendididkan] = useState<String>();
  
  
  const [modal, setModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false)
  const [invalidInput, setInvalidInput] = useState<boolean>(false)


  let router = useRouter();

  function loadingAnimation(){
    return(
      <div role="status" className='flex flex-col  items-center'>
        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <p className='mt-10'>Mohon Tunggu</p>
    </div>)
  }

  function mesageInformationSuccess(){
    return(
      <div className='flex flex-col justify-center'>
        <Image src={IconSuccess} alt='success-icon' className='h-[100px] w-auto'></Image>
        {invalidInput ? <p>Invalid input or user already exists.</p> : <p className='mt-10'>Akun anda berhasil didaftarkan</p>}
        <Button name={'close'} className={''}  onClickFunction={()=> {
          setModal(!modal)
          router.push('/signin')
          }}/>
      </div>
    )
  }

  function messageInformationFailed(){
    return(<div className='flex flex-col justify-center'>
      <Image src={IconFailed} alt='success-icon' className='h-[100px] w-auto'></Image>
      <p className='mt-10'>Akun anda gagal didaftarkan</p>
      <Button name={'close'} className={''}  onClickFunction={()=> {
        setModal(!modal) 
        router.push('/signup')
      }}/>
    </div>)
  }


  function modalPopUp(){
    return (<div  className="fixed top-0 left-0 right-0 z-50 p-4 w-screen h-screen flex justify-center items-center">
        <div className=" relative bg-white drop-shadow-md rounded-xl overflow-hidden p-10">
            {loading ? loadingAnimation() : modal ? (success ? mesageInformationSuccess() : messageInformationFailed()) : <></>}
        </div>
     </div>)
  }

  function HandleSubmitForm(){
    if(namaLengkap != null && 
        email != null &&
        namaPanggilan != null &&
        nomohandphone != null &&
        password1 != null && password2 != null &&
        password1 === password2 &&
        statusPendidikan != null &&
        asalPendidikan != null
      ){
        
        setModal(true)
        setLoading(true)
        axios.post('https://api-hfg-3s5y7jj3ma-as.a.run.app/api/v1/user/register', {
            fullname: namaLengkap,
            nickname: namaPanggilan,
            email: email,
            phone: nomohandphone,
            password: password1,
            status: statusPendidikan,
            college: asalPendidikan,
            }
          ).then(
             (res) => {
                setLoading(false)
                setSuccess(true)
                if(res.status == 400){
                  setInvalidInput(!invalidInput)
                }
             }
          )
          .catch(
            (err) => {
              setLoading(false)
              setSuccess(false)
              console.log(err.data)
            }
          )
    }
  }

  return (
    <main className="w-screen">
      {modal ? modalPopUp() : <></>}
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
          <form  className='flex flex-col gap-5 px-6 lg:px-28' id='form-signup'>
            <h3 className='font-bold text-3xl my-6 '>Register Your Account</h3>
              <div>
                <p>Nama Lengkap</p>
                <Input typeInput='text' className='' onChange={setNamaLengkap} />
              </div>
              <div>
                <p>Nama Panggilan</p>
                <Input typeInput='text' className='' onChange={setNamaPanggilan}/>
              </div>
              <div>
                <p>Alamat Email</p>
                <Input typeInput='email' className='' onChange={setEmail}/>
              </div>
              <div>
                <p>Nomor Handphone</p>
                <Input typeInput='number' className='' onChange={setNomorHandphone}/>
              </div>

              <div className='grid lg:grid-cols-2 gap-5'>
                <div>
                  <p>Password</p>
                  <Input typeInput='password' className='' onChange={setPassword1}/>
                </div>
                <div>
                  <p>Re-enter Password</p>
                  <Input typeInput='password' className='' onChange={setPassword2} />
                </div>
              </div>

              <div className='grid lg:grid-cols-2 gap-5'>
                <div>
                  <p>Status Pendidikan</p>
                  <Input typeInput='text' className='' onChange={setStatusPendidikan}/>
                </div>
                <div>
                  <p>Asal Pendidikan</p>
                  <Input typeInput='text' className='' onChange={setAsalPendididkan}/>
                </div>
              </div>
              <Button name='Sign Up' className='mt-14 mx-16 xl:mx-28' onClickFunction={HandleSubmitForm} />
              <span className='flex gap-1 justify-center w-full text-[#064C72] mb-5'><p>Already have an account?</p><Link href={'/signin'} className='font-semibold'> Sign In</Link></span>
          </form>
      </section>
      <Footer/>
    </main>
  )
}
