import Image from 'next/image'
import Footer from '@/components/Footer/layout'
import logoutIcon from "@/assets/logout.svg";
export default function Home() {

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
  return (
    <main className="w-screen">
      {choseFutsal()}
      
      <Footer/>
    </main>
  )
}
