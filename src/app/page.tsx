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
  return (
    <main className="w-screen">
      <div className='min-h-screen w-full bg-[#F1F1F1]'>
          <section className='p-5 px-16 flex justify-end'>
            <button className='p-2 bg-[#CA2812] rounded-full p-2 px-4 flex gap-4'>
              <Image src={logoutIcon} alt='logouticon'/>
              <p className='text-white'>Log Out</p>
            </button>
          </section>

          <section className='flex flex-col md:grid md:grid-cols-2 gap-3 md:flex-row p-8 md:p-20'>
              <div className=''>
                <div className='text-4xl/10 font-semibold'>
                  <p>Hai, Zee👋</p>
                  <p>Welcome To</p>
                  <p>Hindu For Generation</p>
                  <p>Dashboard</p>

                </div>
                <div className='mt-20 md:max-w-[50%] drop-shadow-lg	rounded-3xl bg-white p-6 overflow-auto md:overflow-none'>
                    <span className='grid grid-cols-2'>
                      <p>Nama</p>
                      <p>: Zeee</p>
                    </span>
                    <span className='grid grid-cols-2'>
                      <p>Alamat Email</p>
                      <p>: hfg@kmhdui.com</p>
                    </span>
                    <span className='grid grid-cols-2'>
                      <p>No Handphone</p>
                      <p>: 082222222</p>
                    </span>
                    <span className='grid grid-cols-2'>
                      <p>Status Pendidikan</p>
                      <p>: Mahasiswa</p>
                    </span>
                    <span className='grid grid-cols-2'>
                      <p>Asal Institusi</p>
                      <p>: Universtitas Indonesia</p>
                    </span>
                </div>
              </div>
              <div>
                  {notVerif()}
                  <div>
                    
                  </div>
              </div>
          </section>
      </div>
      <Footer/>
    </main>
  )
}
