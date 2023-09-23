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
import { url } from "inspector";
import { config } from "process";

type detailProps = {
    competition_name: String,
    payment_status : String,
    competition_using_submission: boolean,
    competition_type: String,
    url: String | undefined
    bill_total: String
}

type FutsalResponse = {

}

type MemberFutsal = {
    is_active : boolean,
    is_owner : boolean,
    user_college: String,
    user_email: String,
    user_fullname: String,
    acceptance_status:String |null
    id: String
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
    
    const [ownerFutsal, setOwnerFutsal] = useState<MemberFutsal|null>(null);
    const [memberFutsal, setMemberFutsal] = useState<MemberFutsal[]>([]);
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

                    if(response.data.data.competition_name == 'Futsal'){
                        const member = response.data.data.members;
                        for(let i = 0; i < member.length; i++){
                            if(member[i].is_owner){
                                setOwnerFutsal(member[i])
                            }else{
                                if(member[i].acceptance_status != "Rejected"){
                                    let newMember:MemberFutsal[]|null = memberFutsal;
                                    memberFutsal.push(member[i]);
                                    setMemberFutsal(newMember)
                                }
                            }
                        }
                     }
                    setHeaderName(response.data.data.competition_name)
                }else{
                    router.push('/dashboard')
                }
            }
        ).catch(()=> {                    
            router.push('/dashboard')    })
    }, [params.id])

    const TeamDevelop = () => {

        return<div className="w-full">
            <p className="text-xl">{`Invitation Member Code: ${params.id}`}</p>
            <div className="mt-10 border-2	p-10 w-fit rounded-xl">
                <p className="font-semibold text-center">Official Team Name</p>
                <p className="mt-3">{`Name : ${ownerFutsal?.user_fullname}`}</p>
                <p>{`Email : ${ownerFutsal?.user_email}`}</p>
                <p>{`Intitusi Pendidikan: ${ownerFutsal?.user_college}`}</p>
            </div>

            <div className="mt-10">
                <p className="font-semibold">Team Member</p>
                <table className="table-auto w-full mt-5">
                    <thead className="text-sm text-gray-700 uppercase bg-[#E7F6FF]">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Full Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                User Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status Member
                            </th>
                            {ownerFutsal?.user_email == profile?.email ?   <th scope="col" className="px-6 py-3">
                                Action
                            </th> : <></>}
                        </tr>
                    </thead>
                    <tbody className="mt-10">
                        {memberFutsal.map((data, id) => {return <tr key={id} className="text-center">
                            <td>{data.user_fullname}</td>
                            <td>{data.user_email}</td>
                            <td>{data.acceptance_status}</td>
                            {ownerFutsal?.user_email == profile?.email ?  <td>
                                {data.acceptance_status == "Pending" ? <div className="flex gap-3 ">
                                    <button className="border-2 p-2 rounded-xl bg-[#4AD20B] hover:bg-[#fff]" onClick={() => changeStatus(data.id, "Accepted")}>Accept</button>
                                    <button className="bg-[#D2230B] hover:bg-[#fff] border-2 p-2 rounded-xl" onClick={()=> {() => changeStatus(data.id, "Rejected") }}>Reject</button>
                                </div> : <div>   
                                    <button className="bg-[#D2230B] hover:bg-[#fff] border-2 p-2 rounded-xl" onClick={()=> {() => changeStatus(data.id, "Deleted") }}>Delete</button>
                                </div>}
                            </td> : <></>}

                        </tr>
                        })}
                      
                    </tbody>
                </table>
            </div>
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


    function changeStatus(id:String, Action:String){
        axios.patch('https://api-hfg-3s5y7jj3ma-as.a.run.app/api/v1/competition/member/status',
            {
                code: params.id,
                memberId: id,
                status: Action
            }
            , {
                headers: {
                'Authorization': 'Bearer ' + getCookie('token')
                }
            }
        )
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



