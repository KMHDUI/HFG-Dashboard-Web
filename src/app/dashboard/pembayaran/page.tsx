'use client';
import Image from 'next/image'
import Link from 'next/link';
import ImageCover from '@/assets/imagecover.png'
import HeaderPengumpulan from '@/components/HeaderPengumpulan/layout';
import Button from '@/components/Button/layout';
import HaloBelanjaLogo from '@/assets/halo-belanja.png'
import Footer from '@/components/Footer/layout';
import CopyIcon from "@/assets/Copy.svg"
export default function Pembayaran() {

    function verifikasiPembayaran(){

    }



  return (
    <>
    <section className='p-10 md:p-28 xl:p-32'>
       <section className='flex flex-col xl:grid xl:grid-cols-12 gap-10'>
            <section className='xl:col-span-8'>
                <h1 className='text-4xl font-semibold'>Pembayaran Lomba</h1>

                <div className='mt-4 bg-[#F4F5FB] p-4 xl:p-10 rounded-3xl'>
                    <div className='bg-[#294390] rounded-xl p-5 text-white'>
                        <p className='font-bold text-xl'>INVOICE NUMBER</p>
                        <p>XIID-JDDA-KKKA</p>
                        <div className='w-[100%] xl:max-w-[60%] flex flex-col gap- mt-5'>
                            <span className='xl:grid grid-cols-3'>
                                <p className='cols-2'>Invoice Creation Date</p>
                                <p>: 17Agustus 2023</p>
                            </span>
                            <span className='xl:grid grid-cols-3'>
                                <p className='cols-2'>Intitusi Tertagih</p>
                                <p>: Universitas Indonesia</p>
                            </span>
                            <span className='xl:grid grid-cols-3'>
                                <p className='cols-2'>Intitusi Code</p>
                                <p>: AXID-JDHH</p>
                            </span>
                            <span className='xl:grid grid-cols-3'>
                                <p className='cols-2'>Jenis lomba </p>
                                <p>: FUTSAL</p>
                            </span>
                            <span className='xl:grid grid-cols-3'>
                                <p className='cols-2'>Penanggung Jawab Pembayaran </p>
                                <p>: I Made Urip</p>
                            </span>
                            <span className='xl:grid grid-cols-3'>
                                <p className='cols-2'>Alamat Email</p>
                                <p>: hfg@kmhdui.com </p>
                            </span>
                            <span className='xl:grid grid-cols-3'>
                                <p className='cols-2'>Nomor Whatsapp</p>
                                <p>: 082122232123</p>
                            </span>
                        </div>
                    </div>

                    <p className='mt-10 font-bold'>Payment Details</p>
                    <span className='flex justify-between '>
                        <p>Jumlah Tagihan</p>
                        <p>Rp 300.000,00</p>
                    </span>
                    <span className='flex justify-between '>
                        <p>Kode Unik</p>
                        <p>+ Rp18</p>
                    </span>
                    <span className='flex justify-between font-bold'>
                        <p>Total Pembayaran</p>
                        <p>Rp 300.018,00</p>
                    </span>
                </div>
            </section>
            <section className='xl:col-span-4 p-10 bg-[#F4F5FB] rounded-3xl flex flex-col justify-between'>
                <div>
                    <p className='font-semibold'>Lakukan Transfer Melalui HaloBelanja</p>
                    <div className='mt-4 flex items-center'>
                        <Image src={HaloBelanjaLogo} alt='logo-halobelanja' className='h-[80px] w-auto'></Image>
                        <span>
                            <p>Aplikasi HaloBelanja</p>
                            <p>a.n KMHD UI</p>
                        </span>
                    </div>

                    <p className='mt-5'>Nomor HaloBelaja</p>
                    <div className='p-3 bg-white rounded-full mt-2 flex justify-between'>
                        <p>08888888888</p>
                        <button onClick={() => {navigator.clipboard.writeText("081222")}}><Image src={CopyIcon} alt='copy'></Image></button>
                    </div>

                    <p>Total Transfer</p>
                    <div className='p-3 bg-white rounded-full mt-2 flex justify-between'>
                        <p>Rp 300.000,00</p>
                        <button onClick={() => {navigator.clipboard.writeText("300.000")}}><Image src={CopyIcon} alt='copy'></Image></button>
                    </div>
                </div>

                <div className='mt-16 xl:mt-0 '>
                    <p className='text-center my-2'>Pastikan anda melakukan proses transfer sebelum melakukan verifikasi</p>
                    {/* <Button name={'Verifikasi'} className={'w-full font-semibold'}/> */}
                </div>
            </section>
        </section>
        <section className='mt-20'>
            <p className='font-bold text-lg'>Cara Proses transfer melalui HaloBelanja</p>
            <div className='mt-5'>
                <p>Cara melakukan Transfer dengan nomor handphone:</p>
                <ul className='list-decimal list-inside'>
                    <li>Pilih menu “Bayar”.</li>
                    <li>Pilih “Transfer Antar Akun” atau ketik nama/nomor handphone/ nomor ID di kotak pencarian</li>
                    <li>Pastikan nama sudah sesuai dengan yang ingin kamu transfer dan saldo kamu mencukupi.</li>
                    <li>Masukkan jumlah nominal yang ingin di transfer dan klik kirim</li>
                    <li>Masukkan Pin Belanja milik kamu.</li>
                </ul>
            </div>
        </section>
        </section>
        <Footer/>
    </>
  )
}
