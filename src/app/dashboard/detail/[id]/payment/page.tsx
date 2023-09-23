'use client';
import Image from 'next/image'
import Link from 'next/link';
import ImageCover from '@/assets/imagecover.png'
import HeaderPengumpulan from '@/components/HeaderPengumpulan/layout';
import Button from '@/components/Button/layout';
import HaloBelanjaLogo from '@/assets/halo_belanja.png'
import Footer from '@/components/Footer/layout';
import CopyIcon from "@/assets/Copy.svg"
import DropInput from '@/components/DropInput/layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import uploadHandler from '@/utils/uploudHandler';
import InformationIcon from "@/assets/information_icon.svg"
import errorInformation from "@/assets/errorr.svg"
import { useRouter } from 'next/navigation';
import BackGrey from '@/assets/back_grey.svg'


type billType = {
    bill_total: number,
    id: String,
    real_price: number,
    status : String,
    unique_code: number
}

type dataType = {
    id:String,
    is_active: String,
    competition_name : String,
    competition_type : String,
    payment_status: String,
}

type responeseUser = {
    college: String,
    email: String,
    fullname:String,
    nickname:String,
    phone:String,
    status:String,
    is_verified:boolean
}

type responseVerifHandler = {
    status: number,
    message: String
}

export default function Payment({ params }: { params: { id: string } }    ) {

    const [bill, setBill] = useState<billType | null>(null);
    const [data, setData] = useState<dataType | null>(null);
    const [user, setUser] = useState<responeseUser | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<File | null>(null);
    const [urlLink, setURLLink] = useState<String>("https://example.com/bill-image.jpg")

    const [popUp, setPopUp] = useState<boolean>(false);
    const [mesagePopUp, setMessagePopUp] = useState<responseVerifHandler | null>();

    const router = useRouter()

    const config = {
        headers: {
        'Authorization': 'Bearer ' + getCookie('token')
        }
    }

    useEffect(() => {
        const url = `https://api-hfg-3s5y7jj3ma-as.a.run.app/api/v1/competition/${params.id}`
       
        axios.get(url, config).then(
            (response) => {
                if(response.status == 200){
                    setBill(response.data.data.bill)
                    setData({
                        id:response.data.data.id,
                        is_active: response.data.data.is_active,
                        competition_name : response.data.data.competition_name,
                        competition_type : response.data.data.competition_type,
                        payment_status: response.data.data.payment_status
                    })
                }else{
                    setMessagePopUp({
                        status: response.status,
                        message: response.data.message
                    })
                    setPopUp(!popUp)
                }
            }
        ).catch(
            () => {
                // router push

            }
        )

        axios.get(`https://api-hfg-3s5y7jj3ma-as.a.run.app/api/v1/user/profile`, config)
        .then(
            (response) => {
                setUser(response.data.data)
            }
        )

    }, [])

    const uploudFile = (file : File, folderName: string) => {
        const data =  uploadHandler(file, folderName);
        return data
    }


    const verifikasiPembayaran = async () => {

        if(selectedFiles != null){
            const url = await uploudFile(selectedFiles, `Pembayaran${data?.competition_name}`);
            setURLLink(url.url)
        }

        axios.post(`https://api-hfg-3s5y7jj3ma-as.a.run.app/api/v1/payment/pay`,{
            billId: bill?.id,
            imageUrl: urlLink
        }, config).then(
            (response) => {
                if(response.status == 200){
                    setMessagePopUp({
                        status: response.status,
                        message: response.data.message
                    })
                    setPopUp(true)

                } else{
                    setMessagePopUp({
                        status: 400,
                        message:"Invalid Input"
                    })
                    setPopUp(true)

                }
            }
        ).then(() => {
                
        })
    }

    const popUpModal = () => {
        return <div  className="fixed w-screen h-screen bg-black bg-opacity-50 top-0 left-0 right-0 z-50 p-4 w-screen h-screen flex justify-center items-center">
               <div className='bg-white p-5 rounded-xl flex flex-col'> 
                    <Image className='h-[100px] w-auto' src={mesagePopUp?.status == 500? errorInformation : InformationIcon} alt='img'></Image>
                    <p className='text-center'>{mesagePopUp?.message}</p>
                    <button className='mt-10 p-2 bg-[#064C72] rounded-full text-white' onClick={()=> {setPopUp(!popUp); router.push(`/dashboard/detail/${params.id}`)}}>Close</button>
               </div>
            </div>
    }

  return (
    <>
    <section className='p-10 md:p-28 xl:p-32'>
        {popUp ? popUpModal() :<></>}
       <section className='flex flex-col xl:grid xl:grid-cols-12 gap-10'>
            <section className='xl:col-span-8'>
                <h1 className='text-4xl font-semibold'>Pembayaran Lomba</h1>
                <Link href={`/dashboard/detail/${params.id}`} className='flex gap-3 mt-10'>
                    <Image src={BackGrey} alt='img' ></Image>
                    <p className='font-semibold text-[#687590]'>Detail</p>
                </Link>
                <div className='mt-4 bg-[#F4F5FB] p-4 xl:p-10 rounded-3xl'>
                    <div className='bg-[#294390] rounded-xl p-5 text-white'>
                        <p className='font-bold text-xl'>INVOICE</p>
                        <p>COMPETITION HFG 17</p>
                        <div className='w-[100%] xl:max-w-[90%] flex flex-col gap- mt-5'>
                            <span className='xl:grid grid-cols-3'>
                                <p className='cols-2'>Intitusi Tertagih</p>
                                <p>{`: ${user?.college}`}</p>
                            </span>
                            <span className='xl:grid grid-cols-3'>
                                <p className='cols-2'>Jenis lomba </p>
                                <p>{`: ${data?.competition_name}`}</p>
                            </span>
                            <span className='xl:grid grid-cols-3'>
                                <p className='cols-2'>Penanggung Jawab Pembayaran </p>
                                <p>{`: ${user?.fullname}`}</p>
                            </span>
                            <span className='xl:grid grid-cols-3'>
                                <p className='cols-2'>Alamat Email</p>
                                <p>{`: ${user?.email}`}</p>
                            </span>
                        </div>
                    </div>

                    <p className='mt-10 font-bold'>Payment Details</p>
                    <span className='flex justify-between '>
                        <p>Jumlah Tagihan</p>
                        <p>{`Rp ${bill?.real_price},00`}</p>
                    </span>
                    <span className='flex justify-between '>
                        <p>Kode Unik</p>
                        <p>{`+ Rp${bill?.unique_code}`}</p>
                    </span>
                    <span className='flex justify-between font-bold'>
                        <p>Total Pembayaran</p>
                        <p>{`Rp ${bill?.bill_total},00`}</p>
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
                    <div className='p-3 bg-white rounded-full mt-2 mb-3 flex justify-between'>
                        <p>0895392478314</p>
                        <button onClick={() => {navigator.clipboard.writeText("0895392478314")}}><Image src={CopyIcon} alt='copy'></Image></button>
                    </div>

                    <p>Total Transfer</p>
                    <div className='p-3 bg-white rounded-full mt-2 flex justify-between'>
                        <p>{`Rp ${bill?.bill_total},00`}</p>
                        <button onClick={() => {navigator.clipboard.writeText(`${bill?.bill_total}`)}}><Image src={CopyIcon} alt='copy'></Image></button>
                    </div>
                </div>
              
                {bill?.status == "Not Paid" ? <div className='mt-16 xl:mt-0 '>
                    <p className='mt-4'>{`Uploud Bukti Transfer HaloBelanja *(Opsional)`}</p>
                    <DropInput selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles}></DropInput>
                    <Button disabled={false} name={'Verifikasi'} className={'w-full font-semibold py-3 mt-4'} onClickFunction={verifikasiPembayaran}/>
                    <p className='text-center my-2'>Pastikan anda melakukan proses transfer sebelum melakukan verifikasi</p>
                </div> : <div className={` text-center font-semibold w-full p-3 rounded-xl mt-4 bg-opacity-60  border-2 ${bill?.status == 'Pending' ? 'border-[#FFCD1A]' : 'border-[#55FF1A]'}] bg-[#${bill?.status == 'Pending' ? 'FFCD1A' : '55FF1A' }]`}>
                    <p>{bill?.status}</p>
                </div>}
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
