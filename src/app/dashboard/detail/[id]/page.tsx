'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import { deleteCookie, getCookie } from 'cookies-next';
import Header from "@/components/HeaderPengumpulan/layout";
import Link from "next/link";
import ImageBack from "@/assets/back.svg"
import Image from "next/image";
import BackGrey from '@/assets/back_grey.svg'
import Footer from "@/components/Footer/layout";
import Personal from "@/assets/Person.svg"
import Member from "@/assets/Two_Person.svg"
import BillingOpen from "@/assets/Compass.svg"
import { useRouter } from "next/navigation";

type detailProps = {
    competition_name: String,
    payment_status : String,
    competition_using_submission: boolean,
    competition_type: String,
    url: String | undefined
    bill_total: String
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

export default function Detail({ params }: { params: { id: String } }) {
    const [profile, setProfile] = useState<responeseUser>();
    const [detail, setDetail] = useState<detailProps>();
    const [headerName, setHeaderName] = useState<String>("");
    const [billLink, setBillLink] = useState<String>("");
    const router = useRouter();

    useEffect(() => {
        const url = `https://api-hfg-3s5y7jj3ma-as.a.run.app/api/v1/competition/${params.id}`
        let config = {
            headers: {
            'Authorization': 'Bearer ' + getCookie('token')
            }
        }

        axios.get(`https://api-hfg-3s5y7jj3ma-as.a.run.app/api/v1/user/profile`, config)
            .then(
                (res) => {
                    setProfile(res.data.data)
                }
            )

        axios.get(url, config).then(
            (response) => {
                if(response.status == 200){
                    setDetail({
                        competition_name:response.data.data.competition_name,
                        payment_status : response.data.data.payment_status,
                        competition_using_submission: response.data.data.competition_using_submission,
                        competition_type: response.data.data.competition_type,
                        url: response.data.data.url,
                        bill_total: response.data.data.bill.bill_total,
                    })
                    // let billLink = response.data.data.payments[0].image_url;
                    // if(billLink != null){
                    //     setBillLink(billLink)
                    // }
                    setHeaderName(response.data.data.competition_name)
                }else{
                    router.push('/dashboard')
                }
            }
        ).catch(()=> {                    router.push('/dashboard')    })
    }, [params.id])

    const TeamDevelop = () => {
        return<div>
            <p>Sedang Proses Pembaikan</p>
        </div>
    }

    const SoloDevelop = () => {
        return<div className="flex-grow flex flex-col">
            <span className="flex">
                <p>Link File Anda:</p>
                {billLink == "" ? <Link href={`${billLink}`}><p> My Link</p></Link> : <p> Anda Belum melakukan submisi File</p>}
            </span>
            {detail?.competition_using_submission ? <Link href={`/dashboard/detail/${params.id}/submission`} className="w-[50%]">
                <button className="p-6 mt-10 rounded-xl bg-[#064C72] text-white w-full font-semibold text-xl text-white">
                    Submit File
                </button>
            </Link>: <></>}
        </div>
    }

    const paymentScetion = () => {
        return <div className=" min-w-[30%] text-white">
            <div className="bg-white text-black p-8 flex flex-col md:flex-row  md:justify-between rounded-xl border-2">
                <p className="text-3xl font-bold">Rp{detail?.bill_total},00</p>
                <p>{detail?.payment_status}</p>
            </div>
            <div className="mt-10 bg-white text-black p-8 rounded-xl border-2 grid gap-3">
                <span className="flex gap-3">
                    <Image src={Personal} alt=""></Image>
                    <p>{profile?.fullname}</p>

                </span>
                <span className="flex gap-3">
                <Image src={Member} alt=""></Image>
                   <p>{detail?.competition_type}</p>
                   </span>
               
                {/* <span className="flex gap-3">
                    <Image src={BillingOpen} alt=""></Image>
                    <Link href={``}>Billing Link</Link>
                    </span> */}
                </div>

            <Link href={`/dashboard/detail/${params.id}/payment`} className="">
                <button className="p-6 mt-10 rounded-xl bg-[#064C72] w-full text-white font-semibold text-xl">
                    Bayar
                </button>
            </Link>
        </div>
    }
    return <div>
        <Header HeaderName={`Detail Lomba ${headerName}`}/>
        <div className="p-8 md:p-32 min-h-screen">
            <Link href={`/dashboard`} className='flex gap-3'>
                <Image src={BackGrey} alt='img' ></Image>
                <p className='font-semibold text-[#687590]'>Dashboard</p>
            </Link>
            <div className="flex flex-col md:flex-row gap-3 w-full mt-10">
                {detail?.competition_type == 'solo' ? SoloDevelop() : TeamDevelop()}
                {paymentScetion()}
            </div>
        </div>
        <Footer/>
    </div>
  }



