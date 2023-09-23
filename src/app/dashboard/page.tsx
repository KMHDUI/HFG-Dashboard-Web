'use client';
import Image from 'next/image'
import Footer from '@/components/Footer/layout'
import logoutIcon from "@/assets/logout.svg";
import Link from 'next/link';
import { deleteCookie, getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import IconManage from '@/assets/icon_manager.png';
import IconPemain from '@/assets/icon_pemain.png';
import Button from '@/components/Button/layout';
import Input from '@/components/Input/layout';
import IconExit from "@/assets/exit.svg"
type responeseUser = {
    college: String,
    email: String,
    fullname:String,
    nickname:String,
    phone:String,
    status:String,
    is_verified:boolean
}

type cardCompetition = {
  id : String,
  type : String ,
  name: String,
  using_submission: boolean
}

type listMeCompetitionType ={
  code: String, 
  payment_status: String, 
  name : String
}

export default function Home() {

    let router = useRouter()
    const [data, setData] = useState<responeseUser>();
    const [competition, setCompetititon] = useState<cardCompetition[]>();
    const [meCompetition, setMeCompetititon] = useState<listMeCompetitionType[]>();
    const [listCompetitio, setListCompetitio] = useState<String[]>([]);
    const [activeFutsal, setActiveFutsal] = useState<boolean>(false);

    const [futsalId, setFutsalID] = useState<String>("");
    const [chosen, setChosen] = useState<String>("") 
    const [teamId, setTimID] = useState<String>("");
    const [agreeFutsal, setAgreeFutsal] = useState<boolean>(false);

    const notVerif = ()=> {
        return (
        <div className='rounded-2xl border-[#ED6335] border-2 overflow-hidden'>
            <p className='text-center p-2'>Anda saat ini belum dapat mendaftar kompetisi yang tersedia. Harap melakukan verifikasi sebagai peserta. Jika anda telah melakukan verifikasi, harap menunggu admin untuk verifikasi akun anda.</p>
            
            <Link href={'/dashboard/verifikasi'} >
                <button className='w-full bg-[#ED6335] p-2 mt-4' >Verifikasi Akun</button>
            </Link>
        </div>
        )  }

    const choseFutsal = (id:String)=> {

        return <div className='bg-black bg-opacity-50 fixed top-0 left-0 right-0 z-50 p-4 h-screen w-screen flex items-center justify-center md:inset-0 '>
            <div className='bg-white w-fit h-fit p-10 md:p-20  rounded-3xl relative'>
              <button className='bg-[#FF7979] p-3 rounded-full absolute -top-3 -right-3' 
                onClick={() => setActiveFutsal(!activeFutsal)}
              >
                <Image src={IconExit} alt='exit'></Image>
              </button>
              <p className='font-bold text-center text-xl'>Pilih Role</p>
               <div className='mt-10 flex gap-10 justify-center'> 
                <button className={`border-2 p-2 rounded-2xl ${chosen == 'Manager' ? 'border-[#064C72]' : ''}`}
                  onClick={() => setChosen('Manager')}
                >
                    <Image src={IconManage} alt='img' className='w-[100px]'></Image>
                    <p>Manager</p>
                </button>
                <button className={`border-2 p-2 rounded-2xl ${chosen == 'Pemain' ? 'border-[#064C72]' : ''}`}
                  onClick={() => setChosen('Pemain')}
                  disabled
                >
                    <Image src={IconPemain} alt='img' className='w-[100px]'></Image>
                    <p>Pemain</p>
                </button>
              </div>

              

              {chosen == "Pemain" ? <div className='mt-12'>
                <p>Enter your team code</p>
                <Input onChange={setTimID} typeInput={'text'} className={''}></Input>
              </div> : <></>}
              <div className='mt-10'>              
                  <input id="link-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={() => setAgreeFutsal(!agreeFutsal)}/> 
                  <label className="ml-2 max-w-[100px]" >Yang memberi centang dibawah ini telah membaca dan membaca <Link href={'/futsal'} className='font-bold'>SYARAT DAN KETENTUAN LOMBA Futsal 17 HINDU FOR GENERATION</Link>  yang telah diinformasikan oleh panitia.</label>
              </div>
              {chosen == "Manager" && agreeFutsal ? <Button name={`Register As ${chosen}`} className={'w-full mt-10'} onClickFunction={() => handlerRegister(id)} disabled={false}></Button> : 
                                    <Button name={`Register As ${chosen}`} className={'w-full mt-10'} onClickFunction={() => {hanleFutsalPemain(id, teamId)}} disabled={teamId == ""? true:false}></Button>}  
            </div>
        </div>
    }

    const handleLogOut = () => {
        deleteCookie('token')
        localStorage.clear()
        router.push('signin')
    }

    useEffect(() =>{
                let config = {
                    headers: {
                    'Authorization': 'Bearer ' + getCookie('token')
                    }
                }
            axios.get(`https://api-hfg-3s5y7jj3ma-as.a.run.app/api/v1/user/profile`, config)
            .then(
                (res) => {
                    setData(res.data.data)
                }
            )

            axios.get('https://api-hfg-3s5y7jj3ma-as.a.run.app/api/v1/competition/me', config).then((ress) => {
              const list = ress.data.data

              const name:String[] = [];
              const meCompetitionList:listMeCompetitionType[] = [];
              list.map((data:any) => {
                  name.push(data.name)
                  meCompetitionList.push({code: data.code, 
                    payment_status: data.payment_status, 
                    name : data.name})
              })
              setListCompetitio(name);
              setMeCompetititon(meCompetitionList)
            })

            axios.get('https://api-hfg-3s5y7jj3ma-as.a.run.app/api/v1/competition').then(
                (response) => {
                  setCompetititon(response.data.data)
                }
              )
    }, [])

    const hanleFutsalPemain = (id:String, code:String) => {
      let config = {
        headers: {
        'Authorization': 'Bearer ' + getCookie('token')
        }
    }
      axios.post('https://api-hfg-3s5y7jj3ma-as.a.run.app/api/v1/competition/register-by-code/',
      {
        "competitionId": id,
        "code": code
      }, config
      ).then(
        (ress) => {
          if(ress.status == 200){
            router.push(`/dashboard/detail/${ress.data.data.competition_id}`)
          } else{
            router.push('/dashboard')
          }
        } 
      ).catch(
        (err) => {}
      )
    }

    const cardCompetition = ( 
      id : String,
      type : String ,
      name: String,     
      using_submission: boolean) => {
      return <div className='min-h-[120px] w-full md:min-w-[350px] bg-white  rounded-2xl p-10' id={`${id}`}>
          {/* {confirmation?modalPopUp():<></>} */}
          <p className='font-bold text-2xl text-[#5B5B5B]'>{type}</p>
          <p className=''>{name}</p>
          <p className='mt-10 text-[#D2230B]'>Required Submision</p>
          <div className='flex flex-col md:flex-row gap-2'>
            <button className='border-2 border-[#064C72] text-[#064C72] w-full p-2 rounded-2xl font-semibold'
                onClick={()=> {
                  if(type == "Essay"){
                    router.push(`/esai`)
                  } else if(type == "Photography") {
                    router.push(`/fotografi`)
                  } else if(type == "Story Telling"){
                    router.push(`/storytelling`)
                  } else {
                    router.push(`/futsal`)
                  }
                }}
            >{`Detail`}</button>
            {listCompetitio.includes(type, 0) || data?.is_verified === false ? 
                <button className='bg-[#064C72]  w-full p-2 rounded-2xl text-white opacity-75' disabled>Register</button> 
                : <button className='bg-[#064C72] w-full p-2 rounded-2xl text-white' onClick={()=> {
                  if(type == "Futsal"){
                    setFutsalID(id)
                    setActiveFutsal(!activeFutsal)
                  }else{
                    handlerRegister(id)
                  }
                  }}>Register</button>}
            </div>
      </div>
    }

    function cardDetailDiikuti(code:any, paymentStatus:String, nameCompetition:String, index:number){
      return<div className='bg-white  text-black p-3 rounded-xl flex justify-between items-center' key={index}>
          <div>
            <p className='text-xl mb-2'>{nameCompetition}</p>
            {paymentStatus == "Pending" ? 
                    <p className={`text-sm bg-[#FFB21E] rounded-full p-1 text-center min-w-[110px]`}>{paymentStatus}</p> : 
                    paymentStatus == "Paid" ? <p className={`text-sm bg-[#4AD20B] rounded-full p-1 text-center min-w-[110px]`}>{paymentStatus}</p> : <p className={`text-sm bg-[#FF1A1A] rounded-full p-1 text-center min-w-[110px]`}>{paymentStatus}</p>
                    }
          </div>
          <Link href={`/dashboard/detail/${code}`} >
                <p>See Detail</p>
          </Link>
      </div>
    }

    function handlerRegister(id:String){

      let config = {
        headers: {
        'Authorization': 'Bearer ' + getCookie('token')
        }
    }
      axios.post('https://api-hfg-3s5y7jj3ma-as.a.run.app/api/v1/competition/register',
      {
        "competitionId": id
      }, config
      ).then(
        (ress) => {
          if(ress.status == 200){
            router.push(`/dashboard/detail/${ress.data.data.competition_id}`)
          } else{
            router.push('/dashboard')
          }
        } 
      ).catch(
        (err) => {}
      )
      return '';
    }
  return (
    <div className="w-screen">
      {activeFutsal ? choseFutsal(futsalId):<></>}
      <div className='min-h-screen w-full bg-[#F6F8FD]'>
          <section className='p-5 px-16 flex justify-end'>
            <button onClick={handleLogOut} className='p-2 bg-[#CA2812] rounded-full p-2 px-4 flex gap-4'>
              <Image src={logoutIcon} alt='logouticon'/>
              <p className='text-white'>Log Out</p>
            </button>
          </section>

          <section className='flex flex-col md:grid md:grid-cols-2 gap-3 md:flex-row p-8 md:p-20'>
              <div className=''>
                <div className='text-4xl/10 font-semibold'>
                  <p>Hai, {data?.nickname}👋</p>
                  <p>Welcome To</p>
                  <p>Hindu For Generation</p>
                  <p>Dashboard</p>

                </div>
                <div className='mt-20 md:max-w-[50%] drop-shadow-lg	rounded-3xl bg-white p-6 overflow-auto md:overflow-none'>
                    <span className='grid grid-cols-2'>
                      <p>Nama</p>
                      <p>: {data?.fullname}</p>
                    </span>
                    <span className='grid grid-cols-2'>
                    <p>Alamat Email</p>
                      <p>:  {data?.email}</p>
                    </span>
                    <span className='grid grid-cols-2'>
                      <p>No Handphone</p>
                      <p>: {data?.phone}</p>
                    </span>
                    <span className='grid grid-cols-2'>
                      <p>Status Pendidikan</p>
                      <p>: {data?.status}</p>
                    </span>
                    <span className='grid grid-cols-2'>
                      <p>Asal Institusi</p>
                      <p>: {data?.college}</p>
                    </span>
                </div>
              </div>
              <div>
                  {data?.is_verified ? <></>: notVerif()}
                  <div className='flex flex-col gap-2 mt-10'>
                    <p>My Competition</p>
                    {meCompetition?.map((data, index)=> cardDetailDiikuti(data.code, data.payment_status, data.name, index))}
                  </div>
              </div>
          </section>

          <section className=' w-full p-8 md:p-20 gap-4'>
                <p className='text-2xl font-semibold'>List Competition</p> 
                <div className='flex flex-col md:flex-row md:flex-wrap justify-between gap-4 mt-10 w-full'>
                {competition?.map((data, ind) => {
                    return(<div id={`${ind}`} className='min-[10px] min-h-[10px]' key={ind} >
                        {cardCompetition(data.id,data.name, data.type, data.using_submission)}
                    </div>)
                })}
                </div>
          </section>
      </div>
      <Footer/>
    </div>
  )
}



